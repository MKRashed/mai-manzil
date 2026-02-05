import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'
import Reveal from '@/components/site/Reveal'

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
            <div className="mt-16 rounded-3xl border border-[#e2d7cb] bg-[#1e1b18] p-10 text-[#f7f4f0]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Our Promise</p>
              <h2 className="mt-4 text-3xl font-semibold">Quiet confidence. Elevated details.</h2>
              <p className="mt-4 text-sm text-[#e0d6cb]">
                We guide each event with meticulous planning, thoughtful design, and a calm presence on the day-of. Our
                team is structured for premium results, ensuring every guest experience feels seamless and bespoke.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
