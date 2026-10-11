import { motion } from 'framer-motion'

const steps = ['Guest feedback', 'Recurring patterns', 'Team priorities', 'Better experiences']

export default function TrustStrip() {
  return (
    <section className="bg-white py-20 md:py-24 border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm uppercase tracking-wider text-muted"
        >
          from individual reviews to the bigger picture
        </motion.p>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {[...steps, ...steps].map((step, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-medium text-muted/70 tracking-tight shrink-0"
            >
              {step}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-6xl mx-auto px-6 md:px-10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-black/5 pt-12"
      >
        {steps.map((step, index) => (
          <div key={step}>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums">0{index + 1}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{step}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
