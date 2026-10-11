export const SITE_URL = 'https://www.thenightera.tech'
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'thenightera',
  alternateName: 'The Nightera',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo-era.png`,
    width: 2172,
    height: 724,
  },
  image: `${SITE_URL}/hero.jpg`,
  description: 'thenightera is a global design studio for brand identity, social media, web development, and public relations.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    '@id': `${SITE_URL}/about#founder`,
    name: 'Tanishq Gangle',
    jobTitle: 'Founder and Creative Director',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+918251000525',
    email: 'hello@thenightera.tech',
    contactType: 'business enquiries',
    availableLanguage: ['English', 'Hindi'],
    areaServed: 'Worldwide',
  },
  sameAs: [
    'https://instagram.com/thenightera',
    'https://youtube.com/@thenightera',
    'https://wa.me/918251000525',
  ],
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'thenightera',
  url: `${SITE_URL}/`,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
}
