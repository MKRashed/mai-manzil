import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Handshake, ShieldCheck, Users } from 'lucide-react'
import { site } from '@/src/content/site'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import Container from '@/components/site/Container'
import { createPageMetadata } from '@/src/content/seo'

export const metadata = createPageMetadata({
  title: 'About Mai Manzil | Manpower Supply in Dubai',
  description: 'Meet Mai Manzil, your Dubai manpower supply partner for hospitality, housekeeping and events, with staffing planned around your operational needs.',
  path: '/about/',
})
const icons = [Users, ShieldCheck, Handshake]

export default function AboutPage() {
  return <div className="bg-[#f7f4f0]">
    <Navbar />
    <main>
      <section className="overflow-hidden pb-14 pt-12 sm:pb-20 sm:pt-20"><Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div><p className="page-eyebrow">About Mai Manzil · Dubai, UAE</p><h1 className="mt-6 text-5xl leading-[1.12] sm:text-6xl lg:text-7xl">Behind every great service,<br /><span className="italic text-[#896439]">the right people.</span></h1><p className="mt-7 max-w-lg text-base leading-8 text-[#655d54]">We bring people and operations together. On-demand staffing for hospitality, housekeeping and events—planned around your business, your venue and your schedule.</p><Link href="/contact/#staffing-form" className="enquiry-button mt-8 w-fit">Let’s build your team <ArrowRight size={18} aria-hidden="true" /></Link></div>
          <div className="relative pb-7 pl-5 sm:pl-10"><div aria-hidden="true" className="absolute bottom-0 left-0 right-10 top-10 rounded-[160px_160px_24px_24px] bg-[#e4d7c5]" /><div className="relative aspect-[4/4.3] overflow-hidden rounded-[160px_160px_20px_20px]"><Image src="/luxury-event-dubai.jpg" alt="An elegantly prepared event venue in Dubai" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#1e1b18]/80 via-transparent to-transparent" /><div className="absolute bottom-8 left-7 right-7 border-t border-white/40 pt-5 text-white"><p className="text-[10px] uppercase tracking-[0.22em] text-[#e5cda9]">People. Presentation. Coordination.</p><p className="mt-3 text-xl leading-8">Ready for the moments<br />that matter to your business.</p></div></div></div>
        </div>
      </Container></section>
      <section className="border-y border-[#e2d7cb] bg-[#eee7dd]/60 py-12 sm:py-16"><Container className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"><div><p className="page-eyebrow">Our company</p><h2 className="mt-4 text-3xl sm:text-4xl">A partner in your<br />day-to-day success.</h2></div><div><p className="text-sm leading-8 text-[#655d54]">{site.about.body}</p><div className="mt-6 flex flex-wrap gap-2">{['Hospitality', 'Housekeeping', 'Events & operations'].map((label) => <span key={label} className="rounded-full border border-[#d8c9b4] px-4 py-2 text-xs text-[#795b35]">{label}</span>)}</div></div></Container></section>
      <section className="py-14 sm:py-20"><Container><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="page-eyebrow">The way we work</p><h2 className="mt-4 text-3xl sm:text-4xl">Small details. Stronger service.</h2></div><p className="max-w-xs text-sm leading-7 text-[#655d54]">Clear expectations and personal coordination, from the first brief to the final shift.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{site.about.values.map((value, index) => { const Icon = icons[index]; return <article key={value.title} className="rounded-2xl border border-[#e2d7cb] bg-white p-7"><div className="flex items-center justify-between"><span className="contact-icon"><Icon size={23} aria-hidden="true" /></span><span className="text-xs text-[#a2927e]">0{index + 1}</span></div><h3 className="mt-7 text-2xl">{value.title}</h3><p className="mt-4 text-sm leading-7 text-[#655d54]">{value.description}</p></article> })}</div></Container></section>
      <section className="pb-14 sm:pb-20"><Container><div className="grid overflow-hidden rounded-[28px] border border-[#e2d7cb] lg:grid-cols-[0.85fr_1.15fr]"><div className="bg-[#28251f] p-8 sm:p-12"><p className="page-eyebrow !text-[#d8b889]">Our vision</p><h2 className="mt-5 text-4xl leading-tight !text-[#f7f4f0]">Built on trust.<br /><span className="italic text-[#d8b889]">Focused on people.</span></h2><p className="mt-7 text-sm leading-8 text-[#dbd3c7]">{site.about.vision}</p></div><div className="bg-white p-8 sm:p-12"><p className="page-eyebrow">Our mission</p><h2 className="mt-4 text-3xl">Purpose in every placement.</h2><ul className="mt-7 space-y-5">{site.about.mission.map((statement) => <li key={statement} className="flex items-start gap-3 text-sm leading-7 text-[#655d54]"><Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-[#896439]" />{statement}</li>)}</ul></div></div></Container></section>
      <section className="border-t border-[#e2d7cb] bg-[#eee7dd] py-12 sm:py-16"><Container className="flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center"><div><p className="page-eyebrow">Your people. Your plan.</p><h2 className="mt-4 text-3xl sm:text-4xl">Let’s make your next shift a success.</h2></div><Link href="/contact/" className="enquiry-button shrink-0">Talk to our team <ArrowRight size={18} aria-hidden="true" /></Link></Container></section>
    </main>
    <Footer />
  </div>
}
