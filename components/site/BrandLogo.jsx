import { site } from '@/src/content/site'

export default function BrandLogo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <img
        src="/mai-manzil-logo.svg"
        alt={`${site.brand.name} logo`}
        width="100"
        height="84"
        className={`${compact ? 'h-9 sm:h-10' : 'h-11 sm:h-12'} w-auto shrink-0`}
      />
      <span className="text-sm font-semibold uppercase tracking-[0.16em] sm:text-base">
        {site.brand.name}
      </span>
    </span>
  )
}
