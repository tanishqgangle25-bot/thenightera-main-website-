import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const shell = await readFile(join(dist, 'index.html'), 'utf8')

const routes = [
  ['/', 'thenightera — Marketing Agency in Indore', 'Social media, web development, PR, branding, and AI systems for growing brands in India.', 'Marketing and creative technology, connected.', 'thenightera is an Indore-based marketing and creative technology agency helping brands build attention, trust, and conversion.'],
  ['/about', 'About thenightera — Marketing Agency in Indore', 'Meet thenightera, an Indore marketing and creative technology agency founded by Tanishq Gangle.', 'Intelligence for brands that want to matter.', 'We combine social media, web development, public relations, brand identity, and AI systems into one connected growth partner.'],
  ['/services', 'Marketing Services in Indore | thenightera', 'Social media marketing, PR, branding, and conversion-focused web development from one Indore team.', 'One team. Four connected capabilities.', 'Explore social media, public relations, branding, and web development built around clear business goals.'],
  ['/social-media-marketing-indore', 'Social Media Marketing Agency in Indore | thenightera', 'Strategy, content calendars, reels, editing, publishing, community direction, and reporting for growing brands.', 'Content people remember. Strategy that moves business.', 'thenightera plans, produces, edits, publishes, and improves social content for brands in Indore and across India.'],
  ['/web-development-indore', 'Web Development Company in Indore | thenightera', 'Fast, mobile-first React websites with clear messaging, SEO foundations, analytics, and lead capture.', 'A fast website built to earn the next action.', 'thenightera designs and develops conversion-focused websites for service businesses, creators, and growing brands.'],
  ['/pr-agency-indore', 'PR Agency in Indore | thenightera', 'Positioning, media-ready stories, press outreach planning, founder visibility, and reputation support.', 'Make your reputation as strong as your work.', 'thenightera helps founders and brands shape clear stories, build media-ready assets, and plan credible public relations campaigns.'],
  ['/branding-agency-indore', 'Branding Agency in Indore | thenightera', 'Positioning, visual identity, voice, launch systems, and creative direction across web, social, and campaigns.', 'Build a brand people recognize before reading the name.', 'thenightera creates positioning, visual direction, verbal identity, and practical brand systems.'],
  ['/case-studies', 'Marketing Case Studies in Indore | thenightera', 'Client briefs, delivered work, and reported outcomes across jewellery, hospitality, and beauty.', 'Work, explained clearly.', 'Read selected client stories from Kuber Shree Jewellers, Symphony, and The Studio 11.'],
  ['/portfolio', 'Creative Portfolio | thenightera', 'Selected social media, video, web, and brand work by thenightera.', 'Selected work.', 'Explore thenightera creative work across social media, video, web development, and brand identity.'],
  ['/pricing', 'Marketing and Web Development Pricing | thenightera', 'View thenightera service packages and current commercial starting points.', 'Clear plans for serious growth.', 'Compare current service packages, included deliverables, and next steps.'],
  ['/faq', 'Marketing Agency FAQ | thenightera', 'Answers about thenightera services, process, timelines, pricing, and working across India.', 'Questions, answered.', 'Find direct answers about social media, web development, PR, branding, and working with thenightera.'],
  ['/contact', 'Contact thenightera | Marketing Agency in Indore', 'Book a consultation with thenightera for social media, web development, PR, or branding.', 'Tell us what you are building.', 'Contact thenightera in Indore to discuss your brand, goals, timeline, and next project.'],
  ['/privacy', 'Privacy Policy | thenightera', 'How thenightera collects, uses, and protects information submitted through thenightera.in.', 'Privacy Policy', 'Read how thenightera handles contact, authentication, and analytics information.'],
  ['/terms', 'Terms of Service | thenightera', 'Terms governing use of thenightera.in and enquiries for thenightera services.', 'Terms of Service', 'Read terms for website use and thenightera service enquiries.'],
]

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')

for (const [path, title, description, heading, answer] of routes) {
  const canonical = `https://thenightera.in${path === '/' ? '' : path}`
  const fallback = `<main data-prerendered="true" style="max-width:1100px;margin:0 auto;padding:120px 24px 72px;font-family:system-ui,sans-serif;color:#1d1d1f"><p style="color:#7D2027;font-weight:700">thenightera · Indore, India</p><h1 style="font-size:clamp(2.5rem,7vw,5.5rem);line-height:1;letter-spacing:-.05em;max-width:900px">${esc(heading)}</h1><p style="font-size:1.2rem;line-height:1.7;max-width:760px;color:#5f5f63">${esc(answer)}</p><p><a href="/contact">Book a free consultation</a> · <a href="/services">Explore services</a> · <a href="/case-studies">Read case studies</a></p></main>`
  let html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${esc(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${esc(description)}">`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${esc(title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${esc(description)}">`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`)
  const output = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

console.log(`Prerendered ${routes.length} crawlable routes`)
