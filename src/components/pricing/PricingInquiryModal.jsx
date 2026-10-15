import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { track } from '@vercel/analytics'

const steps = [
  { title: 'What should we call you?', field: 'name', type: 'text', placeholder: 'Your name' },
  { title: 'Where can we reach you?', field: 'email', type: 'email', placeholder: 'you@brand.com' },
  { title: 'What are you building?', field: 'brand', type: 'text', placeholder: 'Brand or business name' },
  { title: 'What should we focus on first?', field: 'goal', type: 'select', options: ['A more distinctive brand', 'Consistent premium content', 'More enquiries or bookings', 'Stronger search and reputation', 'A connected growth system'] },
  { title: 'When would you like to begin?', field: 'timeline', type: 'select', options: ['As soon as we find the right fit', 'Within the next month', 'In 1–3 months', 'I’m exploring for now'] },
]

const nextTier = {
  Core: { title: 'Considering Prime?', items: ['Double the reels and production days', 'Paid growth campaigns and Google Business Profile management', 'Advanced SEO, reputation monitoring, and more frequent strategy sessions'] },
  Prime: { title: 'What Vertex adds', items: ['20+ reels and up to 6 production days', 'CALMA AI reputation intelligence and business insights', 'Dedicated brand manager, website content management, and founder strategy sessions'] },
  Vertex: { title: 'Your broadest partnership', items: ['Creative, brand, digital, AI, and dedicated support in one scope', 'Need a different mix? We’ll shape it together in the consultation'] },
}

const fieldStyle = { width: '100%', marginTop: '1rem', padding: '1rem 1.05rem', border: '1px solid #dedcda', borderRadius: '12px', background: '#fbfaf9', color: '#242120', font: 'inherit', fontSize: '1rem', outlineColor: '#7d2027' }

export default function PricingInquiryModal({ plan, onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ name: '', email: '', brand: '', goal: '', timeline: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dialogRef = useRef(null)
  const fieldRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()
  const next = nextTier[plan]
  const current = steps[step]
  const petals = Array.from({ length: 17 }, (_, index) => ({
    left: `${(index * 37 + 7) % 100}%`,
    delay: `${(index % 9) * -1.7}s`,
    duration: `${13 + (index % 7) * 2.2}s`,
    size: `${8 + (index % 4) * 2}px`,
    drift: `${((index % 2 ? 1 : -1) * (18 + (index % 5) * 8))}px`,
    rotate: `${(index % 2 ? 1 : -1) * (120 + index * 13)}deg`,
  }))

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape' && !loading) onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [loading, onClose])

  useEffect(() => { fieldRef.current?.focus({ preventScroll: true }) }, [step])

  const update = (event) => setAnswers((old) => ({ ...old, [current.field]: event.target.value }))
  const canContinue = answers[current.field].trim().length > 0

  const submit = async (event) => {
    event.preventDefault()
    if (step < steps.length - 1) { if (canContinue) setStep((value) => value + 1); return }
    setLoading(true)
    setError('')
    const body = new FormData()
    body.append('access_key', '4dcd03a5-2036-468b-9521-94095f1b5e8b')
    body.append('subject', `New ${plan} partnership enquiry — thenightera`)
    body.append('name', answers.name)
    body.append('email', answers.email)
    body.append('brand', answers.brand)
    body.append('message', `Selected partnership: ${plan}\nPrimary focus: ${answers.goal}\nPreferred start: ${answers.timeline}`)
    body.append('botcheck', '')
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body })
      const result = await response.json()
      if (result.success) {
        track('Pricing Partnership Enquiry Submitted', { plan })
        navigate('/thank-you')
      } else setError('We couldn’t send this yet. Please try again or email hello@thenightera.tech.')
    } catch {
      setError('Connection issue. Please try again or email hello@thenightera.tech.')
    } finally { setLoading(false) }
  }

  return createPortal((
    <motion.div role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget && !loading) onClose() }} style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'grid', placeItems: 'center', padding: '1rem', background: 'radial-gradient(ellipse at 50% 42%, rgba(103,43,43,.42), transparent 58%), rgba(24,22,21,.67)', backdropFilter: 'blur(8px)', overflow: 'hidden' }}>
      {!reduceMotion && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <style>{`@keyframes pricing-petal-drift { 0% { transform: translate3d(0,-12vh,0) rotate(0deg); opacity:0 } 12% { opacity:.75 } 88% { opacity:.62 } 100% { transform: translate3d(var(--petal-drift),112vh,0) rotate(var(--petal-rotate)); opacity:0 } }`}</style>
        {petals.map((petal, index) => <span key={index} style={{ position: 'absolute', top: '-5vh', left: petal.left, width: petal.size, height: `${parseInt(petal.size) * 0.62}px`, borderRadius: '85% 15% 80% 20%', background: index % 3 === 0 ? 'rgba(225,157,164,.82)' : 'rgba(247,209,205,.8)', boxShadow: '0 0 12px rgba(245,189,190,.38)', animation: `pricing-petal-drift ${petal.duration} linear ${petal.delay} infinite`, ['--petal-drift']: petal.drift, ['--petal-rotate']: petal.rotate }} />)}
      </div>}
      <motion.section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="pricing-inquiry-title" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: reduceMotion ? 0 : 0.32 }} style={{ position: 'relative', width: 'min(100%, 650px)', maxHeight: 'min(90vh, 780px)', overflowY: 'auto', borderRadius: '24px', background: '#fbfaf8', padding: 'clamp(1.4rem, 5vw, 3rem)', boxShadow: '0 35px 110px rgba(0,0,0,.28)' }}>
        <button type="button" aria-label="Close enquiry" onClick={onClose} disabled={loading} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', width: '38px', height: '38px', border: '1px solid #e5e1dc', borderRadius: '50%', background: 'white', color: '#302c28', cursor: 'pointer' }}><X size={18} /></button>
        <p style={{ color: '#7d2027', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.17em', textTransform: 'uppercase' }}>thenightera · {plan} partnership</p>
        <h2 id="pricing-inquiry-title" style={{ marginTop: '0.9rem', maxWidth: '14ch', color: '#201d1b', fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.04, letterSpacing: '-0.055em', fontWeight: 650 }}>Let’s imagine what comes next.</h2>
        <p style={{ marginTop: '0.75rem', color: '#706b66', fontSize: '0.9rem', lineHeight: 1.6 }}>Five quick questions help us make your first conversation specific to your brand.</p>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '6px' }} aria-label={`Question ${step + 1} of ${steps.length}`}>
          {steps.map((item, index) => <span key={item.field} style={{ height: '3px', flex: 1, borderRadius: '4px', background: index <= step ? '#7d2027' : '#e5e1dc' }} />)}
        </div>

        <form onSubmit={submit}>
          <AnimatePresence mode="wait">
            <motion.div key={current.field} initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} style={{ minHeight: '178px', paddingTop: '1.8rem' }}>
              <label htmlFor={`partnership-${current.field}`} style={{ display: 'block', color: '#282421', fontSize: '1.16rem', fontWeight: 600 }}>{step + 1}. {current.title}</label>
              {current.type === 'select' ? (
                <select ref={fieldRef} id={`partnership-${current.field}`} required value={answers[current.field]} onChange={update} style={fieldStyle}>
                  <option value="" disabled>Choose one</option>
                  {current.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input ref={fieldRef} id={`partnership-${current.field}`} required type={current.type} value={answers[current.field]} onChange={update} placeholder={current.placeholder} style={fieldStyle} />
              )}
            </motion.div>
          </AnimatePresence>

          <aside style={{ padding: '1rem 1.1rem', borderRadius: '14px', background: '#f1eeea', border: '1px solid #e8e3dd' }}>
            <p style={{ color: '#7d2027', fontWeight: 700, fontSize: '0.79rem' }}>{next.title}</p>
            <ul style={{ margin: '0.65rem 0 0', paddingLeft: '1.1rem', color: '#605a54', fontSize: '0.8rem', lineHeight: 1.6 }}>
              {next.items.map((item) => <li key={item} style={{ marginTop: '0.25rem' }}>{item}</li>)}
            </ul>
          </aside>

          {error && <p role="alert" style={{ marginTop: '1rem', color: '#a12c27', fontSize: '0.84rem' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '1.3rem' }}>
            <button type="button" onClick={() => step === 0 ? onClose() : setStep((value) => value - 1)} disabled={loading} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.8rem 1rem', border: '1px solid #dedbd6', borderRadius: '999px', background: 'transparent', color: '#514c47', cursor: 'pointer' }}><ArrowLeft size={16} />{step === 0 ? 'Back to plans' : 'Back'}</button>
            <button type={step === steps.length - 1 ? 'submit' : 'button'} onClick={step === steps.length - 1 ? undefined : () => { if (canContinue) setStep((value) => value + 1) }} disabled={!canContinue || loading} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minWidth: '155px', padding: '0.85rem 1.2rem', border: 0, borderRadius: '999px', background: !canContinue || loading ? '#9d918c' : '#211e1c', color: 'white', fontWeight: 650, cursor: !canContinue || loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Sending…' : step === steps.length - 1 ? 'Send my enquiry' : 'Continue'}{step < steps.length - 1 && <ArrowRight size={16} />}
            </button>
          </div>
          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#8a847e', fontSize: '0.72rem' }}>No commitment. We’ll review your goals and follow up about fit and next steps.</p>
        </form>
      </motion.section>
    </motion.div>
  ), document.body)
}
