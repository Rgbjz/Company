import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// ЯВНО указываем путь к твоему request.ts
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Объединяем все копии Three.js в одну, чтобы убрать конфликт версий.
  transpilePackages: ['three'],

  /* другие опции если есть */
};

export default withNextIntl(nextConfig);