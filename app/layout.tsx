import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "比特币抄底指标实时仪表盘 | Bitcoin Dashboard",
  description: "实时监控比特币价格分析指标，包括恐慌贪婪指数、AHR999、NUPL、MVRV等多维度数据，帮助投资者判断买卖时机",
  keywords: "比特币,BTC,抄底指标,恐慌贪婪指数,AHR999,NUPL,MVRV,加密货币投资",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
