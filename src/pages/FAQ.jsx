import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import SEOHead from '../components/SEOHead'

const FAQS = [
  { q: 'What kind of brands do you work with?', a: 'We work with creators, D2C brands, startups, and established businesses across India. If you are serious about building a brand that earns attention, we are the right partner.' },
  { q: 'Why is thenightera the best marketing agency in Indore?', a: 'thenightera combines social media management, web development, and PR strategy into one ecosystem. We don\'t just create content — we build intelligent brand systems. Based in Indore, we have helped 50+ brands grow their presence across India.' },
  { q: 'How long does a project take?', a: 'Brand identity projects typically take 3–4 weeks. Full ecosystem builds (brand + web + SMM) are 6–10 weeks.' },
  { q: 'Do you work on a retainer or project basis?', a: 'Both. One-time project work for brand identity and web builds. Monthly retainers for ongoing social media management and PR.' },
  { q: 'What social media management services do you offer in Indore?', a: 'We offer complete social media management including monthly content calendars, reel scripting and production, professional editing, community engagement, influencer collaborations, and strategic PR placements. We manage Instagram, LinkedIn, YouTube, and more.' },
  { q: 'Can you just make us a logo?', a: 'No. A logo without a system is just a decoration. We only take on full brand identity or ecosystem projects.' },
  { q: 'What kind of websites do you build?', a: 'We build fast, conversion-focused websites using React and Next.js. Every website is custom-designed, mobile-first, SEO-optimized, and built for performance. We don\'t use templates.' },
  { q: 'What kind of clients do you work with?', a: 'Founders who understand the value of design and are ready to scale. We work across D2C, tech, hospitality, and B2B industries.' },
  { q: 'Do you work with clients outside Indore?', a: 'Yes. While we are based in Indore, Madhya Pradesh, we work with brands and businesses across India. Our primary markets include Indore, Bhopal, Mumbai, Delhi, and Bangalore.' },
  { q: 'How do you handle PR?', a: 'We secure strategic media placements that put you in conversations you were never part of before, seamlessly integrating with your social media strategy and campaigns.' },
  { q: 'What is calma?', a: 'Calma is our own product — an AI-powered review management system for restaurants in India. It automatically replies to Google, Zomato, and Swiggy reviews 24/7. Visit heycalma.in to learn more.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  // FAQPage schema — critical for Google AI Overview
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#fff' }}>
      <SEOHead
        title="FAQs — Marketing Services Indore"
        description="Frequently asked questions about thenightera — the best marketing agency in Indore. Learn about our social media management, web development, PR services, pricing, and how we work with brands across India."
        path="/faq"
        keywords="marketing agency FAQ indore, social media management questions, web development questions indore, best marketing company indore FAQ"
        schema={faqSchema}
      />
      <PageHeader
        label="questions"
        title="we've got\nanswers."
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
