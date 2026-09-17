import FadeUp from './FadeUp.jsx'

const quotes = [
  {
    text: 'calma changed how we handle customer feedback.',
    author: 'Founder, local business',
  },
  {
    text: 'we went from 3.8 to 4.6 stars in 60 days.',
    author: 'Owner, restaurant',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-32 md:py-40 border-t border-cloud">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          {quotes.map((q, i) => (
            <FadeUp key={q.author} delay={i * 0.1}>
              <blockquote>
                <p className="text-2xl md:text-4xl font-medium text-muted leading-snug tracking-tight">
                  "{q.text}"
                </p>
                <footer className="mt-8 text-sm text-muted">
                  — {q.author}
                </footer>
              </blockquote>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
