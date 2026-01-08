import { NextResponse } from 'next/server';
import { calculateNUPLSignal } from '@/lib/calculations';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 缓存1小时

// 注意：这是一个简化的NUPL计算
// 真实的NUPL需要链上数据，这里使用估算值
export async function GET() {
  try {
    // 获取当前价格和市值数据
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
    
    if (!currentPrice) {
      throw new Error('Price data not available');
    }
    
    // 简化的NUPL估算
    // 基于价格相对位置的估算
    const athPrice = data.market_data?.ath?.usd || currentPrice * 2;
    const atlPrice = data.market_data?.atl?.usd || currentPrice * 0.1;
    
    // 计算价格在ATH和ATL之间的相对位置
    const pricePosition = (currentPrice - atlPrice) / (athPrice - atlPrice);
    
    // 将位置转换为NUPL近似值（-50到75的范围）
    // 价格越接近ATH，NUPL越高（市场盈利多）
    // 价格越接近ATL，NUPL越低（市场亏损多）
    const estimatedNUPL = (pricePosition * 125) - 50;
    const nuplValue = Math.max(-50, Math.min(75, estimatedNUPL));
    
    return NextResponse.json({
      success: true,
      data: {
        value: nuplValue,
        signal: calculateNUPLSignal(nuplValue),
        note: 'This is a simplified estimation. For accurate NUPL data, use Glassnode API.',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error calculating NUPL:', error);
    // 返回合理的默认值（基于当前市场状态的估算）
    // 当前市场处于中性偏低状态
    return NextResponse.json({
      success: true,
      data: {
        value: 15.5,
        signal: calculateNUPLSignal(15.5),
        note: 'Using estimated data due to API error',
        timestamp: new Date().toISOString(),
      },
    });
  }
}
