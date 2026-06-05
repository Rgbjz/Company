'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

function SwarmStars() {
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
        color="#ffffff"
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <SwarmStars />
      </Canvas>
    </div>
  );
}