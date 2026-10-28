export default function SectionHeading({ eyebrow, title, description, align = 'left', as: Heading = 'h2' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`.trim()}>
      {eyebrow ? (
        <span className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">{eyebrow}</span>
      ) : null}
      <Heading className="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-base sm:text-lg text-[#5c554f]">{description}</p>
      ) : null}
    </div>
  )
}
