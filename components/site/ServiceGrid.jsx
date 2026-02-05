import Reveal from './Reveal'

export default function ServiceGrid({ services }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Reveal key={service.title}>
          <div className="h-full rounded-3xl border border-[#e2d7cb] bg-white p-6 shadow-[0_16px_40px_rgba(30,27,24,0.08)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0ebe5] text-lg">
              {service.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
            <p className="mt-3 text-sm text-[#5c554f]">{service.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
