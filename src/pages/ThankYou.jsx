import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function ThankYou() {
  return (
    <main className="flex min-h-[calc(100dvh-52px)] items-center justify-center bg-[#FAF7F2] px-6 py-20 text-center text-[#1d1d1f]">
      <SEOHead
        title="Thank you for reaching out"
        description="Your message has been received. The thenightera team will get back to you soon."
        path="/thank-you"
        noIndex
      />
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7D2027]">message received</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Thanks for reaching out.</h1>
        <p className="mt-5 text-lg leading-8 text-[#5f5f63]">We’ve received your message and will get back to you within 24 hours.</p>
        <Link to="/" className="mt-9 inline-flex rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-semibold text-white no-underline">Back to home</Link>
      </div>
    </main>
  )
}
