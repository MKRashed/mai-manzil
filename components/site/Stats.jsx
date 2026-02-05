import Reveal from './Reveal'

export default function Stats({ items }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Reveal key={item.label}>
          <div className="rounded-3xl border border-[#e2d7cb] bg-white p-6 text-center">
            <div className="text-3xl font-semibold text-[#b08a5a]">{item.value}</div>
            <div className="mt-2 text-sm text-[#5c554f]">{item.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
