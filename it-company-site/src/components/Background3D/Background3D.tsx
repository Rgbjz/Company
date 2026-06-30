'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

function SwarmStars({ isLight }: { isLight: boolean }) {
  const count = 3000;
  const pointsRef = useRef<THREE.Points>(null!);
  const isWarping = useRef(false);
  const globalMouse = useRef({ x: 0, y: 0 });

  // 1. Улучшенная текстура: высокое разрешение (128x128) и яркое ядро
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;
    
    const center = 64;
    const gradient = context.createRadialGradient(center, center, 0, center, center, center);
    
    // Делаем четкое, яркое ядро и плавное затухание
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  // 2. Генерируем базовые позиции и параметры для "роения" (индивидуальный характер каждой звезды)
  const { basePositions, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rnd = new Float32Array(count * 3); // Сохраняем случайные параметры для роя

    for (let i = 0; i < count; i++) {
      // Позиции
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 1.0) * 50;

      // Параметры мотылька: [базовый угол, радиус орбиты, скорость вращения]
      rnd[i * 3] = Math.random() * Math.PI * 2;       // Стартовый угол орбиты
      rnd[i * 3 + 1] = Math.random() * 4 + 0.5;       // Насколько далеко от курсора летать (радиус)
      rnd[i * 3 + 2] = (Math.random() - 0.5) * 5;     // Скорость и направление вращения вокруг курсора
    }
    return { basePositions: positions, randoms: rnd };
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useEffect(() => {
    const handleHover = (e: Event) => {
      const customEvent = e as CustomEvent;
      isWarping.current = customEvent.detail.isHovered;
    };

    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('galaxy-speed', handleHover);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('galaxy-speed', handleHover);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    const targetX = globalMouse.current.x * 50;
    const targetY = globalMouse.current.y * 30;
    const effectRadius = 12; // Чуть увеличили зону захвата

    for (let i = 0; i < count * 3; i += 3) {
      const baseX = basePositions[i];
      const baseY = basePositions[i + 1];
      const baseZ = basePositions[i + 2];

      const dx = targetX - baseX;
      const dy = targetY - baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (isWarping.current && distance < effectRadius) {
        // --- ЭФФЕКТ МОТЫЛЬКА ---
        const force = (effectRadius - distance) / effectRadius;
        
        // Достаем случайные параметры именно этой звезды
        const startAngle = randoms[i];
        const orbitRadius = randoms[i + 1];
        const orbitSpeed = randoms[i + 2];

        // Вычисляем динамическую точку, вокруг которой будет крутиться мотылек
        const angle = startAngle + time * orbitSpeed;
        const swarmX = targetX + Math.cos(angle) * orbitRadius;
        const swarmY = targetY + Math.sin(angle) * orbitRadius;
        
        // Мотыльки слегка "прыгают" вперед-назад по оси Z для объема
        const swarmZ = baseZ + Math.sin(time * 3 + startAngle) * 2 + 5;

        // Плавно летим в вычисленную точку роя (скорость зависит от близости к центру)
        positions[i] = THREE.MathUtils.lerp(positions[i], swarmX, force * 0.04);
        positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], swarmY, force * 0.04);
        positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], swarmZ, force * 0.04);
      } else {
        // --- ВОЗВРАТ НА МЕСТО ---
        positions[i] = THREE.MathUtils.lerp(positions[i], baseX, 0.05);
        positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], baseY, 0.05);
        positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], baseZ, 0.05);
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.7} // Уменьшили размер, так как текстура теперь четкая и яркая
        map={circleTexture}
        color={isLight ? SWARM_LIGHT : SWARM_DARK}
        transparent={true}
        opacity={isLight ? 0.7 : 0.8}
        depthWrite={false}
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Цвет звёзд созвездий — серо-голубой (яркие — чуть светлее)
const STAR_COLOR = '#9fb3d1';
const STAR_BRIGHT = '#cdd9ec';
// В светлой теме — коричневый, как «SEO./ДИЗАЙН.» (градиент #d4ad77 → #9a6a3c)
const STAR_LIGHT = '#9a6a3c';
const STAR_LIGHT_BRIGHT = '#d4ad77';
// Фоновые звёзды (рой): тёмная — белые, светлая — коричневые как созвездия
const SWARM_DARK = '#ffffff';
const SWARM_LIGHT = '#9a6a3c';

// Размер звезды по величине (mag): ярче → крупнее
const STAR_BASE = 0.55;
const sizeFromMag = (mag: number) => STAR_BASE * Math.max(0.45, 1.15 - (mag - 1.5) * 0.22);

type Star = [number, number, number]; // x, y, зоряна величина (mag)
type Edge = [number, number]; // индексы соединяемых звёзд
type Cnst = { name: string; position: [number, number, number]; scale: number; stars: Star[]; edges: Edge[]; zodiac?: boolean };

// Созвездия размещены в правой части (подальше от текста Hero слева)
const CONSTELLATIONS: Cnst[] = [
  {
    name: 'ursa-major', // Велика Ведмедиця (Ківш) + Полярна
    position: [4.0, -2.7, -1],
    scale: 0.88,
    stars: [
      [-2.56, -0.53, 1.86], [-1.46, 0.02, 2.04], [-1.2, 0.26, 3.95], [-0.41, 0.32, 1.77],
      [0.69, 0.42, 3.31], [0.89, -0.78, 2.44], [2.09, -0.48, 2.37], [1.99, 0.82, 1.79],
      [1.74, 3.0, 1.4], // 8 — Полярна зоря (не з'єднуємо)
    ],
    // ручка 0-1-3-4 + ківш 4-7-6-5-4
    edges: [[0, 1], [1, 3], [3, 4], [4, 7], [7, 6], [6, 5], [5, 4]],
  },
  {
    name: 'scorpius', // Скорпіон (праворуч від тексту, на вільному полі)
    zodiac: true,
    position: [2.6, 0.4, -1],
    scale: 0.78,
    stars: [
      [-0.7, 1.5, 2.6], [-0.1, 1.6, 2.9], [0.05, 0.9, 2.3],
      [0.15, 0.2, 1.0], // 3 — Антарес (яскрава)
      [0.35, -0.45, 2.8], [0.75, -0.85, 1.9], [1.25, -1.05, 2.0],
      [1.7, -0.75, 1.6], [1.55, -0.25, 2.3],
    ],
    // клешні 0-2, 1-2; тіло 2-3-4-5-6-7-8 (хвіст-жало)
    edges: [[0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
  },
  {
    name: 'virgo', // Діва
    zodiac: true,
    position: [6.4, 0.2, -1],
    scale: 0.78,
    stars: [
      [0, 0, 1.0], // 0 — Спіка (яскрава)
      [0.7, 0.9, 2.8], [1.4, 1.1, 3.4], [0.5, 1.7, 3.6], [-0.5, 1.3, 2.8], [1.9, 1.8, 3.4],
    ],
    edges: [[0, 1], [1, 2], [2, 5], [1, 3], [3, 4]],
  },
  {
    name: 'cancer', // Рак (праворуч від крапки після «ДИЗАЙН», ближче до центру блоку)
    zodiac: true,
    position: [0.6, -1.3, -1],
    scale: 0.8,
    stars: [
      [0, 0.8, 3.5], [0, 0.1, 3.9], [-0.7, -0.55, 4.2], [0.7, -0.45, 4.7], [0.1, -0.78, 4.3],
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4]],
  },
];

function makeGlowTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const cx = size / 2;
  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.04, 'rgba(255,255,255,1)');
  g.addColorStop(0.1, 'rgba(255,255,255,0.6)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.22)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.06)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'lighter';
  const spike = (angle: number, len: number, w: number) => {
    ctx.save();
    ctx.translate(cx, cx);
    ctx.rotate(angle);
    const lg = ctx.createLinearGradient(0, 0, len, 0);
    lg.addColorStop(0, 'rgba(255,255,255,0.82)');
    lg.addColorStop(0.5, 'rgba(255,255,255,0.16)');
    lg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.moveTo(0, -w);
    ctx.lineTo(len, 0);
    ctx.lineTo(0, w);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  const L = cx * 0.96;
  [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach((a) => spike(a, L, 2.4));
  [Math.PI / 4, (3 * Math.PI) / 4, -Math.PI / 4, -(3 * Math.PI) / 4].forEach((a) =>
    spike(a, L * 0.5, 1.4)
  );
  return new THREE.CanvasTexture(c);
}

// Все созвездия — видны в обеих темах; в тёмной аддитивно светятся, в светлой обычное смешение
function StarField({ isLight }: { isLight: boolean }) {
  const glow = useMemo(() => makeGlowTexture(), []);
  const blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
  return (
    <>
      {CONSTELLATIONS.map((c) => {
        // В светлой теме — коричневый как «SEO./ДИЗАЙН.»; в тёмной — серо-голубой
        const lineColor = isLight ? STAR_LIGHT : STAR_COLOR;
        const starColor = (mag: number) =>
          isLight
            ? mag <= 1.3 ? STAR_LIGHT_BRIGHT : STAR_LIGHT
            : mag <= 1.3 ? STAR_BRIGHT : STAR_COLOR;
        const linePts = new Float32Array(
          c.edges.flatMap(([a, b]) => [
            c.stars[a][0] * c.scale, c.stars[a][1] * c.scale, 0,
            c.stars[b][0] * c.scale, c.stars[b][1] * c.scale, 0,
          ])
        );
        return (
        <group key={c.name} position={c.position}>
          {/* соединительные линии созвездия */}
          <lineSegments key={`lines-${isLight}`}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[linePts, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={lineColor} transparent opacity={isLight ? 0.5 : 0.32} depthWrite={false} />
          </lineSegments>
          {c.stars.map((s, i) => (
            <points key={`${i}-${isLight}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([s[0] * c.scale, s[1] * c.scale, 0]), 3]}
                />
              </bufferGeometry>
              <pointsMaterial
                size={sizeFromMag(s[2])}
                map={glow}
                color={starColor(s[2])}
                transparent
                opacity={isLight ? 0.92 : 1}
                depthWrite={false}
                blending={blending}
                sizeAttenuation
              />
            </points>
          ))}
        </group>
        );
      })}
    </>
  );
}

// Следим за классом .light на <html>, чтобы менять смешение/видимость
function useIsLight() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsLight(el.classList.contains('light'));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return isLight;
}

export default function Background3D() {
  const isLight = useIsLight();
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black light:from-zinc-200 light:via-zinc-100 light:to-white pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Фоновый рой звёзд — в обеих темах (тёмная — белые, светлая — небесно-голубые) */}
        <SwarmStars key={isLight ? 'light' : 'dark'} isLight={isLight} />
        {/* Созвездия — в обеих темах */}
        <StarField isLight={isLight} />
      </Canvas>
    </div>
  );
}