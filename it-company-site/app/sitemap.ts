import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const locales = ['uk', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === 'uk' ? 1 : 0.8,
    alternates: {
      languages: {
        uk: `${SITE_URL}/uk`,
        en: `${SITE_URL}/en`,
      },
    },
  }));
}
