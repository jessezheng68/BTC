// API端点
export const API_ENDPOINTS = {
  FEAR_GREED: 'https://api.alternative.me/fng/',
  COINGECKO_BTC: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
  COINGECKO_HISTORY: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
};

// 指标配置
export const INDICATORS = {
  fearGreed: {
    name: 'Fear & Greed Index',
    nameCn: '恐慌与贪婪指数',
    description: '市场情绪指标，衡量投资者的恐慌和贪婪程度',
    link: 'https://alternative.me/crypto/fear-and-greed-index/',
  },
  ahr999: {
    name: 'AHR999',
    nameCn: 'AHR999 囤币指标',
    description: '长期定投参考指标，适合DCA投资者',
    link: 'https://www.coinglass.com/pro/i/ahr999',
  },
  nupl: {
    name: 'NUPL',
    nameCn: '未实现净盈亏',
    description: '衡量市场整体盈亏状态的链上指标',
    link: 'https://www.bitcoinmagazinepro.com/charts/relative-unrealized-profit--loss/',
  },
  lthSupply: {
    name: 'Long-Term Holder Supply',
    nameCn: '长期持有者供应',
    description: '聪明钱行为指标，观察长期持有者的动向',
    link: 'https://www.bitcoinmagazinepro.com/charts/long-term-holder-supply/',
  },
  mvrv: {
    name: 'MVRV Ratio',
    nameCn: 'MVRV比率',
    description: '市值与实现市值比率，衡量市场估值水平',
    link: 'https://www.bitcoinmagazinepro.com/charts/mvrv/',
  },
  ma2y: {
    name: '2-Year MA Multiplier',
    nameCn: '2年移动平均乘数',
    description: '长期趋势参考指标',
    link: 'https://www.bitcoinmagazinepro.com/charts/bitcoin-investor-tool/',
  },
};

// 综合评分权重
export const INDICATOR_WEIGHTS = {
  fearGreed: 0.2,
  ahr999: 0.15,
  nupl: 0.2,
  lthSupply: 0.15,
  mvrv: 0.15,
  ma2y: 0.15,
};

// 信号规则说明
export const SIGNAL_RULES = {
  fearGreed: {
    strongBuy: '< 25 (极度恐慌)',
    buy: '25-45 (恐慌)',
    neutral: '45-55 (中性)',
    sell: '55-75 (贪婪)',
    strongSell: '> 75 (极度贪婪)',
  },
  ahr999: {
    strongBuy: '< 0.45 (抄底区间)',
    buy: '0.45-1.2 (定投区间)',
    neutral: '> 1.2 (观望)',
  },
  nupl: {
    strongBuy: '< 0% (投降期)',
    buy: '0-25% (希望期)',
    neutral: '25-50% (乐观期)',
    sell: '50-75% (兴奋期)',
    strongSell: '> 75% (欣快期)',
  },
  lthSupply: {
    buy: 'Accumulating (聪明钱买入)',
    sell: 'Distributing (聪明钱卖出)',
  },
  mvrv: {
    strongBuy: '< 1 (极度低估)',
    neutral: '1-2.4 (正常区间)',
    sell: '2.4-3.5 (高估)',
    strongSell: '> 3.5 (极度高估)',
  },
  ma2y: {
    strongBuy: '< 0.5 (底部区域)',
    neutral: '0.5-5 (正常区间)',
    strongSell: '> 5 (顶部区域)',
  },
};

// 指标原理说明
export const INDICATOR_PRINCIPLES = {
  fearGreed: 'Fear & Greed Index 通过分析市场波动性、交易量、社交媒体情绪、比特币市场占比等多个维度，综合计算出0-100的情绪指数。指数越低表示市场越恐慌，往往是买入机会；指数越高表示市场越贪婪，可能面临回调风险。',
  ahr999: 'AHR999 由中国比特币社区知名人士 ahr999 提出，通过比较当前价格与200日均价、拟合价格的关系，判断当前是否适合囤币。该指标特别适合长期定投（DCA）投资者作为买入参考。',
  nupl: 'NUPL (Net Unrealized Profit/Loss) 是链上指标，计算所有比特币的未实现盈亏比例。当市场整体处于亏损状态时，往往是买入机会；当市场整体盈利过高时，可能面临获利回吐压力。',
  lthSupply: '长期持有者（持币超过155天）的供应变化反映了"聪明钱"的行为。当长期持有者增持（accumulating）时，通常是看涨信号；当他们分发（distributing）时，可能预示着价格见顶。',
  mvrv: 'MVRV Ratio 是市值（Market Value）与实现市值（Realized Value）的比率。实现市值是所有比特币按最后一次链上移动时的价格计算的总值。MVRV < 1 意味着市场整体处于亏损状态，历史上是极佳的买入机会。',
  ma2y: '2年移动平均乘数通过比较当前价格与2年移动平均价格的倍数关系，判断市场所处周期位置。历史数据表明，当价格远低于2年均线时是买入机会，远高于时是卖出时机。',
};
