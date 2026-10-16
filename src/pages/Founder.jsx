import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { SITE_URL } from '../lib/siteStructuredData'

const founderId = `${SITE_URL}/founder#tanishq-gangle`

const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/founder#profile`,
  url: `${SITE_URL}/founder`,
  name: 'Tanishq Gangle — Founder of thenightera',
  mainEntity: {
    '@type': 'Person',
    '@id': founderId,
    name: 'Tanishq Gangle',
    jobTitle: 'Founder of thenightera',
    description: 'Founder of thenightera and creator of CALMA, building at the intersection of AI, branding, and business automation.',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    knowsAbout: ['AI-powered branding', 'Marketing technology', 'Business automation', 'Reputation management', 'Performance marketing', 'Search engine optimization'],
  },
}

const principles = [
  { title: 'Build systems, not services.', text: 'Services create revenue. Systems create companies. We build toward connected tools and processes that help businesses grow with less friction.' },
  { title: 'Premium is a standard.', text: 'Great design builds trust. Great technology builds scale. Both should lead to useful, measurable outcomes.' },
  { title: 'AI should make humans better.', text: 'AI should take repetitive work off people’s plates so they have more time for creativity, relationships, and good decisions.' },
]

export default function Founder() {
  return (
    <main className="bg-[#FAF7F2] text-[#1d1d1f]">
      <SEOHead
        title="Tanishq Gangle — Founder Story"
        description="Meet Tanishq Gangle, founder of thenightera and creator of CALMA. His work brings AI, branding, and business growth together."
        path="/founder"
        schema={founderSchema}
      />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7D2027]">Founder story · thenightera</p>
        <h1 id="tanishq-gangle" className="mt-6 max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.065em] sm:text-7xl md:text-9xl">Tanishq<br />Gangle.</h1>
        <p className="mt-8 max-w-3xl text-2xl font-medium leading-snug tracking-[-0.035em] text-[#5f5f63] md:text-4xl">Building the future of AI-powered brand growth.</p>
        <div className="mt-14 grid gap-10 border-t border-black/10 pt-8 md:grid-cols-[0.65fr_1.35fr] md:gap-16">
          <p className="text-sm font-semibold text-[#7D2027]">The idea behind the company</p>
          <div className="space-y-6 text-base leading-8 text-[#5f5f63] md:text-lg">
            <p>As a marketing student and entrepreneur, Tanishq noticed how many businesses invested in social media, advertising, and branding without a clear view of what was driving growth. Content mattered, but it was only one part of a much bigger system.</p>
            <p>That observation became the foundation for <strong className="font-semibold text-[#1d1d1f]">thenightera</strong>: a company bringing brand strategy, creative production, automation, AI, reputation, search, and performance marketing into a more connected growth ecosystem.</p>
            <blockquote className="border-l-2 border-[#7D2027] py-1 pl-6 text-2xl font-medium leading-snug tracking-[-0.035em] text-[#1d1d1f] md:text-3xl">“The future of business isn’t just marketing. It’s AI-powered growth.”</blockquote>
            <p>For Tanishq, premium design should work alongside measurable business impact. The aim is to build brand equity over time, with every campaign, website, video, and system serving a clear purpose.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-28">
          <div><p className="text-sm font-semibold text-[#7D2027]">From studio to product</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">A bigger system for business growth.</h2></div>
          <div className="space-y-6 text-base leading-8 text-[#5f5f63] md:text-lg">
            <p>The same belief in connected systems led to <strong className="font-semibold text-[#1d1d1f]">CALMA — Customer Alert &amp; Local Monitor Assistant</strong>, a product concept focused on helping local businesses understand customer feedback and manage their reputation.</p>
            <p>Tanishq continues to study Business Administration with a specialization in Marketing while building at the intersection of AI, branding, and business automation.</p>
            <p className="text-xl font-medium leading-8 tracking-[-0.02em] text-[#1d1d1f] md:text-2xl">Long-term vision: make useful, enterprise-level AI accessible to businesses of every size.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-sm font-semibold text-[#7D2027]">Founder philosophy</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">What guides the work.</h2></div>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {principles.map((principle, index) => (
              <article key={principle.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-5">
                <span className="pt-1 text-sm text-[#A39670]">0{index + 1}</span>
                <div><h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">{principle.title}</h3><p className="mt-3 max-w-2xl text-base leading-7 text-[#5f5f63]">{principle.text}</p></div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-20 rounded-[32px] bg-[#1d1d1f] px-7 py-12 text-white md:px-14 md:py-16">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">The next chapter</p>
          <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Building tools that help good businesses grow.</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 md:text-lg">The mission is to make branding, automation, marketing, customer intelligence, and AI work together as one practical growth system.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d1d1f] no-underline transition hover:bg-white/90">Work with thenightera</Link>
            <Link to="/calma" className="inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white no-underline transition hover:bg-white/10">Explore CALMA</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
