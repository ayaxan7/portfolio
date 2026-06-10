'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Core Concepts',
    skills: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks'],
  },
  {
    title: 'Security & Systems',
    skills: ['Authentication Systems', 'API Security', 'CTF Problem Solving', 'Linux'],
  },
  {
    title: 'Tools & Technologies',
    skills: ['Android Studio', 'Jetpack Compose', 'Git', 'GitHub', 'Firebase', 'MongoDB', 'Postman'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const { theme } = useTheme();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleLeave = () => {
      setMousePos({ x: -9999, y: -9999 });
    };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseleave', handleLeave);
    return () => {
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const glowColor = theme === 'dark' ? '255,255,255' : '10,10,10';

  return (
    <section ref={sectionRef} id="skills" className="py-24 overflow-hidden relative">
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: mousePos.x > 0 ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor},0.04), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Skills</h2>
        <div 
          className="w-16 h-px mx-auto mb-16"
          style={{ backgroundColor: 'var(--divider-accent)' }}
        />

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 
                className="text-sm font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-4 py-2 transition-all duration-200 cursor-default theme-tag hover:scale-110 hover:z-10 hover:shadow-md"
                    style={{ 
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
