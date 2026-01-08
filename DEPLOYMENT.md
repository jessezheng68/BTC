# 部署指南

## 部署到 Vercel（推荐）

Vercel 是 Next.js 的官方托管平台，提供最佳的性能和开发体验。

### 步骤 1：准备

1. 确保你的代码已推送到 GitHub、GitLab 或 Bitbucket
2. 注册 [Vercel](https://vercel.com) 账号（可以使用 GitHub 账号登录）

### 步骤 2：导入项目

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New..." → "Project"
3. 选择你的 Git 仓库
4. Vercel 会自动检测到这是一个 Next.js 项目

### 步骤 3：配置（可选）

**环境变量（如果需要）：**
```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
```

### 步骤 4：部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常 1-2 分钟）
3. 获得一个 `your-app.vercel.app` 域名

### 步骤 5：自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照说明配置 DNS 记录

---

## 部署到其他平台

### Netlify

1. 安装 Netlify CLI: `npm install -g netlify-cli`
2. 构建项目: `npm run build`
3. 部署: `netlify deploy --prod`

### Railway

1. 访问 [Railway](https://railway.app)
2. 从 GitHub 导入项目
3. Railway 会自动部署

### Docker（自托管）

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 生产镜像
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]
```

构建并运行:
```bash
docker build -t btc-dashboard .
docker run -p 3000:3000 btc-dashboard
```

---

## 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 所有指标数据正常加载
- [ ] 主题切换功能正常
- [ ] 响应式设计在移动端正常工作
- [ ] API 请求没有 CORS 错误
- [ ] 导出功能正常
- [ ] 性能指标良好（Lighthouse 评分 > 90）

---

## 性能优化建议

1. **启用 CDN**：Vercel 自动提供全球 CDN
2. **图片优化**：使用 Next.js Image 组件
3. **缓存策略**：API 响应已设置 5 分钟缓存
4. **压缩**：启用 gzip/brotli 压缩（Vercel 默认开启）

---

## 监控和分析

### Vercel Analytics

在 Vercel Dashboard 中启用 Analytics 来监控：
- 页面访问量
- 性能指标
- 用户地理分布

### Google Analytics（可选）

在 `app/layout.tsx` 中添加 GA 脚本：

```tsx
import Script from 'next/script'

// 在 <body> 标签中添加
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR-ID');
  `}
</Script>
```

---

## 故障排查

### 构建失败

- 确保所有依赖都在 `package.json` 中
- 检查 Node.js 版本（需要 18+）
- 运行 `npm run build` 本地测试

### API 错误

- 检查环境变量是否正确设置
- 确认 API 端点可访问
- 查看服务器日志

### 性能问题

- 启用 Next.js 图片优化
- 检查 API 响应时间
- 使用 Vercel Analytics 分析瓶颈

---

## 更新部署

Git 推送自动触发部署：

```bash
git add .
git commit -m "Update features"
git push origin main
```

Vercel 会自动检测更改并重新部署。

---

## 成本估算

**Vercel（推荐）**
- Hobby 计划：免费
  - 100GB 带宽/月
  - 无限部署
  - 自动 HTTPS
  - 全球 CDN

**Pro 计划**：$20/月
- 1TB 带宽
- 更多团队功能
- 高级分析

**注意**：免费计划足以支持中小型项目。

---

## 联系支持

如有部署问题：
1. 检查 [Vercel 文档](https://vercel.com/docs)
2. 查看 [Next.js 文档](https://nextjs.org/docs)
3. 在 GitHub Issues 中提问
