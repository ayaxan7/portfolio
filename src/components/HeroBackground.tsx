'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface Particle {
  id: number;
  theta: number;
  phi: number;
  size: number;
  opacity: number;
  speed: number;
}

const PARTICLE_COUNT = 200;
const GLOBE_RADIUS = 300;

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Very smooth spring for cursor following
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 1 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 1 });

  // Generate particles
  useEffect(() => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      particles.push({
        id: i,
        theta,
        phi,
        size: 1.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
        speed: 0.15 + Math.random() * 0.1,
      });
    }
    
    particlesRef.current = particles;
  }, []);

  // Initialize canvas and cursor
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Initialize cursor to center
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
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

  // Animation loop using Canvas for smoothness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) * 0.0003;
      const cursorX = smoothMouseX.get() * window.devicePixelRatio;
      const cursorY = smoothMouseY.get() * window.devicePixelRatio;
      const radius = GLOBE_RADIUS * window.devicePixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sort particles by z-depth for proper layering
      const sortedParticles = [...particlesRef.current].map(particle => {
        const theta = particle.theta + time * particle.speed;
        const z3d = radius * Math.sin(particle.phi) * Math.sin(theta);
        return { ...particle, currentTheta: theta, z3d };
      }).sort((a, b) => a.z3d - b.z3d);

      // Draw particles
      sortedParticles.forEach(particle => {
        const theta = particle.currentTheta;
        const phi = particle.phi;

        // Spherical to cartesian
        const x3d = radius * Math.sin(phi) * Math.cos(theta);
        const y3d = radius * Math.cos(phi);
        const z3d = particle.z3d;

        // Perspective projection
        const perspective = 800 * window.devicePixelRatio;
        const scale = perspective / (perspective + z3d);

        const x2d = cursorX + x3d * scale;
        const y2d = cursorY + y3d * scale;

        // Depth-based opacity (particles in back are dimmer)
        const depthFactor = (z3d + radius) / (2 * radius);
        const opacity = particle.opacity * (0.2 + depthFactor * 0.8);

        // Size also affected by depth
        const size = particle.size * scale * window.devicePixelRatio;

        // Draw dot
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [smoothMouseX, smoothMouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
