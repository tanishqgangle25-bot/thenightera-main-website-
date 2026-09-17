import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Reusable animated page header — word-by-word slide up
 * Usage: <PageHeader label="section" title="big heading\nsecond line" sub="subtitle text" />
 */
export default function PageHeader({ label, title, sub }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade
      gsap.fromTo('.ph-label',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.05 }
      )
      // Words slide up from overflow clip
      gsap.fromTo('.ph-word',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.055, duration: 0.82,
          ease: 'power4.out', delay: 0.12 }
      )
      // Subtitle
      gsap.fromTo('.ph-sub',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.55 }
      )
      // Divider line draw
      gsap.fromTo('.ph-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: 'power3.out', delay: 0.7,
          transformOrigin: 'left' }
      )
    }, ref)
    return () => ctx.revert()
  }, [title])

  const lines = title.split('\n')

  return (
    <section ref={ref} style={{
      padding: '5rem 0 4rem',
      background: '#fff',
      borderBottom: '1px solid #ECE6D8',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
        {label && (
          <p className="ph-label" style={{
            fontSize: '0.7rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#A39670',
            fontWeight: 500, marginBottom: '1.5rem',
          }}>
            {label}
          </p>
        )}

        <h1 style={{
          fontSize: 'clamp(2.75rem, 7vw, 6.5rem)',
          fontWeight: 600, letterSpacing: '-0.05em',
          lineHeight: 1.08, color: '#1d1d1f', margin: 0,
        }}>
          {lines.map((line, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
              {line.split(' ').map((word, wi) => (
                <span key={wi} className="ph-word" style={{
                  display: 'inline-block',
                  marginRight: '0.28em',
                  willChange: 'transform',
                }}>
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {sub && (
          <p className="ph-sub" style={{
            marginTop: '1.75rem',
            fontSize: '1.0625rem',
            color: '#6e6e73',
            maxWidth: '46ch',
            lineHeight: 1.7,
          }}>
            {sub}
          </p>
        )}

        <div className="ph-line" style={{
          marginTop: '3rem',
          height: '1px',
          background: '#ECE6D8',
        }} />
      </div>
    </section>
  )
}
