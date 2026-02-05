'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Container from './Container'

const AUTO_MS = 6500

export default function HeroSlider({ slides, headline, subhead, badges, ctas, tagline }) {
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
    <section className="relative min-h-[85vh] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/35" />
      <Container className="relative z-10 flex min-h-[85vh] items-center py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e2c79a] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            {tagline ?? 'Reliable event staffing, on demand'}
          </p>
          <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold !text-[#f7f4f0] drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
            {headline}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#f1e7db] drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]">
            {subhead}
          </p>
          {badges?.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#b08a5a]/50 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[#f3eadf]"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={ctas?.primary?.href ?? '/contact'}
              className="rounded-full bg-[#f7f4f0] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#1e1b18]"
            >
              {ctas?.primary?.label ?? 'Book a Consultation'}
            </Link>
            <Link
              href={ctas?.secondary?.href ?? '/portfolio'}
              className="rounded-full border border-[#b08a5a] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#b08a5a]"
            >
              {ctas?.secondary?.label ?? 'View Portfolio'}
            </Link>
          </div>
        </div>
      </Container>

      {safeSlides.length > 1 ? (
        <div className="absolute bottom-10 right-10 z-10 flex items-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="h-11 w-11 rounded-full border border-[#b08a5a]/60 text-[#f7f4f0] transition hover:border-[#b08a5a] hover:text-white"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide.image}-dot`}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2.5 w-2.5 rounded-full border ${
                  index === active
                    ? 'border-[#b08a5a] bg-[#b08a5a]'
                    : 'border-[#f7f4f0]/60 bg-transparent'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="h-11 w-11 rounded-full border border-[#b08a5a]/60 text-[#f7f4f0] transition hover:border-[#b08a5a] hover:text-white"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  )
}
