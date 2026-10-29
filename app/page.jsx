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
import CTABand from '@/components/site/CTABand'
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
          mobileHeadline={site.hero.mobileHeadline}
          mobileHeadlineAccent={site.hero.mobileHeadlineAccent}
          mobileSubhead={site.hero.mobileSubhead}
          badges={site.hero.badges}
          ctas={site.ctas}
          tagline={site.brand.tagline}
        />

        <section id="services" className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Services"
              title="On-demand manpower supply for Hospitality, Housekeeping and Events"
              description="Request the roles and team size your operation needs, with staffing planned around your schedule and site requirements."
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
              title="Manpower for hospitality, housekeeping & events"
              description="Explore the staffing roles and operational support Mai Manzil can provide on demand."
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
              title="A look at the settings we support"
              description="View hospitality, housekeeping, and event settings relevant to our on-demand manpower services."
            />
            <div className="mt-12">
              <Gallery items={site.gallery} />
            </div>
          </Container>
        </section>

        <section id="operations" className="py-20 bg-[#f0ebe5]">
          <Container>
            <SectionHeading
              eyebrow="What We Support"
              title="Manpower supplied when your business needs it"
              description="We provide on-demand and project-based staff, with every deployment confirmed against availability, operational requirements, and agreed terms."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {site.businessAreas.map((area) => (
                <Reveal key={area.title}>
                  <article className="h-full rounded-3xl border border-[#e2d7cb] bg-white p-6 shadow-[0_16px_40px_rgba(30,27,24,0.08)]">
                    <h3 className="text-xl font-semibold">{area.title}</h3>
                    <p className="mt-3 text-sm text-[#5c554f]">{area.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section id="process" className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Service Delivery"
              title="Clear coordination from request to delivery"
              description="Professional presentation, attendance, safety, hygiene, and client communication guide our service commitments."
            />
            <div className="mt-12">
              <ProcessTimeline steps={site.process} />
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
                  <p>{site.brand.legalName}</p>
                  <p>{site.contact.location}</p>
                  <p className="whitespace-pre-line">{site.contact.phone}</p>
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
