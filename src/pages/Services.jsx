import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEOHead from '../components/SEOHead'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Social Media & PR.',
    tagline: 'Your brand, always present.',
    desc: 'We handle everything — strategy, shooting, editing, posting, and strategic PR placements. You focus on the business. We make sure the world knows it exists, both on social and in the media.',
    what: [
      'Monthly content calendar',
      'Media placements & PR strategy',
      'Editing & post-production',
      'Community engagement',
    ],
    bg: '#ECE6D8',
    ink: '#2A2310',
    muted: '#7A6E50',
    accent: '#4D4828',
    dot: '#4D4828',
    img: '/images/phone-case.jpg'
  },
  {
    num: '02',
    title: 'Web\nDevelopment.',
    tagline: 'Your website should work as hard as you do.',
    desc: 'Fast, conversion-focused websites built with clean design and real performance. Not templates. Purpose-built digital presence that turns visitors into customers.',
    what: [
      'Custom React / Next.js builds',
      'Mobile-first pixel-perfect design',
      'SEO-optimized architecture',
      'Analytics & performance setup',
    ],
    bg: '#1d1d1f',
    ink: '#ffffff',
    muted: 'rgba(255,255,255,0.45)',
    accent: '#ECE6D8',
    dot: 'rgba(236,230,216,0.5)',
    img: '/images/coffee.jpg'
  }
]

/* ─── Individual service panel ─── */
function ServicePanel({ s, index }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 72%',
          once: true,
        },
      })

      // 1. Bg reveal from bottom
      tl.fromTo(panel.querySelector('.panel-bg'),
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.7, ease: 'power4.out' }, 0
      )

      // 2. Image Reveal (Parallax + Scale)
      tl.fromTo(panel.querySelector('.panel-img-wrapper'),
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.2
      )
      
      // Image Parallax on scroll
      gsap.to(panel.querySelector('.panel-img-inner'), {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // 3. Index label
      tl.fromTo(panel.querySelector('.panel-idx'),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.25
      )

      // 4. Title words slide up line by line
      const titleLines = panel.querySelectorAll('.title-line')
      tl.fromTo(titleLines,
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.08, duration: 0.75, ease: 'power4.out' }, 0.3
      )

      // 5. Tagline & Desc
      tl.fromTo(panel.querySelectorAll('.panel-fade-text'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, 0.55
      )

      // 6. List items stagger
      const items = panel.querySelectorAll('.panel-item')
      tl.fromTo(items,
        { opacity: 0, x: 22 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out' }, 0.7
      )

    }, panelRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={panelRef}
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated background */}
      <div className="panel-bg" style={{
        position: 'absolute', inset: 0,
        background: s.bg,
        zIndex: 0,
      }} />

      {/* Content wrapper */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-[clamp(5rem,12vh,9rem)] w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[clamp(3rem,8vw,7rem)] items-center">

        {/* LEFT: Text Content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span className="panel-idx" style={{
              fontSize: '0.65rem', fontFamily: 'monospace',
              color: s.muted, letterSpacing: '0.12em',
            }}>
              {s.num} / 02
            </span>
            <div style={{ flex: 1, height: '1px', background: `${s.muted}`, opacity: 0.3 }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.05em',
            lineHeight: 1.0,
            color: s.ink,
            margin: '0 0 1.25rem',
          }}>
            {s.title.split('\n').map((line, li) => (
              <span key={li} style={{
                display: 'block',
                overflow: 'hidden',
                paddingBottom: '0.06em',
              }}>
                <span className="title-line" style={{ display: 'block' }}>
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <p className="panel-fade-text" style={{
            fontSize: '0.8rem',
            color: s.muted,
            letterSpacing: '0.04em',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
          }}>
            — {s.tagline}
          </p>

          <p className="panel-fade-text" style={{
            fontSize: 'clamp(0.9rem, 1.2vw, 1.0625rem)',
            color: s.muted,
            lineHeight: 1.75,
            maxWidth: '42ch',
            marginBottom: '3rem',
          }}>
            {s.desc}
          </p>

          {/* What's Included (Moved to left under desc) */}
          <div>
            <p className="panel-fade-text" style={{
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: s.muted,
              marginBottom: '1rem',
              opacity: 0.7,
            }}>
              What's Included
            </p>
            <ul style={{
              listStyle: 'none',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
              padding: 0, margin: 0
            }}>
              {s.what.map((item) => (
                <li key={item} className="panel-item" style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                }}>
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: s.dot, flexShrink: 0, marginTop: '8px',
                  }} />
                  <span style={{
                    fontSize: '0.85rem',
                    color: s.ink,
                    opacity: 0.85,
                    lineHeight: 1.4,
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            
            {s.num === '01' && (
              <div className="panel-fade-text" style={{ marginTop: '2rem' }}>
                <Link to="/calma" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.85rem', color: s.ink, textDecoration: 'none',
                  fontWeight: 500, borderBottom: `1px solid ${s.muted}`,
                  paddingBottom: '0.2rem', transition: 'opacity 0.2s'
                }} onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Automate your restaurant reviews with Calma →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: High-End Image Container */}
        <div className="panel-img-wrapper" style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/5',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          transformOrigin: 'center center'
        }}>
          <img 
            className="panel-img-inner"
            src={s.img} 
            alt={s.title}
            style={{
              width: '100%',
              height: '130%', // Extra height for parallax
              objectFit: 'cover',
              position: 'absolute',
              top: '-15%', // Offset for parallax
              left: 0,
            }}
          />
        </div>
      </div>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 900px) {
          .srv-grid-${s.num} {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hw',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.88, ease: 'power4.out', delay: 0.12 }
      )
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.54 }
      )
      gsap.fromTo('.scroll-hint-hero',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.1 }
      )
      gsap.to('.scroll-arr',
        { y: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 1.1 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      height: '100dvh',
      display: 'flex', alignItems: 'center',
      background: '#fff',
      borderBottom: '1px solid #ECE6D8',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 2.5rem', width: '100%',
      }}>
        <p style={{
          fontSize: '0.68rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#A39670',
          fontWeight: 500, marginBottom: '2rem',
        }}>
          What We Do
        </p>

        <h1 style={{
          fontSize: 'clamp(3rem, 9vw, 8rem)',
          fontWeight: 700, letterSpacing: '-0.055em',
          lineHeight: 1.0, color: '#1d1d1f', margin: 0,
        }}>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.07em' }}>
            <span className="hw" style={{ display: 'inline-block', marginRight: '0.22em' }}>Two</span>
            <span className="hw" style={{ display: 'inline-block' }}>things.</span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.07em' }}>
            <span className="hw" style={{ display: 'inline-block', marginRight: '0.22em' }}>Done</span>
            <span className="hw" style={{ display: 'inline-block' }}>right.</span>
          </span>
        </h1>

        <p className="hero-sub" style={{
          marginTop: '2.25rem', fontSize: '1.0625rem',
          color: '#6e6e73', maxWidth: '44ch', lineHeight: 1.72,
        }}>
          We don't do everything. We do two things — and we do them at a level most agencies can't touch.
        </p>

        <div className="scroll-hint-hero" style={{
          marginTop: '4rem', display: 'flex',
          alignItems: 'center', gap: '0.75rem',
        }}>
          <span className="scroll-arr" style={{
            display: 'inline-block', color: '#A39670', fontSize: '1rem',
          }}>↓</span>
          <span style={{
            fontSize: '0.63rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#A39670', fontWeight: 500,
          }}>
            Scroll to explore both
          </span>
        </div>
      </div>
    </section>
  )
}

/* ─── Progress indicator ─── */
function ProgressBar() {
  const refs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      SERVICES.forEach((s, i) => {
        const dot = refs.current[i]
        if (!dot) return
        ScrollTrigger.create({
          trigger: `.service-panel-${i}`,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => gsap.to(dot, { scale: 1.6, background: '#1d1d1f', duration: 0.3 }),
          onLeave: () => gsap.to(dot, { scale: 1, background: '#D9C4B1', duration: 0.3 }),
          onEnterBack: () => gsap.to(dot, { scale: 1.6, background: '#1d1d1f', duration: 0.3 }),
          onLeaveBack: () => gsap.to(dot, { scale: 1, background: '#D9C4B1', duration: 0.3 }),
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{
      position: 'fixed', right: '2rem', top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 30, display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '0.75rem',
    }}>
      {SERVICES.map((s, i) => (
        <div
          key={s.num}
          ref={el => refs.current[i] = el}
          style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#D9C4B1',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  )
}

/* ─── CTA ─── */
function CTASection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-title-word',
        { yPercent: 110 },
        {
          yPercent: 0, stagger: 0.06, duration: 0.8, ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        }
      )
      gsap.fromTo('.cta-sub',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.45,
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        }
      )
      gsap.fromTo('.cta-btn-wrap',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', delay: 0.65,
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: '#fff', padding: '10rem 0',
      textAlign: 'center', borderTop: '1px solid #ECE6D8',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
        <p style={{
          fontSize: '0.68rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#A39670',
          fontWeight: 500, marginBottom: '2rem',
        }}>
          Ready?
        </p>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700, letterSpacing: '-0.05em',
          lineHeight: 1.0, color: '#1d1d1f',
          maxWidth: '14ch', margin: '0 auto 1.5rem',
        }}>
          {["Let's", "talk", "about", "your", "business."].map((w, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.06em', marginRight: '0.22em' }}>
              <span className="cta-title-word" style={{ display: 'inline-block' }}>{w}</span>
            </span>
          ))}
        </h2>

        <p className="cta-sub" style={{
          fontSize: '1rem', color: '#6e6e73', marginBottom: '3rem',
        }}>
          No fluff. Just a real conversation about what you need.
        </p>

        <div className="cta-btn-wrap">
          <Link to="/contact" style={{
            display: 'inline-block',
            background: '#1d1d1f', color: '#fff',
            fontSize: '0.9rem', fontWeight: 600,
            padding: '1rem 2.25rem', borderRadius: '999px',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.opacity = '1' }}
          >
            Book a call →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const serviceSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Social Media Management & PR',
      provider: {
        '@type': 'LocalBusiness',
        name: 'thenightera',
        url: 'https://thenightera.com',
      },
      areaServed: { '@type': 'City', name: 'Indore' },
      description: 'Complete social media management including content calendar, reel production, PR placements, community engagement. Best SMM agency in Indore.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Web Development',
      provider: {
        '@type': 'LocalBusiness',
        name: 'thenightera',
        url: 'https://thenightera.com',
      },
      areaServed: { '@type': 'City', name: 'Indore' },
      description: 'Custom React & Next.js web development with mobile-first design, SEO optimization, and performance analytics. Best web development company in Indore.',
    },
  ]

  return (
    <div style={{ background: '#fff' }}>
      <SEOHead
        title="Social Media & Web Development Services in Indore"
        description="thenightera offers premium social media management, web development, PR strategy & brand identity services in Indore, MP. Custom React builds, content calendars, reel production & more. Get a free consultation."
        path="/services"
        keywords="social media management services indore, web development services indore, SMM agency indore, website development indore, PR services indore, content marketing indore, reel production indore"
        schema={serviceSchema}
      />
      <Hero />
      <ProgressBar />
      {SERVICES.map((s, i) => (
        <div key={s.num} className={`service-panel-${i}`}>
          <ServicePanel s={s} index={i} />
        </div>
      ))}
      <CTASection />
    </div>
  )
}
