'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface Particle {
  id: number;
  theta: number;
  phi: number;
  size: number;
  opacity: number;
  speed: number;
  colorIndex: number; // Store index instead of color string
  region: 'top' | 'middle' | 'bottom';
}

const PARTICLE_COUNT = 200;
const GLOBE_RADIUS = 300;

// Theme-aware color palettes
const lightColors = {
  top: ['#3B82F6', '#6366F1', '#8B5CF6', '#2563EB'], // Blues/purples
  middle: ['#6B7280', '#9CA3AF', '#71717A', '#A1A1AA'], // Grays
  bottom: ['#EF4444', '#F97316', '#F59E0B', '#EC4899', '#FB923C'], // Warm colors
};

const darkColors = {
  top: ['#60A5FA', '#818CF8', '#A78BFA', '#3B82F6'], // Lighter blues/purples
  middle: ['#9CA3AF', '#D1D5DB', '#A1A1AA', '#E5E7EB'], // Lighter grays
  bottom: ['#F87171', '#FB923C', '#FBBF24', '#F472B6', '#FDBA74'], // Lighter warm colors
};

// Get region based on phi angle
const getRegionForPhi = (phi: number): 'top' | 'middle' | 'bottom' => {
  const normalizedPhi = phi / Math.PI;
  if (normalizedPhi < 0.35) return 'top';
  if (normalizedPhi < 0.65) return 'middle';
  return 'bottom';
};

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Very smooth spring for cursor following
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 1 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 1 });

  // Generate particles (only once, theme-independent structure)
  useEffect(() => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const region = getRegionForPhi(phi);
      const colorPalette = lightColors[region];
      
      particles.push({
        id: i,
        theta,
        phi,
        size: 1.5 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.4,
        speed: 0.15 + Math.random() * 0.1,
        colorIndex: Math.floor(Math.random() * colorPalette.length),
        region,
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
    const colors = theme === 'dark' ? darkColors : lightColors;

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

        // Get theme-aware color
        const colorPalette = colors[particle.region];
        const color = colorPalette[particle.colorIndex % colorPalette.length];

        // Draw dot with color
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [smoothMouseX, smoothMouseY, theme]);

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
