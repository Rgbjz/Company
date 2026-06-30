'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { TEAM, initials, type Locale } from '@/src/data/team';

export default function Team() {
  const t = useTranslations('Team');
  const pathname = usePathname();
  const locale = ((pathname?.split('/')[1] as Locale) || 'uk') as Locale;
  const lang: Locale = locale === 'en' ? 'en' : 'uk';

  return (
    <section
      id="team"
      className="relative w-full pt-24 sm:pt-32 pb-20 sm:pb-24 bg-black light:bg-white overflow-hidden scroll-mt-20 lg:scroll-mt-24"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* ЗАГОЛОВОК */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white light:text-zinc-900 tracking-tight leading-tight">
            {t('title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 light:from-zinc-500 to-white light:to-zinc-900">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-gray-400 light:text-zinc-600 text-base sm:text-lg max-w-xl mt-4 md:mt-5 mx-auto md:mx-0">
            {t('subtitle')}
          </p>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mt-6 md:mt-8" />
        </div>

        {/* СЕТКА КОМАНДЫ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {TEAM.map((member) => {
            const name = member.name[lang];
            const role = member.role[lang];
            const isPlaceholder = member.placeholder;

            const Card = (
              <div
                className={`group relative h-full p-8 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center overflow-hidden
                  ${
                    isPlaceholder
                      ? 'bg-white/[0.01] light:bg-black/[0.01] border-dashed border-white/10 light:border-black/10'
                      : 'bg-white/[0.02] light:bg-black/[0.02] border-white/10 light:border-black/10 hover:bg-white light:hover:bg-zinc-900 hover:border-white light:hover:border-zinc-900 cursor-pointer'
                  }`}
              >
                {/* угловой индикатор */}
                {!isPlaceholder && (
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 light:border-black/10 text-gray-400 light:text-zinc-600 group-hover:bg-black light:group-hover:bg-white group-hover:text-white light:group-hover:text-black group-hover:border-black light:group-hover:border-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                  </div>
                )}

                {/* АВАТАР */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-white/20 light:bg-black/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {member.photo && !isPlaceholder ? (
                    <img
                      src={member.photo}
                      alt={name}
                      style={{ objectPosition: member.photoPosition }}
                      className="relative w-24 h-24 rounded-full object-cover border border-white/10 light:border-black/10 group-hover:border-black/20 light:group-hover:border-white/20 transition-all duration-500"
                    />
                  ) : (
                    <div
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center text-2xl font-black tracking-tight border transition-all duration-500
                        ${
                          isPlaceholder
                            ? 'border-dashed border-white/15 light:border-black/15 text-gray-600 light:text-zinc-400'
                            : 'bg-gradient-to-br from-white/10 to-white/[0.02] border-white/10 light:border-black/10 text-white light:text-zinc-900 group-hover:from-black/10 group-hover:to-black/5 group-hover:border-black/20 light:group-hover:border-white/20 group-hover:text-black light:group-hover:text-white'
                        }`}
                    >
                      {isPlaceholder ? '+' : initials(name)}
                    </div>
                  )}
                </div>

                {/* ИМЯ + РОЛЬ */}
                <h3
                  className={`text-xl font-bold transition-colors duration-500 ${
                    isPlaceholder
                      ? 'text-gray-500 light:text-zinc-400'
                      : 'text-white light:text-zinc-900 group-hover:text-black light:group-hover:text-white'
                  }`}
                >
                  {name}
                </h3>
                <p
                  className={`text-sm font-medium mt-1 transition-colors duration-500 ${
                    isPlaceholder
                      ? 'text-gray-600 light:text-zinc-400'
                      : 'text-gray-400 light:text-zinc-600 group-hover:text-gray-700 light:group-hover:text-zinc-300'
                  }`}
                >
                  {role}
                </p>

                {!isPlaceholder && (
                  <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-500 light:text-zinc-500 group-hover:text-black/60 light:group-hover:text-white/60 transition-colors duration-500">
                    {t('viewProfile')}
                  </span>
                )}
              </div>
            );

            return isPlaceholder ? (
              <div key={member.slug} className="h-full">
                {Card}
              </div>
            ) : (
              <Link key={member.slug} href={`/${lang}/team/${member.slug}`} className="h-full block">
                {Card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
