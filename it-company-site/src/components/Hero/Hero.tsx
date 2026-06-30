'use client'; 

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  const triggerGalaxySpeed = (isHovered: boolean) => {
    window.dispatchEvent(
      new CustomEvent('galaxy-speed', { detail: { isHovered } })
    );
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] py-16 lg:py-0 overflow-hidden bg-transparent">
      
      {/* 3D-капля убрана, чтобы освободить WebGL-контекст для цепи в Technology Stack */}

      {/* --- ТЕКСТОВЫЙ КОНТЕНТ (Слева) --- */}
      <div className="relative z-20 w-full h-full flex items-center pointer-events-none">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl flex flex-col gap-6 sm:gap-8 pointer-events-auto">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-extrabold text-white light:text-zinc-900 leading-[0.95] tracking-tighter uppercase lg:whitespace-nowrap">
              {t('title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ad77] to-[#9a6a3c]">{t('title2')}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ad77] to-[#9a6a3c]">{t('title3')}</span>
            </h1>

            <p className="text-gray-400 light:text-zinc-600 text-base sm:text-lg md:text-xl max-w-lg font-medium leading-relaxed mt-2 sm:mt-4">
              {t('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-6 sm:mt-8">
              <button
                onMouseEnter={() => triggerGalaxySpeed(true)}
                onMouseLeave={() => triggerGalaxySpeed(false)}
                className="w-full sm:w-auto bg-white light:bg-zinc-900 text-black light:text-white px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform active:scale-95 shadow-2xl pointer-events-auto"
              >
                {t('btnPrimary')} →
              </button>

              <button
                onMouseEnter={() => triggerGalaxySpeed(true)}
                onMouseLeave={() => triggerGalaxySpeed(false)}
                className="w-full sm:w-auto border border-gray-800 text-white light:text-zinc-900 px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white/5 transition-colors pointer-events-auto"
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