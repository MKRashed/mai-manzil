import Link from 'next/link'
import { ArrowUpRight, Building2, House, Info, Mail, MapPin, Phone, UsersRound } from 'lucide-react'
import Container from './Container'
import BrandLogo from './BrandLogo'
import { site } from '@/src/content/site'

const navigationIcons = {
  '/': House,
  '/portfolio': UsersRound,
  '/about': Info,
  '/contact': Mail,
}

function ContactIcon({ icon: Icon }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#dfd1be] bg-[#eae1d5] text-[#795b35]">
      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
    </span>
  )
}

export default function Footer() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.location)}`

  return (
    <footer className="border-t border-[#e2d7cb] bg-[#f0ebe5]">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Link href="/" aria-label={`${site.brand.name} home`} className="inline-flex rounded-lg">
              <BrandLogo />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5c554f]">
              {site.brand.footerDescription}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-[#756a60]">
              <Building2 size={14} strokeWidth={1.5} aria-hidden="true" />
              <span>{site.brand.legalName}</span>
            </div>
            <address className="mt-5 space-y-4 text-sm not-italic text-[#5c554f]">
              <div className="flex items-start gap-3">
                <ContactIcon icon={MapPin} />
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View office location on Google Maps: ${site.contact.location} (opens in a new tab)`}
                  className="group flex min-h-11 flex-1 items-start justify-between gap-3 rounded-lg py-1 leading-relaxed transition-colors hover:text-[#795b35]"
                >
                  <span className="max-w-xs">{site.contact.location}</span>
                  <ArrowUpRight size={16} aria-hidden="true" className="mt-1 shrink-0 text-[#795b35]" />
                </a>
              </div>
              <div className="flex items-start gap-3">
                <ContactIcon icon={Phone} />
                <div className="flex flex-1 flex-wrap gap-x-5">
                  {site.contact.phone.split('\n').map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="inline-flex min-h-11 items-center rounded-lg whitespace-nowrap transition-colors hover:text-[#795b35]"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ContactIcon icon={Mail} />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex min-h-11 min-w-0 items-center rounded-lg break-all transition-colors hover:text-[#795b35]"
                >
                  {site.contact.email}
                </a>
              </div>
            </address>
          </div>
          <nav aria-label="Footer navigation" className="border-t border-[#dfd4c8] pt-6 lg:border-0 lg:pt-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#795b35]">Explore</p>
            <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1 text-sm lg:grid-cols-1">
              {site.nav.map((item) => {
                const Icon = navigationIcons[item.href] ?? ArrowUpRight
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-11 items-center gap-3 rounded-lg text-[#5c554f] transition-colors hover:text-[#795b35]"
                  >
                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-[#92744d]" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
        <div className="mt-8 border-t border-[#dfd4c8] pt-5 text-[11px] leading-relaxed text-[#756a60] sm:mt-10 sm:text-xs">
          © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
