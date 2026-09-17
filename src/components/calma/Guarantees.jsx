import { motion } from 'framer-motion'
import { ShieldCheck, RefreshCcw, Lock, BadgeIndianRupee } from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: '60-day rating guarantee',
    body: "if your rating doesn't move up in 60 days, we refund the months you paid. nobody else does this.",
  },
  {
    icon: RefreshCcw,
    title: 'cancel anytime',
    body: 'no annual lock-in, no exit fees. one email and you stop being charged the same day.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'no setup cost',
    body: 'onboarded in 20 minutes by our team over WhatsApp. you pay only when calma starts replying.',
  },
  {
    icon: Lock,
    title: 'your data, your account',
    body: 'we use Google official APIs. nothing is scraped, no passwords stored, you can revoke access in one tap.',
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
          <p className="text-sm uppercase tracking-wider text-muted">why owners trust us</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            four promises we put in writing.
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
