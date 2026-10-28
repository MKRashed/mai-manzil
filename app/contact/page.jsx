'use client'

import { useEffect, useState } from 'react'
import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'

const initialState = { role: '', name: '', email: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const requestedRole = new URLSearchParams(window.location.search).get('role')
    if (site.services.some((service) => service.title === requestedRole)) {
      setForm((current) => ({ ...current, role: requestedRole }))
    }
  }, [])

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.includes('@')) nextErrors.email = 'Please enter a valid email.'
    if (form.message.trim().length < 12) nextErrors.message = 'Please share a few details (min 12 characters).'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent('Staffing Inquiry — Mai Manzil')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}${form.role ? `\nService: ${form.role}` : ''}\n\n${form.message}`)
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setForm(initialState)
  }

  return (
    <div className="bg-[#f7f4f0]">
      <Navbar />
      <main>
        <section className="py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <SectionHeading
                  as="h1"
                  eyebrow="Contact"
                  title="Contact Mai Manzil for staffing in Dubai"
                  description="Share the roles, headcount, location, dates, shift hours, and responsibilities required for your assignment."
                />
                <div className="mt-8 space-y-4 text-sm text-[#5c554f]">
                  <p>{site.brand.legalName}</p>
                  <p>{site.contact.location}</p>
                  <p className="whitespace-pre-line">{site.contact.phone}</p>
                  <a className="inline-block text-[#b08a5a]" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </div>
                <div className="mt-10 rounded-3xl border border-[#e2d7cb] bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Staffing request</p>
                  <p className="mt-3 text-sm text-[#5c554f]">
                    Deployments depend on availability, assignment requirements, and written confirmation of the applicable schedule and terms.
                  </p>
                </div>
              </div>

              <form
                id="staffing-form"
                onSubmit={handleSubmit}
                className="scroll-mt-24 rounded-3xl border border-[#e2d7cb] bg-white p-6 shadow-[0_18px_50px_rgba(30,27,24,0.1)] sm:p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label htmlFor="staffing-role" className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Service</label>
                    <select
                      id="staffing-role"
                      name="role"
                      value={form.role}
                      onChange={(event) => setForm({ ...form, role: event.target.value })}
                      className="mt-3 min-h-11 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    >
                      <option value="">Select a service (optional)</option>
                      {site.services.map((service) => (
                        <option key={service.title} value={service.title}>{service.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="staffing-name" className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Name</label>
                    <input
                      id="staffing-name"
                      name="name"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'staffing-name-error' : undefined}
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="mt-3 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    />
                    {errors.name ? <p id="staffing-name-error" className="mt-2 text-xs text-[#b04b3e]">{errors.name}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="staffing-email" className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Email</label>
                    <input
                      id="staffing-email"
                      name="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'staffing-email-error' : undefined}
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="mt-3 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    />
                    {errors.email ? <p id="staffing-email-error" className="mt-2 text-xs text-[#b04b3e]">{errors.email}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="staffing-message" className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Message</label>
                    <textarea
                      id="staffing-message"
                      name="message"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'staffing-message-error' : undefined}
                      rows={6}
                      value={form.message}
                      onChange={(event) => setForm({ ...form, message: event.target.value })}
                      className="mt-3 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    />
                    {errors.message ? <p id="staffing-message-error" className="mt-2 text-xs text-[#b04b3e]">{errors.message}</p> : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full rounded-full bg-[#1e1b18] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#f7f4f0]"
                >
                  Send Inquiry
                </button>
                <p className="mt-4 text-xs leading-relaxed text-[#5c554f]">
                  This form opens your email application with your enquiry prepared. Review the details and send the email to share your request with Mai Manzil.
                </p>
                {submitted ? (
                  <p className="mt-4 text-xs text-[#5c554f]">Thank you. Your email client should open shortly.</p>
                ) : null}
              </form>
            </div>
            <section aria-labelledby="request-guide-title" className="mt-16 border-t border-[#e2d7cb] pt-10">
              <h2 id="request-guide-title" className="text-2xl font-semibold sm:text-3xl">What to include in your staffing request</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5c554f]">
                A clear brief helps us understand your operation and discuss a suitable staffing plan. Use the message field to describe the assignment, or include these details in your email when requesting hospitality, housekeeping or event personnel in Dubai.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: 'Roles and team size',
                    body: 'Tell us which roles you need and the number of people required for each role. You can request waiters, waitresses, bartenders, baristas, cashiers, stewards, housekeeping staff, supervisors, managers or hostesses. Mention whether you need one team for a single shift or different headcounts across several dates.',
                  },
                  {
                    title: 'Location and schedule',
                    body: 'Include the venue or worksite address, assignment dates, shift start and finish times, and any preparation or briefing time. Let us know whether the request is for a one-off event, several shifts or project-based support so the proposed schedule can be discussed clearly.',
                  },
                  {
                    title: 'Tasks and presentation',
                    body: 'Describe the main responsibilities and the setting where the team will work, such as a hotel, restaurant, cafe, reception or event venue. Share any relevant uniform, grooming, language or experience requirements, along with the service standards and site instructions that personnel need to follow.',
                  },
                  {
                    title: 'Site access and coordination',
                    body: 'Provide the name and contact details of the person coordinating the assignment. Include the reporting point, access arrangements and any site-specific safety or hygiene instructions. We will discuss availability, rates, schedules and applicable terms with you; deployments require written confirmation before they are treated as agreed.',
                  },
                ].map((item) => (
                  <article key={item.title} className="rounded-2xl border border-[#e2d7cb] bg-white p-6">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5c554f]">{item.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
