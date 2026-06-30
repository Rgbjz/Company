import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Play, Briefcase, Sparkles, ArrowUpRight } from 'lucide-react';
import { TEAM, getMember, initials, type Locale } from '@/src/data/team';

const LABELS: Record<Locale, Record<string, string>> = {
  uk: {
    back: 'Назад до команди',
    about: 'Про спеціаліста',
    experience: 'Досвід роботи',
    skills: 'Навички',
    video: 'Відео-презентація',
    videoSoon: 'Відео скоро з’явиться',
    contact: "Зв'язатися",
  },
  en: {
    back: 'Back to team',
    about: 'About',
    experience: 'Work experience',
    skills: 'Skills',
    video: 'Video introduction',
    videoSoon: 'Video coming soon',
    contact: 'Get in touch',
  },
};

const pickLang = (locale: string): Locale => (locale === 'en' ? 'en' : 'uk');

export function generateStaticParams() {
  return TEAM.filter((m) => !m.placeholder).map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = getMember(slug);
  if (!member || member.placeholder) return {};
  const lang = pickLang(locale);
  return {
    title: `${member.name[lang]} — ${member.role[lang]}`,
    description: member.summary?.[lang],
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = getMember(slug);
  if (!member || member.placeholder) notFound();

  const lang = pickLang(locale);
  const t = LABELS[lang];
  const name = member.name[lang];

  return (
    <main className="relative z-10 min-h-screen bg-black light:bg-white">
      <section className="container mx-auto px-6 md:px-12 lg:px-24 pt-28 sm:pt-32 pb-20 sm:pb-28">
        {/* НАЗАД */}
        <Link
          href={`/${lang}#team`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          {t.back}
        </Link>

        {/* ШАПКА ПРОФИЛЯ */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-white/10 light:bg-black/10 blur-3xl rounded-full" />
            {member.photo ? (
              <img
                src={member.photo}
                alt={name}
                style={{ objectPosition: member.photoPosition }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border border-white/10 light:border-black/10"
              />
            ) : (
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-4xl font-black tracking-tight bg-gradient-to-br from-white/10 to-white/[0.03] light:from-black/10 light:to-black/[0.03] border border-white/10 light:border-black/10 text-white light:text-zinc-900">
                {initials(name)}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white light:text-zinc-900">
              {name}
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white light:from-zinc-600 light:to-zinc-900">
              {member.position?.[lang] ?? member.role[lang]}
            </p>
          </div>
        </div>

        {/* ОПИСАНИЕ */}
        {member.summary && (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 light:text-zinc-500 mb-3">
              {t.about}
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed text-gray-300 light:text-zinc-700">
              {member.summary[lang]}
            </p>
          </div>
        )}

        {/* ВИДЕО-ПРЕВЬЮ */}
        <div className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 light:text-zinc-500 mb-4">
            {t.video}
          </h2>
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 light:border-black/10 bg-white/[0.02] light:bg-black/[0.02]">
            {member.video || member.videoWebm ? (
              <video
                controls
                playsInline
                className="w-full h-full object-cover"
                poster={member.videoPoster}
              >
                {member.videoWebm && <source src={member.videoWebm} type="video/webm" />}
                {member.video && <source src={member.video} type="video/mp4" />}
              </video>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06),_transparent_70%)] light:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.05),_transparent_70%)]">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/10 light:bg-black/5 border border-white/15 light:border-black/15 text-white light:text-zinc-900">
                  <Play className="w-8 h-8 translate-x-0.5" fill="currentColor" strokeWidth={0} />
                </div>
                <span className="text-sm font-medium text-gray-400 light:text-zinc-600">
                  {t.videoSoon}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ОПЫТ РАБОТЫ */}
        {member.experience && member.experience.length > 0 && (
          <div className="mt-14">
            <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-black tracking-tight text-white light:text-zinc-900 mb-8">
              <Briefcase className="w-6 h-6 text-gray-400 light:text-zinc-500" strokeWidth={1.75} />
              {t.experience}
            </h2>
            <div className="flex flex-col gap-4 max-w-4xl">
              {member.experience.map((exp, i) => (
                <div
                  key={i}
                  className="group p-6 sm:p-7 rounded-3xl bg-white/[0.02] light:bg-black/[0.02] border border-white/10 light:border-black/10 hover:border-white/25 light:hover:border-black/25 transition-colors duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                    <h3 className="text-lg font-bold text-white light:text-zinc-900">{exp.company}</h3>
                    <span className="text-xs font-medium text-gray-500 light:text-zinc-500 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-400 light:text-zinc-600 mt-0.5">
                    {exp.role[lang]}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-400 light:text-zinc-600 mt-3">
                    {exp.description[lang]}
                  </p>
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 text-gray-300 light:text-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* НАВЫКИ */}
        {member.skills && member.skills.length > 0 && (
          <div className="mt-14 max-w-4xl">
            <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-black tracking-tight text-white light:text-zinc-900 mb-6">
              <Sparkles className="w-6 h-6 text-gray-400 light:text-zinc-500" strokeWidth={1.75} />
              {t.skills}
            </h2>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-full text-sm font-semibold bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 text-gray-200 light:text-zinc-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA НАЗАД */}
        <div className="mt-16">
          <Link
            href={`/${lang}#team`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white light:bg-zinc-900 text-black light:text-white hover:scale-[1.02] active:scale-95 transition-transform"
          >
            {t.back}
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </main>
  );
}
