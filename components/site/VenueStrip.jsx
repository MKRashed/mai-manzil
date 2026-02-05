import Reveal from './Reveal'

export default function VenueStrip({ items }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Reveal key={item}>
          <span className="rounded-full border border-[#e2d7cb] bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#7b7169]">
            {item}
          </span>
        </Reveal>
      ))}
    </div>
  )
}
