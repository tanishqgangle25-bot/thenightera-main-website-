import { Link } from 'react-router-dom'
import FadeUp from './FadeUp.jsx'
import { LiquidButton } from '@/components/calma/ui/liquid-glass-button'

export default function FinalCTA() {
  return (
    <section className="bg-cloud py-32 md:py-44">
      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            your reputation is
            <br />
            your business.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted">
            let calma handle it.
          </p>
          <FadeUp delay={0.4}>
            <a
              href="https://heycalma.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xl font-medium text-[#06c] hover:underline hover:opacity-80 transition-all mt-10"
            >
              Visit Calma <span className="ml-1 text-lg font-semibold">↗</span>
            </a>
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  )
}
