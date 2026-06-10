'use client';

import { useState, FormEvent } from 'react';
import NeuralNetworkBackground from './NeuralNetworkBackground';

const socialLinks = [
  {
    href: 'mailto:syedayaan9376@gmail.com',
    label: 'syedayaan9376@gmail.com',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    href: 'tel:+919546177737',
    label: '+91-9546177737',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/ayaxan7',
    label: 'github.com/ayaxan7',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    external: true,
  },
  {
    href: 'https://linkedin.com/in/ayaan',
    label: 'LinkedIn',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    external: true,
  },
  {
    href: 'https://medium.com/@syedayaan9376',
    label: 'Medium',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    external: true,
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24">
      <NeuralNetworkBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Get in Touch</h2>
        <div 
          className="w-16 h-px mx-auto mb-8"
          style={{ backgroundColor: 'var(--divider-accent)' }}
        />

        <p 
          className="text-lg text-center max-w-xl mx-auto mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of
          your vision.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-colors focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--border-color)'
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 transition-colors focus:outline-none"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--border-color)'
                    }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="subject" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--border-color)'
                  }}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 transition-colors resize-none focus:outline-none"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--border-color)'
                  }}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 text-sm font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hero-btn-primary"
                style={{ 
                  backgroundColor: 'var(--accent-bg)',
                  color: 'var(--accent-text)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--accent-bg)'
                }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-sm text-center">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm text-center">{errorMessage}</p>
              )}
            </form>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Contact Info</h3>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 transition-all duration-300 group theme-link"
                  style={{ 
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
