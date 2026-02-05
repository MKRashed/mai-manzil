'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useActiveSection } from '@/hooks/use-active-section'
import { site } from '@/src/content/site'

const sectionLinks = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#featured-work', id: 'featured-work' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  // { label: 'Process', href: '#process', id: 'process' },
  // { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const active = useActiveSection(sectionLinks.map((link) => link.id))
  const isHome = pathname === '/'

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-[#f7f4f0]/90 border-b border-[#e2d7cb]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] uppercase">
          {site.brand.name}
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {isHome
            ? sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    active === link.id
                      ? 'text-[#b08a5a]'
                      : 'text-[#1e1b18]/70 hover:text-[#1e1b18]'
                  }`}
                >
                  {link.label}
                </a>
              ))
            : site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#1e1b18]/70 hover:text-[#1e1b18] transition"
                >
                  {item.label}
                </Link>
              ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={site.ctas.primary.href}
            className="hidden sm:inline-flex rounded-full border border-[#b08a5a] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#b08a5a] transition hover:bg-[#b08a5a] hover:text-white"
          >
            {site.ctas.primary.label}
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-[#1e1b18] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#f7f4f0] transition hover:bg-[#2f2924]"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
