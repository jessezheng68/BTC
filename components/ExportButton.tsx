'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

interface ExportButtonProps {
  data: any;
}

export function ExportButton({ data }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const exportCSV = () => {
    const headers = ['指标', '数值', '信号', '时间'];
    const rows = Object.entries(data).map(([key, value]: [string, any]) => {
      return [
        value.name || key,
        value.value,
        value.signal,
        new Date(value.timestamp).toLocaleString('zh-CN'),
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `btc-indicators-${Date.now()}.csv`;
    link.click();
    setIsOpen(false);
  };

  const exportJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `btc-indicators-${Date.now()}.json`;
    link.click();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-primary transition-all"
      >
        <Download className="w-5 h-5" />
        <span className="font-medium">导出报告</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden">
            <button
              onClick={exportCSV}
              className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
            >
              CSV
            </button>
            <button
              onClick={exportJSON}
              className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
            >
              JSON
            </button>
          </div>
        </>
      )}
    </div>
  );
}
