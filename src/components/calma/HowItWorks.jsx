import FadeUp from './FadeUp.jsx'

const steps = [
  'watches your Google reviews around the clock',
  'understands sentiment behind every review',
  'writes and posts perfect replies automatically',
  'surfaces insights on what to actually fix',
]

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            how calma works.
          </h2>
        </FadeUp>
        <div className="mt-16 md:mt-24 space-y-14 md:space-y-20 max-w-3xl">
          {steps.map((step, i) => (
            <FadeUp key={step} delay={i * 0.05}>
              <div className="flex items-baseline gap-8 md:gap-14">
                <span className="text-4xl md:text-6xl font-semibold text-[#d2d2d7] tabular-nums shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-xl md:text-3xl font-medium text-ink leading-snug">
                  {step}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
