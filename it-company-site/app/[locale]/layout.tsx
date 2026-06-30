import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Anton } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Background3D from '@/src/components/Background3D/Background3D';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Дисплейный шрифт для заголовков (современный, с кириллицей)
const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
});

// Жирный «зауженный» шрифт для логотипа в стиле Nike
const anton = Anton({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const SEO: Record<string, { title: string; description: string }> = {
  uk: {
    title: "IT Компанія — інноваційні рішення та розробка",
    description:
      "Розробка веб-сайтів, мобільних застосунків, Web3 та блокчейн-рішень. UI/UX дизайн, frontend, backend, DevOps та SEO.",
  },
  en: {
    title: "IT Company — innovative solutions & development",
    description:
      "Web & mobile development, Web3 and blockchain solutions. UI/UX design, frontend, backend, DevOps and SEO.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = SEO[locale] ?? SEO.uk;

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uk: "/uk",
        en: "/en",
        "x-default": "/uk",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "IT Company",
      title: seo.title,
      description: seo.description,
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${anton.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-[var(--background)] overflow-x-hidden">
        {/* Ставим тему до первой отрисовки, чтобы не было «мигания» */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;if(t==='light'||(!t&&m)){document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
        <Background3D />
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Хедер должен быть внутри провайдера, но над основным контентом */}
          <Header />
          
          <div className="relative z-10 flex flex-col min-h-screen pt-20">
            {children}
          </div>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}