import { deliveryFailure } from '../../../src/lib/contact-delivery.mjs'
import { site } from '../../../src/content/site.js'
import { inquiryText, validateInquiry } from '../../../src/lib/contact.mjs'

export const runtime = 'nodejs'
const attempts = new Map()
const windowMs = 15 * 60 * 1000
const reply = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })

export async function POST(request) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return reply({ error: 'Please send your enquiry from our website.' }, 403)
  if (!request.headers.get('content-type')?.includes('application/json')) return reply({ error: 'Please submit the enquiry form.' }, 415)
  if (Number(request.headers.get('content-length')) > 24000) return reply({ error: 'Your enquiry is too long.' }, 413)

  let input
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > 24000) return reply({ error: 'Your enquiry is too long.' }, 413)
    input = JSON.parse(raw)
  } catch {
    return reply({ error: 'We could not read your enquiry. Please try again.' }, 400)
  }
  if (input?.website) return reply({ error: 'Unable to submit this enquiry. Please contact us by email.' }, 400)
  const { data, errors } = validateInquiry(input, site.services.map((service) => service.title))
  if (Object.keys(errors).length) return reply({ error: 'Please check the highlighted fields.', errors }, 400)

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return reply({ error: 'The enquiry form is temporarily unavailable. Please email or call us using the details on this page.' }, 503)
  }

  // Per-instance protection. Also configure host-level rate limiting for public deployments.
  const now = Date.now()
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key)
  const key = data.email.toLowerCase()
  const entry = attempts.get(key) || { count: 0, expires: now + windowMs }
  if (entry.count >= 5 || attempts.size >= 10000) return reply({ error: 'Too many enquiries. Please wait 15 minutes or contact us directly.' }, 429, { 'Retry-After': '900' })
  entry.count += 1
  attempts.set(key, entry)

  try {
    const id = request.headers.get('idempotency-key')
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
        'Content-Type': 'application/json',
        ...(id && /^[a-f0-9-]{36}$/i.test(id) ? { 'Idempotency-Key': `contact-${id}` } : {}),
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL.trim(),
        to: [(process.env.CONTACT_TO_EMAIL || site.contact.email).trim()],
        reply_to: data.email,
        subject: `Staffing enquiry${data.role ? ` — ${data.role}` : ''}`,
        text: inquiryText(data),
      }),
      signal: AbortSignal.timeout(12000),
    })
    let result
    try { result = await response.json() } catch { result = {} }
    if (!response.ok || !result.id) {
      const code = deliveryFailure(response.status, result)
      console.error('[contact-delivery]', { code, providerStatus: response.status })
      return reply({ error: 'We could not send your enquiry. Please try again or email us directly.', code }, 502)
    }
    return reply({ success: true })
  } catch {
    return reply({ error: 'We could not confirm your enquiry. Please retry or contact us directly.' }, 502)
  }
}
