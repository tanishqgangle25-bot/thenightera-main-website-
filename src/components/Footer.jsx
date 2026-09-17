import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: 'var(--ink)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '2.5rem 0',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>
            thenightera
          </span>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.25)' }}>
          &copy; {year} thenightera. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=officialnightera@gmail.com' },
            { label: 'WhatsApp', href: 'https://wa.me/918251000525' },
            { label: 'Instagram', href: 'https://instagram.com/thenightera' },
            { label: 'calma', href: 'https://heycalma.in' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
