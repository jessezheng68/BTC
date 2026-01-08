'use client';

import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Twitter, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onRefresh?: () => void;
}

export function Navbar({ onRefresh }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo和标题 */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bitcoin: Buy the Bottom and Sell the Top
            </h1>
            <p className="text-sm text-secondary mt-1">
              实时监控链上和社交数据，评估市场阶段和投资时机
            </p>
          </div>

          {/* 右侧控制按钮 */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-all"
            >
              <Twitter className="w-4 h-4" />
              <span className="text-sm font-medium">Follow on X</span>
            </a>

            <LanguageToggle />

            <button
              onClick={onRefresh}
              className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-all duration-200"
              aria-label="刷新数据"
            >
              <RefreshCw className="w-5 h-5 text-foreground" />
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
