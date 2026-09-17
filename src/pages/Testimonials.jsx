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
  { name: 'The Studio 11', role: 'Premium Salon · Indore', quote: "thenightera transformed our local presence. Before them, our social media was just existing. Now, it actively brings in high-ticket clients every week. Their understanding of aesthetics is unmatched." },
  { name: 'Dr. Siddharth Jain', role: 'Aesthetic Clinic · Indore', quote: "Trust is everything in our industry. They didn't just run ads; they built a completely premium narrative around our clinic through content. We saw a massive increase in consults within the first two months." },
  { name: 'Oven & Co.', role: 'Artisan Bakery · Indore', quote: "They built our entire brand identity from scratch and managed our launch campaign. The response was overwhelming. People thought we were an international franchise because of how premium the branding looked." }
]

function ScrubQuote({ t, i }) {
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
  // Review schema with real client names — helps Google show star ratings in search
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://thenightera.com/#localbusiness',
    name: 'thenightera',
    url: 'https://thenightera.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(TESTIMONIALS.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: TESTIMONIALS.map(t => ({
      '@type': 'Review',
      author: { '@type': 'Organization', name: t.name },
      reviewBody: t.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      publisher: { '@type': 'Organization', name: 'thenightera' },
    })),
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#fff' }}>
      <SEOHead
        title="Client Reviews — Best Marketing Agency in Indore"
        description="Read what our clients say about thenightera. Real reviews from Indore brands, creators, jewellers, cafes, clinics and businesses who trusted the best marketing agency in Indore with their growth."
        path="/testimonials"
        keywords="marketing agency reviews indore, client testimonials marketing company, best SMM agency reviews, web development reviews indore, thenightera reviews"
        schema={reviewSchema}
      />
      <PageHeader
        label="client stories"
        title="what they\nsay."
        sub="real words from real people who trusted us with their brand."
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem 8rem' }}>
        {TESTIMONIALS.map((t, i) => (
          <ScrubQuote key={t.name} t={t} i={i} />
        ))}
      </div>
    </div>
  )
}
