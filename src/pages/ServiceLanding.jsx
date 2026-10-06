import { Link, Navigate, useParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const SERVICES = {
  'social-media-marketing': {
    title: 'Social Media Marketing Agency', eyebrow: 'Social media marketing · Worldwide',
    headline: 'Content people remember. Strategy that moves business.',
    answer: 'thenightera is a social media marketing agency that plans, produces, edits, publishes, and improves brand content. One team handles strategy, reels, campaign ideas, community direction, and reporting so every post supports a clear business goal.',
    description: 'Social media marketing: strategy, content calendars, reels, editing, publishing, community direction, and reporting for growing brands.',
    deliverables: ['Brand and audience strategy', 'Monthly content calendar', 'Reel concepts, shoots, and editing', 'Campaign creative direction', 'Publishing and community playbooks', 'Monthly performance review'],
    outcomes: ['A consistent, recognizable brand voice', 'Content connected to commercial goals', 'A faster production and approval system'],
    faqs: [['What does your social media service include?', 'Strategy, planning, content production, editing, publishing support, community direction, and performance reviews. Scope is tailored to the brand and chosen plan.'], ['Do you work only with Indore businesses?', 'No. We are operating globally, India, and work with brands worldwide using remote planning, production coordination, and review systems.'], ['Can you produce reels and short-form video?', 'Yes. Reel concepts, scripts, shoots, editing, and platform-ready delivery can be included in the engagement.']],
  },
  'web-development': {
    title: 'Web Development Company', eyebrow: 'Web development · Worldwide',
    headline: 'A fast website built to earn the next action.',
    answer: 'thenightera designs and develops conversion-focused websites for service businesses, creators, and growing brands. We combine clear messaging, mobile-first interfaces, search-friendly structure, analytics, and modern React development in one focused build.',
    description: 'Conversion-focused web development: fast, mobile-first React websites with clear messaging, SEO foundations, analytics, and lead capture.',
    deliverables: ['Messaging and page architecture', 'Responsive interface design', 'React or Next.js development', 'Technical SEO foundations', 'Analytics and lead tracking', 'Launch and handover support'],
    outcomes: ['Clearer paths from visit to enquiry', 'Fast, responsive mobile experience', 'A maintainable platform ready to grow'],
    faqs: [['What kind of websites do you build?', 'We build marketing websites, service-business sites, portfolios, landing pages, and custom digital experiences using modern web technology.'], ['Will my website work well on mobile?', 'Yes. Every build is designed and tested for mobile layouts, touch interactions, readable typography, and responsive media.'], ['Do you include SEO and analytics?', 'We include technical SEO foundations, crawlable page structure, metadata, structured data where relevant, and analytics setup. Ongoing SEO can be scoped separately.']],
  },
  'pr-agency': {
    title: 'PR Agency', eyebrow: 'Public relations · Worldwide', headline: 'Make your reputation as strong as your work.',
    answer: 'thenightera helps founders and brands shape clear stories, build media-ready assets, and plan credible public relations campaigns. Our work connects positioning, founder communication, press outreach, and social content so attention reinforces trust.',
    description: 'PR strategy for founders and brands: positioning, media-ready stories, press outreach planning, founder visibility, and reputation support.',
    deliverables: ['Narrative and positioning workshop', 'Founder and brand story development', 'Press kit and media materials', 'Media list and outreach planning', 'Announcement and launch strategy', 'Reputation response playbook'],
    outcomes: ['A sharper story for media and customers', 'Consistent founder and brand positioning', 'A repeatable process for credible visibility'],
    faqs: [['Do you guarantee media coverage?', 'No credible PR agency can guarantee independent editorial coverage. We build strong stories, materials, targeting, and outreach to improve the chance of relevant attention.'], ['Can you support a launch?', 'Yes. We can plan the announcement, narrative, media materials, outreach sequence, founder communication, and supporting social content.'], ['Is PR useful for a local business?', 'Yes when trust, reputation, expertise, or a meaningful launch matters. We choose channels based on the audience rather than chasing coverage for its own sake.']],
  },
  'branding-agency': {
    title: 'Branding Agency', eyebrow: 'Brand identity · Worldwide', headline: 'Build a brand people recognize before reading the name.',
    answer: 'thenightera is a branding agency creating clear positioning, visual direction, verbal identity, and practical brand systems. We turn business strategy into a consistent experience across websites, social media, campaigns, and customer touchpoints.',
    description: 'Branding agency for positioning, visual identity, voice, launch systems, and creative direction across web, social, and campaigns.',
    deliverables: ['Positioning and audience definition', 'Messaging and verbal identity', 'Logo and visual direction', 'Color, type, and layout system', 'Social and campaign templates', 'Brand guidelines and launch plan'],
    outcomes: ['A distinct and consistent market position', 'Faster creative decisions across channels', 'A usable system your team can maintain'],
    faqs: [['Is branding more than a logo?', 'Yes. A logo is one asset. Branding defines how the business is positioned, speaks, looks, and behaves across every customer touchpoint.'], ['Can you refresh an existing brand?', 'Yes. We can preserve useful recognition while updating positioning, messaging, visual language, and practical templates.'], ['Will I receive brand guidelines?', 'Yes. Final scope can include clear guidance for logo use, colors, typography, voice, imagery, layouts, and common applications.']],
  },
}

export default function ServiceLanding() {
  const { serviceSlug } = useParams()
  const legacyRoutes = {"social-media-marketing-indore": "social-media-marketing", "web-development-indore": "web-development", "pr-agency-indore": "pr-agency", "branding-agency-indore": "branding-agency"}
  if (legacyRoutes[serviceSlug]) return <Navigate to={`/${legacyRoutes[serviceSlug]}`} replace />
  const service = SERVICES[serviceSlug]
  if (!service) return <Navigate to="/services" replace />
  const path = `/${serviceSlug}`
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) }
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: service.title, url: `https://thenightera.tech${path}`, description: service.description, provider: { '@type': 'ProfessionalService', '@id': 'https://thenightera.tech/#organization', name: 'thenightera' }, areaServed: 'Worldwide' }
  return <div className="min-h-screen bg-[#FAF7F2] text-[#1d1d1f]">
    <SEOHead title={service.title} description={service.description} path={path} schema={[serviceSchema, faqSchema]} />
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7D2027]">{service.eyebrow}</p><h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-8xl">{service.headline}</h1><p className="speakable mt-8 max-w-3xl text-lg leading-8 text-[#5f5f63] md:text-xl">{service.answer}</p><div className="mt-10 flex flex-wrap gap-3"><Link to="/contact" className="rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-semibold text-white no-underline">Book a free consultation</Link><Link to="/pricing" className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-[#1d1d1f] no-underline">See pricing</Link></div></section>
    <section className="border-y border-black/10 bg-white"><div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28"><div><p className="text-sm font-semibold text-[#7D2027]">What you get</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">One clear system. Built around your goal.</h2></div><ul className="divide-y divide-black/10 border-y border-black/10">{service.deliverables.map((item, i) => <li key={item} className="flex gap-5 py-5 text-base font-medium md:text-lg"><span className="text-[#A39670]">0{i + 1}</span>{item}</li>)}</ul></div></section>
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28"><p className="text-sm font-semibold text-[#7D2027]">Designed outcome</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Work your audience can understand, trust, and act on.</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{service.outcomes.map(item => <div key={item} className="rounded-3xl border border-black/10 bg-white p-7 text-lg font-medium leading-7">{item}</div>)}</div></section>
    <section className="bg-[#1d1d1f] text-white"><div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28"><p className="text-sm font-semibold text-[#D9C4B1]">Common questions</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Clear answers before we begin.</h2><div className="mt-10 divide-y divide-white/15 border-y border-white/15">{service.faqs.map(([q, a]) => <article key={q} className="py-7"><h3 className="text-xl font-semibold">{q}</h3><p className="mt-3 max-w-2xl leading-7 text-white/65">{a}</p></article>)}</div><Link to="/contact" className="mt-10 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d1d1f] no-underline">Discuss your project</Link></div></section>
  </div>
}
