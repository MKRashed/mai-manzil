import Link from 'next/link'
import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'
import Reveal from '@/components/site/Reveal'
import ServiceGrid from '@/components/site/ServiceGrid'
import FeaturedWork from '@/components/site/FeaturedWork'
import Gallery from '@/components/site/Gallery'
import ProcessTimeline from '@/components/site/ProcessTimeline'
import Testimonials from '@/components/site/Testimonials'
import Stats from '@/components/site/Stats'
import Clients from '@/components/site/Clients'
import CTABand from '@/components/site/CTABand'
import VenueStrip from '@/components/site/VenueStrip'
import HeroSlider from '@/components/site/HeroSlider'

export default function HomePage() {
  return (
    <div className="bg-[#f7f4f0]">
      <Navbar />
      <main>
        <HeroSlider
          slides={site.heroSlides}
          headline={site.hero.headline}
          subhead={site.hero.subhead}
          badges={site.hero.badges}
          ctas={site.ctas}
          tagline={site.brand.tagline}
        />

        <section id="services" className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Services"
              title="Full-service experiences for every celebration"
              description="From first consultation to final send-off, we orchestrate each moment with clarity and care."
            />
            <div className="mt-12">
              <ServiceGrid services={site.services} />
            </div>
          </Container>
        </section>

        <section id="featured-work" className="py-20 bg-[#f0ebe5]">
          <Container>
            <SectionHeading
              eyebrow="Featured Work"
              title="Stories of refined celebration"
              description="A glimpse into our recent weddings, brand activations, and cultural events."
            />
            <div className="mt-12">
              <FeaturedWork items={site.featuredWork} />
            </div>
          </Container>
        </section>

        <section id="gallery" className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Gallery"
              title="A gallery-first view of our world"
              description="Elegant details, layered textures, and curated lighting define every experience."
            />
            <div className="mt-12">
              <Gallery items={site.gallery} />
            </div>
          </Container>
        </section>

        {/* <section id="process" className="py-20 bg-[#f0ebe5]">
          <Container>
            <SectionHeading
              eyebrow="Process"
              title="A refined, calm, and disciplined approach"
              description="We combine creative direction with reliable execution so every detail feels effortless."
            />
            <div className="mt-12">
              <ProcessTimeline steps={site.process} />
            </div>
          </Container>
        </section> */}

        {/* <section id="testimonials" className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Testimonials"
              title="Clients who value precision and elegance"
              description="Our clients trust us to deliver seamless moments with calm leadership."
            />
            <div className="mt-12">
              <Testimonials items={site.testimonials} />
            </div>
          </Container>
        </section> */}

        <section id="stats" className="py-20 bg-[#f0ebe5]">
          <Container>
            <SectionHeading
              eyebrow={site.statsSection.eyebrow}
              title={site.statsSection.title}
              description={site.statsSection.description}
            />
            <div className="mt-12">
              <Stats items={site.stats} />
            </div>
          </Container>
        </section>

        <section id="clients" className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Clients"
              title="Brands and hosts who partner with us"
              description="We collaborate with visionary teams to deliver premium hospitality."
            />
            <div className="mt-12">
              <Clients items={site.clients} />
            </div>
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Featured Venues</p>
              <div className="mt-4">
                <VenueStrip items={site.venues} />
              </div>
            </div>
          </Container>
        </section>

        <section id="contact" className="py-20 bg-[#f0ebe5]">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title={site.contact.headline}
                  description={site.contact.description}
                />
                <div className="mt-8 space-y-3 text-sm text-[#5c554f]">
                  <p>{site.contact.location}</p>
                  <p>{site.contact.phone}</p>
                  <p>{site.contact.email}</p>
                </div>
              </div>
              <Reveal className="rounded-3xl border border-[#e2d7cb] bg-white p-6 shadow-[0_18px_50px_rgba(30,27,24,0.1)]">
                <p className="text-sm text-[#5c554f]">
                  {site.contact.cardNote}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex rounded-full bg-[#1e1b18] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#f7f4f0]"
                >
                  {site.contact.ctaLabel}
                </Link>
              </Reveal>
            </div>
          </Container>
        </section>

        <CTABand />
      </main>
      <Footer />
    </div>
  )
}
