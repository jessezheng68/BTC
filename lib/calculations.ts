import type { SignalType } from './types';

// 根据Fear & Greed指数计算信号
export function calculateFearGreedSignal(value: number): SignalType {
  if (value < 25) return 'strong_buy';
  if (value < 45) return 'buy';
  if (value < 55) return 'neutral';
  if (value < 75) return 'sell';
  return 'strong_sell';
}

// 根据AHR999计算信号
export function calculateAHR999Signal(value: number): SignalType {
  if (value < 0.45) return 'strong_buy';
  if (value < 1.2) return 'buy';
  return 'neutral';
}

// 根据NUPL计算信号
export function calculateNUPLSignal(value: number): SignalType {
  if (value < 0) return 'strong_buy';
  if (value < 25) return 'buy';
  if (value < 50) return 'neutral';
  if (value < 75) return 'sell';
  return 'strong_sell';
}

// 根据MVRV计算信号
export function calculateMVRVSignal(value: number): SignalType {
  if (value < 1) return 'strong_buy';
  if (value < 2.4) return 'neutral';
  if (value < 3.5) return 'sell';
  return 'strong_sell';
}

// 根据2年MA计算信号
export function calculateMA2YSignal(value: number): SignalType {
  if (value < 0.5) return 'strong_buy';
  if (value < 5) return 'neutral';
  return 'strong_sell';
}

// 计算AHR999指标
// 公式: (当前价格 / 200日均价 / 2) + (当前价格 / 拟合价格)
export function calculateAHR999(
  currentPrice: number,
  ma200: number,
  fittedPrice: number
): number {
  const part1 = currentPrice / ma200 / 2;
  const part2 = currentPrice / fittedPrice;
  return part1 + part2;
}

// 计算比特币拟合价格（简化版）
// AHR999的拟合价格基于长期对数回归模型
export function calculateBitcoinFittedPrice(daysSinceGenesis: number): number {
  // 使用简化的拟合公式
  // 基于历史数据的对数回归: price = exp(a * ln(days) + b)
  
  // 这些参数是根据比特币历史价格数据拟合的近似值
  // 需要定期根据最新数据校准
  const a = 5.84;
  const b = -17.01;
  
  // 使用对数模型而不是幂律模型
  const lnDays = Math.log(daysSinceGenesis);
  const lnPrice = a * lnDays + b;
  
  // 返回拟合价格
  const fittedPrice = Math.exp(lnPrice);
  
  // 确保结果在合理范围内 (1000-200000)
  return Math.max(1000, Math.min(200000, fittedPrice));
}

// 获取比特币创世以来的天数
export function getDaysSinceGenesis(): number {
  const genesisDate = new Date('2009-01-03');
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - genesisDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// 计算移动平均
export function calculateMovingAverage(prices: number[]): number {
  if (prices.length === 0) return 0;
  const sum = prices.reduce((acc, price) => acc + price, 0);
  return sum / prices.length;
}

// 计算综合评分 (0-100)
// 分数越低越适合买入，越高越适合卖出
export function calculateCompositeScore(indicators: {
  fearGreed: number; // 0-100
  ahr999: number; // 通常 0-2
  nupl: number; // -100 到 100
  mvrv: number; // 通常 0.5-4
  ma2y: number; // 通常 0.5-10
  lthTrend: 'accumulating' | 'distributing';
}): number {
  // 将各个指标标准化到0-100，分数越低表示越适合买入
  
  // Fear & Greed: 反转，因为低值表示恐慌（买入机会）
  const fearGreedScore = 100 - indicators.fearGreed;
  
  // AHR999: <0.45 极佳, 0.45-1.2 好, >1.2 一般
  let ahr999Score: number;
  if (indicators.ahr999 < 0.45) {
    ahr999Score = 10; // 极佳买入机会
  } else if (indicators.ahr999 < 1.2) {
    ahr999Score = 30 + ((indicators.ahr999 - 0.45) / 0.75) * 30; // 30-60
  } else {
    ahr999Score = Math.min(60 + ((indicators.ahr999 - 1.2) / 1) * 40, 100); // 60-100
  }
  
  // NUPL: 标准化到0-100，负值是买入机会
  const nuplScore = Math.max(0, Math.min(100, indicators.nupl + 50));
  
  // MVRV: <1 极佳, 1-2.4 正常, >2.4 高估
  let mvrvScore: number;
  if (indicators.mvrv < 1) {
    mvrvScore = indicators.mvrv * 20; // 0-20
  } else if (indicators.mvrv < 2.4) {
    mvrvScore = 20 + ((indicators.mvrv - 1) / 1.4) * 40; // 20-60
  } else {
    mvrvScore = Math.min(60 + ((indicators.mvrv - 2.4) / 1.6) * 40, 100); // 60-100
  }
  
  // 2Y MA: <0.5 极佳, 0.5-5 正常, >5 高估
  let ma2yScore: number;
  if (indicators.ma2y < 0.5) {
    ma2yScore = indicators.ma2y * 40; // 0-20
  } else if (indicators.ma2y < 5) {
    ma2yScore = 20 + ((indicators.ma2y - 0.5) / 4.5) * 60; // 20-80
  } else {
    ma2yScore = Math.min(80 + ((indicators.ma2y - 5) / 5) * 20, 100); // 80-100
  }
  
  // LTH Supply: accumulating = 好 (20), distributing = 差 (80)
  const lthScore = indicators.lthTrend === 'accumulating' ? 20 : 80;
  
  // 加权平均（权重可以调整）
  const weights = {
    fearGreed: 0.2,
    ahr999: 0.15,
    nupl: 0.2,
    mvrv: 0.15,
    ma2y: 0.15,
    lth: 0.15,
  };
  
  const compositeScore = 
    fearGreedScore * weights.fearGreed +
    ahr999Score * weights.ahr999 +
    nuplScore * weights.nupl +
    mvrvScore * weights.mvrv +
    ma2yScore * weights.ma2y +
    lthScore * weights.lth;
  
  // 反转分数，使其符合我们的逻辑（0-20=买入, 80-100=卖出）
  return Math.round(100 - compositeScore);
}

// 根据综合评分获取投资建议
export function getRecommendation(score: number): '全力买入' | '定投' | '观望' | '减仓' | '极度卖出' {
  if (score <= 20) return '全力买入';
  if (score <= 40) return '定投';
  if (score <= 60) return '观望';
  if (score <= 80) return '减仓';
  return '极度卖出';
}
