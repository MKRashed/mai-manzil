'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '@/src/content/site'
import BrandLogo from './BrandLogo'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const normalizedPath = pathname.replace(/\/$/, '') || '/'

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const handlePointer = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('pointerdown', handlePointer)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('pointerdown', handlePointer)
    }
  }, [menuOpen])

  const renderLinks = (mobile = false) => site.nav.map((item) => {
    const isActive = normalizedPath === item.href
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => setMenuOpen(false)}
        className={`${mobile ? 'flex min-h-11 items-center rounded-xl px-4 py-3' : 'py-2'} transition-colors ${
          isActive
            ? `font-semibold text-[#795b35] ${mobile ? 'bg-[#f0ebe5]' : ''}`
            : 'text-[#5c554f] hover:text-[#1e1b18]'
        }`}
      >
        {item.label}
      </Link>
    )
  })

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-[#e2d7cb] bg-[#f7f4f0]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-2 sm:py-3">
        <Link href="/" aria-label={`${site.brand.name} home`} onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 shrink-0 items-center rounded-lg">
          <BrandLogo compact />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm lg:flex">
          {renderLinks()}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={site.ctas.primary.href}
            onClick={() => setMenuOpen(false)}
            className="hidden min-h-11 items-center justify-center rounded-full bg-[#1e1b18] px-5 py-3 text-xs uppercase tracking-[0.15em] text-[#f7f4f0] transition-colors hover:bg-[#2f2924] sm:inline-flex"
          >
            {site.ctas.primary.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#e2d7cb] text-[#1e1b18] transition-colors hover:bg-[#f0ebe5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08a5a] focus-visible:ring-offset-2 lg:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-61px)] overflow-y-auto border-t border-[#e2d7cb] bg-[#f7f4f0] px-6 py-4 text-sm sm:max-h-[calc(100dvh-69px)] lg:hidden"
        onBlur={(event) => {
          if (!headerRef.current?.contains(event.relatedTarget)) setMenuOpen(false)
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1">
          {renderLinks(true)}
          <Link
            href={site.ctas.primary.href}
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1e1b18] px-5 py-3 text-xs uppercase tracking-[0.15em] text-[#f7f4f0] sm:hidden"
          >
            {site.ctas.primary.label}
          </Link>
        </div>
      </nav>
    </header>
  )
}
