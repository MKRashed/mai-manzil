import Link from 'next/link'
import Container from './Container'
import { site } from '@/src/content/site'

export default function Footer() {
  return (
    <footer className="border-t border-[#e2d7cb] bg-[#f0ebe5]">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-lg font-semibold tracking-[0.2em] uppercase">{site.brand.name}</p>
            <p className="text-sm text-[#5c554f] max-w-sm">{site.brand.description}</p>
            <div className="text-sm text-[#5c554f]">
              <p>{site.contact.location}</p>
              <p>{site.contact.phone}</p>
              <p>{site.contact.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Quick Links</p>
            <div className="flex flex-col gap-2 text-sm">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-[#5c554f] hover:text-[#1e1b18]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Follow</p>
            <div className="flex flex-col gap-2 text-sm">
              {site.contact.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5c554f] hover:text-[#1e1b18]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-[#e2d7cb] pt-6 text-xs uppercase tracking-[0.3em] text-[#7b7169]">
          © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
