'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-shadow duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="font-serif text-2xl font-semibold tracking-widest">
          SMA
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-black relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Linktree Button */}
        <a
          href="https://linktr.ee/ayaan3345"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.316.97.712 1.292.316.243.712.324 1.108.324.396 0 .792-.081 1.108-.324.396-.322.632-.775.712-1.292 0-.162 0-.323-.08-.486-.08-.162-.16-.324-.32-.405-.16-.081-.32-.162-.48-.162-.16 0-.32.081-.48.162-.16.081-.24.243-.32.405zm0-6.066c-.08.162-.08.324-.08.486.08.517.316.97.712 1.292.316.243.712.324 1.108.324.396 0 .792-.081 1.108-.324.396-.322.632-.775.712-1.292 0-.162 0-.324-.08-.486-.08-.162-.16-.324-.32-.405-.16-.081-.32-.162-.48-.162-.16 0-.32.081-.48.162-.16.081-.24.243-.32.405zm5.743 0c-.08.162-.08.324-.08.486.08.517.316.97.712 1.292.316.243.712.324 1.108.324.396 0 .792-.081 1.108-.324.396-.322.632-.775.712-1.292 0-.162 0-.324-.08-.486-.08-.162-.16-.324-.32-.405-.16-.081-.32-.162-.48-.162-.16 0-.32.081-.48.162-.16.081-.24.243-.32.405zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-1.027.786-2.37 1.192-3.821 1.192h-.08c-1.451 0-2.794-.406-3.821-1.192C7.692 16.106 7 14.854 7 13.44c0-.324.08-.648.16-.97.08-.324.24-.566.4-.81.16-.162.32-.324.56-.405.24-.081.4-.162.64-.162h6.48c.24 0 .4.081.64.162.24.081.4.243.56.405.16.244.32.486.4.81.08.322.16.646.16.97 0 1.414-.692 2.666-1.719 3.452zm.079-5.252H7.48c-.24 0-.4-.081-.64-.162-.24-.081-.4-.243-.56-.405-.16-.244-.32-.486-.4-.81-.08-.322-.16-.646-.16-.97 0-1.414.692-2.666 1.719-3.452 1.027-.786 2.37-1.192 3.821-1.192h.08c1.451 0 2.794.406 3.821 1.192C16.188 6.627 16.88 7.879 16.88 9.293c0 .324-.08.648-.16.97-.08.324-.24.566-.4.81-.16.162-.32.324-.56.405-.24.081-.4.162-.64.162z" />
          </svg>
          <span className="hidden lg:inline">Linktree</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-opacity duration-200 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-black"
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
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-black"
              >
                Linktree
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
