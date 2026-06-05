'use client'; 

import { useTranslations } from 'next-intl';
import Hero3DObject from '@/src/components/Hero3DObject/Hero3DObject';

export default function Hero() {
  const t = useTranslations('Hero');

  const triggerGalaxySpeed = (isHovered: boolean) => {
    window.dispatchEvent(
      new CustomEvent('galaxy-speed', { detail: { isHovered } })
    );
  };

  return (
    <section className="relative w-full h-[calc(100vh-5rem)] overflow-hidden bg-transparent">
      
      {/* ОБЩИЙ КОНТЕЙНЕР ДЛЯ ВСЕХ КАПЕЛЬ */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
        <div className="relative w-full lg:w-[70%] h-full">
          
          {/* 1. ГЛАВНАЯ КАПЛЯ */}
          <div className="absolute inset-0 z-10 flex items-center justify-center translate-x-[15%]">
            {/* ИЗМЕНИЛ ЗДЕСЬ */}
            <div className="w-full h-full pointer-events-none">
              <Hero3DObject />
            </div>
          </div>

          

        </div>
      </div>

      {/* --- ТЕКСТОВЫЙ КОНТЕНТ (Слева) --- */}
      <div className="relative z-20 w-full h-full flex items-center pointer-events-none">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl flex flex-col gap-8 pointer-events-auto">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] tracking-tighter uppercase">
              {t('title1')} <br />
              <span className="text-gray-400">{t('title2')}</span> <br />
              <span className="text-gray-600/40">{t('title3')}</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg font-medium leading-relaxed mt-4">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-8">
              <button 
                onMouseEnter={() => triggerGalaxySpeed(true)}
                onMouseLeave={() => triggerGalaxySpeed(false)}
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-2xl pointer-events-auto"
              >
                {t('btnPrimary')} →
              </button>
              
              <button 
                onMouseEnter={() => triggerGalaxySpeed(true)}
                onMouseLeave={() => triggerGalaxySpeed(false)}
                className="border border-gray-800 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors pointer-events-auto"
              >
                {t('btnSecondary')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}