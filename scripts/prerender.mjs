import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from '../src/lib/siteStructuredData.js'

const dist = join(process.cwd(), 'dist')
const shell = await readFile(join(dist, 'index.html'), 'utf8')

const routes = [
  ['/work', 'Selected Brand, Social and Web Work | thenightera', 'Explore thenightera projects across brand identity, social media campaigns, web development, and digital experiences for clients worldwide.', 'Our work.', 'Explore selected brand projects and digital experiences.'],
  ['/testimonials', 'thenightera Client Feedback | Selected Reviews', "Read selected client feedback about thenightera's brand identity, social media, creative, and digital work.", 'Client stories.', 'Selected feedback from thenightera client partnerships.'],
  ['/calma', 'Calma | Restaurant Feedback Intelligence', 'Calma helps restaurant teams spot guest feedback patterns, understand recurring issues, and decide what to improve next.', 'Understand what guests are telling you.', 'Calma helps restaurant teams turn guest feedback into clear patterns and practical next steps.'],
  ['/', 'thenightera | Global Design Studio', 'thenightera is a global design studio based in Indore, working worldwide across brand identity, social media, web development, and PR.', 'Presence, engineered.', 'thenightera is a global design studio based in Indore, working with brands worldwide.'],
  ['/about', 'About thenightera | Global Design Studio', 'Founded by Tanishq Gangle, thenightera is a global design studio for brand identity, social media, web development, and PR.', 'Intelligence for brands that want to matter.', 'We combine social media, web development, public relations, and brand identity for brands worldwide.'],
  ['/services', 'Social, Web, Brand and PR Services | thenightera', 'Explore thenightera services: social media strategy, web design and development, brand identity, and public relations for businesses worldwide.', 'One team. Four connected capabilities.', 'Explore social media, public relations, branding, and web development built around clear business goals.'],
  ['/social-media-marketing', 'Social Media Marketing Agency | thenightera', 'Social media marketing: strategy, content calendars, reels, editing, publishing, community direction, and reporting for growing brands.', 'Content people remember. Strategy that moves business.', 'thenightera plans, produces, edits, publishes, and improves social content for brands worldwide.'],
  ['/web-development', 'Web Development Company | thenightera', 'Conversion-focused web development: fast, mobile-first React websites with clear messaging, SEO foundations, analytics, and lead capture.', 'A fast website built to earn the next action.', 'thenightera designs and develops conversion-focused websites for service businesses, creators, and growing brands.'],
  ['/pr-agency', 'PR Agency | thenightera', 'PR strategy for founders and brands: positioning, media-ready stories, press outreach planning, founder visibility, and reputation support.', 'Make your reputation as strong as your work.', 'thenightera helps founders and brands shape clear stories, build media-ready assets, and plan credible public relations campaigns.'],
  ['/branding-agency', 'Branding Agency | thenightera', 'Branding agency for positioning, visual identity, voice, launch systems, and creative direction across web, social, and campaigns.', 'Build a brand people recognize before reading the name.', 'thenightera creates positioning, visual direction, verbal identity, and practical brand systems.'],
  ['/case-studies', 'Brand and Marketing Case Studies | thenightera', 'Read selected thenightera case studies: the client brief, creative and digital work delivered, and outcomes reported by each client.', 'Work, explained clearly.', 'Read selected client stories from Kuber Shree Jewellers and Symphony.'],
  ['/portfolio', 'thenightera Portfolio | Brand, Social and Web', 'Browse selected thenightera work in brand identity, social media, short-form video, web development, and digital design.', 'Selected work.', 'Explore thenightera creative work across social media, video, web development, and brand identity.'],
  ['/pricing', 'thenightera Pricing | Social and Web Services', 'Explore thenightera pricing for social media management and web projects. Compare service plans, deliverables, and engagement terms.', 'Clear plans for serious growth.', 'Compare current service packages, included deliverables, and next steps.'],
  ['/faq', 'thenightera FAQs | Services, Process and Pricing', 'Answers about thenightera services, project timelines, pricing, web development, social media, PR, and working with brands worldwide.', 'Questions, answered.', 'Find direct answers about social media, web development, PR, branding, and working with thenightera.'],
  ['/contact', 'Contact thenightera | Start a Project Worldwide', 'Contact thenightera to discuss brand identity, social media, web development, or PR. Start a project with our team, wherever you are.', 'Tell us what you are building.', 'Contact thenightera to discuss your brand, goals, timeline, and next project.'],
  ['/privacy', 'Privacy Policy | thenightera', 'How thenightera collects, uses, and protects information submitted through thenightera.tech.', 'Privacy Policy', 'Read how thenightera handles contact, authentication, and analytics information.'],
  ['/terms', 'Terms of Service | thenightera', 'Terms governing use of thenightera.tech and enquiries for thenightera services.', 'Terms of Service', 'Read terms for website use and thenightera service enquiries.'],
  ['/login', 'Client Login | thenightera', 'Access your thenightera client workspace.', 'Client login.', 'Sign in to your thenightera client workspace.', true],
  ['/thank-you', 'Thank you for reaching out | thenightera', 'Your message has been received. The thenightera team will get back to you soon.', 'Thanks for reaching out.', 'We have received your message and will respond within 24 hours.', true],
]

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')

for (const [path, title, description, heading, answer, noIndex = false] of routes) {
  const canonical = `https://www.thenightera.tech${path}`
  const fallback = `<main data-prerendered="true" style="max-width:1100px;margin:0 auto;padding:120px 24px 72px;font-family:system-ui,sans-serif;color:#1d1d1f"><p style="color:#7D2027;font-weight:700">thenightera · Design and technology, engineered for the global stage.</p><h1 style="font-size:clamp(2.5rem,7vw,5.5rem);line-height:1;letter-spacing:-.05em;max-width:900px">${esc(heading)}</h1><p style="font-size:1.2rem;line-height:1.7;max-width:760px;color:#5f5f63">${esc(answer)}</p><p><a href="/contact">Book a free consultation</a> · <a href="/services">Explore services</a> · <a href="/case-studies">Read case studies</a></p></main>`
  let html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta(?: data-rh="true")? name="description" content="[^"]*"\s*\/?>/i, `<meta data-rh="true" name="description" content="${esc(description)}">`)
    .replace(/<meta(?: data-rh="true")? name="robots" content="[^"]*"\s*\/?>/i, `<meta data-rh="true" name="robots" content="${noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">`)
    .replace(/<link(?: data-rh="true")? rel="canonical" href="[^"]*"\s*\/?>/i, noIndex ? '' : `<link data-rh="true" rel="canonical" href="${canonical}">`)
    .replace(/<meta(?: data-rh="true")? property="og:title" content="[^"]*"\s*\/?>/i, `<meta data-rh="true" property="og:title" content="${esc(title)}">`)
    .replace(/<meta(?: data-rh="true")? property="og:description" content="[^"]*"\s*\/?>/i, `<meta data-rh="true" property="og:description" content="${esc(description)}">`)
    .replace(/<meta(?: data-rh="true")? property="og:url" content="[^"]*"\s*\/?>/i, noIndex ? '' : `<meta data-rh="true" property="og:url" content="${canonical}">`)
    .replace(/<meta(?: data-rh="true")? name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta data-rh="true" name="twitter:title" content="${esc(title)}">`)
    .replace(/<meta(?: data-rh="true")? name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta data-rh="true" name="twitter:description" content="${esc(description)}">`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`)
  if (path === '/') {
    const jsonLd = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]
      .map(schema => `<script type="application/ld+json" data-rh="true">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
      .join('')
    html = html.replace('</head>', `${jsonLd}</head>`)
  }
  const output = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

const notFound = `<main style="max-width:760px;margin:0 auto;padding:18vh 24px 72px;font-family:system-ui,sans-serif;color:#1d1d1f;text-align:center"><p style="color:#7D2027;font-size:.8rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase">thenightera · design studio</p><h1 style="font-size:clamp(2.5rem,8vw,5rem);line-height:1;letter-spacing:-.05em">Page not found.</h1><p style="font-size:1.15rem;line-height:1.7;color:#5f5f63">This address does not lead to a page. Let’s get you back to the work.</p><p><a style="display:inline-block;margin-top:1rem;padding:14px 24px;border-radius:999px;background:#1d1d1f;color:white;text-decoration:none" href="/">Back to home</a>　<a href="/contact">Contact us</a></p></main>`
const notFoundHtml = shell
  .replace(/<title>.*?<\/title>/s, '<title>Page not found | thenightera</title>')
  .replace(/<meta(?: data-rh="true")? name="description" content="[^"]*"\s*\/?>/i, '<meta data-rh="true" name="description" content="This address does not lead to a page. Return to thenightera Design Studio.">')
  .replace(/<meta(?: data-rh="true")? name="robots" content="[^"]*"\s*\/?>/i, '<meta data-rh="true" name="robots" content="noindex, nofollow">')
  .replace(/<link(?: data-rh="true")? rel="canonical" href="[^"]*"\s*\/?>/i, '')
  .replace(/<meta(?: data-rh="true")? property="og:url" content="[^"]*"\s*\/?>/i, '')
  .replace('<div id="root"></div>', `<div id="root">${notFound}</div>`)
await writeFile(join(dist, '404.html'), notFoundHtml)

console.log(`Prerendered ${routes.length} routes, including noindex routes and custom 404`)
