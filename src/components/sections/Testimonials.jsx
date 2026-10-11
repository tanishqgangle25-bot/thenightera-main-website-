import React, { useEffect, useRef } from 'react';

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

        <p className="reveal" style={{ maxWidth: '54ch', fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-2)' }}>
          We share client feedback only with permission. Want to hear about our work? <a href="/contact" style={{ color: 'var(--accent)' }}>Talk with us.</a>
        </p>
      </div>
    </section>
  );
}
