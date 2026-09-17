import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const icon = (d) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7"
    aria-hidden="true"
  >
    {d}
  </svg>
)

const items = [
  { label: 'monitoring', icon: icon(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>) },
  { label: 'auto replies', icon: icon(<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-5.5a8.5 8.5 0 1 1 17-3Z" />) },
  { label: 'sentiment', icon: icon(<><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></>) },
  { label: 'insights', icon: icon(<><path d="M3 3v18h18" /><path d="m7 14 4-4 3 3 5-6" /></>) },
  { label: 'campaigns', icon: icon(<path d="m3 11 18-8-8 18-2.5-7.5L3 11Z" />) },
  { label: 'ratings', icon: icon(<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />) },
  { label: 'locations', icon: icon(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>) },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function FeatureRail() {
  return (
    <section id="features" className="bg-white py-16 md:py-20">
      <div className="overflow-x-auto scrollbar-none snap-x snap-mandatory">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="flex gap-5 px-6 md:px-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))] w-max"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={card}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              className="snap-start shrink-0"
            >
              <Link
                to="/features"
                className="group w-32 md:w-36 h-36 relative overflow-hidden bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center gap-3"
              >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-black/[0.04] to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <motion.span
                className="text-muted group-hover:text-ink transition-colors duration-300"
                whileHover={{ rotate: 8, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 320, damping: 14 }}
              >
                {item.icon}
              </motion.span>
              <span className="text-sm font-medium text-ink">{item.label}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-ink group-hover:w-2/3 transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
