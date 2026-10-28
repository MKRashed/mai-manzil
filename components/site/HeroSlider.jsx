'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from './Container'

const AUTO_MS = 6500

export default function HeroSlider({ slides, headline, subhead, mobileHeadline, mobileHeadlineAccent, mobileSubhead, badges, ctas, tagline }) {
  const safeSlides = useMemo(() => slides?.filter((s) => s?.image) ?? [], [slides])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % safeSlides.length)
    }, AUTO_MS)
    return () => clearInterval(id)
  }, [safeSlides.length])

  const goPrev = () => {
    if (!safeSlides.length) return
    setActive((prev) => (prev - 1 + safeSlides.length) % safeSlides.length)
  }

  const goNext = () => {
    if (!safeSlides.length) return
    setActive((prev) => (prev + 1) % safeSlides.length)
  }

  return (
    <section aria-label="Introduction" className="relative flex min-h-[min(600px,calc(100svh-85px))] flex-col justify-between overflow-hidden bg-[#1e1b18] sm:block sm:min-h-[85vh]">
      {safeSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            index === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== active}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[#141016] sm:bg-gradient-to-r sm:from-black/75 sm:via-black/60 sm:to-black/35" />
      <Container className="relative z-10 flex w-full flex-1 items-end pb-7 pt-28 sm:min-h-[85vh] sm:flex-none sm:items-center sm:py-20">
        <div className="w-full max-w-2xl">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[#f0d39b] sm:hidden">
            <span aria-hidden="true" className="h-px w-7 bg-[#d9b77b]" />
            Dubai, UAE
          </p>
          <p className="hidden text-xs uppercase tracking-[0.3em] text-[#e2c79a] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:block">
            {tagline ?? 'On-demand manpower. Professional people. Reliable service.'}
          </p>
          <h1 className="text-balance text-[clamp(2.5rem,11.5vw,3.25rem)] leading-[1.06] font-medium tracking-[-0.025em] sm:mt-6 sm:text-5xl sm:font-semibold sm:leading-tight sm:tracking-normal lg:text-6xl !text-[#f7f4f0] drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
            <span className="sm:hidden">
              {mobileHeadline ?? headline}
              {mobileHeadlineAccent ? <span className="block font-normal italic text-[#edcd93]">{mobileHeadlineAccent}</span> : null}
            </span>
            <span className="hidden sm:inline">{headline}</span>
          </h1>
          <p className="mt-4 text-[13px] leading-relaxed text-[#f1e7db] sm:mt-6 sm:text-lg drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]">
            <span className="sm:hidden">{mobileSubhead ?? subhead}</span>
            <span className="hidden sm:inline">{subhead}</span>
          </p>
          {badges?.length ? (
            <div className="mt-6 hidden flex-wrap gap-3 sm:flex">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="flex min-h-8 items-center justify-center rounded-full border border-[#b08a5a]/50 bg-black/30 px-2 py-1.5 text-center text-[9px] leading-snug uppercase tracking-[0.08em] text-[#f3eadf] sm:min-h-0 sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.25em]"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-4 sm:mt-10">
            <Link
              href={ctas?.primary?.href ?? '/contact'}
              className="inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-[#edcd93] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#241d16] transition-colors hover:bg-[#f7dfb2] sm:min-h-11 sm:w-auto sm:justify-center sm:bg-[#f7f4f0] sm:py-3 sm:text-xs sm:font-normal sm:tracking-[0.3em] sm:text-[#1e1b18] sm:hover:bg-white"
            >
              {ctas?.primary?.label ?? 'Request Staff'}
              <ArrowUpRight size={18} aria-hidden="true" className="sm:hidden" />
            </Link>
            <Link
              href={ctas?.secondary?.href ?? '/portfolio'}
              className="hidden min-h-11 items-center justify-center rounded-full border border-[#b08a5a] px-6 py-3 text-center text-xs uppercase tracking-[0.3em] text-[#b08a5a] sm:inline-flex"
            >
              {ctas?.secondary?.label ?? 'View Staffing Capacity'}
            </Link>
          </div>
        </div>
      </Container>

      {safeSlides.length > 1 ? (
        <div className="relative z-10 mx-6 flex shrink-0 items-center justify-between gap-2 border-t border-white/15 py-3 sm:absolute sm:bottom-10 sm:right-10 sm:mx-0 sm:justify-center sm:gap-4 sm:border-0 sm:p-0">
          <span className="text-[11px] tabular-nums tracking-[0.12em] text-[#f1e7db] sm:hidden" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}<span className="text-white/40"> / {String(safeSlides.length).padStart(2, '0')}</span>
          </span>
          <button
            type="button"
            onClick={goPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b08a5a]/60 text-[#f7f4f0] transition hover:border-[#b08a5a] hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center sm:gap-2">
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide.image}-dot`}
                type="button"
                onClick={() => setActive(index)}
                className="flex h-11 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e2c79a] sm:h-6"
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === active}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full border ${index === active ? 'border-[#b08a5a] bg-[#b08a5a]' : 'border-[#f7f4f0]/60 bg-transparent'}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b08a5a]/60 text-[#f7f4f0] transition hover:border-[#b08a5a] hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
