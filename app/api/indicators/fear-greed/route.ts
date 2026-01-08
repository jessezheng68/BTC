import { NextResponse } from 'next/server';
import { calculateFearGreedSignal } from '@/lib/calculations';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export async function GET() {
  try {
    const response = await fetch('https://api.alternative.me/fng/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Fear & Greed Index');
    }

    const data = await response.json();
    const fngData = data.data[0];
    const value = parseInt(fngData.value);
    
    return NextResponse.json({
      success: true,
      data: {
        value,
        valueClassification: fngData.value_classification,
        signal: calculateFearGreedSignal(value),
        timestamp: new Date(parseInt(fngData.timestamp) * 1000).toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Fear & Greed Index',
      },
      { status: 500 }
    );
  }
}
