import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import SEOHead from '../components/SEOHead'

const FAQS = [
  { q: 'What kind of brands do you work with?', a: 'We work with creators, D2C brands, startups, and established businesses worldwide. If you are serious about building a brand that earns attention, we are the right partner.' },
  { q: 'What makes thenightera different from other design studios?', a: 'thenightera brings brand identity, social media, web development, and public relations together, so the story stays consistent across every customer touchpoint.' },
  { q: 'How long does a project take?', a: 'Timing depends on the scope, deliverables, and feedback process. We confirm a realistic schedule in the proposal before work begins.' },
  { q: 'Do you work on a retainer or project basis?', a: 'Both. One-time project work for brand identity and web builds. Monthly retainers for ongoing social media management and PR.' },
  { q: 'What social media management services do you offer?', a: 'We offer complete social media management including monthly content calendars, reel scripting and production, professional editing, community engagement, influencer collaborations, and strategic PR placements. We manage Instagram, LinkedIn, YouTube, and more.' },
  { q: 'Can you help with a logo or visual identity?', a: 'Yes. We can scope a logo or build a broader visual identity system based on what your brand needs.' },
  { q: 'What kind of websites do you build?', a: 'We build fast, conversion-focused websites using React and Next.js. Every website is custom-designed, mobile-first, SEO-optimized, and built for performance. We don\'t use templates.' },
  { q: 'What kind of clients do you work with?', a: 'Founders who understand the value of design and are ready to scale. We work across D2C, tech, hospitality, and B2B industries.' },
  { q: 'Do you work with clients outside Indore?', a: 'Yes. We are based in Indore, India, and work with brands worldwide. We collaborate remotely across countries and time zones; on-site production is scoped by location.' },
  { q: 'How do you handle PR?', a: 'We shape a clear story, prepare media-ready materials, identify relevant outlets, and plan outreach. Editorial coverage is decided by publishers, so placements are never guaranteed.' },
  { q: 'What is calma?', a: 'Calma is our restaurant feedback-intelligence product. It helps teams understand guest comments, notice recurring themes, and decide what to improve. It supports team decisions rather than automatically replying to reviews.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ minHeight: '100dvh', background: '#fff' }}>
      <SEOHead
        title="thenightera FAQs | Services, Process and Pricing"
        description="Answers about thenightera services, project timelines, pricing, web development, social media, PR, and working with brands worldwide."
        path="/faq"
      />
      <PageHeader
        label="questions"
        title={"we've got\nanswers."}
        sub="everything you need to know about working with us."
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2.5rem 8rem' }}>
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderBottom: '1px solid #ECE6D8' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between',
                padding: '1.75rem 0', background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'left', gap: '1.5rem',
              }}
            >
              <span style={{
                fontSize: '1.0625rem', fontWeight: 600,
                color: '#1d1d1f', letterSpacing: '-0.015em', lineHeight: 1.4,
              }}>
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  border: '1px solid #D9C4B1', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6h8" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    paddingBottom: '1.75rem',
                    fontSize: '0.9375rem', color: '#6e6e73',
                    lineHeight: 1.72, maxWidth: '58ch',
                  }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
