import Link from 'next/link'
import Container from './Container'
import { site } from '@/src/content/site'

export default function CTABand() {
  return (
    <section className="bg-[#1e1b18]">
      <Container className="py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Ready to begin</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold !text-[#f7f4f0]">
              Let’s plan something unforgettable.
            </h2>
          </div>
          <Link
            href={site.ctas.primary.href}
            className="inline-flex rounded-full border border-[#b08a5a] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#b08a5a] transition hover:bg-[#b08a5a] hover:text-[#1e1b18]"
          >
            {site.ctas.primary.label}
          </Link>
        </div>
      </Container>
    </section>
  )
}
