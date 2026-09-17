import React, { useState, useEffect } from 'react';
import { LiquidMetalButton } from './ui/liquid-metal-button';

const NAV_LINKS = [
  { label: 'work', href: '/portfolio' },
  { label: 'calma', href: '/calma' },
  { label: 'services', href: '/#services' },
  { label: 'testimonials', href: '/#testimonials' },
  { label: 'faq', href: '/#faq' },
  { label: 'pricing', href: '/pricing' },
  { label: 'contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'rgba(250,250,248,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(17,17,16,0.07)' : '1px solid transparent',
      }}
    >
      <nav
        className="container"
        style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            thenightera
          </span>
        </a>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none' }} className="hidden md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="nav-link">{label}</a>
            </li>
          ))}
        </ul>

        {/* CTA — LiquidMetal "book now" */}
        <div className="hidden md:flex" style={{ alignItems: 'center' }}>
          <LiquidMetalButton
            label="book now"
            onClick={() => window.location.href = '/contact'}
          />
        </div>
      </nav>
    </header>
  );
}
