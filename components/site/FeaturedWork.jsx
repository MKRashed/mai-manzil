import Reveal from './Reveal'

export default function FeaturedWork({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Reveal key={item.title}>
          <article className="overflow-hidden rounded-3xl border border-[#e2d7cb] bg-white shadow-[0_18px_50px_rgba(30,27,24,0.1)]">
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[#5c554f]">{item.year}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
