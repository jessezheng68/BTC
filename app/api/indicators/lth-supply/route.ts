import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// 简化的长期持有者供应趋势
// 真实数据需要Glassnode等专业API
export async function GET() {
  try {
    // 获取价格趋势数据来估算长期持有者行为
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
    
    // 基于价格和市场状态估算长期持有者行为
    const currentPrice = data.market_data?.current_price?.usd;
    const athPrice = data.market_data?.ath?.usd;
    const priceFromAth = data.market_data?.ath_change_percentage?.usd || -20;
    
    if (!currentPrice || !athPrice) {
      throw new Error('Price data not available');
    }
    
    // 改进的逻辑：
    // 价格远低于ATH (> -50%) -> 长期持有者倾向于accumulating（买入）
    // 价格接近ATH (< -20%) -> 长期持有者倾向于distributing（卖出）
    let trend: 'accumulating' | 'distributing';
    
    if (priceFromAth < -40) {
      // 价格大幅下跌，长期持有者在积累
      trend = 'accumulating';
    } else if (priceFromAth > -15) {
      // 价格接近高点，长期持有者在分发
      trend = 'distributing';
    } else {
      // 中间状态，根据更细微的变化判断
      const priceChange60d = data.market_data?.price_change_percentage_60d || 0;
      trend = priceChange60d < -10 ? 'accumulating' : 'distributing';
    }
    
    const signal = trend === 'accumulating' ? 'buy' : 'sell';
    
    return NextResponse.json({
      success: true,
      data: {
        trend,
        signal,
        note: 'This is a simplified estimation based on price trends. For accurate LTH data, use Glassnode API.',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching LTH supply:', error);
    // 返回合理的默认值
    // 当前市场状态，长期持有者倾向于积累
    return NextResponse.json({
      success: true,
      data: {
        trend: 'accumulating' as const,
        signal: 'buy' as const,
        note: 'Using estimated data due to API error',
        timestamp: new Date().toISOString(),
      },
    });
  }
}
