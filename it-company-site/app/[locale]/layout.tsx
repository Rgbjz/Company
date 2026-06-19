import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Background3D from '@/src/components/Background3D/Background3D';
import Header from '@/src/components/Header/Header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Компанія",
  description: "Інноваційні рішення та розробка",
};

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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="relative min-h-screen bg-black overflow-x-hidden">
        <Background3D />
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Хедер должен быть внутри провайдера, но над основным контентом */}
          <Header />
          
          <div className="relative z-10 flex flex-col min-h-screen pt-20">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}