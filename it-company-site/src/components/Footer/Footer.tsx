'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Mail, Send, Globe, ArrowUpRight } from 'lucide-react';

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <span
    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
      bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 text-gray-400 light:text-zinc-600
      hover:bg-white light:hover:bg-zinc-900 hover:text-black hover:border-white light:hover:border-zinc-900 transition-all duration-300"
  >
    {children}
  </span>
);

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navigation');
  const pathname = usePathname();

  const activeLang = pathname ? pathname.split('/')[1] || 'uk' : 'uk';
  const year = new Date().getFullYear();

  const navLinks = [
    { key: 'home', href: `/${activeLang}` },
    { key: 'services', href: `/${activeLang}#services` },
    { key: 'portfolio', href: `/${activeLang}#portfolio` },
    { key: 'team', href: `/${activeLang}#team` },
    { key: 'contact', href: `/${activeLang}#contact` },
  ];

  const services = ['web', 'design', 'seo', 'blockchain'] as const;

  return (
    <footer className="relative w-full bg-black light:bg-white border-t border-white/10 light:border-black/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-16 sm:pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* БРЕНД */}
          <div className="col-span-2 lg:col-span-5">
            <Link
              href={`/${activeLang}`}
              style={{ fontFamily: 'var(--font-script)' }}
              className="inline-block text-4xl uppercase italic tracking-tight pr-[6px] pb-0 border-b-4 border-white light:border-black bg-gradient-to-r from-[#d4ad77] via-[#9a6a3c] to-[#ececec] light:to-black bg-clip-text text-transparent"
            >
              Byte my app
            </Link>
            <p className="text-gray-400 light:text-zinc-600 text-sm sm:text-base leading-relaxed max-w-sm mt-5">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-3 mt-7">
              <SocialIcon>
                <Mail className="w-4 h-4" strokeWidth={1.75} />
              </SocialIcon>
              <SocialIcon>
                <Send className="w-4 h-4" strokeWidth={1.75} />
              </SocialIcon>
              <SocialIcon>
                <Globe className="w-4 h-4" strokeWidth={1.75} />
              </SocialIcon>
            </div>
          </div>

          {/* НАВИГАЦИЯ */}
          <div className="lg:col-span-3">
            <h4 className="text-white light:text-zinc-900 font-semibold text-sm uppercase tracking-wider mb-5">
              {t('navTitle')}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 light:text-zinc-600 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {nav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* УСЛУГИ */}
          <div className="lg:col-span-2">
            <h4 className="text-white light:text-zinc-900 font-semibold text-sm uppercase tracking-wider mb-5">
              {t('servicesTitle')}
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href={`/${activeLang}#services`}
                    className="text-gray-400 light:text-zinc-600 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {t(`services.${s}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* КОНТАКТЫ */}
          <div className="lg:col-span-2">
            <h4 className="text-white light:text-zinc-900 font-semibold text-sm uppercase tracking-wider mb-5">
              {t('contactTitle')}
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${t('email')}`}
                  className="group inline-flex items-center gap-1.5 text-gray-400 light:text-zinc-600 hover:text-white transition-colors duration-300"
                >
                  {t('email')}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </li>
              <li className="text-gray-400 light:text-zinc-600">{t('location')}</li>
            </ul>
          </div>
        </div>

        {/* НИЖНЯЯ ПОЛОСА */}
        <div className="mt-14 pt-6 border-t border-white/10 light:border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 light:text-zinc-500 text-xs sm:text-sm text-center sm:text-left">
            © {year} Byte my app. {t('rights')}
          </p>
          <p className="text-gray-600 text-xs">{t('madeWith')}</p>
        </div>
      </div>

      {/* ОГРОМНЫЙ ВОДЯНОЙ ЗНАК-БРЕНД */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-6 sm:-bottom-10 left-0 w-full text-center font-black tracking-tighter leading-none text-white/[0.03] light:text-black/[0.04] text-[22vw]"
      >
        Byte my app
      </div>
    </footer>
  );
}
