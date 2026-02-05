import Reveal from './Reveal'

export default function Clients({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Reveal key={item}>
          <div className="flex h-16 items-center justify-center rounded-full border border-[#e2d7cb] bg-white text-xs uppercase tracking-[0.3em] text-[#7b7169]">
            {item}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
