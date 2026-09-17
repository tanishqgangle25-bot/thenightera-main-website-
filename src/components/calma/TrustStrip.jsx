import { motion } from 'framer-motion'

const businesses = [
  'Cafe Madras Coffee',
  'Mehfil Restaurant',
  'The Brew Lab',
  'Padmavati Sweets',
  'Hotel Surya',
  'Glow Beauty Lounge',
  'Saffron Kitchen',
  'Indore Resto',
  'Apna Tiffin Centre',
  'Joshi Dahi Bada',
  'Rajwada Sweets',
  'Coffee Culture MG Road',
]

const stats = [
  { n: '200+', l: 'local businesses' },
  { n: '4.5★', l: 'avg rating after 60 days' },
  { n: '12,000+', l: 'reviews answered monthly' },
  { n: '7 min', l: 'avg reply time' },
]

export default function TrustStrip() {
  const row = [...businesses, ...businesses]
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
          trusted by 200+ local businesses across india
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
          {row.map((b, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-medium text-muted/70 tracking-tight shrink-0"
            >
              {b}
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
        {stats.map((s) => (
          <div key={s.l}>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight">{s.n}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{s.l}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
