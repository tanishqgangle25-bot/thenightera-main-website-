import { motion } from 'framer-motion'
import { ShieldCheck, RefreshCcw, Lock, BadgeIndianRupee } from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: 'Look beyond one review',
    body: 'See repeated feedback themes alongside individual comments, so one unusual experience does not become the whole story.',
  },
  {
    icon: RefreshCcw,
    title: 'Make patterns easier to see',
    body: 'Bring guest feedback into a clearer view and notice what appears repeatedly across visits.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Turn insight into a next step',
    body: 'Use feedback patterns to guide practical conversations about service, operations, and the guest experience.',
  },
  {
    icon: Lock,
    title: 'Your team stays in control',
    body: 'Calma helps your team understand what guests are saying. Your people decide which changes to make and how to respond.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Guarantees() {
  return (
    <section className="bg-cloud py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-sm uppercase tracking-wider text-muted">feedback into action</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            a clearer way to understand guests.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5"
        >
          {items.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <div className="w-11 h-11 rounded-full bg-cloud flex items-center justify-center">
                <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
