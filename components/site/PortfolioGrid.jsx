import Reveal from './Reveal'

export default function PortfolioGrid({ items }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Reveal key={`${item.title}-${item.year}`}>
          <article className="overflow-hidden rounded-3xl border border-[#e2d7cb] bg-white shadow-[0_16px_40px_rgba(30,27,24,0.08)]">
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[#5c554f]">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#7b7169]">{item.year}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
