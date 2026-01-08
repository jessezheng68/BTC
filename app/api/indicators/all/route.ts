import { NextResponse } from 'next/server';
import { calculateCompositeScore, getRecommendation } from '@/lib/calculations';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    // 获取当前请求的 URL，自动适配部署环境
    const protocol = process.env.VERCEL_URL ? 'https' : 'http';
    const host = request.headers.get('host') || process.env.VERCEL_URL || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // 并行获取所有指标数据
    const [
      btcPriceRes,
      fearGreedRes,
      ahr999Res,
      nuplRes,
      mvrvRes,
      ma2yRes,
      lthRes,
    ] = await Promise.all([
      fetch(`${baseUrl}/api/indicators/btc-price`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/indicators/fear-greed`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/indicators/ahr999`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/indicators/nupl`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/indicators/mvrv`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/indicators/ma-2y`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/indicators/lth-supply`, { cache: 'no-store' }),
    ]);

    const btcPrice = await btcPriceRes.json();
    const fearGreed = await fearGreedRes.json();
    const ahr999 = await ahr999Res.json();
    const nupl = await nuplRes.json();
    const mvrv = await mvrvRes.json();
    const ma2y = await ma2yRes.json();
    const lth = await lthRes.json();

    // 检查是否所有API都成功
    if (!btcPrice.success || !fearGreed.success || !ahr999.success) {
      throw new Error('Failed to fetch some indicators');
    }

    // 计算综合评分
    const compositeScore = calculateCompositeScore({
      fearGreed: fearGreed.data.value,
      ahr999: ahr999.data.value,
      nupl: nupl.data?.value || 0,
      mvrv: mvrv.data?.value || 1.5,
      ma2y: ma2y.data?.value || 1,
      lthTrend: lth.data?.trend || 'accumulating',
    });

    return NextResponse.json({
      success: true,
      data: {
        btcPrice: btcPrice.data.price,
        compositeScore: {
          score: compositeScore,
          recommendation: getRecommendation(compositeScore),
          timestamp: new Date(),
        },
        indicators: {
          fearGreed: {
            value: fearGreed.data.value,
            signal: fearGreed.data.signal,
            classification: fearGreed.data.valueClassification,
          },
          ahr999: {
            value: ahr999.data.value.toFixed(4),
            signal: ahr999.data.signal,
          },
          nupl: {
            value: nupl.data?.value?.toFixed(2) || 'N/A',
            signal: nupl.data?.signal || 'neutral',
          },
          mvrv: {
            value: mvrv.data?.value?.toFixed(2) || 'N/A',
            signal: mvrv.data?.signal || 'neutral',
          },
          ma2y: {
            value: ma2y.data?.value?.toFixed(2) || 'N/A',
            signal: ma2y.data?.signal || 'neutral',
          },
          lthSupply: {
            trend: lth.data?.trend || 'accumulating',
            signal: lth.data?.signal || 'buy',
          },
        },
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Error fetching all indicators:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch indicators data',
      },
      { status: 500 }
    );
  }
}
