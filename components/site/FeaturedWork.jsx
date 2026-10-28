import Reveal from './Reveal'

export default function FeaturedWork({ items }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Reveal key={item.title}>
          <article className="site-card h-full">
            <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#795b35]">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-[#5c554f]">{item.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
