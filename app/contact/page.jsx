'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { site } from '@/src/content/site'
import { emptyInquiry, validateInquiry } from '@/src/lib/contact.mjs'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'

const faqs = [
  ['What details should I include?', 'Include the roles and headcount, venue, dates, shift times, main responsibilities and any uniform or site-access requirements. It is fine if you are still planning—we can discuss the details.'],
  ['Can I request staff for a single event?', 'Yes. We consider one-off events, multiple shifts and project-based assignments. Availability and the staffing plan are discussed for each request.'],
  ['Is my booking confirmed when I send this form?', 'Sending an enquiry starts the conversation. Deployment is confirmed only after availability, rates, schedule and applicable terms have been agreed in writing.'],
]

export default function ContactPage() {
  const [form, setForm] = useState({ ...emptyInquiry })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const formRef = useRef(null)
  const resultRef = useRef(null)
  const requestId = useRef(null)
  const sending = useRef(false)

  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get('role')
    if (site.services.some((service) => service.title === role)) setForm((current) => ({ ...current, role }))
  }, [])
  useEffect(() => { if (status === 'success') resultRef.current?.focus() }, [status])

  function update(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setError('')
    requestId.current = null
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (sending.current) return
    const validation = validateInquiry(form, site.services.map((service) => service.title))
    setErrors(validation.errors)
    if (Object.keys(validation.errors).length) {
      formRef.current?.elements.namedItem(Object.keys(validation.errors)[0])?.focus()
      return
    }
    sending.current = true
    setStatus('sending')
    setError('')
    requestId.current ||= crypto.randomUUID()
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId.current },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json()
      if (!response.ok || !result.success) {
        setErrors(result.errors || {})
        throw new Error(result.error || 'We could not send your enquiry. Please try again.')
      }
      setStatus('success')
      setForm({ ...emptyInquiry })
      requestId.current = null
    } catch (failure) {
      setStatus('error')
      setError(failure.name === 'TimeoutError' || failure.name === 'TypeError' ? 'We could not confirm your enquiry. Check your connection and retry, or email us directly.' : failure.message)
    } finally { sending.current = false }
  }

  function field(name, label, options = {}) {
    return <div>
      <label htmlFor={`contact-${name}`} className="enquiry-label">{label}{options.required ? <span className="ml-1 text-[#946b3b]" aria-hidden="true">*</span> : <span className="ml-1.5 font-normal text-[#82776b]">(optional)</span>}</label>
      <input id={`contact-${name}`} name={name} type={options.type || 'text'} autoComplete={options.autoComplete} required={options.required} maxLength={options.maxLength} placeholder={options.placeholder} value={form[name]} onChange={update} className="enquiry-input" aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />
      {errors[name] && <p id={`${name}-error`} className="mt-2 text-xs text-red-700">{errors[name]}</p>}
    </div>
  }

  return <div className="bg-[#f7f4f0]">
    <Navbar />
    <main>
      <section className="pt-6 sm:pt-8">
        <Container>
          <p className="page-eyebrow">Contact Mai Manzil</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h1 className="text-3xl leading-tight sm:text-4xl">Let’s plan <span className="italic text-[#896439]">your team.</span></h1>
            <p className="hidden max-w-sm text-sm leading-6 text-[#5c554f] sm:block">Share your staffing needs. We’ll help with the next steps.</p>
          </div>
        </Container>
      </section>
      <section className="pb-8 pt-5 sm:pb-10 sm:pt-6"><Container>
        <div className="grid items-start gap-6 lg:grid-cols-[1.75fr_1fr] lg:gap-8">

          <div id="staffing-form" className="compact-enquiry scroll-mt-24 rounded-2xl border border-[#d4c2a9] bg-white p-5 shadow-[0_12px_40px_-24px_rgba(50,36,20,0.22)] sm:p-6">
            {status === 'success' ? <div ref={resultRef} tabIndex={-1} role="status" className="py-14 text-center focus:outline-none"><CheckCircle2 size={48} className="mx-auto text-[#6b7952]" aria-hidden="true" /><p className="page-eyebrow mt-7">Thank you for reaching out</p><h2 className="mt-4 text-4xl">Your enquiry is on its way.</h2><p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#655d54]">We’ll review your requirements and follow up at the email address you provided. Your staffing booking will be confirmed separately.</p><button type="button" onClick={() => setStatus('idle')} className="enquiry-button mx-auto mt-8">Send another enquiry <ArrowRight size={17} aria-hidden="true" /></button></div> :
              <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={status === 'sending'}>
                <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="text-2xl">Send a staffing enquiry</h2><p className="text-[11px] text-[#82776b]">* Required fields</p></div>
                <fieldset disabled={status === 'sending'} className="mt-5 grid min-w-0 gap-4 disabled:opacity-70 sm:grid-cols-2">
                  <legend className="sr-only">Your contact details and staffing requirements</legend>
                  {field('name', 'Full name', { required: true, autoComplete: 'name', maxLength: 100, placeholder: 'Your name' })}
                  {field('email', 'Email address', { required: true, type: 'email', autoComplete: 'email', maxLength: 254, placeholder: 'you@company.com' })}
                  {field('phone', 'Phone number', { type: 'tel', autoComplete: 'tel', maxLength: 30, placeholder: '+971 …' })}
                  {field('company', 'Company / venue', { autoComplete: 'organization', maxLength: 160, placeholder: 'Company or venue name' })}
                  <div className="sm:col-span-2"><label htmlFor="contact-role" className="enquiry-label">Which service do you need? <span className="font-normal text-[#82776b]">(optional)</span></label><div className="relative"><select id="contact-role" name="role" value={form.role} onChange={update} className="enquiry-input appearance-none pr-10" aria-invalid={Boolean(errors.role)} aria-describedby={errors.role ? 'role-error' : undefined}><option value="">Select a service</option>{site.services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}</select><ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-4 top-6 text-[#82776b]" /></div>{errors.role && <p id="role-error" className="mt-2 text-xs text-red-700">{errors.role}</p>}</div>
                  <div className="sm:col-span-2"><label htmlFor="contact-message" className="enquiry-label">Your staffing brief <span className="text-[#946b3b]" aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required rows={3} maxLength={5000} value={form.message} onChange={update} placeholder="Tell us about the roles, number of staff, venue, dates and shift times…" className="enquiry-input min-h-24 resize-y" aria-invalid={Boolean(errors.message)} aria-describedby={`message-hint${errors.message ? ' message-error' : ''}`} /><div id="message-hint" className="mt-2 flex justify-between gap-4 text-[11px] text-[#82776b]"><span>Still planning? Share what you know so far.</span><span className="shrink-0">{form.message.length.toLocaleString()} / 5,000</span></div>{errors.message && <p id="message-error" className="mt-2 text-xs text-red-700">{errors.message}</p>}</div>
                  <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" value={form.website} onChange={update} autoComplete="off" tabIndex={-1} /></div>
                </fieldset>
                {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">{error} <a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>}
                <button disabled={status === 'sending'} type="submit" className="enquiry-button mt-4 w-full">{status === 'sending' ? <>Sending enquiry… <LoaderCircle size={17} className="animate-spin" aria-hidden="true" /></> : <>Send staffing enquiry <Send size={17} aria-hidden="true" /></>}</button>
                <p className="mt-3 text-center text-[11px] leading-5 text-[#82776b]">We’ll use your details to respond to this enquiry.</p>
              </form>}
          </div>
          <aside className="contact-sidebar rounded-2xl border border-[#e2d7cb] bg-[#eee7dd]/50 p-5 sm:p-6">
            <h2 className="text-2xl">Prefer to talk?</h2>
            <p className="mt-2 text-sm leading-6 text-[#655d54]">Reach our Dubai team directly.</p>
            <div className="mt-4 divide-y divide-[#e2d7cb] border-t border-[#e2d7cb]">
              <div className="contact-detail"><span className="contact-icon"><Mail size={20} aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="page-eyebrow !text-[10px]">Email us</p><a href={`mailto:${site.contact.email}`} className="mt-2 inline-block break-all text-sm font-medium hover:text-[#896439]">{site.contact.email}</a></div><ArrowUpRight size={17} aria-hidden="true" className="text-[#896439]" /></div>
              <div className="contact-detail"><span className="contact-icon"><Phone size={20} aria-hidden="true" /></span><div><p className="page-eyebrow !text-[10px]">Call our team</p><div className="mt-2 flex flex-col gap-2">{site.contact.phone.split('\n').map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm font-medium hover:text-[#896439]">{phone}</a>)}</div></div></div>
              <div className="contact-detail"><span className="contact-icon"><MapPin size={20} aria-hidden="true" /></span><div><p className="page-eyebrow !text-[10px]">Based in Dubai</p><address className="mt-2 text-sm not-italic leading-6 text-[#655d54]">{site.contact.location}</address><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.contact.location)}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#795b35]">View on map <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div></div>
            </div>
            <p className="mt-2 border-t border-[#e2d7cb] pt-4 text-xs leading-6 text-[#655d54]">Deployments are confirmed once availability, rates and terms are agreed in writing.</p>
          </aside>
        </div>
      </Container></section>
      <section className="border-t border-[#e2d7cb] py-8"><Container className="grid gap-5 lg:grid-cols-[0.75fr_1.75fr] lg:gap-8"><div><h2 className="text-2xl">Useful to know</h2></div><div className="divide-y divide-[#e2d7cb] border-y border-[#e2d7cb]">{faqs.map(([question, answer]) => <details key={question} className="group py-1"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-[#896439] [&::-webkit-details-marker]:hidden">{question}<ChevronDown size={18} aria-hidden="true" className="shrink-0 text-[#896439] transition-transform group-open:rotate-180" /></summary><p className="pb-6 pr-6 text-sm leading-7 text-[#655d54]">{answer}</p></details>)}</div></Container></section>
    </main>
    <Footer />
  </div>
}
