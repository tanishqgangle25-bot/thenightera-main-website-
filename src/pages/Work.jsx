import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JellyfishDrift from '../components/ui/jelly-fish'
import SEOHead from '../components/SEOHead'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { 
    name: 'Social Media Marketing & PR', 
    cat: 'Content & Perception', 
    desc: 'End-to-end content production and strategic media placements. From scripting to shooting, we build distribution engines that command attention and position your brand as an absolute authority.', 
    img: '/images/work folder/ssm.png',
    bgColor: '#f1f1f7'
  },
  { 
    name: 'Web Development', 
    cat: 'Digital Infrastructure', 
    desc: 'High-performance, conversion-optimized web experiences. Purpose-built digital real estate that actually drives revenue.', 
    img: '/images/work folder/web dev.png',
    bgColor: '#f5f5f7'
  },
  { 
    name: 'Personal Branding', 
    cat: 'Authority Building', 
    desc: 'We craft and elevate your personal brand. By leveraging targeted content and narrative engineering, we turn industry leaders into digital icons.', 
    img: '/images/work folder/personal branding.png',
    bgColor: '#ffffff'
  },
]

function ProjectRow({ p, i }) {
  const isEven = i % 2 === 0;
  const containerRef = useRef(null)
  
  // Parallax Scroll Effect for Text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60])
  
  // Magnetic Mouse Hover Effect for Image
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 })
  
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

  // Split title for stagger reveal
  const titleWords = p.name.split(' ')
  
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4rem',
        padding: '10rem 2rem',
        borderBottom: i === PROJECTS.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
        flexWrap: 'wrap'
      }}
    >
      <motion.div style={{ flex: '1 1 400px', padding: '0 2rem', y: textY }}>
        <span style={{ fontSize: '1rem', fontFamily: 'monospace', color: '#888', letterSpacing: '0.1em', fontWeight: 600 }}>
          0{i + 1} // {p.cat}
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#111', lineHeight: 1.05, marginTop: '1.5rem', letterSpacing: '-0.04em', display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
          {titleWords.map((word, idx) => (
             <motion.span 
                key={idx}
                initial={{ opacity: 0, y: 40, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block' }}
             >
               {word}
             </motion.span>
          ))}
        </h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: titleWords.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '1.25rem', color: '#555', marginTop: '1.5rem', lineHeight: 1.6, maxWidth: '38ch' }}>
          {p.desc}
        </motion.p>
      </motion.div>

      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', alignItems: 'center', perspective: '1000px' }}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0.4, rotate: isEven ? -15 : 15, opacity: 0, y: 150 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
          style={{ 
            position: 'relative', 
            width: 'clamp(280px, 30vw, 420px)',
            height: 'clamp(280px, 30vw, 420px)',
            borderRadius: '50%',
            overflow: 'hidden',
            background: p.bgColor,
            boxShadow: '0 40px 80px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.5)',
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            cursor: 'crosshair'
          }}
        >
          <motion.img
            src={p.img}
            alt={p.name}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translateZ(40px) scale(1.1)' 
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <div style={{ minHeight: '100dvh', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <SEOHead
        title="Our Work — Case Studies & Brand Projects"
        description="Explore thenightera's portfolio of brand identity, social media campaigns, and web development projects. See how the best marketing agency in Indore delivers results for brands across India."
        path="/work"
        keywords="marketing portfolio indore, brand case studies, social media campaign examples, web development projects indore"
      />
      <JellyfishDrift />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem 8rem', position: 'relative' }}>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.name} p={p} i={i} />
        ))}
      </div>
    </div>
  )
}
