import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const contents = [
  ['overview', 'At a glance'],
  ['scope', 'Who we are and scope'],
  ['information', 'Information we collect'],
  ['use', 'How we use information'],
  ['calma', 'CALMA and AI features'],
  ['cookies', 'Cookies and analytics'],
  ['sharing', 'When information is shared'],
  ['transfers', 'International processing'],
  ['retention', 'Retention and security'],
  ['rights', 'Your choices and rights'],
  ['children', 'Children’s privacy'],
  ['updates', 'Policy updates'],
  ['contact', 'Contact and privacy requests'],
]

function Section({ id, title, children }) {
  return <section id={id} className="scroll-mt-28 border-t border-black/10 py-9 md:py-11"><h2 className="text-2xl font-semibold tracking-[-0.035em] md:text-3xl">{title}</h2><div className="mt-4 space-y-4 text-base leading-7 text-[#5f5f63]">{children}</div></section>
}

function List({ items }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-[#7D2027]">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1d1d1f]">
      <SEOHead title="Privacy Policy" description="A clear guide to information thenightera and CALMA collect, how we use it, and the choices available to you." path="/privacy" />

      <header className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7D2027]">thenightera · privacy</p>
        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-end">
          <div><h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-7xl">Your privacy,<br />clearly explained.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5f63]">This policy explains how thenightera handles personal and business information across our websites, services, and CALMA when you visit, contact us, or choose to use them.</p></div>
          <p className="text-sm leading-6 text-[#77716b] md:justify-self-end">Effective date<br /><strong className="font-semibold text-[#1d1d1f]">October 16, 2026</strong></p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 md:grid-cols-[220px_minmax(0,1fr)] md:px-10">
        <nav aria-label="Privacy policy sections" className="h-fit rounded-2xl border border-black/10 bg-white/70 p-5 md:sticky md:top-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7D2027]">On this page</p>
          <ol className="space-y-2.5">{contents.map(([id, label], index) => <li key={id}><a className="text-sm leading-5 text-[#656168] no-underline transition hover:text-[#7D2027]" href={`#${id}`}><span className="mr-2 text-[#a39670]">{String(index + 1).padStart(2, '0')}</span>{label}</a></li>)}</ol>
        </nav>

        <article className="min-w-0">
          <section id="overview" className="scroll-mt-28 rounded-2xl bg-white p-6 md:p-8">
            <p className="text-sm font-semibold text-[#7D2027]">At a glance</p>
            <p className="mt-3 text-lg leading-8 text-[#4f4c50]">We use information to answer enquiries, deliver requested work, operate CALMA features you choose, keep our services secure, and understand how our sites perform. We do not sell personal information.</p>
            <div className="mt-6 grid gap-4 border-t border-black/10 pt-5 sm:grid-cols-3">
              <div><p className="text-sm font-semibold">You stay in control</p><p className="mt-1 text-sm leading-6 text-[#77716b]">Ask to access, correct, or delete information, subject to legal and service requirements.</p></div>
              <div><p className="text-sm font-semibold">Partners help us operate</p><p className="mt-1 text-sm leading-6 text-[#77716b]">We use service providers for hosting, analytics, forms, authentication, and requested product features.</p></div>
              <div><p className="text-sm font-semibold">AI supports people</p><p className="mt-1 text-sm leading-6 text-[#77716b]">AI-generated analysis can be wrong. A person should review it before acting.</p></div>
            </div>
          </section>

          <Section id="scope" title="Who we are and scope">
            <p>thenightera is a branding, marketing, automation, and business technology company based in Indore, India. This policy covers <a className="text-[#7D2027] underline" href="https://www.thenightera.tech">thenightera.tech</a>, <a className="text-[#7D2027] underline" href="https://heycalma.in">heycalma.in</a>, and thenightera or CALMA services that link to this policy or otherwise tell you it applies.</p>
            <p>It covers information collected through our websites, forms, client work, dashboards, product features, email, and other direct communications. A third-party site or service linked from ours has its own privacy terms; this policy does not govern it.</p>
          </Section>

          <Section id="information" title="Information we collect">
            <p>The information we receive depends on how you interact with us. You can choose not to provide some information, though we may then be unable to respond or provide a requested feature.</p>
            <h3 className="pt-2 font-semibold text-[#1d1d1f]">Information you provide</h3>
            <List items={['Contact details such as your name, email address, phone number, and company or brand name.', 'Project and enquiry details, including your message, goals, website, social profiles, preferences, and communication history.', 'Account details needed for a client workspace or product login, such as an account identifier and sign-in provider. Authentication providers handle sign-in verification.', 'Business materials you choose to share, such as brand assets, campaign information, website or marketing performance data, public business listings, and review links.', 'Payment or billing information when a paid service requires it. Payments are handled by the relevant payment provider; we do not ask you to send full payment card details through our contact forms.']} />
            <h3 className="pt-2 font-semibold text-[#1d1d1f]">Information collected through use</h3>
            <p>Our sites and service providers may receive technical and usage information such as IP address, browser and device type, operating system, language, approximate region, pages viewed, referral source, session activity, and performance or diagnostic events. Cookies or similar technologies may be used for site operation, analytics, authentication, and security.</p>
            <h3 className="pt-2 font-semibold text-[#1d1d1f]">Information from other sources</h3>
            <p>When relevant to a service you request, we may receive business information from public sources or platforms you authorize or identify, such as a Google Business Profile, review platform, analytics account, CRM, or social channel. We do not intentionally access private customer conversations or confidential business records unless you choose to provide them for a defined service.</p>
          </Section>

          <Section id="use" title="How we use information">
            <p>We use information for the purposes below, and only as needed for the relevant interaction or service:</p>
            <List items={['Respond to enquiries, prepare proposals, manage projects, deliver creative and digital services, and provide support.', 'Create, secure, and maintain accounts; authenticate users; and provide requested CALMA or client workspace features.', 'Analyze business feedback or campaign information you authorize, and prepare reports, recommendations, or other requested outputs.', 'Measure site traffic and reliability, understand which content is useful, and improve our websites, products, and services.', 'Protect people and services from fraud, abuse, unauthorized access, and technical issues; maintain business records; and meet legal obligations.', 'Send service updates and, where permitted or consented to, relevant news or marketing. You can opt out of marketing messages at any time.']} />
            <p>We do not use contact-form details for advertising personalization. Google Signals for advertising personalization are disabled in our Google Analytics configuration.</p>
          </Section>

          <Section id="calma" title="CALMA and AI features">
            <p>When you use a CALMA feature, the product may process business profile details, public reviews, ratings, review text, customer feedback, and other business information you or an authorized team member connect or provide. The feature and data used depend on your plan, settings, and integrations.</p>
            <p>CALMA may use automated analysis to organize feedback, identify recurring themes, estimate sentiment, or prepare suggested responses and reports. These outputs are assistance, not a guarantee of accuracy or a substitute for human judgment. Review them before relying on them or communicating with a customer.</p>
            <p>If a feature uses an external technology provider to process your request, relevant information may be sent to that provider for the requested function. We do not intentionally use private customer conversations for these features unless you provide them. Please avoid submitting information you are not authorized to share.</p>
          </Section>

          <Section id="cookies" title="Cookies and analytics">
            <p>We use Google Analytics 4, Vercel Analytics, and Vercel Speed Insights on thenightera.tech to understand site visits, broad usage patterns, and page performance. These tools may use cookies, device or browser signals, or similar technologies. Analytics settings disable Google Signals for advertising personalization; this does not disable all analytics measurement.</p>
            <p>We also use essential storage or similar technologies where needed for account sign-in, session continuity, security, or a feature you request. You can manage cookies through your browser settings. Blocking them may affect sign-in or other site functions. Third-party providers explain their own technologies and controls in their privacy materials.</p>
          </Section>

          <Section id="sharing" title="When information is shared">
            <p>We do not sell your personal information. We share it only when needed to provide a service, operate our business, or comply with law, including with:</p>
            <List items={['Hosting, infrastructure, and performance providers, including Vercel.', 'Website measurement providers, including Google Analytics and Vercel Analytics or Speed Insights.', 'Contact-form delivery and support providers, including Web3Forms.', 'Authentication and client workspace providers, including Supabase and Google when you choose a supported sign-in method.', 'AI, CRM, communications, analytics, payment, or platform providers when a feature or engagement you request needs them.', 'Professional advisers, regulators, law enforcement, or other parties where reasonably necessary to protect rights, safety, or comply with a valid legal obligation.']} />
            <p>Service providers may process information on our behalf under their own privacy and security terms. We share only what is reasonably needed for the relevant purpose.</p>
          </Section>

          <Section id="transfers" title="International processing">
            <p>Our company is based in India, and our service providers may operate infrastructure in other countries. This means information may be processed or stored outside the country where you live. Where required, we use safeguards appropriate to the applicable law and service provider.</p>
          </Section>

          <Section id="retention" title="Retention and security">
            <p>We keep information for as long as needed to respond to you, provide a service, maintain an account, meet legal or accounting duties, resolve disputes, and protect our business. Retention periods vary by information type and purpose. When information is no longer needed, we delete it or remove identifying details where reasonably practicable, subject to backups and legal requirements.</p>
            <p>We use reasonable administrative, technical, and organizational safeguards, which may include access controls, secure service providers, account permissions, and monitoring. No online service or storage method can be guaranteed completely secure.</p>
          </Section>

          <Section id="rights" title="Your choices and rights">
            <p>Depending on where you live and the law that applies, you may ask us to provide access to, correct, update, or delete personal information; withdraw consent where processing relies on consent; object to or restrict certain processing; or provide a copy of information you supplied.</p>
            <p>You can opt out of marketing emails using the unsubscribe instruction in the message or by contacting us. To make a privacy request, email <a className="text-[#7D2027] underline" href="mailto:hello@thenightera.tech">hello@thenightera.tech</a>. We may need to verify your identity and may retain information where law or a current service obligation requires it. We will respond within the time required by applicable law.</p>
          </Section>

          <Section id="children" title="Children’s privacy">
            <p>Our services are intended for businesses and adults, and are not designed for children. We do not knowingly collect personal information from anyone below the applicable age of digital consent. If you believe a child has provided personal information, contact us so we can review and take appropriate steps.</p>
          </Section>

          <Section id="updates" title="Policy updates">
            <p>We may update this policy when our services, data practices, or legal requirements change. The effective date at the top shows when the current version took effect. If a change materially affects how we handle information, we will provide additional notice where required.</p>
          </Section>

          <Section id="contact" title="Contact and privacy requests">
            <p>For questions, requests, or complaints about privacy, contact:</p>
            <address className="not-italic leading-7"><strong className="font-semibold text-[#1d1d1f]">thenightera · Privacy</strong><br />Indore, Madhya Pradesh, India<br /><a className="text-[#7D2027] underline" href="mailto:hello@thenightera.tech">hello@thenightera.tech</a><br /><a className="text-[#7D2027] underline" href="https://www.thenightera.tech/contact">Contact thenightera</a></address>
            <p>For CALMA product questions, you can also visit <a className="text-[#7D2027] underline" href="https://heycalma.in">heycalma.in</a>. This policy is governed by the laws of India, without limiting rights that apply to you under mandatory local law.</p>
          </Section>

          <p className="border-t border-black/10 pt-6 text-sm text-[#8a847e]">© 2026 thenightera. All rights reserved. · <Link className="text-[#7D2027]" to="/terms">Terms & Conditions</Link> · <Link className="text-[#7D2027]" to="/cookies">Cookie Policy</Link> · <Link className="text-[#7D2027]" to="/refunds">Refunds</Link></p>
        </article>
      </div>
    </main>
  )
}
