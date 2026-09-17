import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'thenightera'
const BASE_URL = 'https://thenightera.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/hero.jpg`

// Real business data — update these if anything changes
const BUSINESS = {
  phone: '+918251000525',
  email: 'officialnightera@gmail.com',
  whatsapp: 'https://wa.me/918251000525',
  instagram: 'https://instagram.com/thenightera',
  youtube: 'https://youtube.com/@thenightera',
  addressLocality: 'Indore',
  addressRegion: 'Madhya Pradesh',
  postalCode: '452001',
  latitude: 22.7196,
  longitude: 75.8577,
}

/**
 * Global SEO Head component for thenightera.
 * Injects per-page meta, Open Graph, Twitter Cards, geo targeting,
 * Breadcrumb + Organization JSON-LD on every page, plus page-specific schemas.
 */
export default function SEOHead({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
  keywords = '',
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : 'thenightera — Best Marketing Agency in Indore | Social Media & Web Development'

  const canonical = `${BASE_URL}${path}`

  const defaultKeywords =
    'marketing agency indore, best marketing company in indore, social media management indore, web development indore, digital marketing indore, SMM indore, brand identity indore, PR agency indore, marketing company madhya pradesh, social media agency indore'
  const allKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords

  // ── Breadcrumb schema (every page) ──────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ...(path !== '/'
        ? [{ '@type': 'ListItem', position: 2, name: title || 'Page', item: canonical }]
        : []),
    ],
  }

  // ── Organization schema (every page) ────────────────────────────────────
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'thenightera',
    alternateName: 'The Nightera',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/favicon.svg`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/hero.jpg`,
    description:
      'thenightera is the best marketing agency in Indore, Madhya Pradesh, India. We specialize in social media management, web development, PR strategy, and brand identity for businesses across India.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Tanishq Gangle',
      jobTitle: 'Founder & Creative Director',
      worksFor: { '@type': 'Organization', name: 'thenightera' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Indore' },
      { '@type': 'City', name: 'Bhopal' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'State', name: 'Madhya Pradesh' },
      { '@type': 'Country', name: 'India' },
    ],
    sameAs: [
      BUSINESS.instagram,
      BUSINESS.youtube,
      BUSINESS.whatsapp,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marketing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PR Strategy' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
      ],
    },
  }

  // ── Speakable schema (for Google AI Overview / voice search) ─────────────
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    url: canonical,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable', 'h1', 'h2'],
    },
  }

  // ── Combine all schemas ───────────────────────────────────────────────────
  const allSchemas = [
    breadcrumbSchema,
    organizationSchema,
    speakableSchema,
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
  ]

  return (
    <Helmet>
      {/* ── Primary SEO ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="author" content="thenightera" />
      <meta name="publisher" content="thenightera" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} thenightera`} />

      {/* ── Geo Targeting — Indore, MP, India ── */}
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Indore, Madhya Pradesh, India" />
      <meta name="geo.position" content={`${BUSINESS.latitude};${BUSINESS.longitude}`} />
      <meta name="ICBM" content={`${BUSINESS.latitude}, ${BUSINESS.longitude}`} />
      <meta name="language" content="English" />
      <meta name="content-language" content="en-IN" />
      <meta name="rating" content="general" />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thenightera" />
      <meta name="twitter:creator" content="@thenightera" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* ── Mobile / PWA ── */}
      <meta name="theme-color" content="#ECE6D8" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="thenightera" />

      {/* ── JSON-LD Structured Data ── */}
      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}
