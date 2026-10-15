import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { Diamond, ChevronDown } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import PricingExperience3D from '../components/pricing/PricingExperience3D'
import PricingInquiryModal from '../components/pricing/PricingInquiryModal'

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

function PricingCard({ title, monthlyPrice, annualPrice, annualSavings, tagline, desc, features, inheritedFeatures = [], isHighlighted, cta, billing, scopeLevel, scopeLabel, selectedPlan, onSelect, onInquiry }) {
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()
  const isSelected = selectedPlan === title
  const visibleCount = 3
  const allFeatures = [...features.flatMap((group) => group.items), ...inheritedFeatures.flatMap((group) => group.items)]
  const hasMore = allFeatures.length > visibleCount
  const annual = billing === 'annual'

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      style={{
        background: '#ffffff',
        border: isSelected ? '2px solid #7D2027' : isHighlighted ? '2px solid #1d1d1f' : '1px solid #E5E5EA',
        borderRadius: '18px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isSelected ? '0 24px 55px rgba(125,32,39,0.14)' : isHighlighted ? '0 30px 60px rgba(0,0,0,0.08)' : '0 10px 30px rgba(0,0,0,0.03)',
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
        <div>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: '#7D2027', fontWeight: 650 }}>thenightera partnership</p>
          <h3 style={{ marginTop: '0.45rem', fontSize: '2rem', letterSpacing: '-0.055em', lineHeight: 1, color: '#1d1d1f', fontWeight: 750 }}>{title}</h3>
          <p style={{ marginTop: '1.4rem', fontSize: '0.78rem', color: '#86868b' }}>Starting at</p>
          {annual ? (
            <>
              <p style={{ marginTop: '0.3rem', color: '#1d1d1f' }}><strong style={{ fontSize: '2.25rem', letterSpacing: '-0.05em' }}>{annualPrice}</strong><span style={{ color: '#86868b' }}> / year</span></p>
              <p style={{ marginTop: '0.15rem', fontSize: '0.82rem', color: '#6e6e73' }}>Equivalent to {monthlyPrice}/month, billed annually</p>
              <p style={{ marginTop: '0.7rem', fontSize: '0.8rem', fontWeight: 700, color: '#39704b' }}>Save {annualSavings} annually</p>
            </>
          ) : (
            <p style={{ marginTop: '0.3rem', color: '#1d1d1f' }}><strong style={{ fontSize: '2.25rem', letterSpacing: '-0.05em' }}>{monthlyPrice}</strong><span style={{ color: '#86868b' }}> / month</span></p>
          )}
        </div>

        <div style={{ paddingTop: '1.1rem', borderTop: '1px solid #ececef' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#86868b', fontWeight: 700 }}>Designed for</p>
          <p style={{ marginTop: '0.45rem', fontSize: '1.05rem', lineHeight: 1.4, color: '#1d1d1f', fontWeight: 600 }}>{tagline}</p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.88rem', lineHeight: 1.55, color: '#6e6e73' }}>{desc}</p>
          <p style={{ marginTop: '1.3rem', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#86868b', fontWeight: 700 }}>What’s included</p>
          {inheritedFeatures.length > 0 && <p style={{ marginTop: '0.55rem', fontSize: '0.83rem', color: '#55555a' }}>Everything in {title === 'Prime' ? 'Core' : 'Prime'}, plus:</p>}
        </div>

        <div style={{ marginTop: '0.5rem', display: 'grid', gap: '1rem' }}>
          {features.slice(0, 1).map((group) => (
            <section key={group.title}>
              <h4 style={{ fontSize: '0.76rem', color: '#7D2027', fontWeight: 700, marginBottom: '0.5rem' }}>{group.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.55rem' }}>
                {group.items.slice(0, 3).map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.84rem', color: '#1d1d1f', lineHeight: 1.4 }}>
                    <Diamond size={14} style={{ flex: '0 0 auto', marginTop: '2px', color: isHighlighted ? '#7D2027' : '#1d1d1f' }} />{item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div style={{ marginTop: '0.35rem', padding: '0.9rem 1rem', borderRadius: '12px', background: isSelected ? '#fbf4f2' : '#f7f7f8', border: isSelected ? '1px solid #ead3d0' : '1px solid #eeeeef' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
            <div>
              <p style={{ fontSize: '0.63rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#86868b', fontWeight: 700 }}>Partnership scope</p>
              <p style={{ marginTop: '0.25rem', fontSize: '0.85rem', fontWeight: 650, color: '#1d1d1f' }}>{scopeLabel}</p>
            </div>
            <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '30px' }}>
              {[1, 2, 3].map((step) => (
                <motion.span key={step} initial={false} animate={{ scaleY: reduceMotion || isSelected ? (step <= scopeLevel ? 1 : 0.22) : 0.22, opacity: step <= scopeLevel ? 1 : 0.4 }} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 190, damping: 20, delay: isSelected ? step * 0.09 : 0 }} style={{ display: 'block', width: '8px', height: `${12 + step * 5}px`, borderRadius: '8px', background: step <= scopeLevel ? '#7D2027' : '#d9d9dc', transformOrigin: 'bottom' }} />
              ))}
            </div>
          </div>
          <button type="button" aria-pressed={isSelected} onClick={() => onSelect(isSelected ? null : title)} style={{ marginTop: '0.75rem', border: 0, padding: 0, background: 'none', color: '#7D2027', fontSize: '0.75rem', fontWeight: 650, cursor: 'pointer' }}>
            {isSelected ? 'Previewing this tier · change' : `Preview ${title}`}
          </button>
          <AnimatePresence>
            {isSelected && <motion.p initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.28 }} style={{ marginTop: '0.55rem', color: '#6e6e73', fontSize: '0.75rem', lineHeight: 1.45 }}>A quick sense of the team, production, and support included in {title}.</motion.p>}
          </AnimatePresence>
        </div>

        {/* Full feature list — expandable */}
        <div style={{ marginTop: '1.5rem' }}>
          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', overflow: 'hidden' }}
              >
                {[...features, ...inheritedFeatures].flatMap((group) => [
                  <li key={`${group.title}-heading`} style={{ listStyle: 'none', marginTop: '0.5rem', fontSize: '0.76rem', color: '#7D2027', fontWeight: 700 }}>{group.title}</li>,
                  ...group.items.map((item, itemIndex) => {
                    const isPreviewed = group === features[0] && itemIndex < 3
                    if (isPreviewed) return null
                    return <motion.li key={`${group.title}-${item}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: '#1d1d1f', lineHeight: 1.4 }}><Diamond size={15} style={{ flex: '0 0 auto', marginTop: '2px', color: isHighlighted ? '#7D2027' : '#1d1d1f' }} /><span>{item}</span></motion.li>
                  })
                ])}
              </motion.ul>
            )}
          </AnimatePresence>

          {hasMore && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-label={expanded ? `Show fewer ${title} inclusions` : `See everything included in ${title}`}
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
              <span style={{ fontSize: '0.78rem', fontWeight: 600, marginRight: '0.4rem' }}>{expanded ? 'Show less' : 'See everything included'}</span><motion.div
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
          <button type="button" onClick={onInquiry}
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
            {cta}
          </button>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('Prime')
  const [inquiryPlan, setInquiryPlan] = useState(null)
  const plans = [
    {
      title: "Core",
      scopeLevel: 1,
      scopeLabel: "Creative foundation",
      monthlyPrice: "₹25,000",
      annualPrice: "₹2,70,000",
      annualSavings: "₹30,000",
      tagline: "Build your brand on a strong foundation.",
      desc: "For businesses establishing a premium digital presence through consistent creative execution and strategic direction.",
      cta: "Start Your Partnership",
      features: [
        { title: "Creative Production", items: ["6 Signature Cinematic Reels", "8 Premium Brand Creatives", "1 Professional Production Day", "Creative Direction", "Premium Color Grading", "Platform-Optimized Delivery", "Content Copywriting"] },
        { title: "Brand Strategy", items: ["Monthly Growth Strategy", "Content Planning", "Monthly Content Calendar", "Trend & Competitor Research", "Brand Positioning Guidance"] },
        { title: "Digital Presence", items: ["Google Business Profile Optimization", "Basic Search Visibility (SEO)", "Profile Optimization", "Monthly Performance Report"] },
        { title: "Partnership", items: ["Dedicated Account Manager", "WhatsApp Business Support", "Monthly Strategy Review", "Priority Project Management"] }
      ],
    },
    {
      title: "Prime",
      scopeLevel: 2,
      scopeLabel: "Integrated growth support",
      monthlyPrice: "₹50,000",
      annualPrice: "₹5,40,000",
      annualSavings: "₹60,000",
      tagline: "Scale with confidence.",
      desc: "For businesses ready to accelerate growth through premium content, strategic marketing, and consistent brand execution.",
      cta: "Apply for Prime",
      isHighlighted: true,
      features: [
        { title: "Creative Production", items: ["12 Signature Cinematic Reels", "16 Premium Brand Creatives", "2 Professional Production Days", "Creative Campaign Planning", "Advanced Color Grading", "Motion Graphics & Visual Effects", "Premium Thumbnail & Cover Design", "Multi-Platform Content Optimization"] },
        { title: "Brand Growth", items: ["Advanced Content Strategy", "Campaign Planning", "Brand Positioning Sessions", "Trend & Competitor Intelligence", "Monthly Growth Roadmap", "Content Performance Analysis"] },
        { title: "Digital Growth", items: ["Paid Growth Campaigns", "Google Business Profile Management", "Advanced Search Visibility (SEO)", "Local Search Optimization", "Monthly Business Insights", "Reputation Monitoring"] },
        { title: "Partnership", items: ["Priority Account Manager", "Priority WhatsApp Support", "Bi-Weekly Strategy Sessions", "Faster Turnaround Time", "Quarterly Brand Review"] },
        { title: "Exclusive Benefits", items: ["Priority Production Scheduling", "Premium Asset Library", "Early Access to New thenightera Features", "Preferred Client Support"] }
      ],
      inheritedFeatures: [
        { title: "Core inclusions", items: ["Brand Strategy", "6 Signature Reels", "8 Brand Creatives", "1 Production Day", "Monthly Content Calendar", "Copywriting", "Search Visibility (Basic SEO)", "Monthly Performance Report", "Dedicated Support"] },
      ],
    },
    {
      title: "Vertex",
      scopeLevel: 3,
      scopeLabel: "Dedicated growth partnership",
      monthlyPrice: "₹90,000",
      annualPrice: "₹9,72,000",
      annualSavings: "₹1,08,000",
      tagline: "Lead your market with strategy, creative excellence, and AI-powered growth.",
      desc: "For ambitious brands seeking a dedicated creative, marketing, and AI growth partner.",
      cta: "Request a Consultation",
      features: [
        { title: "Creative Production", items: ["20+ Signature Cinematic Reels", "Unlimited Premium Brand Creatives", "Up to 6 Professional Production Days", "Creative Campaign Direction", "High-End Cinematic Editing", "Advanced Motion Graphics", "Premium Brand Storytelling", "Multi-Platform Content Production"] },
        { title: "Brand Leadership", items: ["Dedicated Brand Manager", "Quarterly Brand Strategy Workshops", "Business Growth Consultation", "Creative Direction", "Brand Positioning & Expansion", "Competitor Intelligence"] },
        { title: "Digital Growth", items: ["Advanced Search Visibility (SEO)", "Google Business Profile Management", "Website Content Management", "Reputation Management", "Performance Analytics Dashboard", "Quarterly Growth Reports"] },
        { title: "AI Intelligence", items: ["CALMA AI Reputation Intelligence", "AI Review Monitoring", "Intelligent Business Insights", "AI-Powered Performance Reports", "Workflow Automation Consultation", "Early Access to thenightera AI Features"] },
        { title: "Partnership", items: ["Priority Creative Team", "Founder Strategy Sessions", "VIP WhatsApp Support", "Fastest Turnaround", "Priority Production Scheduling", "Dedicated Success Manager"] },
        { title: "Exclusive Benefits", items: ["Custom Growth Roadmap", "Exclusive Partner Benefits", "Enterprise-Level Support", "Access to Beta AI Solutions"] }
      ],
      inheritedFeatures: [
        { title: "Core inclusions", items: ["Brand Strategy", "6 Signature Reels", "8 Brand Creatives", "1 Production Day", "Monthly Content Calendar", "Copywriting", "Basic Search Visibility (SEO)", "Monthly Performance Report", "Dedicated Support"] },
        { title: "Prime inclusions", items: ["12 Signature Reels", "16 Brand Creatives", "2 Production Days", "Paid Growth Campaigns", "Google Business Profile Management", "Advanced SEO", "Social Media Management", "Monthly Strategy Session", "Priority Support"] },
      ],
    }
  ]

  return (
    <div style={{ minHeight: '100dvh', background: '#f5f5f7' }}>
      <SEOHead
        title="thenightera Pricing | Social and Web Services"
        description="Explore thenightera pricing for social media management and web projects. Compare service plans, deliverables, and engagement terms."
        path="/pricing"
      />
      <PageHeader
        label="Partnerships"
        title="Growth, considered."
        sub="Thoughtful creative. Consistent momentum. A partnership shaped around your ambition."
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2.5rem 8rem' }}>
        <div role="group" aria-label="Billing frequency" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', padding: '4px', borderRadius: '999px', background: '#e9e9ec', gap: '3px' }}>
            {['monthly', 'annual'].map((option) => (
              <button key={option} type="button" aria-pressed={billing === option} onClick={() => setBilling(option)} style={{ border: 0, borderRadius: '999px', padding: '0.7rem 1.1rem', background: billing === option ? '#fff' : 'transparent', color: '#1d1d1f', boxShadow: billing === option ? '0 1px 5px rgba(0,0,0,.12)' : 'none', cursor: 'pointer', font: 'inherit', fontSize: '0.82rem', fontWeight: 650 }}>
                {option === 'monthly' ? 'Monthly' : 'Annual · save 10%'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <PricingExperience3D plan={selectedPlan || 'Prime'} />
          <p style={{ margin: '0.7rem 0 0', textAlign: 'center', color: '#85807a', fontSize: '0.76rem' }}>Choose a tier below to see its partnership take shape.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '1.25rem', alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <FadeUp key={plan.title} delay={i * 0.1}>
              <PricingCard {...plan} billing={billing} selectedPlan={selectedPlan} onSelect={setSelectedPlan} onInquiry={() => setInquiryPlan(plan.title)} />
            </FadeUp>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#6e6e73', marginTop: '1.25rem' }}>
          Annual plans are billed upfront. GST, if applicable, is additional. Paid media spend, if required, is separate.
        </p>

        <FadeUp delay={0.2}>
          <section style={{ marginTop: '5rem', padding: '3rem', borderRadius: '20px', background: '#1d1d1f', color: '#fff' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c7bca1', fontWeight: 700 }}>For the long view</p>
            <h2 style={{ marginTop: '0.8rem', fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', letterSpacing: '-0.04em', fontWeight: 600 }}>Annual partnership benefits</h2>
            <p style={{ marginTop: '0.65rem', color: 'rgba(255,255,255,.68)', lineHeight: 1.6 }}>Every annual partnership includes a steadier foundation for long-term growth.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.75rem', marginTop: '1.75rem' }}>
              {["Locked pricing for 12 months", "Priority onboarding", "Dedicated strategic planning", "Annual growth roadmap", "Savings versus monthly billing"].map((item) => <div key={item} style={{ padding: '0.9rem 1rem', border: '1px solid rgba(255,255,255,.16)', borderRadius: '10px', color: 'rgba(255,255,255,.9)', fontSize: '0.88rem' }}>{item}</div>)}
            </div>
          </section>
        </FadeUp>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6e6e73', fontSize: '0.88rem' }}>Enterprise solutions are available for multi-location brands and organizations.</p>

        {/* Retainer Disclaimer */}
        <FadeUp delay={0.25}>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#86868b', marginTop: '2rem', letterSpacing: '0.03em' }}>
          Final deliverables and billing terms are confirmed in your proposal.
          </p>
        </FadeUp>

        {/* Unique Request Card */}
        <FadeUp delay={0.3}>
          <div style={{ marginTop: '4rem', background: '#ffffff', borderRadius: '16px', padding: '2rem', border: '1px solid #E5E5EA', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1d1d1f' }}>Unique Request</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#86868b', maxWidth: '600px' }}>
              Need a different mix of services or scope? Tell us what you’re building and we’ll shape a proposal around it.
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1d1d1f' }}>How does annual billing work?</h3>
                <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#6e6e73', lineHeight: 1.6 }}>Annual plans are billed upfront and save 10% compared with twelve monthly payments. We confirm final scope and terms in your proposal before work begins.</p>
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
      <AnimatePresence>{inquiryPlan && <PricingInquiryModal plan={inquiryPlan} onClose={() => setInquiryPlan(null)} />}</AnimatePresence>
    </div>
  )
}
