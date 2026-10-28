import './globals.css'
import { Playfair_Display, Inter } from 'next/font/google'
import { site } from '@/src/content/site'
import { businessJsonLd, createPageMetadata, siteUrl } from '@/src/content/seo'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

export const metadata = {
  ...createPageMetadata(),
  metadataBase: new URL(siteUrl),
  keywords: [
    'manpower supply Dubai',
    'on-demand staffing Dubai',
    'hospitality staffing Dubai',
    'housekeeping staff Dubai',
    'event staffing Dubai',
    site.brand.name,
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#f7f4f0] text-[#1e1b18]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}
