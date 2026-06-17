'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl'; // <-- Добавили импорт

const ProjectBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2.5 py-1 text-[11px] font-semibold text-gray-400 bg-white/5 border border-white/10 rounded-full cursor-default whitespace-nowrap transition-colors group-hover:text-black group-hover:bg-black/10 group-hover:border-black/30">
    {children}
  </span>
);

const TechPill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-black/50 border border-white/5 rounded-md transition-colors group-hover:text-black group-hover:bg-black/5 group-hover:border-black/20">
    {children}
  </span>
);

export default function Portfolio() {
  const t = useTranslations('Portfolio'); // <-- Подключаем переводы

  return (
    <section className="relative w-full pt-24 sm:pt-32 pb-20 sm:pb-24 bg-black overflow-hidden scroll-mt-20 lg:scroll-mt-24" id="portfolio">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* ЗАГОЛОВОК */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 md:mb-16 shrink-0">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{t('label')}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight break-words">
              {t('title_1')} <br className="hidden sm:block" /> {t('title_2')}
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 px-6 py-3 border border-white text-white rounded-full font-semibold text-sm hover:bg-white/5 transition-colors whitespace-nowrap">
            {t('view_all')} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mt-8 mb-12 lg:mb-16 shrink-0" />

        {/* СЕТКА БЕНТО-ГРИД */}
        <div className="flex flex-col gap-8 lg:gap-12">
          
          {/* --- ВЕРХНИЙ РЯД (60% / 40%) --- */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            
            {/* ЛЕВАЯ КОЛОНКА: Telegram Игра */}
            <div className="w-full lg:w-[60%] flex flex-col gap-8">
              <div className="flex-1 group relative p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white transition-all duration-500 flex flex-col items-start gap-8 overflow-hidden">
                <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
                
                {/* ПРЕВЬЮ */}
                <div className="w-full flex-1 min-h-[350px] bg-black border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-black/5 group-hover:border-black/20 relative">
                  <div className="w-[220px] h-[350px] border-4 border-white/10 rounded-[2.5rem] bg-[#050505] relative flex flex-col items-center pt-8 pb-4 overflow-hidden shadow-2xl group-hover:border-black/20 group-hover:bg-white/40 transition-colors duration-500">
                    <div className="absolute top-0 w-24 h-5 bg-white/10 rounded-b-xl group-hover:bg-black/10 transition-colors" />
                    <div className="w-1/2 h-3 bg-white/10 rounded-full mb-6 group-hover:bg-black/20 transition-colors" />
                    <div className="text-3xl font-black text-white tracking-tight group-hover:text-black transition-colors mb-1">12,450</div>
                    <div className="text-[10px] font-bold text-gray-500 mb-8 uppercase tracking-widest">$TON / Native</div>
                    <div className="w-32 h-32 rounded-full border-[6px] border-white/5 flex items-center justify-center relative group-hover:border-black/10 transition-colors">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white/5 to-white/10 group-hover:from-black/5 group-hover:to-black/10 transition-colors" />
                      <div className="absolute -top-3 right-2 w-4 h-4 bg-white/20 rounded-full group-hover:bg-black/20" />
                      <div className="absolute bottom-2 -left-3 w-6 h-6 bg-white/10 rounded-full group-hover:bg-black/10" />
                      <div className="absolute top-1/2 -right-6 w-3 h-3 bg-white/15 rounded-full group-hover:bg-black/15" />
                    </div>
                    <div className="absolute bottom-5 w-[85%] h-14 bg-white/5 border border-white/10 rounded-2xl flex justify-around items-center px-4 group-hover:bg-black/5 group-hover:border-black/10 transition-colors backdrop-blur-md">
                      <div className="w-6 h-6 bg-white/20 rounded-lg group-hover:bg-black/20" />
                      <div className="w-6 h-6 bg-white/10 rounded-full group-hover:bg-black/10" />
                      <div className="w-6 h-6 bg-white/10 rounded-lg group-hover:bg-black/10" />
                      <div className="w-6 h-6 bg-white/10 rounded-full group-hover:bg-black/10" />
                    </div>
                  </div>
                </div>

                {/* КОНТЕНТ ПРОЕКТА */}
                <div className="flex flex-col gap-4 transition-colors duration-500 group-hover:text-black w-full mt-auto">
                  <div className="flex gap-2">
                    <ProjectBadge>TELEGRAM MINI APP</ProjectBadge>
                    <ProjectBadge>WEB3 & TON</ProjectBadge>
                  </div>
                  <h3 className="text-3xl font-bold text-white group-hover:text-black transition-colors">
                    {t('proj1_title')}
                  </h3>
                  <p className="text-gray-400 max-w-xl text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                    {/* Используем t.rich для рендера <strong> из JSON */}
                    {t.rich('proj1_desc', {
                      bold: (chunks) => <strong>{chunks}</strong>
                    })}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <TechPill>React.js</TechPill>
                    <TechPill>Redux</TechPill>
                    <TechPill>NestJS</TechPill>
                    <TechPill>MongoDB</TechPill>
                    <TechPill>Redis & BullMQ</TechPill>
                  </div>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8 lg:gap-12">
              
              {/* Проект 2: Swiss Auto Leasing */}
              <div className="flex-1 group relative p-6 lg:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white transition-all duration-500 flex flex-col items-start gap-6 overflow-hidden">
                <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
                
                {/* ПРЕВЬЮ */}
                <div className="w-full flex-1 min-h-[160px] bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-black/5 group-hover:border-black/20 relative">
                  <div className="absolute top-6 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-black/10 transition-colors" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-black/5 transition-colors" />
                  <div className="absolute top-4 left-6 w-24 h-24 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1.5 group-hover:bg-black/5 group-hover:border-black/20 transition-colors z-0">
                    <div className="w-12 h-2 bg-white/20 rounded-full group-hover:bg-black/30 transition-colors" />
                    <div className="w-full h-1.5 bg-white/10 rounded-full group-hover:bg-black/10 transition-colors mt-2" />
                    <div className="w-3/4 h-1.5 bg-white/10 rounded-full group-hover:bg-black/10 transition-colors" />
                    <div className="w-full h-1.5 bg-white/20 rounded-full mt-auto relative group-hover:bg-black/20 transition-colors">
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-3 h-3 bg-white/40 rounded-full group-hover:bg-black/40 transition-colors" />
                    </div>
                  </div>
                  <div className="absolute top-5 right-6 w-8 h-8 bg-white/10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-black/10 group-hover:border-black/20 transition-colors z-10">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-black/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 right-8 w-36 h-14 transition-transform duration-700 ease-out group-hover:-translate-x-4 z-20">
                    <div className="absolute bottom-6 left-6 w-20 h-7 bg-white/5 border-t border-l border-r border-white/10 rounded-tl-3xl rounded-tr-xl group-hover:bg-black/5 group-hover:border-black/20 transition-colors backdrop-blur-sm" />
                    <div className="absolute bottom-2 left-0 w-full h-7 bg-white/10 border border-white/10 rounded-xl group-hover:bg-black/15 group-hover:border-black/20 transition-colors" />
                    <div className="absolute bottom-0 left-5 w-6 h-6 rounded-full border-2 border-black bg-white/30 group-hover:bg-black/40 group-hover:border-white transition-colors flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full group-hover:bg-white transition-colors" />
                    </div>
                    <div className="absolute bottom-0 right-5 w-6 h-6 rounded-full border-2 border-black bg-white/30 group-hover:bg-black/40 group-hover:border-white transition-colors flex items-center justify-center">
                         <div className="w-2 h-2 bg-black rounded-full group-hover:bg-white transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 transition-colors duration-500 group-hover:text-black mt-auto w-full">
                  <div className="flex gap-2">
                    <ProjectBadge>FINTECH</ProjectBadge>
                    <ProjectBadge>AUTOMOTIVE</ProjectBadge>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors">
                    {t('proj2_title')}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-800 transition-colors line-clamp-3">
                    {t('proj2_desc')}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <TechPill>Next.js</TechPill>
                    <TechPill>React Query</TechPill>
                    <TechPill>NestJS</TechPill>
                    <TechPill>Formik</TechPill>
                  </div>
                </div>
              </div>

              {/* Проект 3: Multilingual E-commerce */}
              <div className="flex-1 group relative p-6 lg:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white transition-all duration-500 flex flex-col items-start gap-6 overflow-hidden">
                <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
                
                {/* ПРЕВЬЮ */}
                <div className="w-full flex-1 min-h-[160px] bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-black/5 group-hover:border-black/20 relative flex flex-col p-4 gap-3">
                  <div className="w-full h-4 flex justify-between items-center border-b border-white/5 pb-2 group-hover:border-black/10 transition-colors">
                    <div className="w-10 h-1.5 bg-white/20 rounded-full group-hover:bg-black/30 transition-colors" />
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-1 bg-white/10 rounded-full group-hover:bg-black/20 transition-colors" />
                      <div className="w-3 h-3 rounded-full border border-white/20 group-hover:border-black/30 transition-colors flex items-center justify-center">
                         <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-black/30 transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-10 bg-gradient-to-r from-white/5 to-transparent rounded-lg border border-white/5 flex flex-col justify-center px-3 group-hover:from-black/5 group-hover:border-black/10 transition-colors">
                     <div className="w-16 h-1.5 bg-white/20 rounded-full mb-1 group-hover:bg-black/30 transition-colors" />
                     <div className="w-10 h-1 bg-white/10 rounded-full group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white/5 border border-white/5 rounded-lg p-1.5 h-16 flex flex-col group-hover:bg-black/5 group-hover:border-black/10 transition-colors">
                        <div className="w-full flex-1 bg-white/5 rounded mb-1.5 group-hover:bg-black/10 transition-colors" />
                        <div className="w-3/4 h-1 bg-white/20 rounded-full mb-0.5 group-hover:bg-black/40 transition-colors" />
                        <div className="w-1/2 h-1 bg-white/10 rounded-full group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 transition-colors duration-500 group-hover:text-black mt-auto w-full">
                  <div className="flex gap-2">
                    <ProjectBadge>E-COMMERCE</ProjectBadge>
                    <ProjectBadge>FULL-STACK</ProjectBadge>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors">
                    {t('proj3_title')}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-800 transition-colors line-clamp-3">
                    {t('proj3_desc')}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <TechPill>Next.js</TechPill>
                    <TechPill>Prisma</TechPill>
                    <TechPill>KeyCRM</TechPill>
                    <TechPill>Monobank</TechPill>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* --- НИЖНИЙ РЯД: B2B SAAS (Широкая карточка) --- */}
          <div className="w-full group relative p-8 lg:p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white transition-all duration-500 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 overflow-hidden">
            <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />

            {/* ПРЕВЬЮ */}
            <div className="w-full lg:w-1/2 h-[320px] bg-black border border-white/10 rounded-2xl p-4 flex overflow-hidden transition-all duration-500 group-hover:bg-black/5 group-hover:border-black/20 shrink-0">
              <div className="w-1/4 h-full border-r border-white/10 pr-4 flex flex-col gap-5 group-hover:border-black/10 transition-colors">
                <div className="w-full h-6 bg-white/10 rounded mb-2 group-hover:bg-black/20 transition-colors" />
                <div className="w-3/4 h-3 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
                <div className="w-full h-3 bg-white/10 rounded group-hover:bg-black/20 transition-colors" />
                <div className="w-5/6 h-3 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
                <div className="w-4/5 h-3 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
              </div>
              
              <div className="w-3/4 h-full pl-4 flex flex-col gap-4">
                <div className="w-full h-8 border-b border-white/10 flex items-center justify-between pb-2 group-hover:border-black/10 transition-colors">
                  <div className="w-1/3 h-4 bg-white/10 rounded group-hover:bg-black/20 transition-colors" />
                  <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-black/20 transition-colors" />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="w-full h-16 bg-white/5 rounded-xl border border-white/10 group-hover:bg-black/5 group-hover:border-black/10 transition-colors p-2 flex flex-col justify-end">
                    <div className="w-1/2 h-2 bg-white/10 rounded group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="w-full h-16 bg-white/5 rounded-xl border border-white/10 group-hover:bg-black/5 group-hover:border-black/10 transition-colors p-2 flex flex-col justify-end">
                    <div className="w-2/3 h-2 bg-white/10 rounded group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="w-full h-16 bg-white/5 rounded-xl border border-white/10 group-hover:bg-black/5 group-hover:border-black/10 transition-colors p-2 flex flex-col justify-end">
                    <div className="w-1/3 h-2 bg-white/10 rounded group-hover:bg-black/20 transition-colors" />
                  </div>
                </div>
                
                <div className="w-full flex-1 bg-white/5 rounded-xl border border-white/10 flex flex-col p-4 gap-3 group-hover:bg-black/5 group-hover:border-black/10 transition-colors">
                  <div className="w-1/4 h-4 bg-white/10 rounded mb-2 group-hover:bg-black/20 transition-colors" />
                  <div className="w-full h-2 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
                  <div className="w-full h-2 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
                  <div className="w-5/6 h-2 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
                  <div className="w-full h-2 bg-white/5 rounded group-hover:bg-black/10 transition-colors" />
                </div>
              </div>
            </div>

            {/* КОНТЕНТ ПРОЕКТА */}
            <div className="flex flex-col gap-4 transition-colors duration-500 group-hover:text-black w-full lg:w-1/2">
              <div className="flex gap-2">
                <ProjectBadge>B2B SAAS</ProjectBadge>
                <ProjectBadge>COMPLIANCE</ProjectBadge>
              </div>
              
              <h3 className="text-3xl font-bold text-white group-hover:text-black transition-colors">
                {t('proj4_title')}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-800 transition-colors max-w-xl">
                {t('proj4_desc')}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <TechPill>React & Vite</TechPill>
                <TechPill>TypeScript</TechPill>
                <TechPill>Zustand</TechPill>
                <TechPill>Formik</TechPill>
                <TechPill>FastAPI</TechPill>
                <TechPill>PostgreSQL</TechPill>
                <TechPill>Celery</TechPill>
                <TechPill>Turborepo</TechPill>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
}