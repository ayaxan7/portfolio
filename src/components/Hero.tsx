import Link from 'next/link';

export default function Hero() {
  return (
    <header className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 relative">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 mb-4">
          Android Developer
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
          Syed Mohammad Ayaan
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Third-year Computer Science student with 1+ year of experience in Android Development.
          Building apps with backend integrations and solving complex problems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="#contact"
            className="px-8 py-4 text-sm font-medium uppercase tracking-wider bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in Touch
          </Link>
          <Link
            href="#projects"
            className="px-8 py-4 text-sm font-medium uppercase tracking-wider bg-transparent text-black border border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            View Work
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-600 border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent animate-scroll-pulse" />
      </div>
    </header>
  );
}
