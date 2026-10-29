// Classify provider errors without logging raw responses, addresses or credentials.
export function deliveryFailure(status, result = {}) {
  const message = typeof result?.message === 'string' ? result.message.toLowerCase() : ''
  const name = typeof result?.name === 'string' ? result.name : ''
  if (/api key|api_key/.test(message + ' ' + name) || status === 401) return 'email_authentication_failed'
  if (/domain|testing emails|verify/.test(message)) return 'email_sender_not_verified'
  if (/quota/.test(message + ' ' + name)) return 'email_quota_exceeded'
  if (status === 429) return 'email_rate_limited'
  if (status === 409) return 'email_request_conflict'
  if (status >= 500) return 'email_provider_unavailable'
  if (status === 422 || status === 400) return 'email_configuration_invalid'
  if (status === 403) return 'email_permission_denied'
  return 'email_provider_rejected'
}