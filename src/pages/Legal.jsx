import SEOHead from '../components/SEOHead'

const pages = {
  privacy: { title: 'Privacy Policy', description: 'How thenightera collects, uses, and protects information submitted through thenightera.tech.', blocks: [
    ['Information we collect', 'When you submit a contact form or sign in, we may receive your name, email address, brand name, message, authentication provider, and basic account information.'],
    ['Website analytics', 'We use Vercel Analytics and Speed Insights to understand aggregate traffic, page usage, device performance, and site reliability. These tools help us improve the website experience.'],
    ['Service providers', 'Supabase supports authentication, Web3Forms processes contact-form delivery, Google may provide OAuth sign-in, and Vercel hosts and measures the website. Each provider processes information under its own terms and privacy practices.'],
    ['How we use information', 'We use submitted information to respond to enquiries, provide requested access, operate the website, prevent abuse, and improve our services. We do not sell personal information.'],
    ['Retention and choices', 'We keep information only as long as needed for the stated purpose, legal obligations, or legitimate business records. You may ask to access, correct, or delete your personal information by emailing officialnightera@gmail.com.'],
    ['Contact', 'Privacy questions can be sent to officialnightera@gmail.com. thenightera is based in Indore, Madhya Pradesh, India.'],
  ]},
  terms: { title: 'Terms of Service', description: 'Terms governing use of thenightera.tech and enquiries for thenightera services.', blocks: [
    ['Website use', 'You may use this website to learn about thenightera, view our work, and contact us about services. Do not misuse the website, attempt unauthorized access, or interfere with its operation.'],
    ['Service engagements', 'Project scope, deliverables, timelines, fees, revisions, ownership, and cancellation terms are defined in a separate written proposal or agreement. Website content does not create a client relationship.'],
    ['Content and intellectual property', 'The thenightera name, site design, writing, graphics, and original portfolio presentation belong to thenightera or their respective owners. Do not reproduce them without permission.'],
    ['Third-party services', 'This website may link to or use third-party services. thenightera is not responsible for third-party availability, policies, or content.'],
    ['No guaranteed outcome', 'Marketing, public relations, search visibility, and commercial performance depend on many factors. We do not guarantee rankings, press coverage, revenue, or specific results unless a signed agreement states otherwise.'],
    ['Contact', 'Questions about these terms can be sent to officialnightera@gmail.com. These terms are governed by applicable laws of India.'],
  ]},
}

export default function Legal({ type }) {
  const page = pages[type]
  return <main className="min-h-screen bg-[#FAF7F2] text-[#1d1d1f]"><SEOHead title={page.title} description={page.description} path={`/${type}`} /><section className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-10 md:pt-36"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7D2027]">thenightera · last updated 30 September 2026</p><h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{page.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5f63]">{page.description}</p><div className="mt-14 divide-y divide-black/10 border-y border-black/10">{page.blocks.map(([title, body]) => <section key={title} className="py-8"><h2 className="text-2xl font-semibold tracking-[-0.025em]">{title}</h2><p className="mt-3 leading-7 text-[#5f5f63]">{body}</p></section>)}</div></section></main>
}
