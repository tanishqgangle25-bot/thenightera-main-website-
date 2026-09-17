import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.h-badge', { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('.h-line', { y: 60, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }, '-=0.3')
        .from('.h-sub', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .from('.h-ctas', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.h-stats', { y: 16, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=0.5');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '96px',
        paddingBottom: '64px',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient warm gradient — very subtle */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '55vw', height: '70vh',
        background: 'radial-gradient(ellipse at top right, rgba(200,168,75,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Badge */}
        <div className="h-badge" style={{ marginBottom: '2.5rem' }}>
          <span className="badge">
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
              animation: 'pulse 2s infinite',
            }} />
            India&rsquo;s Premium Creative Studio
          </span>
        </div>

        {/* Headline — left aligned, large */}
        <h1 style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <span className="h-line display-xl" style={{ display: 'block' }}>
            Brands that
          </span>
          <span className="h-line display-xl" style={{ display: 'block', color: 'var(--ink-2)' }}>
            earn attention.
          </span>
        </h1>

        {/* Sub + CTAs row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: '2rem',
        }} className="flex-col md:grid">
          <div>
            <p className="h-sub body-lg" style={{ maxWidth: '42ch', marginBottom: '2rem' }}>
              AI-powered branding, content &amp; PR for creators and businesses
              who refuse to be invisible.
            </p>
            <div className="h-ctas" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary">
                Start a project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#work" className="btn-ghost">
                See our work
              </a>
            </div>
          </div>

          {/* Stats — right aligned */}
          <div style={{ display: 'flex', gap: '2.5rem', paddingBottom: '0.25rem' }}
            className="hidden lg:flex">
            {[
              { num: '50+', label: 'Brands built' },
              { num: '3×', label: 'Avg. growth' },
              { num: '2yr', label: 'Running' },
            ].map(({ num, label }) => (
              <div key={label} className="h-stats" style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {num}
                </p>
                <p className="label" style={{ color: 'var(--ink-3)', marginTop: '0.35rem' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: 0.3,
      }}>
        <div style={{ width: '1px', height: '40px', background: 'var(--ink)', animation: 'pulse 2s infinite' }} />
        <span className="label" style={{ fontSize: '9px' }}>scroll</span>
      </div>
    </section>
  );
}
