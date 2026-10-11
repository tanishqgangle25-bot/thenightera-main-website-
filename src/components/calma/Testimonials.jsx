import FadeUp from './FadeUp.jsx'

export default function Testimonials() {
  return (
    <section className="bg-white py-32 md:py-40 border-t border-cloud">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          <FadeUp>
            <div className="md:col-span-2 max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-medium text-muted leading-snug tracking-tight">Built for better guest feedback.</h2>
              <p className="mt-5 text-base leading-7 text-muted">calma helps restaurants understand recurring feedback and follow up with guests. Ask us for a product walkthrough.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
