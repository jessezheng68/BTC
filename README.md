# 比特币抄底指标实时仪表盘

一个现代化的比特币价格分析仪表盘，实时监控多维度指标，帮助投资者判断买卖时机。

## 功能特性

- 📊 **综合评分系统** - 基于6个核心指标的加权评分（0-100分）
- 🎯 **6大核心指标**
  - Fear & Greed Index（恐慌与贪婪指数）
  - AHR999 囤币指标
  - NUPL（未实现净盈亏）
  - MVRV Ratio（市值与实现市值比率）
  - 2-Year MA Multiplier（2年移动平均乘数）
  - Long-Term Holder Supply（长期持有者供应）
- 🌓 **明暗主题切换** - 优雅的深色/浅色模式
- 🌍 **多语言支持** - 中文/English
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 📥 **数据导出** - 支持CSV和JSON格式
- ⚡ **实时刷新** - 每5分钟自动更新数据
- 🎨 **高级UI设计** - 毛玻璃效果、流畅动画、现代卡片设计

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Hooks + SWR
- **图标**: Lucide React
- **主题**: next-themes
- **数据源**: CoinGecko API, Alternative.me API

## 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

\`\`\`bash
npm run build
npm run start
\`\`\`

## 环境配置

复制 `.env.local.example` 为 `.env.local`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

根据需要修改配置。

## 部署

### Vercel（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. 点击上方按钮或访问 [Vercel](https://vercel.com)
2. 导入此仓库
3. 配置环境变量（如需）
4. 点击部署

### 其他平台

本项目可以部署到任何支持 Next.js 的平台，如：
- Netlify
- Railway
- AWS Amplify
- 自托管服务器

## 指标说明

### 综合评分
- **0-20分**: 深绿色 - 全力买入
- **20-40分**: 绿色 - 定投
- **40-60分**: 黄色 - 观望
- **60-80分**: 橙色 - 减仓
- **80-100分**: 红色 - 极度卖出

### 各指标详情

详见应用内的"指标原理"说明。

## 数据源

- **比特币价格**: CoinGecko API
- **恐慌贪婪指数**: Alternative.me API
- **链上数据**: 简化计算（可升级到 Glassnode 付费 API 获取精确数据）

## 注意事项

⚠️ **免责声明**

本仪表盘仅供参考，不构成投资建议。加密货币市场具有极高风险，请在做出任何投资决策前进行充分的研究和风险评估。

部分链上指标使用简化计算方法，如需精确数据请使用专业 API 服务（如 Glassnode、CryptoQuant）。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 后续优化方向

- [ ] 集成 Glassnode API 获取精确链上数据
- [ ] 添加历史数据图表
- [ ] AI 市场分析功能
- [ ] 用户自定义指标权重
- [ ] 价格提醒功能
- [ ] 更多指标（Rainbow Chart、Pi Cycle 等）

---

Made with ❤️ for Bitcoin investors
