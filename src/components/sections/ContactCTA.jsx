import React, { useEffect, useRef } from 'react';

export default function ContactCTA() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.15 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '8rem 0',
        background: 'var(--ink)',
        color: 'white',
      }}
    >
      <div className="container">
        <div className="reveal" style={{ marginBottom: '1rem' }}>
          <p className="label" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Ready when you are
          </p>
        </div>
        <h2 className="reveal display-xl" style={{ color: 'white', marginBottom: '2.5rem', maxWidth: '14ch' }}>
          Let&rsquo;s build something<br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>unforgettable.</em>
        </h2>
        <div className="reveal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="mailto:hello@thenightera.in"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              background: 'var(--accent)', color: 'var(--ink)',
              fontWeight: 700, fontSize: '0.9375rem',
              padding: '0.9rem 1.75rem', borderRadius: '999px',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            hello@thenightera.in
          </a>
          <a
            href="https://instagram.com/thenightera"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 500, fontSize: '0.9375rem',
              padding: '0.9rem 1.75rem', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
          >
            Instagram &rsaquo;
          </a>
        </div>
      </div>
    </section>
  );
}
