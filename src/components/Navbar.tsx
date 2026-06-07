'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-shadow duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderColor: 'var(--border-color)',
        opacity: 0.95 
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="font-serif text-2xl font-semibold tracking-widest" style={{ color: 'var(--text-primary)' }}>
          SMA
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full"
                style={{ 
                  color: 'var(--text-secondary)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Linktree & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://linktr.ee/ayaan3345"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-all duration-300"
            style={{ 
              borderColor: 'var(--text-primary)', 
              color: 'var(--text-primary)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.316.97.712 1.292.316.243.712.324 1.108.324.396 0 .792-.081 1.108-.324.396-.322.632-.775.712-1.292 0-.162 0-.323-.08-.486-.08-.162-.16-.324-.32-.405-.16-.081-.32-.162-.48-.162-.16 0-.32.081-.48.162-.16.081-.24.243-.32.405zm0-6.066c-.08.162-.08.324-.08.486.08.517.316.97.712 1.292.316.243.712.324 1.108.324.396 0 .792-.081 1.108-.324.396-.322.632-.775.712-1.292 0-.162 0-.324-.08-.486-.08-.162-.16-.324-.32-.405-.16-.081-.32-.162-.48-.162-.16 0-.32.081-.48.162-.16.081-.24.243-.32.405zm5.743 0c-.08.162-.08.324-.08.486.08.517.316.97.712 1.292.316.243.712.324 1.108.324.396 0 .792-.081 1.108-.324.396-.322.632-.775.712-1.292 0-.162 0-.324-.08-.486-.08-.162-.16-.324-.32-.405-.16-.081-.32-.162-.48-.162-.16 0-.32.081-.48.162-.16.081-.24.243-.32.405zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-1.027.786-2.37 1.192-3.821 1.192h-.08c-1.451 0-2.794-.406-3.821-1.192C7.692 16.106 7 14.854 7 13.44c0-.324.08-.648.16-.97.08-.324.24-.566.4-.81.16-.162.32-.324.56-.405.24-.081.4-.162.64-.162h6.48c.24 0 .4.081.64.162.24.081.4.243.56.405.16.244.32.486.4.81.08.322.16.646.16.97 0 1.414-.692 2.666-1.719 3.452zm.079-5.252H7.48c-.24 0-.4-.081-.64-.162-.24-.081-.4-.243-.56-.405-.16-.244-.32-.486-.4-.81-.08-.322-.16-.646-.16-.97 0-1.414.692-2.666 1.719-3.452 1.027-.786 2.37-1.192 3.821-1.192h.08c1.451 0 2.794.406 3.821 1.192C16.188 6.627 16.88 7.879 16.88 9.293c0 .324-.08.648-.16.97-.08.324-.24.566-.4.81-.16.162-.32.324-.56.405-.24.081-.4.162-.64.162z" />
            </svg>
            <span className="hidden lg:inline">Linktree</span>
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 border transition-all duration-300"
            style={{ 
              borderColor: 'var(--text-primary)', 
              color: 'var(--text-primary)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-transform duration-200 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
            style={{ backgroundColor: 'var(--text-primary)' }}
          />
          <span
            className={`block w-6 h-0.5 transition-opacity duration-200 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
            style={{ backgroundColor: 'var(--text-primary)' }}
          />
          <span
            className={`block w-6 h-0.5 transition-transform duration-200 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
            style={{ backgroundColor: 'var(--text-primary)' }}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          className="md:hidden border-t"
          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
        >
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://linktr.ee/ayaan3345"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-secondary)' }}
              >
                Linktree
              </a>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-secondary)' }}
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
