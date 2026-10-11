import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../lib/siteStructuredData'

const SITE_NAME = 'thenightera'
const DEFAULT_OG_IMAGE = `${SITE_URL}/hero.jpg`

/**
 * Global SEO Head component for thenightera.
 * Injects per-page metadata and page-specific structured data.
 */
export default function SEOHead({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
  noIndex = false,
}) {
  const fullTitle = title
    ? (title.toLowerCase().includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`)
    : 'thenightera Design Studio | Brand & Digital Experiences'

  const canonical = `${SITE_URL}${path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`}`

  // ── Breadcrumb schema (every page) ──────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...(path !== '/'
        ? [{ '@type': 'ListItem', position: 2, name: title || 'Page', item: canonical }]
        : []),
    ],
  }

  const allSchemas = noIndex
    ? []
    : [...(path !== '/' ? [breadcrumbSchema] : []), ...(schema ? (Array.isArray(schema) ? schema : [schema]) : [])]

  return (
    <Helmet>
      <html lang="en" />
      {/* ── Primary SEO ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!noIndex && <link rel="canonical" href={canonical} />}
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {!noIndex && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1376" />
      <meta property="og:image:height" content="768" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:image:type" content="image/jpeg" />

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
