import { motion } from 'framer-motion'

export default function FounderNote() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl bg-cloud p-10 md:p-14"
        >
          <p className="text-sm uppercase tracking-wider text-muted">a note from the founder</p>
          <p className="mt-6 text-xl md:text-2xl text-ink leading-relaxed">
            i grew up watching my parents run a small business in indore. one bad review on a saturday would ruin their whole week.
            calma is the tool i wish they had. it sits quietly in the background, handles the noise, and tells you what actually matters.
            if it doesn't move your rating in two months, you don't pay. that's the promise.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold">
              T
            </div>
            <div>
              <p className="font-medium text-ink">Tanishq Gangle</p>
              <p className="text-sm text-muted">founder, calma · indore</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
