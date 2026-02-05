'use client'

import { useState } from 'react'
import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import SectionHeading from '@/components/site/SectionHeading'

const initialState = { name: '', email: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

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

    const subject = encodeURIComponent('Event Inquiry — Mai Manzil')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
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
                  eyebrow="Contact"
                  title="Start your consultation"
                  description="Tell us about your event, your guest count, and the atmosphere you want to create."
                />
                <div className="mt-8 space-y-4 text-sm text-[#5c554f]">
                  <p>{site.contact.location}</p>
                  <p>{site.contact.phone}</p>
                  <p>{site.contact.email}</p>
                  <div className="flex flex-wrap gap-4">
                    {site.contact.socials.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mt-10 rounded-3xl border border-[#e2d7cb] bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#b08a5a]">Optional</p>
                  <p className="mt-3 text-sm text-[#5c554f]">
                    Prefer a hosted form? Replace the form action with Formspree or Netlify Forms when you launch.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-[#e2d7cb] bg-white p-8 shadow-[0_18px_50px_rgba(30,27,24,0.1)]"
              >
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="mt-3 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    />
                    {errors.name ? <p className="mt-2 text-xs text-[#b04b3e]">{errors.name}</p> : null}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="mt-3 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    />
                    {errors.email ? <p className="mt-2 text-xs text-[#b04b3e]">{errors.email}</p> : null}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.3em] text-[#5c554f]">Message</label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(event) => setForm({ ...form, message: event.target.value })}
                      className="mt-3 w-full rounded-2xl border border-[#e2d7cb] bg-[#f7f4f0] px-4 py-3 text-sm"
                    />
                    {errors.message ? <p className="mt-2 text-xs text-[#b04b3e]">{errors.message}</p> : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full rounded-full bg-[#1e1b18] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#f7f4f0]"
                >
                  Send Inquiry
                </button>
                {submitted ? (
                  <p className="mt-4 text-xs text-[#5c554f]">Thank you. Your email client should open shortly.</p>
                ) : null}
              </form>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
