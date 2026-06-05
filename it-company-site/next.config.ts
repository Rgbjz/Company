import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// ЯВНО указываем путь к твоему request.ts
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Добавляем эти пакеты для транспиляции. 
  // Это объединит все копии Three.js в одну и уберет конфликт.
  transpilePackages: ['three', '@splinetool/react-spline'],
  
  /* другие опции если есть */
};

export default withNextIntl(nextConfig);