import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'
import Reveal from '@/components/site/Reveal'
import { createPageMetadata } from '@/src/content/seo'

export const metadata = createPageMetadata({
  title: 'About Mai Manzil | Manpower Supply in Dubai',
  description: 'Meet Mai Manzil, your Dubai manpower supply partner for hospitality, housekeeping and events, with staffing planned around your operational needs.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <div className="bg-[#f7f4f0]">
      <Navbar />
      <main>
        <section className="py-20">
          <Container>
            <SectionHeading
              eyebrow="About"
              title={site.about.title}
              description={site.about.body}
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {site.about.values.map((value) => (
                <Reveal key={value.title}>
                  <div className="rounded-3xl border border-[#e2d7cb] bg-white p-6 shadow-[0_16px_40px_rgba(30,27,24,0.08)]">
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="mt-3 text-sm text-[#5c554f]">{value.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              <section className="rounded-3xl border border-[#e2d7cb] bg-[#1e1b18] p-8 text-[#f7f4f0]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Our Vision</p>
                <p className="mt-4 text-lg">{site.about.vision}</p>
              </section>
              <section className="rounded-3xl border border-[#e2d7cb] bg-white p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Our Mission</p>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-[#5c554f]">
                  {site.about.mission.map((statement) => (
                    <li key={statement}>{statement}</li>
                  ))}
                </ul>
              </section>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
