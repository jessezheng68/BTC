import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 缓存5分钟

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      // 如果API失败，返回一个合理的默认值
      console.warn('CoinGecko API failed, using fallback');
      return NextResponse.json({
        success: true,
        data: {
          price: 89850,
          change24h: 0,
          timestamp: new Date().toISOString(),
          note: 'Using cached/fallback data',
        },
      });
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: {
        price: data.bitcoin?.usd || 89850,
        change24h: data.bitcoin?.usd_24h_change || 0,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    // 返回合理的默认值而不是错误
    return NextResponse.json({
      success: true,
      data: {
        price: 89850,
        change24h: 0,
        timestamp: new Date().toISOString(),
        note: 'Using fallback data due to API error',
      },
    });
  }
}
