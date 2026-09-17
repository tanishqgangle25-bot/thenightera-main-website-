import React from 'react';

const ITEMS = [
  'Brand Identity', '✦', 'PR Strategy', '✦',
  'Reels & Content', '✦', 'PR & Growth', '✦',
  'Social Strategy', '✦', 'Calma — Our Product', '✦',
  'Brand Identity', '✦', 'PR Strategy', '✦',
  'Reels & Content', '✦', 'PR & Growth', '✦',
  'Social Strategy', '✦', 'Calma — Our Product', '✦',
];

export default function Marquee() {
  return (
    <section style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      padding: '1rem 0',
      background: 'white',
    }}>
      <div className="marquee-inner">
        {ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: item === '✦' ? '0.75rem' : '0.75rem',
              fontWeight: item === '✦' ? 400 : 600,
              letterSpacing: item === '✦' ? 0 : '0.12em',
              textTransform: item === '✦' ? 'none' : 'uppercase',
              color: item === '✦' ? 'var(--accent)' : 'var(--ink-3)',
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
