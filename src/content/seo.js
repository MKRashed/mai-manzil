import { site } from './site'

export const siteUrl = `https://${site.brand.domain}`
export const metaDescription =
  'On-demand manpower supply in Dubai for hospitality, housekeeping and events. Request waiters, baristas, stewards and operational staff from Mai Manzil.'

export function createPageMetadata({ title = site.brand.title, description = metaDescription, path = '/' } = {}) {
  const url = new URL(path, siteUrl).href

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.brand.name,
      images: [{ url: '/hero-dubai.jpg', width: 1400, height: 900 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero-dubai.jpg'],
    },
  }
}

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  '@id': `${siteUrl}/#business`,
  name: site.brand.name,
  legalName: site.brand.legalName,
  url: `${siteUrl}/`,
  description: metaDescription,
  image: `${siteUrl}/hero-dubai.jpg`,
  logo: `${siteUrl}/mai-manzil-logo.svg`,
  email: site.contact.email,
  telephone: site.contact.phone.split('\n').map((phone) => `+971${phone.replace(/\D/g, '').replace(/^0/, '')}`),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Meydan Grandstand, 6th Floor, Nad Al Sheba',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: { '@type': 'City', name: 'Dubai' },
}
