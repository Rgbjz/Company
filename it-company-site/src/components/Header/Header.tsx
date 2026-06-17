'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl'; // <-- Подключили переводы
import { Menu, X } from 'lucide-react'; // <-- Иконки для мобильного меню

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- Состояние мобильного меню

  const pathname = usePathname();
  const t = useTranslations('Navigation'); // <-- Подключили словарь навигации

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокируем прокрутку фона, пока открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const triggerGalaxySpeed = (isHovered: boolean) => {
    window.dispatchEvent(
      new CustomEvent('galaxy-speed', { detail: { isHovered } })
    );
  };

  const segments = pathname ? pathname.split('/') : [];
  const activeLang = segments[1]; 
  
  const isEn = activeLang === 'en';
  const isUk = activeLang === 'uk' || activeLang === 'ua';

  const switchLangPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    
    const locales = ['en', 'uk', 'ua']; 
    const pathSegments = [...segments];
    
    if (locales.includes(pathSegments[1])) {
      pathSegments[1] = newLocale;
      return pathSegments.join('/');
    }
    
    return `/${newLocale}${pathname === '/' ? '' : pathname}`;
  };

  // Массив ссылок, привязанный к словарю
  const navLinks = [
    { key: 'home', href: `/${activeLang}` },
    { key: 'services', href: `/${activeLang}#services` },
    { key: 'portfolio', href: `/${activeLang}#portfolio` },
    { key: 'contact', href: `/${activeLang}#contact` }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-5 bg-black/40 backdrop-blur-md border-b border-white/10' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        
        <Link href={`/${activeLang}`} className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
          LOGOTYPE
        </Link>

        {/* Навигация с переводами */}
        <nav className="hidden md:flex items-center space-x-10 lg:space-x-14">
          {navLinks.map((link) => (
            <Link 
              key={link.key} 
              href={link.href}
              onMouseEnter={() => triggerGalaxySpeed(true)}
              onMouseLeave={() => triggerGalaxySpeed(false)}
              className="text-base lg:text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              {/* Вытягиваем перевод по ключу: home, services, portfolio, contact */}
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-sm">
            <a 
              href={switchLangPath('en')}
              className={`px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all duration-300 ${
                isEn ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </a>
            <a 
              href={switchLangPath('uk')} 
              className={`px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all duration-300 ${
                isUk ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'text-gray-400 hover:text-white'
              }`}
            >
              UA
            </a>
          </div>

          <button
            onMouseEnter={() => triggerGalaxySpeed(true)}
            onMouseLeave={() => triggerGalaxySpeed(false)}
            className="hidden md:inline-block px-8 py-3 lg:px-10 lg:py-3.5 rounded-full bg-white text-black text-base lg:text-lg font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            {t('getStarted')}
          </button>

          {/* Кнопка-гамбургер: только на мобильных */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-sm transition-all active:scale-95 hover:bg-white/10"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* --- МОБИЛЬНОЕ МЕНЮ --- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full px-6 transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="mt-3 flex flex-col bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 rounded-2xl text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}

          <button
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 w-full px-6 py-3.5 rounded-full bg-white text-black text-lg font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {t('getStarted')}
          </button>
        </nav>
      </div>
    </header>
  );
}