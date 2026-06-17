'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl'; // <-- Добавили импорт
import { 
  MonitorSmartphone, 
  Server,
  Network,
  Palette,
  Search,
  Infinity 
} from 'lucide-react';

const TechBadge = ({ children, slug, customUrl, emoji }: { children: React.ReactNode, slug?: string, customUrl?: string, emoji?: string }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [slug, customUrl]);

  const imgSrc = customUrl || (slug ? `https://cdn.simpleicons.org/${slug}` : null);

  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-500 cursor-default whitespace-nowrap
      bg-white/5 border border-white/10 text-gray-300 
      group-hover:bg-black/5 group-hover:border-black/20 group-hover:text-black hover:!bg-black/10"
    >
      {imgSrc && !hasError && (
        <img 
          src={imgSrc} 
          alt={`${children} icon`}
          className="w-3.5 h-3.5 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0px_2px_rgba(255,255,255,0.3)] group-hover:drop-shadow-none" 
          onError={() => setHasError(true)} 
        />
      )}
      
      {(!imgSrc || hasError) && emoji && (
        <span className="text-[13px] leading-none">{emoji}</span>
      )}
      
      {children}
    </span>
  );
};

export default function TechStack() {
  const t = useTranslations('TechStack'); // <-- Подключаем переводы

  return (
    <section className="relative w-full pt-24 sm:pt-32 pb-20 sm:pb-24 bg-black overflow-hidden scroll-mt-20 lg:scroll-mt-24" id="services">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">

        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight break-words">
            {t('title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white font-serif italic font-light inline-block">
              {t('titleHighlight')}
            </span>
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mt-6 md:mt-8" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="w-full lg:w-[60%] xl:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 auto-rows-[220px]">
            
            {/* 1. UI/UX DESIGN */}
            <div className="col-span-1 row-span-1 group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
              <div className="flex flex-col items-center justify-center transform group-hover:-translate-y-8 transition-transform duration-500 ease-out w-full z-10">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Palette strokeWidth={1} className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors duration-500 text-center">{t('ui_ux')}</h3>
              </div>
              <div className="absolute bottom-6 left-0 w-full px-4 flex flex-wrap justify-center gap-1.5 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                <TechBadge slug="figma" emoji="🎨">Figma</TechBadge>
                <TechBadge slug="framer" emoji="✨">Framer</TechBadge>
                <TechBadge customUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" emoji="🪄">Photoshop</TechBadge>
                <TechBadge slug="webflow" emoji="🌐">Webflow</TechBadge>
                <TechBadge customUrl="https://github.com/splinetool.png" emoji="🔺">Spline 3D</TechBadge>
              </div>
            </div>

            {/* 2. FRONTEND DEVELOPMENT */}
            <div className="col-span-1 row-span-1 group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
              <div className="flex flex-col items-center justify-center transform group-hover:-translate-y-8 transition-transform duration-500 ease-out w-full z-10">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <MonitorSmartphone strokeWidth={1} className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors duration-500 text-center">{t('frontend')}</h3>
              </div>
              <div className="absolute bottom-6 left-0 w-full px-4 flex flex-wrap justify-center gap-1.5 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                <TechBadge slug="react" emoji="⚛️">React</TechBadge>
                <TechBadge slug="nextdotjs" emoji="▲">Next.js</TechBadge>
                <TechBadge slug="html5" emoji="📄">HTML5</TechBadge>
                <TechBadge customUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" emoji="🎨">CSS3</TechBadge>
                <TechBadge slug="tailwindcss" emoji="💨">Tailwind</TechBadge>
                <TechBadge slug="typescript" emoji="🦕">TypeScript</TechBadge>
              </div>
            </div>

            {/* 3. BACKEND DEVELOPMENT */}
            <div className="col-span-1 row-span-1 group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
              <div className="flex flex-col items-center justify-center transform group-hover:-translate-y-8 transition-transform duration-500 ease-out w-full z-10">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Server strokeWidth={1} className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors duration-500 text-center">{t('backend')}</h3>
              </div>
              <div className="absolute bottom-6 left-0 w-full px-4 flex flex-wrap justify-center gap-1.5 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                <TechBadge slug="nodedotjs" emoji="🟩">Node.js</TechBadge>
                <TechBadge slug="nestjs" emoji="🐈">NestJS</TechBadge>
                <TechBadge slug="mongodb" emoji="🍃">MongoDB</TechBadge>
                <TechBadge slug="postgresql" emoji="🐘">PostgreSQL</TechBadge>
                <TechBadge slug="redis" emoji="🔴">Redis</TechBadge>
              </div>
            </div>

            {/* 4. DEVOPS & INFRASTRUCTURE */}
            <div className="col-span-1 row-span-1 group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
              <div className="flex flex-col items-center justify-center transform group-hover:-translate-y-8 transition-transform duration-500 ease-out w-full z-10">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Infinity strokeWidth={1} className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors duration-500 text-center">{t('devops')}</h3>
              </div>
              <div className="absolute bottom-6 left-0 w-full px-4 flex flex-wrap justify-center gap-1.5 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                <TechBadge slug="docker" emoji="🐳">Docker</TechBadge>
                <TechBadge slug="kubernetes" emoji="☸️">Kubernetes</TechBadge>
                <TechBadge customUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" emoji="☁️">AWS</TechBadge>
                <TechBadge slug="terraform" emoji="🏗️">Terraform</TechBadge>
                <TechBadge slug="githubactions" emoji="⚙️">CI/CD</TechBadge>
              </div>
            </div>

            {/* 5. SEO OPTIMIZATION */}
            <div className="col-span-1 row-span-1 group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
              <div className="flex flex-col items-center justify-center transform group-hover:-translate-y-8 transition-transform duration-500 ease-out w-full z-10">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Search strokeWidth={1} className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors duration-500 text-center">{t('seo')}</h3>
              </div>
              <div className="absolute bottom-6 left-0 w-full px-4 flex flex-wrap justify-center gap-1.5 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                <TechBadge slug="googleanalytics" emoji="📈">{t('badges.analytics')}</TechBadge>
                <TechBadge slug="googlesearchconsole" emoji="🎯">{t('badges.tech_seo')}</TechBadge>
                <TechBadge slug="ahrefs" emoji="🔍">Ahrefs</TechBadge>
                <TechBadge slug="lighthouse" emoji="⚡">{t('badges.web_vitals')}</TechBadge>
                <TechBadge emoji="📝">{t('badges.copywriting')}</TechBadge>
              </div>
            </div>

            {/* 6. BLOCKCHAIN DEVELOPMENT */}
            <div className="col-span-1 row-span-1 group relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full border border-white/20 bg-white/5 group-hover:bg-black group-hover:border-black transition-all duration-500" />
              <div className="flex flex-col items-center justify-center transform group-hover:-translate-y-8 transition-transform duration-500 ease-out w-full z-10">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Network strokeWidth={1} className="w-12 h-12 text-gray-500 group-hover:text-black transition-colors duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors duration-500 text-center">{t('blockchain')}</h3>
              </div>
              <div className="absolute bottom-6 left-0 w-full px-4 flex flex-wrap justify-center gap-1.5 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20 pointer-events-none group-hover:pointer-events-auto">
                <TechBadge slug="ethereum" emoji="📜">{t('badges.smart_contracts')}</TechBadge>
                <TechBadge slug="solidity" emoji="🦇">Solidity</TechBadge>
                <TechBadge slug="web3dotjs" emoji="🌐">Web3.js</TechBadge>
                <TechBadge slug="ipfs" emoji="🔗">P2P</TechBadge>
                <TechBadge customUrl="https://github.com/NomicFoundation.png" emoji="🏗️">Hardhat</TechBadge> 
              </div>
            </div>
            
          </div>

          {/* ПРАВАЯ КОЛОНКА: Огромная 3D Цепь */}
          <div className="w-full lg:w-[40%] xl:w-[35%] min-h-[400px] sm:min-h-[500px] lg:min-h-[550px] xl:min-h-full relative flex items-center justify-center overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="w-full h-full absolute inset-0 z-10">
              <iframe
                src="https://my.spline.design/greyunchained-0nqI8Opxos3n6eUVydx4ntTy/"
                frameBorder="0"
                width="100%"
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  height: '115%',
                  width: '115%',
                  position: 'absolute',
                  top: '-5%',
                  left: '-7.5%',
                }}
                title="3D Blockchain Chain"
                className="pointer-events-none"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}