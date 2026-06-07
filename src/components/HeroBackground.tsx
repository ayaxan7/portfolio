'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  // Spherical coordinates
  theta: number; // horizontal angle (0 to 2π)
  phi: number; // vertical angle (0 to π)
  size: number;
  color: string;
  speed: number; // rotation speed multiplier
}

// Color based on position on sphere (top = blue, bottom = warm)
const getColorForPhi = (phi: number): string => {
  const colors = {
    top: ['#3B82F6', '#6366F1', '#8B5CF6', '#2563EB'], // Blues/purples
    middle: ['#6B7280', '#9CA3AF', '#71717A', '#A1A1AA'], // Grays
    bottom: ['#EF4444', '#F97316', '#F59E0B', '#EC4899', '#FB923C'], // Warm colors
  };
  
  const normalizedPhi = phi / Math.PI; // 0 to 1
  
  if (normalizedPhi < 0.35) {
    return colors.top[Math.floor(Math.random() * colors.top.length)];
  } else if (normalizedPhi < 0.65) {
    return colors.middle[Math.floor(Math.random() * colors.middle.length)];
  } else {
    return colors.bottom[Math.floor(Math.random() * colors.bottom.length)];
  }
};

const PARTICLE_COUNT = 150;
const GLOBE_RADIUS = 280; // pixels - radius of the particle globe
const GAP_RADIUS = 40; // pixels - empty space around cursor (about 1cm)

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  // Cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth cursor following
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  // Generate particles on sphere
  useEffect(() => {
    const generated: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute points on sphere using fibonacci spiral
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      generated.push({
        id: i,
        theta,
        phi,
        size: Math.random() * 4 + 2,
        color: getColorForPhi(phi),
        speed: 0.3 + Math.random() * 0.4,
      });
    }
    
    setParticles(generated);
  }, []);

  // Track dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        // Initialize cursor to center
        mouseX.set(width / 2);
        mouseY.set(height / 2);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [mouseX, mouseY]);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
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
      {particles.map((particle) => (
        <GlobeParticle
          key={particle.id}
          particle={particle}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
}

function GlobeParticle({
  particle,
  smoothMouseX,
  smoothMouseY,
}: {
  particle: Particle;
  smoothMouseX: ReturnType<typeof useSpring>;
  smoothMouseY: ReturnType<typeof useSpring>;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeOffset = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      const time = Date.now() * 0.0005;
      const cursorX = smoothMouseX.get();
      const cursorY = smoothMouseY.get();
      
      // Slowly rotate the sphere
      const theta = particle.theta + time * particle.speed;
      const phi = particle.phi;
      
      // Convert spherical to cartesian (3D)
      const x3d = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y3d = GLOBE_RADIUS * Math.cos(phi);
      const z3d = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
      
      // Simple perspective projection
      const perspective = 600;
      const scale = perspective / (perspective + z3d);
      
      // Project to 2D and offset by cursor position
      const x2d = cursorX + x3d * scale;
      const y2d = cursorY + y3d * scale;
      
      setPosition({ x: x2d, y: y2d });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, [particle, smoothMouseX, smoothMouseY]);

  // Calculate opacity based on z-depth (particles behind are dimmer)
  const time = Date.now() * 0.0005;
  const theta = particle.theta + time * particle.speed;
  const z3d = GLOBE_RADIUS * Math.sin(particle.phi) * Math.sin(theta);
  const depthOpacity = 0.3 + ((z3d + GLOBE_RADIUS) / (2 * GLOBE_RADIUS)) * 0.5;

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: depthOpacity }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="rounded-full"
        style={{
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
        }}
      />
    </motion.div>
  );
}
