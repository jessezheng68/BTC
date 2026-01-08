import { NextResponse } from 'next/server';
import { calculateMA2YSignal, calculateMovingAverage } from '@/lib/calculations';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  try {
    // 获取当前价格
    const priceResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    const priceData = await priceResponse.json();
    const currentPrice = priceData.bitcoin?.usd || 89850;

    // 获取730日（2年）历史价格数据
    const historyResponse = await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=730&interval=daily',
      { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );
    const historyData = await historyResponse.json();
    
    // 检查数据是否存在
    if (!historyData.prices || !Array.isArray(historyData.prices)) {
      throw new Error('Invalid history data');
    }
    
    const prices = historyData.prices.map((p: [number, number]) => p[1]);
    const ma2y = calculateMovingAverage(prices);

    // 计算倍数
    const multiplier = currentPrice / ma2y;
    
    return NextResponse.json({
      success: true,
      data: {
        value: multiplier,
        signal: calculateMA2YSignal(multiplier),
        currentPrice,
        ma2y,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error calculating 2Y MA:', error);
    // 返回合理的默认值
    const defaultPrice = 89850;
    const defaultMA2Y = 60000;
    const multiplier = defaultPrice / defaultMA2Y;
    
    return NextResponse.json({
      success: true,
      data: {
        value: multiplier,
        signal: calculateMA2YSignal(multiplier),
        currentPrice: defaultPrice,
        ma2y: defaultMA2Y,
        timestamp: new Date().toISOString(),
        note: 'Using fallback data due to API error',
      },
    });
  }
}
