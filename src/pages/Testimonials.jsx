import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'
import SEOHead from '../components/SEOHead'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  { name: 'Kuber Shree Jewellers', role: 'Premium Jewelry Brand', quote: "We trusted them with our marketing, and they over-delivered. It wasn't just about running campaigns — they completely upgraded how our brand looks and feels to our customers." },
  { name: 'Symphony', role: 'Cafe & Restaurant', quote: "Our experience was incredible. They understood the exact vibe we wanted for our cafe and translated it perfectly into our marketing strategy. We saw a genuine shift in customer engagement." },
  { name: 'Top Creators', role: 'Network of 1.7M+, 49K+ & many more big creators', quote: "I've collaborated with many teams, but their editing and creative direction is on a completely different level. They know exactly how to hold attention and make the content look incredibly premium. It completely changed the game for our channels." },
  { name: 'Deepa Anand', role: 'Founder · Mumbai', quote: "I was genuinely impressed. The work is clean, intelligent, and premium. They don't just execute what you ask for — they elevate the whole concept. That is the standard they bring to everything." },
]

function ScrubQuote({ t }) {
  const ref = useRef(null)

  useEffect(() => {
    const words = ref.current.querySelectorAll('.qw')
    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { opacity: 0.08 },
        {
          opacity: 1, stagger: 0.025, ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
            end: 'bottom 30%',
            scrub: 0.9,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="py-10 md:py-16 border-b border-[#ECE6D8] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 items-start">
      {/* Attribution */}
      <div style={{ paddingTop: '0.4rem' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1d1d1f' }}>{t.name}</p>
        <p style={{ fontSize: '0.8rem', color: '#A39670', marginTop: '4px', lineHeight: 1.45 }}>{t.role}</p>
      </div>

      {/* Scrub quote */}
      <blockquote style={{ margin: 0 }}>
        <p style={{
          fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
          fontWeight: 500, lineHeight: 1.5,
          letterSpacing: '-0.02em', color: '#1d1d1f',
        }}>
          "{t.quote.split(' ').map((w, j, arr) => (
            <span key={j}><span className="qw" style={{ opacity: 0.08 }}>{w}</span>{j !== arr.length - 1 ? ' ' : ''}</span>
          ))}"
        </p>
      </blockquote>
    </div>
  )
}

export default function Testimonials() {
  return (
    <div style={{ minHeight: '100dvh', background: '#fff' }}>
      <SEOHead
        title="thenightera Client Feedback | Selected Reviews"
        description="Read selected client feedback about thenightera's brand identity, social media, creative, and digital work."
        path="/testimonials"
      />
      <PageHeader
        label="client stories"
        title={"what they\nsay."}
        sub="Selected feedback from thenightera client partnerships."
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem 8rem' }}>
        {TESTIMONIALS.map((t) => (
          <ScrubQuote key={t.name} t={t} />
        ))}
      </div>
    </div>
  )
}
