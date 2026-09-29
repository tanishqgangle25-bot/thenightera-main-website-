import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const capabilities = [
  'Social media strategy and production',
  'Conversion-focused web development',
  'Brand identity and creative direction',
  'Public relations and founder positioning',
  'AI automation and reputation intelligence',
]

export default function About() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://thenightera.in/about#about',
    url: 'https://thenightera.in/about',
    name: 'About thenightera',
    description: 'Learn about thenightera, an Indore marketing and creative technology agency founded by Tanishq Gangle.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://thenightera.in/#organization',
      name: 'thenightera',
      founder: { '@type': 'Person', name: 'Tanishq Gangle', jobTitle: 'Founder and Creative Director' },
      foundingDate: '2024',
      address: { '@type': 'PostalAddress', addressLocality: 'Indore', addressRegion: 'Madhya Pradesh', addressCountry: 'IN' },
    },
  }

  return (
    <main className="bg-[#FAF7F2] text-[#1d1d1f]">
      <SEOHead title="About thenightera — Marketing & Creative Technology Agency" description="thenightera is an Indore marketing and creative technology agency founded by Tanishq Gangle. We unite social media, web development, PR, brand identity, and AI systems." path="/about" keywords="about thenightera, Tanishq Gangle, marketing agency Indore, creative technology agency India" schema={schema} />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7D2027]">About thenightera</p>
        <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl md:text-8xl">Intelligence for brands that want to matter.</h1>
        <p className="speakable mt-8 max-w-3xl text-lg leading-8 text-[#5f5f63] md:text-xl">thenightera is a marketing and creative technology agency based in Indore, India. Founded by Tanishq Gangle, we combine social media, web development, public relations, brand identity, and AI systems into one connected growth partner.</p>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-28">
          <div><p className="text-sm font-semibold text-[#7D2027]">Why we exist</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">One team. One system. Clear growth.</h2></div>
          <div className="space-y-6 text-base leading-7 text-[#5f5f63] md:text-lg md:leading-8"><p>Most brands coordinate separate people for content, websites, PR, and automation. Strategy gets fragmented. Execution slows down. Results become hard to measure.</p><p>We connect those disciplines from the start. Every page, campaign, story, and system supports the same positioning and commercial goal.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div><p className="text-sm font-semibold text-[#7D2027]">What we do</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">Built around your next stage.</h2></div>
          <ul className="divide-y divide-black/10 border-y border-black/10">{capabilities.map((item, index) => <li key={item} className="flex gap-5 py-5 text-base font-medium md:text-lg"><span className="text-[#A39670]">0{index + 1}</span>{item}</li>)}</ul>
        </div>
        <div className="mt-20 rounded-[32px] bg-[#1d1d1f] px-7 py-12 text-white md:px-14 md:py-16">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Based in Indore. Working across India.</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Ready to turn attention into business?</h2>
          <Link to="/contact" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1d1d1f] no-underline transition hover:bg-white/90">Book a free consultation</Link>
        </div>
      </section>
    </main>
  )
}
