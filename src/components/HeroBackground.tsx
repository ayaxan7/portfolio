'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  type: 'dot' | 'dash';
  delay: number;
}

// Color gradient from blue (top) to warm colors (bottom)
const getColorForPosition = (y: number): string => {
  const colors = {
    top: ['#3B82F6', '#6366F1', '#8B5CF6', '#2563EB'], // Blues/purples
    middle: ['#6B7280', '#9CA3AF', '#71717A', '#A1A1AA'], // Grays
    bottom: ['#EF4444', '#F97316', '#F59E0B', '#EC4899', '#FB923C'], // Warm colors
  };
  
  if (y < 30) {
    return colors.top[Math.floor(Math.random() * colors.top.length)];
  } else if (y < 70) {
    return colors.middle[Math.floor(Math.random() * colors.middle.length)];
  } else {
    return colors.bottom[Math.floor(Math.random() * colors.bottom.length)];
  }
};

const PARTICLE_COUNT = 120;

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  // Generate particles
  useEffect(() => {
    const generated: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = Math.random() * 100;
      generated.push({
        id: i,
        x: Math.random() * 100,
        y,
        size: Math.random() * 4 + 2,
        color: getColorForPosition(y),
        rotation: Math.random() * 360,
        type: Math.random() > 0.5 ? 'dot' : 'dash',
        delay: Math.random() * 2,
      });
    }
    
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize to -1 to 1
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Particles */}
      {particles.map((particle) => (
        <ParticleElement
          key={particle.id}
          particle={particle}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
}

function ParticleElement({
  particle,
  smoothMouseX,
  smoothMouseY,
}: {
  particle: Particle;
  smoothMouseX: ReturnType<typeof useSpring>;
  smoothMouseY: ReturnType<typeof useSpring>;
}) {
  // Each particle moves slightly based on cursor position
  // Particles further from center move more (parallax effect)
  const distanceFromCenter = Math.sqrt(
    Math.pow(particle.x - 50, 2) + Math.pow(particle.y - 50, 2)
  ) / 50;
  
  const moveAmount = 15 + distanceFromCenter * 20;
  
  const x = useTransform(smoothMouseX, [-1, 1], [-moveAmount, moveAmount]);
  const y = useTransform(smoothMouseY, [-1, 1], [-moveAmount, moveAmount]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 0.8, 0.4],
        scale: 1,
        rotate: [particle.rotation, particle.rotation + 10, particle.rotation],
      }}
      transition={{
        opacity: {
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particle.delay,
        },
        scale: {
          duration: 0.5,
          delay: particle.delay * 0.5,
        },
        rotate: {
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {particle.type === 'dot' ? (
        <div
          className="rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ) : (
        <div
          className="rounded-full"
          style={{
            width: particle.size * 3,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      )}
    </motion.div>
  );
}
