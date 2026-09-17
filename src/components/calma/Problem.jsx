import FadeUp from './FadeUp.jsx'

const problems = [
  'reviews go unanswered. customers leave.',
  "asking for reviews feels awkward. so you don't.",
  "you don't know what customers actually think.",
]

export default function Problem() {
  return (
    <section className="bg-cloud py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-lg">
            running a business is hard enough.
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6 mt-16 md:mt-20">
          {problems.map((text, i) => (
            <FadeUp key={text} delay={i * 0.1}>
              <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-10 h-full">
                <p className="text-lg md:text-xl leading-relaxed text-ink">
                  {text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
