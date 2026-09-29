import { useEffect, useState } from 'react'
import { ArrowRight, LogOut, ShieldCheck } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import {
  getCurrentSession,
  getAuthProviders,
  isAuthConfigured,
  onAuthStateChange,
  signInWithEmail,
  signInWithGoogle,
  signOut,
} from '../lib/auth'

function GoogleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.36l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.05v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.93A6 6 0 0 1 6.07 12c0-.67.12-1.32.32-1.93V7.45H3.05A10 10 0 0 0 2 12c0 1.62.39 3.15 1.05 4.55l3.34-2.62Z" />
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.8.51 3.84 1.5l2.88-2.88A9.67 9.67 0 0 0 12 2a10 10 0 0 0-8.95 5.45l3.34 2.62C7.18 7.7 9.39 5.94 12 5.94Z" />
    </svg>
  )
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [providers, setProviders] = useState({ google: false, email: true })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let active = true
    getCurrentSession()
      .then(current => { if (active) setSession(current) })
      .catch(error => { if (active) setStatus({ type: 'error', message: error.message }) })
      .finally(() => { if (active) setCheckingSession(false) })

    getAuthProviders()
      .then(available => { if (active) setProviders(available) })
      .catch(() => {})

    const unsubscribe = onAuthStateChange(current => setSession(current))
    return () => { active = false; unsubscribe() }
  }, [])

  const showMissingConfig = () => setStatus({ type: 'info', message: 'Supabase environment variables are not configured for this deployment yet.' })

  const handleGoogle = async () => {
    setStatus({ type: '', message: '' })
    if (!isAuthConfigured) return showMissingConfig()
    if (!providers.google) {
      setStatus({ type: 'info', message: 'Google sign-in is being configured. Use email login for now.' })
      return
    }
    setSubmitting(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
      setSubmitting(false)
    }
  }

  const handleEmail = async (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: 'error', message: 'Enter a valid email address.' })
      return
    }
    if (!isAuthConfigured) return showMissingConfig()

    setSubmitting(true)
    setStatus({ type: '', message: '' })
    try {
      await signInWithEmail(email.trim())
      setStatus({ type: 'success', message: 'Secure sign-in link sent. Check your email.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    setSubmitting(true)
    try {
      await signOut()
      setSession(null)
      setStatus({ type: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  const statusClass = status.type === 'error'
    ? 'bg-red-50 text-red-700'
    : status.type === 'success'
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-amber-50 text-amber-800'

  return (
    <div className="min-h-[calc(100dvh-52px)] bg-[#FAF7F2] px-5 py-12 md:py-20">
      <SEOHead title="Client Login" description="Join the thenightera ecosystem and access your client workspace." path="/login" noIndex />

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_90px_rgba(29,29,31,0.10)] md:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-[620px] overflow-hidden bg-[#1d1d1f] p-12 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ff7a52] opacity-60 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#ff6f9c] opacity-50 blur-3xl" />
          <p className="relative text-sm font-semibold tracking-[-0.02em]">thenightera</p>
          <div className="relative">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/50">The thenightera ecosystem</p>
            <h1 className="max-w-md text-5xl font-semibold leading-[0.96] tracking-[-0.055em]">Everything your brand needs. One place.</h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-white/60">Join a workspace where ideas become launches, approvals move faster, and growth stays visible.</p>
          </div>
        </section>

        <section className="flex min-h-[560px] flex-col justify-center p-7 sm:p-12 md:p-14">
          <div className="mb-10 md:hidden"><p className="text-sm font-semibold text-[#372713]">thenightera</p></div>

          {checkingSession ? (
            <p className="text-sm text-[#6e6e73]">Checking secure session…</p>
          ) : session ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A39670]">Signed in</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">Welcome back.</h2>
              <p className="mt-4 break-all text-sm leading-6 text-[#6e6e73]">{session.user.email || session.user.phone || 'Authenticated client'}</p>
              <button type="button" onClick={handleSignOut} disabled={submitting} className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-5 text-sm font-semibold text-[#1d1d1f] transition hover:bg-black/[0.03] disabled:opacity-60">
                <LogOut size={16} /> Sign out
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A39670]">Your workspace awaits</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">Join the ecosystem.</h2>
              <p className="mt-3 text-sm leading-6 text-[#6e6e73]">One secure sign-in. Every project, approval, and result.</p>

              <button type="button" onClick={handleGoogle} disabled={submitting} className="mt-9 flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-black/15 bg-white px-5 text-sm font-semibold text-[#1d1d1f] transition hover:border-black/30 hover:bg-black/[0.02] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#7D2027]/30">
                <GoogleMark /> Continue with Google
              </button>

              <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-black/35"><span className="h-px flex-1 bg-black/10" /> or continue with email <span className="h-px flex-1 bg-black/10" /></div>

              <form onSubmit={handleEmail}>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1d1d1f]">Email address</label>
                <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@gmail.com" className="min-h-12 w-full rounded-2xl border border-black/15 bg-[#FAFAF8] px-4 text-base text-[#1d1d1f] outline-none placeholder:text-black/25 focus:border-[#7D2027]/50 focus:ring-2 focus:ring-[#7D2027]/10" />
                <button type="submit" disabled={submitting} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#7D2027]/30">
                  {submitting ? 'Sending…' : 'Email me a sign-in link'} <ArrowRight size={16} />
                </button>
              </form>

              {status.message && <p role="status" className={`mt-4 rounded-xl px-4 py-3 text-sm ${statusClass}`}>{status.message}</p>}
              <p className="mt-8 flex items-center justify-center gap-2 text-xs text-[#86868b]"><ShieldCheck size={14} /> Secure access for thenightera clients.</p>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
