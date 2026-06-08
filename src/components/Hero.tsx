import Link from 'next/link';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <header className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative overflow-hidden">
      {/* Animated Background */}
      <HeroBackground />
      
      <div className="max-w-3xl relative z-10">
        <p 
          className="text-sm font-medium uppercase tracking-[0.2em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          Android Developer
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
          Syed Mohammad Ayaan
        </h1>
        <p 
          className="text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Third-year Computer Science student with 1+ year of experience in Android Development.
          Building apps with backend integrations and solving complex problems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="#contact"
            className="px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hero-btn-primary"
            style={{ 
              backgroundColor: 'var(--accent-bg)', 
              color: 'var(--accent-text)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--accent-bg)'
            }}
          >
            Get in Touch
          </Link>
          <Link
            href="#projects"
            className="px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 hero-btn-secondary"
            style={{ 
              backgroundColor: 'transparent', 
              color: 'var(--text-primary)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--text-primary)'
            }}
          >
            View Work
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 hero-btn-tertiary"
            style={{ 
              color: 'var(--text-secondary)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--border-color)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            View Resume
          </a>
          <a
            href="/resume.pdf"
            download="SyedMohammadAyaan_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 hero-btn-tertiary"
            style={{ 
              color: 'var(--text-secondary)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--border-color)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div 
          className="w-px h-16 animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}
        />
      </a>
    </header>
  );
}
