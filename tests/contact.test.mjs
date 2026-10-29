import test from 'node:test'
import assert from 'node:assert/strict'
import { validateInquiry } from '../src/lib/contact.mjs'
import { POST } from '../app/api/contact/route.js'

const valid = { name: 'Test Person', email: 'test@example.com', role: 'Housekeeping', message: 'We need five staff for an upcoming event.' }
const request = (body = valid, headers = {}) => new Request('http://localhost:3000/api/contact/', {
  method: 'POST', headers: { 'Content-Type': 'application/json', origin: 'http://localhost:3000', ...headers }, body: JSON.stringify(body),
})

test('validation rejects malformed, invalid and oversized entries', () => {
  for (const value of [null, [], 'text', {}]) assert.ok(Object.keys(validateInquiry(value, []).errors).length)
  const { errors } = validateInquiry({ ...valid, name: 'x'.repeat(101), email: 'bad@', phone: 'abc', role: 'Unknown', message: 'x'.repeat(5001) }, ['Housekeeping'])
  assert.deepEqual(Object.keys(errors).sort(), ['email', 'message', 'name', 'phone', 'role'])
  assert.deepEqual(validateInquiry(valid, ['Housekeeping']).errors, {})
})

test('contact API validates, handles configuration/provider failures and sends to a fixed inbox', async (t) => {
  const originalFetch = globalThis.fetch
  const vars = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']
  const previous = vars.map((key) => process.env[key])
  t.after(() => {
    globalThis.fetch = originalFetch
    vars.forEach((key, i) => { if (previous[i] === undefined) delete process.env[key]; else process.env[key] = previous[i] })
  })
  let calls = 0
  globalThis.fetch = async () => { calls++; throw new Error('Unexpected provider call') }
  assert.equal((await POST(request(valid, { origin: 'https://other.example' }))).status, 403)
  assert.equal((await POST(request(valid, { 'Content-Type': 'text/plain' }))).status, 415)
  assert.equal((await POST(request({ ...valid, message: 'short' }))).status, 400)
  assert.equal((await POST(request({ ...valid, website: 'spam.example' }))).status, 400)
  assert.equal((await POST(request({ ...valid, message: 'x'.repeat(25000) }))).status, 413)
  assert.equal((await POST(new Request('http://localhost:3000/api/contact/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))).status, 400)
  delete process.env.RESEND_API_KEY
  assert.equal((await POST(request())).status, 503)
  assert.equal(calls, 0)

  process.env.RESEND_API_KEY = 'test-key'
  process.env.CONTACT_FROM_EMAIL = 'Website <website@example.com>'
  process.env.CONTACT_TO_EMAIL = 'team@example.com'
  let sent
  const id = '45fc4c12-d2ec-4568-8231-8001da4f621c'
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails')
    assert.equal(options.headers['Idempotency-Key'], `contact-${id}`)
    sent = JSON.parse(options.body)
    return Response.json({ id: 'provider-message-id' })
  }
  assert.deepEqual(await (await POST(request({ ...valid, to: 'attacker@example.com', phone: '+971 501199583', company: 'Example Venue' }, { 'Idempotency-Key': id }))).json(), { success: true })
  assert.deepEqual(sent.to, ['team@example.com'])
  assert.equal(sent.from, process.env.CONTACT_FROM_EMAIL)
  assert.equal(sent.reply_to, valid.email)
  assert.match(sent.text, /Example Venue/)
  assert.match(sent.text, /We need five staff/)

  globalThis.fetch = async () => Response.json({ message: 'Private provider error' }, { status: 422 })
  const failure = await POST(request())
  assert.equal(failure.status, 502)
  assert.ok(!(await failure.text()).includes('Private provider error'))
  globalThis.fetch = async () => { throw new Error('Network failure') }
  assert.equal((await POST(request())).status, 502)
  globalThis.fetch = async () => Response.json({ id: 'accepted' })
  assert.equal((await POST(request())).status, 200)
  delete process.env.CONTACT_TO_EMAIL
  globalThis.fetch = async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body).to, ['info@maimanzil.com'])
    return Response.json({ id: 'accepted-default-recipient' })
  }
  assert.equal((await POST(request())).status, 200)
  assert.equal((await POST(request())).status, 429)
})
