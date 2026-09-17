import React, { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    quote: "Working with thenightera changed how our brand communicates. The reel they created stopped people mid-scroll — it actually felt like us.",
    name: 'Aryan Mehta',
    role: 'Founder',
    company: 'Streetwear label · Mumbai',
  },
  {
    quote: "Not just content — a full identity shift. Our DMs tripled in 6 weeks. They understood the brand before we fully understood it ourselves.",
    name: 'Priya Sharma',
    role: 'Beauty creator',
    company: 'Delhi',
  },
  {
    quote: "The web platform they built didn't just look incredible — it gave us the digital authority we were missing. Their PR strategy was the perfect addition.",
    name: 'Rohan Kapoor',
    role: 'Co-founder',
    company: 'D2C startup · Bangalore',
  },
];

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'));
    }, { threshold: 0.12 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: '7rem 0', background: 'white' }}>
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <p className="label" style={{ color: 'var(--ink-3)', marginBottom: '1rem' }}>
            What clients say
          </p>
          <h2 className="display-lg">
            Real brands. <br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Real results.</em>
          </h2>
        </div>

        {/* Testimonials — divider list */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                padding: '2.5rem 0',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'flex-end',
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div>
                <p style={{
                  fontSize: '1.2rem', fontWeight: 500, color: 'var(--ink)',
                  lineHeight: 1.55, maxWidth: '54ch', marginBottom: '1.5rem',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '24px', height: '1px', background: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>{t.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)', marginTop: '2px' }}>{t.role} &middot; {t.company}</p>
                  </div>
                </div>
              </div>
              <span className="label" style={{ color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
