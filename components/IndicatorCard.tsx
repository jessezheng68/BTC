'use client';

import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { SignalType } from '@/lib/types';

interface IndicatorCardProps {
  name: string;
  nameCn: string;
  description: string;
  value: string | number;
  signal: SignalType;
  link?: string;
  timestamp: Date;
  signalRules?: React.ReactNode;
  principle?: string;
}

export function IndicatorCard({
  name,
  nameCn,
  description,
  value,
  signal,
  link,
  timestamp,
  signalRules,
  principle,
}: IndicatorCardProps) {
  const [showRules, setShowRules] = useState(false);
  const [showPrinciple, setShowPrinciple] = useState(false);

  // 根据信号类型返回样式
  const getSignalStyle = (signal: SignalType) => {
    switch (signal) {
      case 'strong_buy':
        return {
          label: 'Strong Buy',
          labelCn: '强烈买入',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
        };
      case 'buy':
        return {
          label: 'Buy Signal',
          labelCn: '买入信号',
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
        };
      case 'neutral':
        return {
          label: 'Neutral',
          labelCn: '中性',
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
        };
      case 'sell':
        return {
          label: 'Sell Signal',
          labelCn: '卖出信号',
          color: 'text-orange-500',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
        };
      case 'strong_sell':
        return {
          label: 'Strong Sell',
          labelCn: '强烈卖出',
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
        };
    }
  };

  const signalStyle = getSignalStyle(signal);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="card p-6 space-y-4">
      {/* 标题和链接 */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">{nameCn}</h3>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-xs text-secondary mt-1">{description}</p>
        </div>
      </div>

      {/* 数值和信号 */}
      <div className="space-y-3">
        <div className="text-4xl font-bold">{value}</div>
        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${signalStyle.bg} ${signalStyle.color} ${signalStyle.border} border`}>
          {signalStyle.labelCn}
        </div>
      </div>

      {/* 可展开的信号规则和指标原理 */}
      <div className="space-y-2 pt-2 border-t border-border">
        {signalRules && (
          <div>
            <button
              onClick={() => setShowRules(!showRules)}
              className="flex items-center justify-between w-full text-sm font-medium text-secondary hover:text-foreground transition-colors"
            >
              <span>信号规则</span>
              {showRules ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showRules && (
              <div className="mt-2 text-sm text-secondary space-y-1 p-3 bg-muted rounded-lg">
                {signalRules}
              </div>
            )}
          </div>
        )}

        {principle && (
          <div>
            <button
              onClick={() => setShowPrinciple(!showPrinciple)}
              className="flex items-center justify-between w-full text-sm font-medium text-secondary hover:text-foreground transition-colors"
            >
              <span>指标原理</span>
              {showPrinciple ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showPrinciple && (
              <div className="mt-2 text-sm text-secondary leading-relaxed p-3 bg-muted rounded-lg">
                {principle}
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-secondary pt-2">{formatTime(timestamp)}</p>
      </div>
    </div>
  );
}
