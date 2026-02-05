import Reveal from './Reveal'

export default function ProcessTimeline({ steps }) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {steps.map((step, idx) => (
        <Reveal key={step.step}>
          <div className="rounded-3xl border border-[#e2d7cb] bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b08a5a] text-sm font-semibold text-[#b08a5a]">
              0{idx + 1}
            </div>
            <h3 className="mt-5 text-xl font-semibold">{step.step}</h3>
            <p className="mt-3 text-sm text-[#5c554f]">{step.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
