import Reveal from './Reveal'

export default function ServiceGrid({ services }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Reveal key={service.title}>
          <article className="group h-full overflow-hidden rounded-3xl border border-[#e2d7cb] bg-white shadow-[0_16px_40px_rgba(30,27,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(30,27,24,0.14)]">
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow">
                {service.icon}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm text-[#5c554f]">{service.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
