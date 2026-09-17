import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolioData from '../portfolioData.json'
import SEOHead from '../components/SEOHead'

gsap.registerPlugin(ScrollTrigger)

/* ─── 3D Coverflow Gallery ─── */
function Gallery3D({ category, videos, onBack }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRefs = useRef([])
  
  const total = videos.length
  // Radius of the 3D circle
  const radius = Math.max(800, total * 150)
  // Angle per item
  const theta = 360 / total

  // Setup initial 3D positions
  useEffect(() => {
    if (!trackRef.current) return
    const cards = trackRef.current.children
    
    gsap.set(trackRef.current, { transformStyle: 'preserve-3d' })
    
    for (let i = 0; i < cards.length; i++) {
      const angle = i * theta
      gsap.set(cards[i], {
        rotationY: -angle,
        z: radius,
        transformOrigin: `50% 50% ${-radius}px`
      })
    }
  }, [total, radius, theta])

  // Rotate track when activeIndex changes
  useEffect(() => {
    if (!trackRef.current) return
    const angle = activeIndex * theta
    
    gsap.to(trackRef.current, {
      rotationY: angle,
      duration: 1.2,
      ease: 'power3.out',
      overwrite: 'auto'
    })

    // Handle video playback: only play the active video
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === activeIndex) {
        vid.play().catch(() => {})
        gsap.to(vid.parentElement, { opacity: 1, scale: 1, duration: 0.5 })
      } else {
        vid.pause()
        gsap.to(vid.parentElement, { opacity: 0.4, scale: 0.85, duration: 0.5 })
      }
    })
  }, [activeIndex, theta])

  // Handle wheel scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        setActiveIndex(prev => (prev + 1) % total)
      } else if (e.deltaY < 0) {
        setActiveIndex(prev => (prev - 1 + total) % total)
      }
    }
    
    const el = containerRef.current
    if (el) el.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel)
    }
  }, [total])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed', inset: 0,
        background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1200px',
        overflow: 'hidden',
        zIndex: 100
      }}
    >
      {/* Top Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', zIndex: 110
      }}>
        <button 
          onClick={onBack}
          style={{
            background: 'none', border: 'none', color: '#ECE6D8',
            fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          ← Back to Categories
        </button>
        <div style={{
          color: '#ECE6D8', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase'
        }}>
          {category} <span style={{ opacity: 0.5, marginLeft: '1rem' }}>{activeIndex + 1} / {total}</span>
        </div>
      </div>

      {/* 3D Track */}
      <div 
        ref={trackRef}
        style={{
          position: 'relative',
          width: '340px', height: '600px', // Slightly larger container
          transformStyle: 'preserve-3d',
          transform: `translateZ(${-radius}px)`
        }}
      >
        {videos.map((vidSrc, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              position: 'absolute', inset: 0,
              background: '#0a0a0a', // Darker background to blend letterboxing
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <video
              ref={el => videoRefs.current[i] = el}
              src={vidSrc}
              loop
              muted
              playsInline
              preload="metadata"
              title={`Portfolio work for ${category}`}
              aria-label={`Video showcasing ${category} work`}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain' // Ensures full ratio without cropping
              }}
            />
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div style={{
        position: 'absolute', bottom: '3rem',
        color: '#ECE6D8', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        opacity: 0.5
      }}>
        Scroll to rotate
      </div>
    </motion.div>
  )
}

/* ─── Category List View ─── */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(null)
  
  // Enter animation for categories
  useEffect(() => {
    if (activeCategory) return
    gsap.fromTo('.cat-item',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power4.out', delay: 0.2 }
    )
  }, [activeCategory])

  const activeData = activeCategory ? portfolioData.find(d => d.category === activeCategory) : null

  return (
    <div style={{ minHeight: '100dvh', background: '#FAFAF8', position: 'relative' }}>
      <SEOHead
        title="Portfolio — Brand, Social Media & Web Projects"
        description="Browse thenightera's portfolio of social media campaigns, brand identities, web development projects, and reels. Real work from the best marketing agency in Indore, MP."
        path="/portfolio"
        keywords="marketing portfolio indore, social media reels portfolio, web development showcase indore, brand identity projects"
      />
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="list"
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
            style={{
              padding: 'clamp(8rem, 15vh, 12rem) 2.5rem 5rem',
              maxWidth: '1200px', margin: '0 auto'
            }}
          >
            <p style={{
              fontSize: '0.68rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#A39670',
              fontWeight: 500, marginBottom: '2rem',
            }}>
              The Vault
            </p>
            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 700, letterSpacing: '-0.04em',
              lineHeight: 1.0, color: '#1d1d1f', margin: '0 0 2rem',
            }}>
              Visual<br/>Playground.
            </h1>

            <a 
              href="https://drive.google.com/drive/folders/1_yH9ofbtMNfJeeMkE9u9LgWWinoh4hSh" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                marginBottom: '4rem',
                background: '#1d1d1f',
                color: '#fff',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#7D2027'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1d1d1f'}
            >
              <span>View Heavy VFX / AI Videos</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {portfolioData.map((data) => (
                <div 
                  key={data.category}
                  className="cat-item"
                  onClick={() => setActiveCategory(data.category)}
                  style={{
                    padding: '2rem 0',
                    borderBottom: '1px solid #ECE6D8',
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    group: 'true'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget.querySelector('.cat-title'), { x: 20, color: '#7D2027', duration: 0.4, ease: 'power3.out' })
                    gsap.to(e.currentTarget.querySelector('.cat-count'), { opacity: 1, x: -10, duration: 0.4 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget.querySelector('.cat-title'), { x: 0, color: '#1d1d1f', duration: 0.4, ease: 'power3.out' })
                    gsap.to(e.currentTarget.querySelector('.cat-count'), { opacity: 0.4, x: 0, duration: 0.4 })
                  }}
                >
                  <h2 className="cat-title" style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 600, letterSpacing: '-0.03em', color: '#1d1d1f',
                    margin: 0, transition: 'color 0.4s'
                  }}>
                    {data.category}
                  </h2>
                  <span className="cat-count" style={{
                    fontSize: '1rem', fontFamily: 'monospace', color: '#A39670', opacity: 0.4
                  }}>
                    {String(data.videos.length).padStart(2, '0')} videos
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <Gallery3D 
            key="gallery"
            category={activeData.category} 
            videos={activeData.videos} 
            onBack={() => setActiveCategory(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}
