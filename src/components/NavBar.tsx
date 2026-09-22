'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tiers', label: 'Tiers' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/docs', label: 'Docs' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-black/90 backdrop-blur border-b border-white/10 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-brand-accent glow">TBS</span>
          <span className="text-white/60 ml-2 text-sm font-normal hidden sm:inline">Trade By Second</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link text-sm">
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:contact@de-asi-interface.io"
            className="bg-brand-accent text-black text-sm font-bold px-5 py-2 rounded-lg hover:brightness-110 transition"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-accent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-black/95 border-b border-white/10 px-6 pt-2 pb-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-brand-accent transition"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:contact@de-asi-interface.io"
            className="bg-brand-accent text-black text-sm font-bold px-5 py-2 rounded-lg text-center hover:brightness-110 transition"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
