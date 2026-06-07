'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '100+', label: 'Problems Solved' },
  { value: '5+', label: 'Projects Built' },
];

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseInt(value.replace(/\D/g, ''));
          const suffix = value.replace(/[0-9]/g, '');
          let current = 0;
          const duration = 1500;
          const stepTime = Math.max(duration / numericValue, 20);

          const counter = setInterval(() => {
            current++;
            setDisplayValue(current + suffix);
            if (current >= numericValue) {
              clearInterval(counter);
              setDisplayValue(value);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-serif text-4xl font-semibold">{displayValue}</span>
      <span 
        className="text-sm uppercase tracking-wider mt-1"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">About</h2>
        <div 
          className="w-16 h-px mx-auto mb-16"
          style={{ backgroundColor: 'var(--divider-accent)' }}
        />

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-xl leading-relaxed">
              I am a passionate Android Developer currently pursuing my Bachelor&apos;s in Computer Science
              (Data Science) at Dayananda Sagar College of Engineering, Bengaluru.
            </p>
            <p 
              className="leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              With experience across multiple internships and freelance projects, I specialize in building
              robust Android applications using Kotlin, Jetpack Compose, and modern architecture patterns
              like MVVM. I have a strong foundation in backend development with Node.js and Express.js,
              enabling me to create full-stack mobile solutions.
            </p>
            <p 
              className="leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Beyond development, I&apos;ve demonstrated problem-solving excellence by solving 100+ problems
              on LeetCode and CodeChef, and have been recognized as a national finalist in Smart India
              Hackathon 2025.
            </p>
          </div>

          <div 
            className="flex lg:flex-col gap-8 lg:gap-10 lg:pl-8 lg:border-l pt-8 lg:pt-0 border-t lg:border-t-0"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
