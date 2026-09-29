const authApiUrl = import.meta.env.VITE_AUTH_API_URL?.replace(/\/$/, '')

export function isAuthConfigured() {
  return Boolean(authApiUrl)
}

export async function requestPhoneOtp(phone) {
  if (!authApiUrl) throw new Error('Authentication connection is not ready yet.')

  const response = await fetch(`${authApiUrl}/auth/phone/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.message || 'Could not send OTP. Please try again.')
  }

  return response.json()
}

export function continueWithGoogle() {
  if (!authApiUrl) return false
  window.location.assign(`${authApiUrl}/auth/google`)
  return true
}
