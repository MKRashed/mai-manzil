import Reveal from './Reveal'

export default function Testimonials({ items }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <Reveal key={item.name}>
          <div className="rounded-3xl border border-[#e2d7cb] bg-white p-6 shadow-[0_18px_50px_rgba(30,27,24,0.1)]">
            <div className="flex gap-1 text-[#b08a5a]">
              {Array.from({ length: item.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#5c554f]">“{item.quote}”</p>
            <div className="mt-6 text-sm font-semibold">{item.name}</div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">{item.role}</div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
