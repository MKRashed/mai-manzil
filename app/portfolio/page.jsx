'use client'

import { useMemo, useState } from 'react'
import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'
import PortfolioGrid from '@/components/site/PortfolioGrid'

const categories = ['All', 'Weddings', 'Corporate', 'Private', 'Cultural', 'Brand']

export default function PortfolioPage() {
  const [active, setActive] = useState('All')

  const items = useMemo(() => {
    if (active === 'All') return site.portfolio
    return site.portfolio.filter((item) => item.category === active)
  }, [active])

  return (
    <div className="bg-[#f7f4f0]">
      <Navbar />
      <main>
        <section className="py-20">
          <Container>
            <SectionHeading
              eyebrow="Portfolio"
              title="Signature celebrations and brand moments"
              description="Explore our curated portfolio spanning weddings, corporate events, and cultural celebrations."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    active === category
                      ? 'border-[#1e1b18] bg-[#1e1b18] text-[#f7f4f0]'
                      : 'border-[#e2d7cb] text-[#5c554f] hover:border-[#b08a5a] hover:text-[#1e1b18]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-12">
              <PortfolioGrid items={items} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
