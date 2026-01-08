// 指标信号类型
export type SignalType = 'buy' | 'neutral' | 'sell' | 'strong_buy' | 'strong_sell';

// 指标数据接口
export interface Indicator {
  name: string;
  value: number | string;
  signal: SignalType;
  description: string;
  timestamp: Date;
  link?: string;
}

// 恐慌与贪婪指数
export interface FearGreedData {
  value: number;
  valueClassification: string;
  timestamp: string;
}

// AHR999指标
export interface AHR999Data {
  value: number;
  signal: SignalType;
  timestamp: string;
}

// NUPL指标
export interface NUPLData {
  value: number; // 百分比
  signal: SignalType;
  timestamp: string;
}

// 长期持有者供应
export interface LTHSupplyData {
  trend: 'accumulating' | 'distributing';
  signal: SignalType;
  timestamp: string;
}

// MVRV比率
export interface MVRVData {
  value: number;
  signal: SignalType;
  timestamp: string;
}

// 2年移动平均乘数
export interface MA2YData {
  value: number;
  signal: SignalType;
  timestamp: string;
}

// 综合评分
export interface CompositeScore {
  score: number; // 0-100
  recommendation: '全力买入' | '定投' | '观望' | '减仓' | '极度卖出';
  timestamp: Date;
}

// 所有指标数据
export interface AllIndicators {
  fearGreed: Indicator;
  ahr999: Indicator;
  nupl: Indicator;
  lthSupply: Indicator;
  mvrv: Indicator;
  ma2y: Indicator;
  compositeScore: CompositeScore;
  btcPrice: number;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
