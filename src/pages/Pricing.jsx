import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { Diamond, Sparkles, ChevronDown } from 'lucide-react'
import SEOHead from '../components/SEOHead'

function FadeUp({ children, delay = 0, y = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  )
}

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0px 15px 30px -5px rgba(0,0,0, 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
}

const imageVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
}

function PricingCard({ title, price, priceDescription, desc, features, isHighlighted, imageSrc, imageAlt, useSparkles }) {
  const [expanded, setExpanded] = useState(false)
  const visibleCount = 3
  const hasMore = features.length > visibleCount

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      style={{
        background: '#ffffff',
        border: isHighlighted ? '2px solid #1d1d1f' : '1px solid #E5E5EA',
        borderRadius: '16px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isHighlighted ? '0 30px 60px rgba(0,0,0,0.08)' : '0 10px 30px rgba(0,0,0,0.03)',
        position: 'relative',
        height: '100%',
        color: '#1d1d1f'
      }}
    >
      {isHighlighted && (
        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#1d1d1f', color: '#ffffff', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 1.2rem', borderRadius: '99px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Recommended
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Card Header with optional image */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1d1d1f' }}>{title}</h3>
            {price && (
              <div style={{ marginTop: '0.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1d1d1f' }}>{price}</span>
                <p style={{ fontSize: '0.875rem', color: '#86868b', marginTop: '0.25rem' }}>{priceDescription}</p>
              </div>
            )}
          </div>
          {imageSrc && (
            <motion.img
              src={imageSrc}
              alt={imageAlt || title}
              style={{ width: '80px', height: '80px', objectFit: 'contain', userSelect: 'none' }}
              variants={imageVariants}
            />
          )}
        </div>

        {/* Card Description */}
        <p style={{ fontSize: '0.9rem', color: '#86868b', lineHeight: 1.5, minHeight: '60px', marginTop: '0.5rem' }}>{desc}</p>

        {/* Feature List — Collapsible */}
        <div style={{ marginTop: '1.5rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {features.slice(0, visibleCount).map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: '#1d1d1f', lineHeight: 1.4 }}>
                <div style={{ marginTop: '2px', color: isHighlighted ? '#7D2027' : '#1d1d1f' }}>
                  {useSparkles || f.includes('Calma') ? <Sparkles size={16} /> : <Diamond size={16} />}
                </div>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', overflow: 'hidden' }}
              >
                {features.slice(visibleCount).map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: '#1d1d1f', lineHeight: 1.4 }}
                  >
                    <div style={{ marginTop: '2px', color: isHighlighted ? '#7D2027' : '#1d1d1f' }}>
                      {useSparkles || f.includes('Calma') ? <Sparkles size={16} /> : <Diamond size={16} />}
                    </div>
                    <span>{f}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '100%', marginTop: '1rem', padding: '0.4rem 0',
                color: '#86868b', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1d1d1f'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#86868b'}
            >
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
          )}
        </div>
      </div>
      
      {/* Card Footer with Button */}
      <div style={{ marginTop: '2.5rem' }}>
        <Link to="/contact" style={{ display: 'block', textDecoration: 'none' }}>
          <button 
            style={{
              width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
              background: isHighlighted ? '#1d1d1f' : '#f5f5f7',
              color: isHighlighted ? '#fff' : '#1d1d1f',
              border: isHighlighted ? 'none' : '1px solid #E5E5EA',
              fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { if(!isHighlighted) e.currentTarget.style.background = '#e8e8ed' }}
            onMouseLeave={(e) => { if(!isHighlighted) e.currentTarget.style.background = '#f5f5f7' }}
          >
            Let's Talk
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const plans = [
    {
      title: "Starter",
      price: "₹25,000",
      priceDescription: "Starting from",
      desc: "For emerging brands establishing a refined digital presence.",
      features: [
        "6 signature reels & 1 shoot day",
        "8 Social media posters",
        "Content strategy & Monthly calendar",
        "Story design & brand themes",
        "Captions & Color grading",
        "AI-powered content research"
      ],
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75",
      imageAlt: "Pink cherry blossom tree",
      useSparkles: false
    },
    {
      title: "Growth",
      price: "₹50,000",
      priceDescription: "Starting from",
      desc: "Scale your brand and command authority. Our most popular package.",
      isHighlighted: true,
      features: [
        "12 signature reels & 2 shoot days",
        "16 Social media posters",
        "Creator partnership & on-camera talent",
        "Story design & brand themes",
        "Professional photography & Ad creatives",
        "Social media management & Monthly analytics",
        "Priority delivery",
        "AI-powered competitor analysis"
      ],
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-v98BP3EQdx0Yd0NkjHPnWx33WvzwGP.png&w=320&q=75",
      imageAlt: "Yellow autumn tree",
      useSparkles: true
    },
    {
      title: "Elite",
      price: "₹90,000+",
      priceDescription: "Starting from",
      desc: "Your dedicated in-house content team. Everything handled, nothing missed.",
      features: [
        "20 signature reels & up to 6 shoot days",
        "25 Social media posters",
        "Calma access included",
        "Full content team & Brand strategy",
        "Creator partnerships & styled talent",
        "Paid ads creatives & Website support",
        "Monthly strategy meetings",
        "Trend prediction & performance reports"
      ],
      imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-gyoxLFpXzRRzVsgPJOKvB2r4tvzpcy.png&w=320&q=75",
      imageAlt: "Pink cherry blossom tree",
      useSparkles: true
    }
  ]

  return (
    <div style={{ minHeight: '100dvh', background: '#f5f5f7' }}>
      <SEOHead
        title="Premium Social Media Marketing Packages | thenightera"
        description="Transparent pricing from thenightera. Social media management from ₹25K/mo, web development, PR strategy. No hidden fees. Book a free call."
        path="/pricing"
        keywords="digital marketing agency, social media marketing, web development, branding, public relations"
      />
      <PageHeader
        label="Pricing Plans"
        title="Transparent Pricing, No Surprises"
        sub="We build your brand, plan your content, produce it, analyze what works, and help you grow."
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2.5rem 8rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <FadeUp key={plan.title} delay={i * 0.1}>
              <PricingCard {...plan} />
            </FadeUp>
          ))}
        </div>

        {/* Retainer Disclaimer */}
        <FadeUp delay={0.25}>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#86868b', marginTop: '2rem', letterSpacing: '0.03em' }}>
            Ad spend not included. Minimum 3-month commitment on all retainers.
          </p>
        </FadeUp>

        {/* Unique Request Card */}
        <FadeUp delay={0.3}>
          <div style={{ marginTop: '4rem', background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #E5E5EA', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1d1d1f' }}>Unique Request</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#86868b', maxWidth: '600px' }}>
              Are you looking for something custom? Don't hesitate to contact us, and we'll help brainstorm your product to success.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/contact" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <button 
                  style={{
                    padding: '0.5rem 1.5rem', borderRadius: '8px',
                    background: '#1d1d1f', color: '#fff',
                    border: 'none', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Let's Talk
                </button>
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* SEO FAQ Section */}
        <FadeUp delay={0.4}>
          <div style={{ marginTop: '4rem', padding: '0 1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '1.5rem' }}>
              Frequently Asked Questions About Our Pricing
            </h2>
            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1d1d1f' }}>What is the cost of social media marketing?</h3>
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#6e6e73', lineHeight: 1.6 }}>
                  Our social media management packages start at ₹25,000 per month. This cost includes content strategy, design, copywriting, and monthly performance tracking. Prices shown are in INR. International projects are quoted according to scope, production location, and payment requirements.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1d1d1f' }}>How much does a custom website cost?</h3>
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#6e6e73', lineHeight: 1.6 }}>
                  Our Web Development and landing page services start at ₹45,000+. We build custom, fast, and SEO-optimized web experiences using React and Next.js, tailored specifically for brands looking to establish a strong digital presence worldwide.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
