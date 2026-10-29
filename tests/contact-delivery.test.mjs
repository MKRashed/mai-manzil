import test from 'node:test'
import assert from 'node:assert/strict'
import { deliveryFailure } from '../src/lib/contact-delivery.mjs'

test('delivery errors distinguish configuration and provider failures without exposing raw data', () => {
  for (const [status, response, expected] of [
    [401, { message: 'API key is invalid' }, 'email_authentication_failed'],
    [403, { message: 'The maimanzil.com domain is not verified' }, 'email_sender_not_verified'],
    [403, { message: 'You can only send testing emails to your own email address' }, 'email_sender_not_verified'],
    [429, { name: 'daily_quota_exceeded' }, 'email_quota_exceeded'],
    [429, {}, 'email_rate_limited'],
    [409, {}, 'email_request_conflict'],
    [422, {}, 'email_configuration_invalid'],
    [503, {}, 'email_provider_unavailable'],
    [403, {}, 'email_permission_denied'],
    [200, {}, 'email_provider_rejected'],
  ]) assert.equal(deliveryFailure(status, response), expected)
})