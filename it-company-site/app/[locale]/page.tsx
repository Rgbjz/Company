import Hero from '@/src/components/Hero/Hero';
import TechStack from '@/src/components/TechStack/TechStack';
import Portfolio from '@/src/components/Portfolio/Portfolio'; // <-- Добавили импорт
import Team from '@/src/components/Team/Team';

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* 1. Секция Hero с 3D-каплями и главным текстом */}
      <Hero />
      
      {/* 2. Наш новый крутой стек технологий */}
      <TechStack />
      
      {/* 3. Секция портфолио в черно-белых цветах */}
      <Portfolio />

      {/* 4. Секция команды */}
      <Team />

      {/* Место для будущих секций */}
      {/* <About /> */}
      {/* <Contact /> */}
    </main>
  );
}