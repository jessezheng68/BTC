'use client';

import { AlertTriangle } from 'lucide-react';

interface CompositeScoreProps {
  score: number; // 0-100
  btcPrice: number;
  timestamp: Date;
}

export function CompositeScore({ score, btcPrice, timestamp }: CompositeScoreProps) {
  // 根据分数确定建议
  const getRecommendation = (score: number) => {
    if (score <= 20) return { text: '全力买入', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500' };
    if (score <= 40) return { text: '定投', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-400' };
    if (score <= 60) return { text: '观望', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-400' };
    if (score <= 80) return { text: '减仓', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-400' };
    return { text: '极度卖出', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500' };
  };

  const recommendation = getRecommendation(score);

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="card p-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      {/* 标题 */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">综合评分</h2>
          <p className="text-sm text-secondary">基于所有指标的综合市场评估</p>
        </div>
        <AlertTriangle className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：价格和评分 */}
        <div className="space-y-6">
          {/* BTC价格 */}
          <div>
            <p className="text-sm text-primary font-medium mb-1">BITCOIN PRICE</p>
            <p className="text-4xl font-bold">${btcPrice.toLocaleString()}</p>
            <p className="text-xs text-secondary mt-1">{formatTime(timestamp)}</p>
          </div>

          {/* 当前抄底指数 */}
          <div>
            <p className="text-sm text-secondary mb-2">CURRENT BOTTOM INDEX</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-primary">{score}</span>
              <span className="text-2xl text-secondary">/ 100</span>
            </div>

            {/* 渐变滑块 */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-secondary">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
              <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-green-600 via-yellow-400 to-red-500">
                {/* 当前位置指示器 */}
                <div
                  className="absolute top-0 h-full w-1 bg-white shadow-lg"
                  style={{ left: `${score}%`, transform: 'translateX(-50%)' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-green-600 dark:text-green-400">All-In</span>
                <span className="text-green-500">DCA</span>
                <span className="text-yellow-500">Wait</span>
                <span className="text-orange-500">Reduce</span>
                <span className="text-red-500">Sell</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：建议和说明 */}
        <div className="space-y-6">
          {/* 投资建议 */}
          <div className={`p-6 rounded-lg border-2 ${recommendation.bg}/10 border-${recommendation.bg.split('-')[1]}-500/20`}>
            <h3 className={`text-2xl font-bold mb-2 ${recommendation.color}`}>
              {recommendation.text}
            </h3>
            <p className="text-sm text-secondary">
              {score <= 20 && '市场显示极佳的买入信号，适合全力配置'}
              {score > 20 && score <= 40 && '市场显示买入信号，适合定期定额投资'}
              {score > 40 && score <= 60 && '市场处于中性状态，建议耐心等待'}
              {score > 60 && score <= 80 && '市场显示卖出信号，可考虑逐步减仓'}
              {score > 80 && '市场显示极度卖出信号，建议减少持仓'}
            </p>
          </div>

          {/* 评分说明 */}
          <div>
            <h4 className="font-semibold mb-3">评分说明</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-16 text-secondary">0-20:</div>
                <div className="text-green-600 dark:text-green-400 font-medium">全力买入</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-secondary">20-40:</div>
                <div className="text-green-500 font-medium">定投</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-secondary">40-60:</div>
                <div className="text-yellow-500 font-medium">观望</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-secondary">60-80:</div>
                <div className="text-orange-500 font-medium">减仓</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-secondary">80-100:</div>
                <div className="text-red-500 font-medium">极度卖出</div>
              </div>
            </div>
          </div>

          {/* 更新时间 */}
          <p className="text-xs text-secondary">
            Last Updated: {formatTime(timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}
