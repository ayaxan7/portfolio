'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'circle' | 'square' | 'triangle';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const SHAPE_COUNT = 30;

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animRef = useRef<number>(0);
  const { theme } = useTheme();

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.5 });

  // Init shapes
  useEffect(() => {
    const types: Shape['type'][] = ['circle', 'square', 'triangle'];
    const shapes: Shape[] = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      shapes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: randomInRange(-0.08, 0.08),
        vy: randomInRange(-0.08, 0.08),
        size: randomInRange(30, 120),
        type: types[i % 3],
        rotation: Math.random() * 360,
        rotationSpeed: randomInRange(-0.3, 0.3),
        opacity: randomInRange(0.12, 0.25),
      });
    }
    shapesRef.current = shapes;
  }, []);

  // Canvas resize & mouse tracking
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
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const handleLeave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const REPULSION_RADIUS = 120;
    const REPULSION_FORCE = 0.6;
    const DAMPING = 0.98;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const dpr = window.devicePixelRatio;
      const cx = smoothX.get() * dpr;
      const cy = smoothY.get() * dpr;

      ctx.clearRect(0, 0, w, h);

      for (const shape of shapesRef.current) {
        const px = (shape.x / 100) * w;
        const py = (shape.y / 100) * h;

        // Repulsion from cursor
        if (cx > 0 && cy > 0) {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPULSION_RADIUS * dpr && dist > 0) {
            const force = (1 - dist / (REPULSION_RADIUS * dpr)) * REPULSION_FORCE;
            shape.vx += (dx / dist) * force;
            shape.vy += (dy / dist) * force;
          }
        }

        // Apply velocity
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.vx *= DAMPING;
        shape.vy *= DAMPING;
        shape.rotation += shape.rotationSpeed;

        // Wrap around with padding
        if (shape.x < -10) shape.x = 110;
        if (shape.x > 110) shape.x = -10;
        if (shape.y < -10) shape.y = 110;
        if (shape.y > 110) shape.y = -10;

        // Draw
        const sx = (shape.x / 100) * w;
        const sy = (shape.y / 100) * h;
        const size = shape.size * dpr;
        const rad = (shape.rotation * Math.PI) / 180;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(rad);
        ctx.globalAlpha = shape.opacity;

        if (shape.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#0a0a0a';
          ctx.lineWidth = 2 * dpr;
          ctx.stroke();
        } else if (shape.type === 'square') {
          ctx.save();
          ctx.rotate(Math.PI / 4);
          ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#0a0a0a';
          ctx.lineWidth = 2 * dpr;
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(-size / 2, size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.closePath();
          ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#0a0a0a';
          ctx.fill();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [smoothX, smoothY, theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
