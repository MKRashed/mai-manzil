export const emptyInquiry = { name: '', email: '', phone: '', company: '', role: '', message: '', website: '' }

export function validateInquiry(input, roles) {
  const errors = {}
  const data = {}
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { data, errors: { form: 'Please complete the enquiry form.' } }
  for (const field of Object.keys(emptyInquiry)) {
    data[field] = typeof input[field] === 'string' ? input[field].trim() : ''
    if (input[field] !== undefined && typeof input[field] !== 'string') errors[field] = 'Please enter a valid value.'
  }
  if (!data.name || data.name.length > 100 || /[\r\n]/.test(data.name)) errors.name = 'Enter your name (up to 100 characters).'
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.'
  if (data.phone && (!/^[+\d\s().-]{7,30}$/.test(data.phone) || data.phone.replace(/\D/g, '').length < 7)) errors.phone = 'Enter a valid phone number with country code.'
  if (data.company.length > 160) errors.company = 'Use up to 160 characters.'
  if (data.role && !roles.includes(data.role)) errors.role = 'Please choose a service from the list.'
  if (data.message.length < 12 || data.message.length > 5000) errors.message = 'Share a few details (12–5,000 characters).'
  return { data, errors }
}

export function inquiryText(data) {
  return [
    'New staffing enquiry — Mai Manzil', '',
    `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || 'Not provided'}`,
    `Company: ${data.company || 'Not provided'}`, `Service: ${data.role || 'To be discussed'}`,
    '', 'Assignment details:', data.message,
  ].join('\n')
}
