import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'calma'
const BASE_URL = 'https://heycalma.in'
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/restaurant.jpg`

export default function SEOHead({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
}) {
  const fullTitle = title ? `${title} | calma` : 'calma — AI Review Management for Restaurants in India'
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      {/* Geo targeting — India + Indore */}
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Indore, Madhya Pradesh, India" />
      <meta name="geo.position" content="22.7196;75.8577" />
      <meta name="ICBM" content="22.7196, 75.8577" />
      <meta name="language" content="English" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="calma — AI review management for restaurants in India" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema */}
      {schema && (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  )
}
