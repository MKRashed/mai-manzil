'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Check, Utensils, Martini, Coffee, Receipt, CookingPot, Sparkles, ClipboardCheck, UserRoundCheck } from 'lucide-react'
import './service-stack.css'

const serviceIcons = {
  utensils: Utensils, martini: Martini, coffee: Coffee, receipt: Receipt,
  cookingPot: CookingPot, sparkles: Sparkles, clipboardCheck: ClipboardCheck, userRoundCheck: UserRoundCheck,
}
const palettes = [
  ['#956b37', '#fbf2e4'], ['#755582', '#f4edf8'], ['#47756a', '#ecf5f0'], ['#526e95', '#edf2fa'],
  ['#9a694e', '#fcf0e9'], ['#61764c', '#f1f5e9'], ['#655780', '#f1edf7'], ['#97657a', '#fbf0f5'],
]

export default function ServiceGrid({ services }) {
  const [active, setActive] = useState(0)
  const shellRef = useRef(null)
  const markers = useRef([])

  useEffect(() => {
    let frame = null
    const update = () => {
      frame = null
      const shell = shellRef.current
      if (!shell) return
      const top = parseFloat(getComputedStyle(shell).getPropertyValue('--stack-top')) || 100
      const sticky = getComputedStyle(shell.querySelector('.service-stack-card')).position === 'sticky'
      const activationLine = sticky ? top + 60 : window.innerHeight * 0.4
      let next = 0
      markers.current.forEach((marker, index) => {
        if (marker && marker.getBoundingClientRect().top <= activationLine) next = index
      })
      setActive((current) => current === next ? current : next)
    }
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [services.length])

  const showService = (index) => {
    markers.current[index]?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  if (!services.length) return null

  return (
    <div ref={shellRef} className="service-stack-shell">
      <aside className="service-stack-summary" aria-label="Service progress">
        <div>
          <p className="service-stack-caption">Explore our teams</p>
          <p className="service-stack-count" aria-label={`Service ${active + 1} of ${services.length}`}>
            {String(active + 1).padStart(2, '0')}<span> / {String(services.length).padStart(2, '0')}</span>
          </p>
          <p className="service-stack-current">{services[active].title}</p>
        </div>
        <nav className="service-stack-progress" aria-label="Choose a service">
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => showService(index)}
              aria-label={`Show ${service.title}`}
              aria-current={active === index ? 'step' : undefined}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </nav>
        <p className="service-stack-hint"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore</p>
      </aside>

      <div className="service-stack-cards">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon] ?? Utensils
          const [accent, tint] = palettes[index % palettes.length]
          const styles = { '--stack-offset': `${Math.min(index, 3) * 10}px`, '--service-accent': accent, '--service-tint': tint, '--service-order': index + 1 }
          return (
            <Fragment key={service.title}>
              <span ref={(node) => { markers.current[index] = node }} className="service-stack-marker" style={styles} aria-hidden="true" />
              <article
                className="service-stack-card"
                style={styles}
                aria-labelledby={`service-title-${index}`}
                onFocusCapture={() => { if (active !== index) showService(index) }}
              >
                <div className="service-stack-card-header">
                  <span className="service-stack-category">{service.category}</span>
                  <span className="service-stack-icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></span>
                </div>
                <h3 id={`service-title-${index}`}>{service.title}</h3>
                <p className="service-stack-description">{service.description}</p>
                <ul className="service-stack-highlights">
                  {service.highlights.map((highlight) => (
                    <li key={highlight}><Check size={14} strokeWidth={2} aria-hidden="true" /><span>{highlight}</span></li>
                  ))}
                </ul>
                <Link
                  href={`/contact/?role=${encodeURIComponent(service.title)}#staffing-form`}
                  prefetch={false}
                  aria-label={`Request ${service.title} staff`}
                  className="service-stack-request"
                >
                  Request this team <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </article>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
