import React, { useEffect, useRef } from 'react';

const SERVICES = [
  {
    num: '01',
    title: 'Brand Identity',
    body: 'Logos, visual systems, brand guidelines — everything that makes your audience say they know you before you speak.',
    tag: 'Design',
  },
  {
    num: '02',
    title: 'AI & Automation',
    body: 'Intelligent pipelines that scale your output without scaling your team. 20+ hours saved, every week.',
    tag: 'Technology',
  },
  {
    num: '03',
    title: 'Content & Reels',
    body: 'Cinematic storytelling — scripted, shot, and edited to stop the scroll and build real audiences.',
    tag: 'Creative',
  },
  {
    num: '04',
    title: 'PR & Growth',
    body: 'Media placements and ecosystem strategy that put you in conversations you were never part of before.',
    tag: 'Growth',
  },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} style={{ padding: '7rem 0', background: 'var(--bg)' }}>
      <div className="container">
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <h2 className="display-lg" style={{ maxWidth: '14ch' }}>
            What we <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>actually</em> do.
          </h2>
        </div>

        {/* 2-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }} className="grid-cols-1-md-grid-cols-2">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className="reveal"
              style={{
                background: 'var(--bg)',
                padding: '2.75rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px',
                cursor: 'default',
                transition: 'background 0.3s ease',
                transitionDelay: `${i * 0.06}s`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--ink-3)', letterSpacing: '0.1em' }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                  fontWeight: 600, color: 'var(--accent)',
                  border: '1px solid rgba(200,168,75,0.3)', borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                }}>
                  {s.tag}
                </span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.025em',
                  color: 'var(--ink)', marginBottom: '0.75rem', lineHeight: 1.1,
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: '38ch' }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
