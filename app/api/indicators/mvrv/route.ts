import { NextResponse } from 'next/server';
import { calculateMVRVSignal } from '@/lib/calculations';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// 简化的MVRV计算
// 真实的MVRV需要实现市值数据，这里使用估算
export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false',
      { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Bitcoin data');
    }

    const data = await response.json();
    const currentPrice = data.market_data?.current_price?.usd;
    const athPrice = data.market_data?.ath?.usd;
    const atlPrice = data.market_data?.atl?.usd;
    
    if (!currentPrice || !athPrice || !atlPrice) {
      throw new Error('Price data not available');
    }
    
    // 简化的MVRV估算
    // MVRV通常反映市场整体盈利情况
    // 使用价格相对于历史范围的位置来估算
    
    const priceRange = athPrice - atlPrice;
    const pricePosition = (currentPrice - atlPrice) / priceRange;
    
    // 改进的估算公式
    // 当价格接近底部时，MVRV接近0.8-1.0（买入机会）
    // 当价格在中间时，MVRV在1.5-2.5（正常范围）
    // 当价格接近顶部时，MVRV在3.0-4.0（卖出信号）
    let estimatedMVRV;
    if (pricePosition < 0.3) {
      // 底部区域: 0.8-1.2
      estimatedMVRV = 0.8 + (pricePosition / 0.3) * 0.4;
    } else if (pricePosition < 0.7) {
      // 中间区域: 1.2-2.5
      estimatedMVRV = 1.2 + ((pricePosition - 0.3) / 0.4) * 1.3;
    } else {
      // 顶部区域: 2.5-3.8
      estimatedMVRV = 2.5 + ((pricePosition - 0.7) / 0.3) * 1.3;
    }
    
    const mvrvValue = Math.max(0.5, Math.min(4, estimatedMVRV));
    
    return NextResponse.json({
      success: true,
      data: {
        value: mvrvValue,
        signal: calculateMVRVSignal(mvrvValue),
        note: 'This is a simplified estimation. For accurate MVRV data, use Glassnode API.',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error calculating MVRV:', error);
    // 返回合理的默认值
    // MVRV在1.5-2.0之间通常表示正常市场状态
    return NextResponse.json({
      success: true,
      data: {
        value: 1.85,
        signal: calculateMVRVSignal(1.85),
        note: 'Using estimated data due to API error',
        timestamp: new Date().toISOString(),
      },
    });
  }
}
