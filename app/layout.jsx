import './globals.css'
import { Playfair_Display, Inter } from 'next/font/google'
import { site } from '@/src/content/site'

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
  metadataBase: new URL(`https://${site.brand.domain}`),
  title: site.brand.title,
  description: site.brand.description,
  openGraph: {
    title: site.brand.title,
    description: site.brand.description,
    url: `https://${site.brand.domain}`,
    siteName: site.brand.name,
    images: [{ url: '/hero-dubai.jpg', width: 1400, height: 900 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.brand.title,
    description: site.brand.description,
    images: ['/hero-dubai.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#f7f4f0] text-[#1e1b18]">
        {children}
      </body>
    </html>
  )
}
