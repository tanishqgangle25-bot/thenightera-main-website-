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
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [mediaState, setMediaState] = useState({})
  const videoRefs = useRef([])
  
  const total = videos.length
  // Radius of the 3D circle
  const radius = Math.max(800, total * 150)
  // Angle per item
  const theta = 360 / total

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = (event) => setIsMobile(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  // Setup initial 3D positions
  useEffect(() => {
    if (!trackRef.current) return
    const cards = trackRef.current.children
    
    if (isMobile) {
      gsap.set(trackRef.current, { rotationY: 0, transformStyle: 'flat' })
      gsap.set(cards, { clearProps: 'transform,transformOrigin,rotationY,z' })
      return
    }

    gsap.set(trackRef.current, { transformStyle: 'preserve-3d' })
    
    for (let i = 0; i < cards.length; i++) {
      const angle = i * theta
      gsap.set(cards[i], {
        rotationY: -angle,
        z: radius,
        transformOrigin: `50% 50% ${-radius}px`
      })
    }
  }, [total, radius, theta, isMobile])

  // Rotate track when activeIndex changes
  useEffect(() => {
    if (!trackRef.current) return
    if (!isMobile) {
      const angle = activeIndex * theta
      gsap.to(trackRef.current, {
        rotationY: angle,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      })
    }

    // Handle video playback: only play the active video
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === activeIndex) {
        if (vid.readyState >= 2) vid.play().catch(() => {})
        else vid.load()
        if (!isMobile) gsap.to(vid.parentElement, { opacity: 1, scale: 1, duration: 0.35 })
      } else {
        vid.pause()
        if (!isMobile) gsap.to(vid.parentElement, { opacity: 0.4, scale: 0.85, duration: 0.35 })
      }
    })
  }, [activeIndex, theta, isMobile])

  const isNearActive = (index) => {
    if (isMobile) return index === activeIndex
    const distance = Math.abs(index - activeIndex)
    return distance <= 1 || distance >= total - 1
  }

  const updateMediaState = (src, state) => {
    setMediaState(current => current[src] === state ? current : { ...current, [src]: state })
  }

  // Handle Touch Swipes for Mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 40 

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) setActiveIndex(prev => (prev + 1) % total) // Swipe Left (Next)
    if (distance < -minSwipeDistance) setActiveIndex(prev => (prev - 1 + total) % total) // Swipe Right (Prev)
  }

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          width: 'min(85vw, 340px)', 
          height: isMobile ? 'min(68vh, 580px)' : 'min(75vh, 600px)',
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
          transform: isMobile ? 'none' : `translateZ(${-radius}px)`
        }}
      >
        {videos.map((vidSrc, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              position: isMobile ? 'relative' : 'absolute', inset: 0,
              display: isMobile && i !== activeIndex ? 'none' : 'flex',
              background: '#0a0a0a', 
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.05)',
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            {/* Loading Skeleton */}
            {isNearActive(i) && mediaState[vidSrc] !== 'ready' && mediaState[vidSrc] !== 'error' && <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50">
               <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-3" />
               <span className="text-[0.6rem] tracking-[0.2em] uppercase text-white/50">Loading Video...</span>
            </div>}

            {mediaState[vidSrc] === 'error' && <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-8 text-center text-white/70">
              <span className="text-sm">This video could not play.</span>
              <button type="button" onClick={() => { updateMediaState(vidSrc, 'loading'); videoRefs.current[i]?.load() }} className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-wider">Try again</button>
            </div>}
            
            {/* Video Player */}
            {isNearActive(i) && <video
              ref={el => videoRefs.current[i] = el}
              src={vidSrc}
              muted
              playsInline
              autoPlay={i === activeIndex}
              controls={i === activeIndex}
              preload={i === activeIndex ? 'auto' : 'metadata'}
              onCanPlay={() => {
                updateMediaState(vidSrc, 'ready')
                if (i === activeIndex) videoRefs.current[i]?.play().catch(() => {})
              }}
              onError={() => updateMediaState(vidSrc, 'error')}
              onEnded={() => setActiveIndex(prev => (prev + 1) % total)}
              title={`Portfolio work for ${category}`}
              aria-label={`Video showcasing ${category} work`}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain', 
                position: 'relative',
                zIndex: 10
              }}
            />}
          </div>
        ))}
      </div>

      {/* Gallery controls */}
      <div style={{
        position: 'absolute', bottom: '2.5rem',
        color: '#ECE6D8', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        textAlign: 'center', width: '100%', padding: '0 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'
      }}>
        <button type="button" aria-label="Previous video" onClick={() => setActiveIndex(prev => (prev - 1 + total) % total)} className="rounded-full border border-white/25 px-4 py-2 text-white/80">← Prev</button>
        <span className="hidden md:inline opacity-60">Scroll to rotate</span>
        <span className="inline md:hidden opacity-60">Swipe</span>
        <button type="button" aria-label="Next video" onClick={() => setActiveIndex(prev => (prev + 1) % total)} className="rounded-full border border-white/25 px-4 py-2 text-white/80">Next →</button>
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
        description="Browse thenightera's portfolio of social media campaigns, brand identities, web development projects, and reels for brands worldwide."
        path="/portfolio"
        keywords="digital marketing agency, social media marketing, web development, branding, public relations"
      />
      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="list"
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5 } }}
            className="px-6 md:px-10 pb-20 pt-[clamp(6rem,15vh,12rem)] max-w-[1200px] mx-auto"
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

            <div className="flex flex-col md:flex-row gap-4 mb-16">
              <a 
                href="https://drive.google.com/drive/folders/1hX4afQ-7O19Du79x8JipGl3XH4gi_Y4P" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1.1rem 1.8rem',
                  background: 'linear-gradient(135deg, #1d1d1f, #3a3a3c)',
                  color: '#ECE6D8',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.15)',
                  transform: 'translateZ(0)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 25px 40px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.15)'; }}
              >
                <span>View Our Whole Vault</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>

              <a 
                href="https://drive.google.com/drive/folders/1_yH9ofbtMNfJeeMkE9u9LgWWinoh4hSh" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1.1rem 1.8rem',
                  background: 'transparent',
                  color: '#1d1d1f',
                  border: '1px solid rgba(29,29,31,0.2)',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'background 0.3s ease, color 0.3s ease',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(29,29,31,0.05)'; e.currentTarget.style.border = '1px solid rgba(29,29,31,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.border = '1px solid rgba(29,29,31,0.2)'; }}
              >
                <span>Heavy VFX / AI Videos</span>
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {portfolioData.map((data) => (
                <div 
                  key={data.category}
                  className="cat-item group py-6 md:py-8 border-b border-[#ECE6D8] cursor-pointer flex flex-col md:flex-row md:items-center justify-between"
                  onClick={() => setActiveCategory(data.category)}
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
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
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
