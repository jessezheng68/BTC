'use client';

import { Navbar } from '@/components/Navbar';
import { CompositeScore } from '@/components/CompositeScore';
import { IndicatorCard } from '@/components/IndicatorCard';
import { ExportButton } from '@/components/ExportButton';
import { useIndicators } from '@/hooks/useIndicators';
import { INDICATORS, SIGNAL_RULES, INDICATOR_PRINCIPLES } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { data, isLoading, isError, refresh } = useIndicators();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-secondary">加载数据中...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-500">数据加载失败</p>
          <button
            onClick={() => refresh()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  // 格式化信号规则为JSX
  const formatSignalRules = (rules: any) => {
    return (
      <div className="space-y-1">
        {Object.entries(rules).map(([key, value]) => (
          <div key={key}>{value as string}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar onRefresh={refresh} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* 综合评分卡片 */}
        <CompositeScore
          score={data.compositeScore.score}
          btcPrice={data.btcPrice}
          timestamp={new Date(data.compositeScore.timestamp)}
        />

        {/* 指标网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fear & Greed Index */}
          <IndicatorCard
            name={INDICATORS.fearGreed.name}
            nameCn={INDICATORS.fearGreed.nameCn}
            description={INDICATORS.fearGreed.description}
            value={data.indicators.fearGreed.value}
            signal={data.indicators.fearGreed.signal}
            link={INDICATORS.fearGreed.link}
            timestamp={new Date(data.timestamp)}
            signalRules={formatSignalRules(SIGNAL_RULES.fearGreed)}
            principle={INDICATOR_PRINCIPLES.fearGreed}
          />

          {/* AHR999 */}
          <IndicatorCard
            name={INDICATORS.ahr999.name}
            nameCn={INDICATORS.ahr999.nameCn}
            description={INDICATORS.ahr999.description}
            value={data.indicators.ahr999.value}
            signal={data.indicators.ahr999.signal}
            link={INDICATORS.ahr999.link}
            timestamp={new Date(data.timestamp)}
            signalRules={formatSignalRules(SIGNAL_RULES.ahr999)}
            principle={INDICATOR_PRINCIPLES.ahr999}
          />

          {/* NUPL */}
          <IndicatorCard
            name={INDICATORS.nupl.name}
            nameCn={INDICATORS.nupl.nameCn}
            description={INDICATORS.nupl.description}
            value={`${data.indicators.nupl.value}%`}
            signal={data.indicators.nupl.signal}
            link={INDICATORS.nupl.link}
            timestamp={new Date(data.timestamp)}
            signalRules={formatSignalRules(SIGNAL_RULES.nupl)}
            principle={INDICATOR_PRINCIPLES.nupl}
          />

          {/* MVRV */}
          <IndicatorCard
            name={INDICATORS.mvrv.name}
            nameCn={INDICATORS.mvrv.nameCn}
            description={INDICATORS.mvrv.description}
            value={data.indicators.mvrv.value}
            signal={data.indicators.mvrv.signal}
            link={INDICATORS.mvrv.link}
            timestamp={new Date(data.timestamp)}
            signalRules={formatSignalRules(SIGNAL_RULES.mvrv)}
            principle={INDICATOR_PRINCIPLES.mvrv}
          />

          {/* 2-Year MA */}
          <IndicatorCard
            name={INDICATORS.ma2y.name}
            nameCn={INDICATORS.ma2y.nameCn}
            description={INDICATORS.ma2y.description}
            value={`${data.indicators.ma2y.value}x`}
            signal={data.indicators.ma2y.signal}
            link={INDICATORS.ma2y.link}
            timestamp={new Date(data.timestamp)}
            signalRules={formatSignalRules(SIGNAL_RULES.ma2y)}
            principle={INDICATOR_PRINCIPLES.ma2y}
          />

          {/* Long-Term Holder Supply */}
          <IndicatorCard
            name={INDICATORS.lthSupply.name}
            nameCn={INDICATORS.lthSupply.nameCn}
            description={INDICATORS.lthSupply.description}
            value={data.indicators.lthSupply.trend}
            signal={data.indicators.lthSupply.signal}
            link={INDICATORS.lthSupply.link}
            timestamp={new Date(data.timestamp)}
            signalRules={formatSignalRules(SIGNAL_RULES.lthSupply)}
            principle={INDICATOR_PRINCIPLES.lthSupply}
          />
        </div>

        {/* 导出报告按钮 */}
        <div className="flex justify-center pt-8">
          <ExportButton data={data} />
        </div>

        {/* 免责声明 */}
        <div className="card p-6 text-sm text-secondary">
          <p>
            <strong className="text-foreground">免责声明：</strong>
            本仪表盘仅供参考，不构成投资建议。加密货币市场具有极高风险，请在做出任何投资决策前进行充分的研究和风险评估。部分指标使用简化计算方法，如需精确数据请使用专业API服务。
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-secondary">
          <p>Made with ❤️ for Bitcoin investors | Data sources: CoinGecko, Alternative.me</p>
        </div>
      </footer>
    </div>
  );
}
