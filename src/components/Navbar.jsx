import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
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
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 110 }}>
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

          {/* CTA — LiquidMetal "book now" (Desktop) */}
          <div className="hidden md:flex" style={{ alignItems: 'center' }}>
            <LiquidMetalButton
              label="book now"
              onClick={() => window.location.href = '/contact'}
            />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{ color: 'var(--ink)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99, // just below the header
              background: 'rgba(250,250,248,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '2rem',
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <motion.li 
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <a 
                    href={href} 
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontFamily: 'Outfit',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      textDecoration: 'none',
                      textTransform: 'lowercase',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginTop: '1rem' }}
            >
              <LiquidMetalButton
                label="book now"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/contact';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
