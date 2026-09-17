import { useRef, useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LiquidMetalButton } from '../components/ui/liquid-metal-button'
import { FrameSequenceHero } from '../components/ui/mac-book-neo-hero'
import { Check, ChevronDown, Sparkles } from 'lucide-react'
import SEOHead from '../components/SEOHead'
gsap.registerPlugin(ScrollTrigger)

/* ─── SHARED ─── */
function FadeUp({ children, delay = 0, y = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   1. HERO — MacBook Image Sequence (Apple Style)
   ═══════════════════════════════════════════ */
function Hero() {
  const steps = [
    { from: 0.02, to: 0.28, color: "#7D2027", num: "01", total: "04", icon: "✦",
      title: "Presence, Engineered.",
      description: "We don't chase trends. We architect the digital presence of brands that dictate them.",
      label: "Identity" },
    { from: 0.28, to: 0.55, color: "#A39670", num: "02", total: "04", icon: "◐",
      title: "A refined narrative.",
      description: "Every pixel, every frame, crafted to earn attention and command authority in a noisy world.",
      label: "Strategy" },
    { from: 0.55, to: 0.82, color: "#D9C4B1", num: "03", total: "04", icon: "▣",
      title: "Design that captivates.",
      description: "Premium aesthetics combined with hardware-accelerated animations for silky-smooth motion.",
      label: "Experience" },
    { from: 0.82, to: 0.92, color: "#ECE6D8", num: "04", total: "04", icon: "⌁",
      title: "Built for dominance.",
      description: "Because good isn't enough. We build for the extraordinary.",
      label: "Results" },
  ];

  return (
    <FrameSequenceHero
      scrollHeight="500vh"
      brand={
        <>
          <span className="fsh-brand-dot" />
          thenightera.
        </>
      }
      navLinks={[
        { label: "Work", href: "#" },
        { label: "Services", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
      ]}
      ctaLabel="Start a project"
      ctaHref="/contact"
      title={
        <>
          <span className="fsh-title-dark">Welcome to</span>{" "}
          <br />
          <span className="fsh-title-rainbow">thenightera</span>
        </>
      }
      subtitle="Scroll to explore our world."
      steps={steps}
    />
  );
}

/* ═══════════════════════════════════════════
   2. TICKER — Dual-speed marquee
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   3. SERVICES — 3D Apple Scroll Reveal
   ═══════════════════════════════════════════ */
const APPLE_SERVICES = [
  { 
    title: 'Social Media Marketing', 
    sub: 'Our flagship service. We engineer high-impact visual campaigns and strategic influencer partnerships that command attention and drive relentless growth across every platform.', 
    img: '/images/tanu/ssm.jpg' 
  },
  { 
    title: 'Web Development', 
    sub: 'High-end, 3D luxury web experiences. We craft immersive digital environments with Apple-level polish that separate your brand from the noise.', 
    img: '/images/tanu/web dev.png' 
  },
]

function ServiceCard3D({ s, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  // Fly-in from bottom deep Z to flat 0 Z
  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0])
  const z = useTransform(scrollYProgress, [0, 1], [-800, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1])

  // Mouse Parallax Effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseRotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const mouseRotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={ref} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '2000px' }}>
      
      {/* Scroll Fly-In Layer */}
      <motion.div 
        className="w-[90vw] md:w-[85vw] max-w-[1200px] h-[82vh] md:h-[70vh]"
        style={{ rotateX, z, opacity, transformStyle: 'preserve-3d' }}
      >
        
        {/* Mouse Parallax Layer */}
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`w-full h-full rounded-[30px] md:rounded-[40px] bg-white/85 backdrop-blur-[30px] shadow-[0_50px_100px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(255,255,255,1)] flex flex-col md:flex-row${i % 2 === 0 ? '' : '-reverse'}`}
          style={{ 
            rotateX: mouseRotateX,
            rotateY: mouseRotateY,
            transformStyle: 'preserve-3d',
            cursor: 'crosshair',
            overflow: 'hidden'
          }}
        >
          {/* Text Layer - pops out */}
          <div className="p-6 md:p-20 flex flex-col justify-center shrink-0" style={{ transform: 'translateZ(60px)' }}>
            <p style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#A39670', marginBottom: '1rem', letterSpacing: '0.1em' }}>0{i+1} / 02</p>
            <h3 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#1d1d1f', lineHeight: 1.0, marginBottom: '1rem' }}>{s.title}</h3>
            <p style={{ fontSize: '1rem', color: '#4D4828', lineHeight: 1.6, maxWidth: '450px' }}>{s.sub}</p>
          </div>

          {/* Image Layer - pops out even further */}
          <div className="flex-1 relative mx-4 mb-4 md:m-8 rounded-[20px] md:rounded-[30px] overflow-hidden" style={{ transform: 'translateZ(100px) scale(0.95)' }}>
            <img src={s.img} alt={s.title} className="w-full h-full object-cover md:object-cover object-top" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }} draggable={false} />
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

function Services3DApple() {
  return (
    <section style={{ background: '#ffffff', paddingTop: '10rem', overflow: 'hidden' }}>
      <div className="container">
        <FadeUp>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A39670', fontWeight: 500, marginBottom: '0.75rem', textAlign: 'center' }}>Our Core Services</p>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.05em', color: '#1d1d1f', lineHeight: 1.0, marginBottom: '2rem', textAlign: 'center' }}>
            Two disciplines.<br />One elite team.
          </h2>
        </FadeUp>
      </div>
      
      <div style={{ paddingBottom: '10vh' }}>
        {APPLE_SERVICES.map((s, i) => (
          <ServiceCard3D key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   4. THE VAULT — 3D Arch Gallery
   ═══════════════════════════════════════════ */

const VAULT_ITEMS = [
  { trackingText: 'Our AI', label: 'heycalma.in', img: '/images/tanu/calma.png' },
  { trackingText: 'Social Media Marketing', label: 'Amavi Indore', img: '/images/tanu/ssm.jpg' },
  { trackingText: 'Web Development', label: 'Kuber Shree', img: '/images/tanu/web dev.png' },
]

function VaultArchGallery() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  // Rotate the entire wheel from 30deg to -30deg as we scroll (perfect for 3 cards)
  const wheelRotation = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section ref={containerRef} style={{ background: '#ffffff', position: 'relative', height: '400vh', overflow: 'clip' }}>
      
      {/* Sticky view */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Central Text */}
        <div style={{ position: 'absolute', top: '35vh', zIndex: 20, textAlign: 'center', pointerEvents: 'none' }}>
           <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '1rem', fontWeight: 600 }}>Selected Work</p>
           <h2 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 800, letterSpacing: '-0.06em', color: '#1d1d1f', lineHeight: 0.95, textShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>The<br />Vault.</h2>
        </div>

        {/* The 3D Wheel */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            bottom: 'calc(-1 * min(70vh, 90vw))', // Responsive bottom push
            width: '0px', 
            height: '0px', 
            rotate: wheelRotation,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {VAULT_ITEMS.map((w, i) => {
            // Distribute 3 cards exactly (-30deg, 0deg, 30deg)
            const angle = -30 + (i * 30)
            return (
              <div 
                key={i} 
                style={{ 
                  position: 'absolute', 
                  transform: `rotate(${angle}deg) translateY(calc(-1 * min(110vh, 140vw)))`,
                  transformOrigin: 'bottom center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                  <div 
                    className="vault-arch-card" 
                    style={{ 
                      width: 'clamp(260px, 20vw, 320px)', 
                      height: 'clamp(360px, 30vh, 440px)', 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      position: 'relative', 
                      boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                      cursor: 'crosshair',
                    }}
                  >
                    <img src={w.img} alt={w.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
                  </div>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.8)', 
                    backdropFilter: 'blur(10px)', 
                    padding: '0.5rem 1.25rem', 
                    borderRadius: '99px', 
                    border: '1px solid rgba(0,0,0,0.05)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                  }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d1d1f', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                      {w.trackingText}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   5. STATS — Animated counters on scroll
   ═══════════════════════════════════════════ */
function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = end / (duration * 60)
        const tick = () => {
          start = Math.min(start + step, end)
          setCount(Math.floor(start))
          if (start < end) requestAnimationFrame(tick)
        }
        tick()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function StatsSection() {
  const stats = [
    { num: 53, suffix: 'K+', label: 'Followers grown', sub: 'across client accounts' },
    { num: 12, suffix: 'M+', label: 'Organic impressions', sub: 'generated for brands' },
    { num: 14, suffix: '+', label: 'Industries served', sub: 'in Indore & beyond' },
    { num: 96, suffix: '%', label: 'Client retention', sub: 'long-term partnerships' },
  ]

  return (
    <section className="bg-white py-20 md:py-40 border-t border-[#E5E5EA]">
      <div className="container">
        <FadeUp>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A39670', fontWeight: 500, textAlign: 'center', marginBottom: '5rem' }}>The scale</p>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-[#E5E5EA]">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ borderRight: '1px solid #E5E5EA', borderBottom: '1px solid #E5E5EA', padding: '2rem 1.5rem' }}>
              <div style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.05em', color: '#1d1d1f', lineHeight: 1 }}>
                <CountUp end={s.num} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1d1d1f', marginTop: '1rem', letterSpacing: '-0.01em' }}>{s.label}</p>
              <p style={{ fontSize: '0.75rem', color: '#A39670', marginTop: '0.25rem' }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   6. PROCESS — Scroll-scrubbed timeline reveal
   ═══════════════════════════════════════════ */
function ProcessSection() {
  const ref = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', end: 'bottom 60%', scrub: 1 }
      })
      gsap.utils.toArray('.proc-step').forEach((step, i) => {
        gsap.fromTo(step, { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 75%', toggleActions: 'play none none none' }
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const steps = [
    { num: '01', title: 'Discovery call', body: 'We learn your business, goals, and current gaps. No scripts — a real conversation about what actually matters.' },
    { num: '02', title: 'Strategy build', body: 'We map a content and growth strategy specific to your market, category, and audience. Your roadmap, from scratch.' },
    { num: '03', title: 'Execution', body: 'Our team shoots, edits, builds, and deploys — every single week. No follow-ups needed from your end.' },
    { num: '04', title: 'Compound & grow', body: 'We track results, learn what compounds, and double down. Month after month, the flywheel gets faster.' },
  ]

  return (
    <section className="bg-[#ECE6D8] py-20 md:py-36">
      <div className="container">
        <FadeUp>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A39670', fontWeight: 500, marginBottom: '0.75rem' }}>How it works</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.05em', color: '#1d1d1f', lineHeight: 1.0, marginBottom: '5rem' }}>
            Simple process.<br />Real results.
          </h2>
        </FadeUp>
        <div ref={ref} className="flex flex-col md:grid md:grid-cols-[1fr_3fr] gap-8 md:gap-16 relative">
          {/* Timeline bar hidden on mobile for cleaner layout */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-[#D9C4B1]">
            <div ref={lineRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#7D2027', transformOrigin: 'top', transform: 'scaleY(0)' }} />
          </div>
          <div className="hidden md:block" /> 
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((s, i) => (
              <div key={s.num} className="proc-step" style={{ opacity: 0 }}>
                <p style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#7D2027', opacity: 0.6, marginBottom: '0.75rem', letterSpacing: '0.1em' }}>{s.num} / 04</p>
                <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#1d1d1f', lineHeight: 1.0, marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ fontSize: '1rem', color: '#4D4828', opacity: 0.75, lineHeight: 1.75, maxWidth: '48ch' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   7. TESTIMONIAL — Word-by-word scroll reveal
   ═══════════════════════════════════════════ */
function TestimonialReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tw', { opacity: 0.07 }, {
        opacity: 1, stagger: 0.022, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 65%', end: 'bottom 40%', scrub: 0.8 }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-white py-20 md:py-44 border-t border-[#E5E5EA]">
      <div className="container">
        <div style={{ maxWidth: '960px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A39670', fontWeight: 500, marginBottom: '3rem' }}>What clients say</p>
          <p ref={ref} style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#1d1d1f', lineHeight: 1.4 }}>
            {`"thenightera transformed how our business is perceived. Within months, we had stronger brand equity, higher-value customers, and social content that actually stopped people mid-scroll."`.split(' ').map((w, i, arr) => (
              <span key={i}><span className="tw" style={{ opacity: 0.07 }}>{w}</span>{i !== arr.length - 1 ? ' ' : ''}</span>
            ))}
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#D9C4B1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#4D4828', flexShrink: 0 }}>K</div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1d1d1f' }}>Kuber Shree Jewellers</p>
              <p style={{ fontSize: '0.75rem', color: '#A39670' }}>Indore, Madhya Pradesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   8. CLIENTS / TRUST STRIP
   ═══════════════════════════════════════════ */
function ClientsSection() {
  const clients = [
    { name: 'Kuber Shree', cat: 'Jewellery' },
    { name: 'Amavi Cafe', cat: 'F&B' },
    { name: 'Symphony', cat: 'Restaurant' },
    { name: 'Oven & Co.', cat: 'Bakery' },
    { name: 'Dr. Siddharth', cat: 'Healthcare' },
    { name: 'Studio 11', cat: 'Salon' },
    { name: '49K+ Creator', cat: 'Content' },
    { name: '1.7M Network', cat: 'Collab' },
  ]
  return (
    <section className="bg-[#1d1d1f] py-20 md:py-28">
      <div className="container">
        <FadeUp>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 500, textAlign: 'center', marginBottom: '3.5rem' }}>Trusted by brands across Indore & beyond</p>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5">
          {clients.map((c, i) => (
            <motion.div key={c.name}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{ background: '#1d1d1f', padding: '2.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.4rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>{c.name}</p>
              <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{c.cat}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   9. CALMA SPOTLIGHT
   ═══════════════════════════════════════════ */
function CalmaSpotlight() {
  return (
    <section style={{ background: '#ECE6D8', padding: '9rem 0', borderTop: '1px solid #D9C4B1' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <FadeUp>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A39670', fontWeight: 500, marginBottom: '1.5rem' }}>Case study</p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.055em', color: '#1d1d1f', lineHeight: 0.95, marginBottom: '1.5rem' }}>heycalma.in</h2>
            <p style={{ fontSize: '1.05rem', color: '#4D4828', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '44ch' }}>A complete brand and digital identity for a premium wellness cafe. From logo to website to social — built to attract a premium audience.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['Branding', 'Web', 'Social'].map(t => <span key={t} style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A6E50', border: '1px solid #C4B49A', padding: '0.35rem 0.9rem', borderRadius: '999px' }}>{t}</span>)}
            </div>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#1d1d1f', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', borderBottom: '1px solid #1d1d1f', paddingBottom: '2px', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >View case study →</Link>
          </FadeUp>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', background: '#0D1F0D' }}>
            <img src="/images/coffee.jpg" alt="heycalma" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'transform 0.8s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   10. FOUNDER STORY (SEO / MANIFESTO)
   ═══════════════════════════════════════════ */
function FounderStory() {
  const paragraphs = [
    "Most companies create content. Some build brands. We believe the future belongs to businesses that build interconnected ecosystems.",
    "**thenightera** exists to help companies make that transition.",
    "We don't see branding as a logo, a website, a campaign, or a collection of social media posts. We see it as an ecosystem where every interaction, every design decision, every customer experience, and every piece of technology works together with purpose. A brand should not only look exceptional. It should communicate and grow. That's why we believe the strongest companies of tomorrow won't simply have better marketing. They'll have better systems.",
    "At thenightera, creativity is only the beginning. Behind every visual is a strategy. Behind every campaign is data. Behind every website is performance. We combine design, storytelling, technology, social media management, and web development into a single ecosystem that helps businesses become faster, smarter, and more valuable over time.",
    "We don't measure success by how much content we publish or how many campaigns we launch. We measure success by what those creations accomplish. Does the website create trust? Does the film create emotion? Does the design become recognizable? Does every experience move the business forward? If the answer is no, then the work isn't finished.",
    "Technology has changed the way businesses operate, but too many companies still treat creativity and technology as separate disciplines. We believe they should never exist apart. Design should understand data. Web development should support creativity. Social media should drive real connection. Every tool should make businesses more human by giving people more time to focus on what truly matters: building relationships, creating ideas, and delivering extraordinary experiences.",
    "Our philosophy is built around one belief: businesses shouldn't need ten different partners to build their future. Branding, websites, content production, social media management, digital experiences, PR, and growth strategy should work together as one connected system. Every project we create becomes another layer of that system, strengthening the foundation for everything that follows.",
    "We care deeply about craftsmanship. Not because perfection is fashionable, but because details shape perception. The spacing on a website. The pacing of a film. The movement of an animation. The words people read. The speed of a page. Individually they seem small. Together they define how a business is experienced. Excellence is rarely created by one big decision. It's created by hundreds of thoughtful ones.",
    "As the digital world becomes increasingly complex, simplicity becomes more valuable. We believe the best experiences feel effortless because the complexity has already been solved behind the scenes. Whether we're designing a visual identity, producing cinematic content, managing social ecosystems, building digital platforms, or securing PR placements, our objective remains the same: remove friction, increase clarity, and create experiences that simply work.",
    "Founded by **Tanishq Gangle**, **thenightera** was created with a long-term vision that extends far beyond a traditional creative agency. We are building a company where creativity meets engineering, where technology serves people, and where interconnected systems become the foundation of modern business. Every product we build, every client we partner with, and every idea we pursue moves us toward that vision.",
    "We don't believe the next generation of great companies will be defined by the amount of content they produce. They will be defined by how intelligently they operate, how consistently they communicate, and how intentionally they evolve.",
    "That future is already being built.",
    "And **thenightera** is building the systems behind it.",
    "We are not building another agency.",
    "**We are building the ecosystem behind the next generation of brands.**"
  ]

  return (
    <section style={{ background: '#ffffff', padding: '12rem 0', borderTop: '1px solid #E5E5EA' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeUp>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A39670', fontWeight: 600, marginBottom: '2rem' }}>The Vision</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#1d1d1f', lineHeight: 1.1, marginBottom: '2rem' }}>
              We don't just build brands. We build interconnected ecosystems.
            </h2>
            
            {/* Highly optimized text block for AI Overviews and ChatGPT (GEO) */}
            <p className="speakable" style={{ fontSize: '1.125rem', color: '#1d1d1f', lineHeight: 1.8, fontWeight: 600, marginBottom: '3rem', borderLeft: '3px solid #1d1d1f', paddingLeft: '1.5rem' }}>
              thenightera is recognized as the best marketing agency in Indore, Madhya Pradesh. Founded by Tanishq Gangle, we are a premium digital marketing company specializing in social media management, custom web development, PR strategy, and brand identity design. We help businesses across India transform their digital presence into interconnected ecosystems that drive real growth.
            </p>
          </FadeUp>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {paragraphs.map((p, i) => (
              <FadeUp key={i} delay={0.1}>
                <p 
                  style={{ 
                    fontSize: '1.125rem', 
                    color: '#4a4a4f', 
                    lineHeight: 1.8, 
                    fontWeight: p.includes('**') ? 500 : 400 
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: p.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: 700; color: #1d1d1f;">$1</span>') 
                  }} 
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   11. FINAL CTA
   ═══════════════════════════════════════════ */
function FinalCTA() {
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fl', { opacity: 0, yPercent: 80 }, {
        opacity: 1, yPercent: 0, stagger: 0.12, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{ background: '#1d1d1f', padding: '11rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(125,32,39,0.15) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: '3rem' }}>Ready to begin?</p>
        <h2 style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', fontWeight: 900, letterSpacing: '-0.06em', color: '#ffffff', lineHeight: 0.9, marginBottom: '3.5rem', overflow: 'hidden' }}>
          {["Let's build", "something", "unforgettable."].map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
              <span className="fl" style={{ display: 'block', opacity: 0 }}>{line}</span>
            </span>
          ))}
        </h2>
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <LiquidMetalButton label="Book a free call" onClick={() => navigate('/contact')} />
          <Link to="/portfolio" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', fontWeight: 500, padding: '0.85rem 2rem', borderRadius: '999px', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          >See our work</Link>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════ */
export default function Home() {
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://thenightera.com/#localbusiness',
      name: 'thenightera',
      alternateName: 'The Nightera',
      image: 'https://thenightera.com/hero.jpg',
      description: 'thenightera is the best marketing agency in Indore, Madhya Pradesh. We provide social media management, web development, PR strategy, brand identity, and content production services to businesses across India.',
      url: 'https://thenightera.com',
      telephone: '+918251000525',
      email: 'officialnightera@gmail.com',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Bank Transfer, UPI',
      openingHours: 'Mo-Sa 10:00-20:00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Indore',
        addressLocality: 'Indore',
        addressRegion: 'Madhya Pradesh',
        postalCode: '452001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.7196,
        longitude: 75.8577,
      },
      areaServed: [
        { '@type': 'City', name: 'Indore' },
        { '@type': 'City', name: 'Bhopal' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'State', name: 'Madhya Pradesh' },
        { '@type': 'Country', name: 'India' },
      ],
      serviceType: [
        'Social Media Management',
        'Web Development',
        'PR Strategy',
        'Brand Identity',
        'Content Production',
        'Digital Marketing',
      ],
      founder: {
        '@type': 'Person',
        name: 'Tanishq Gangle',
        jobTitle: 'Founder & Creative Director',
      },
      sameAs: [
        'https://instagram.com/thenightera',
        'https://youtube.com/@thenightera',
        'https://wa.me/918251000525',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'thenightera',
      url: 'https://thenightera.com',
      description: 'Best marketing agency in Indore — social media management, web development, and PR strategy.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://thenightera.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <>
      <SEOHead
        title="Best Marketing Agency in Indore — Social Media & Web Development"
        description="thenightera is the #1 marketing agency in Indore, Madhya Pradesh. We specialize in social media management, web development, PR strategy & brand identity. Trusted by 50+ brands across India. Book a free consultation today."
        path="/"
        keywords="best marketing agency in indore, top marketing company indore, social media marketing indore, digital marketing agency indore, web development company indore, best SMM agency indore, marketing firm indore mp, branding agency indore"
        schema={homeSchema}
      />
      <Hero />
      <Services3DApple />
      <VaultArchGallery />
      <StatsSection />
      <ProcessSection />
      <TestimonialReveal />
      <ClientsSection />
      <CalmaSpotlight />
      <FounderStory />
      <FinalCTA />
    </>
  )
}
