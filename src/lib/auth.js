import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isAuthConfigured = Boolean(supabaseUrl && supabasePublishableKey)

export const supabase = isAuthConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

function requireClient() {
  if (!supabase) throw new Error('Authentication connection is not ready yet.')
  return supabase
}

export async function signInWithGoogle() {
  const { data, error } = await requireClient().auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/login` },
  })
  if (error) throw error
  return data
}

export async function signInWithEmail(email) {
  const { data, error } = await requireClient().auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  })
  if (error) throw error
  return data
}

export async function getCurrentSession() {
  if (!supabase) return null
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export async function getAuthProviders() {
  if (!isAuthConfigured) return { google: false, email: false }
  const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: { apikey: supabasePublishableKey },
  })
  if (!response.ok) throw new Error('Could not check available sign-in methods.')
  const settings = await response.json()
  return {
    google: Boolean(settings.external?.google),
    email: Boolean(settings.external?.email),
  }
}

export function onAuthStateChange(callback) {
  if (!supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}

export async function signOut() {
  const { error } = await requireClient().auth.signOut()
  if (error) throw error
}
