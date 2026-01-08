import { NextResponse } from 'next/server';
import {
  calculateAHR999,
  calculateBitcoinFittedPrice,
  getDaysSinceGenesis,
  calculateMovingAverage,
  calculateAHR999Signal,
} from '@/lib/calculations';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

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

    // 获取200日历史价格数据
    const historyResponse = await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200&interval=daily',
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
    const ma200 = calculateMovingAverage(prices);

    // 计算拟合价格
    const daysSinceGenesis = getDaysSinceGenesis();
    const fittedPrice = calculateBitcoinFittedPrice(daysSinceGenesis);

    // 计算AHR999
    const ahr999Value = calculateAHR999(currentPrice, ma200, fittedPrice);
    
    return NextResponse.json({
      success: true,
      data: {
        value: ahr999Value,
        signal: calculateAHR999Signal(ahr999Value),
        currentPrice,
        ma200,
        fittedPrice,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error calculating AHR999:', error);
    // 返回合理的默认值
    const defaultPrice = 89850;
    const defaultMA200 = 75000;
    const daysSinceGenesis = getDaysSinceGenesis();
    const fittedPrice = calculateBitcoinFittedPrice(daysSinceGenesis);
    const ahr999Value = calculateAHR999(defaultPrice, defaultMA200, fittedPrice);
    
    return NextResponse.json({
      success: true,
      data: {
        value: ahr999Value,
        signal: calculateAHR999Signal(ahr999Value),
        currentPrice: defaultPrice,
        ma200: defaultMA200,
        fittedPrice,
        timestamp: new Date().toISOString(),
        note: 'Using fallback data due to API error',
      },
    });
  }
}
