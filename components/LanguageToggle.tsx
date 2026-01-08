'use client';

import { useState } from 'react';

export function LanguageToggle() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  return (
    <div className="flex gap-2 bg-card border border-border rounded-lg p-1">
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'zh'
            ? 'bg-primary text-white'
            : 'text-foreground hover:bg-muted'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-primary text-white'
            : 'text-foreground hover:bg-muted'
        }`}
      >
        English
      </button>
    </div>
  );
}
