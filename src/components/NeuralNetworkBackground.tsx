'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
}

function getNodeCount(): number {
  if (typeof window === 'undefined') return 60;
  const w = window.innerWidth;
  if (w < 640) return 30;
  if (w < 1024) return 50;
  if (w < 1440) return 80;
  return 100;
}

export default function NeuralNetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1 });
  const { theme } = useTheme();

  useEffect(() => {
    const nodes: Node[] = [];
    const count = getNodeCount();
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03,
        radius: 1.2 + Math.random() * 2,
        baseOpacity: 0.2 + Math.random() * 0.25,
      });
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const handleMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark';
    const colorBase = isDark ? '255,255,255' : '10,10,10';
    const connBase = isDark ? '163,163,163' : '82,82,82';

    const CONNECTION_DIST = 16;
    const MOUSE_RADIUS = 18;
    const MOUSE_FORCE = 0.015;
    const DAMPING = 0.997;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -8) node.x = 108;
        if (node.x > 108) node.x = -8;
        if (node.y < -8) node.y = 108;
        if (node.y > 108) node.y = -8;

        if (mouse.x >= 0 && mouse.y >= 0) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0.1) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            node.vx -= (dx / dist) * force;
            node.vy -= (dy / dist) * force;
          }
        }

        node.vx *= DAMPING;
        node.vy *= DAMPING;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            let opacity = (1 - dist / CONNECTION_DIST) * 0.2;

            if (mouse.x >= 0 && mouse.y >= 0) {
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              const mDist = Math.sqrt((mx - mouse.x) ** 2 + (my - mouse.y) ** 2);
              if (mDist < MOUSE_RADIUS) {
                opacity *= 1 + (1 - mDist / MOUSE_RADIUS) * 3;
              }
            }

            if (opacity > 0.01) {
              ctx.beginPath();
              ctx.moveTo((a.x / 100) * w, (a.y / 100) * h);
              ctx.lineTo((b.x / 100) * w, (b.y / 100) * h);
              ctx.strokeStyle = `rgba(${connBase},${Math.min(opacity, 0.5)})`;
              ctx.lineWidth = 1.5 * dpr;
              ctx.stroke();
            }
          }
        }
      }

      for (const node of nodes) {
        const px = (node.x / 100) * w;
        const py = (node.y / 100) * h;
        const r = node.radius * dpr;

        ctx.fillStyle = `rgba(${colorBase},${node.baseOpacity * 1.2})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
