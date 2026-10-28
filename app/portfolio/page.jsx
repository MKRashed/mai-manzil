import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'
import { createPageMetadata } from '@/src/content/seo'

export const metadata = createPageMetadata({
  title: 'Staffing Capacity in Dubai | Mai Manzil',
  description: 'Explore staffing capacity for waiters, waitresses, baristas, bartenders, cashiers, stewards and housekeeping teams in Dubai. Request staff from Mai Manzil.',
  path: '/portfolio/',
})

export default function PortfolioPage() {
  return (
    <div className="bg-[#f7f4f0]">
      <Navbar />
      <main>
        <section className="py-20">
          <Container>
            <SectionHeading
              as="h1"
              eyebrow="Staffing Capacity"
              title="Role-by-role deployment capacity"
              description="The figures below are the requested minimum and maximum deployment capacity per role. Actual deployment depends on availability, advance notice, shift schedules, venue access, and role requirements."
            />
            <div className="mt-10 overflow-x-auto rounded-3xl border border-[#e2d7cb] bg-white shadow-[0_16px_40px_rgba(30,27,24,0.08)]">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-[#1e1b18] text-[#f7f4f0]">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">Position</th>
                    <th scope="col" className="px-6 py-4 font-medium">Minimum</th>
                    <th scope="col" className="px-6 py-4 font-medium">Maximum</th>
                    <th scope="col" className="px-6 py-4 font-medium">Typical responsibilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2d7cb]">
                  {site.staffingCapacity.map((item) => (
                    <tr key={item.role}>
                      <th scope="row" className="px-6 py-4 font-semibold">{item.role}</th>
                      <td className="px-6 py-4">{item.minimum}</td>
                      <td className="px-6 py-4">{item.maximum}</td>
                      <td className="px-6 py-4 text-[#5c554f]">{item.responsibilities}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 rounded-3xl border border-[#e2d7cb] bg-white p-6 text-sm text-[#5c554f]">
              <h2 className="font-semibold text-[#1e1b18]">Other roles available on request</h2>
              <p className="mt-2">Managers, supervisors, and hostesses can be discussed and confirmed based on the assignment.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
