import { motion } from 'framer-motion'

const notes = [
  {
    doubt: '"one review tells the whole story?"',
    answer: 'not always. calma helps your team look across guest feedback and notice which themes keep coming back.',
    color: '#7D2027',
    text: '#ECE6D8',
    rotate: -3,
    size: 'big',
  },
  {
    doubt: '"is one bad review the whole picture?"',
    answer: 'one comment is a moment. repeated feedback can point to a pattern worth understanding.',
    color: '#4D4828',
    text: '#ECE6D8',
    rotate: 2,
    size: 'big',
  },
  {
    doubt: '"we already read our reviews"',
    answer: 'calma helps make repeated themes easier to notice across the feedback your team already receives.',
    color: '#ECE6D8',
    text: '#372713',
    rotate: -2,
    size: 'normal',
  },
  {
    doubt: '"what do we do with the insight?"',
    answer: 'use the pattern to start a focused conversation with the team closest to that part of the guest experience.',
    color: '#D9C4B1',
    text: '#372713',
    rotate: 3,
    size: 'normal',
  },
  {
    doubt: '"does calma make decisions for us?"',
    answer: 'no. calma helps organize feedback. your people decide what to change and how to respond.',
    color: '#4D4828',
    text: '#ECE6D8',
    rotate: -1,
    size: 'normal',
  },
  {
    doubt: '"does it work only for one kind of restaurant?"',
    answer: 'calma is built around hospitality feedback. the themes that matter will depend on your guests and operation.',
    color: '#7D2027',
    text: '#ECE6D8',
    rotate: 2,
    size: 'normal',
  },
  {
    doubt: '"is calma just an AI chatbot?"',
    answer: 'no. calma is a restaurant feedback-intelligence product that helps teams understand guest comments and recurring themes.',
    color: '#ECE6D8',
    text: '#372713',
    rotate: -3,
    size: 'normal',
  },
  {
    doubt: '"will it reply to guests for us?"',
    answer: 'calma helps your team understand feedback so they can decide whether and how to follow up with a guest.',
    color: '#D9C4B1',
    text: '#372713',
    rotate: 1,
    size: 'normal',
  },
]

export default function StickyNotes() {
  return (
    <section className="bg-white py-24 md:py-32 px-4 md:px-6 overflow-hidden">
      <div className="max-w-[1320px] mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: '#7D2027' }}>
            we read your mind
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]" style={{ color: '#372713' }}>
            every doubt in<br />
            <span style={{ color: '#A39670' }}>your head. answered.</span>
          </h2>
          <p className="mt-5 text-base max-w-md" style={{ color: '#4D4828' }}>
            we know exactly what you're thinking right now. here's what we say back.
          </p>
        </motion.div>

        {/* Sticky notes grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-0">
          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: note.rotate }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
              className="break-inside-avoid mb-4 relative block"
              style={{
                background: note.color,
                borderRadius: 4,
                padding: note.size === 'big' ? '28px 24px 32px' : '22px 20px 26px',
                boxShadow: '3px 4px 16px rgba(55,39,19,0.18), 0 1px 3px rgba(55,39,19,0.1)',
                cursor: 'default',
                transformOrigin: 'center top',
              }}
            >
              {/* Tape strip at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: 48, height: 16,
                  background: note.text === '#ECE6D8' ? 'rgba(236,230,216,0.35)' : 'rgba(55,39,19,0.15)',
                  borderRadius: 2,
                }}
              />

              {/* Doubt label */}
              <p
                className="text-xs font-semibold mb-3 leading-tight"
                style={{ color: note.text, opacity: 0.55, fontStyle: 'italic' }}
              >
                {note.doubt}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: note.text, opacity: 0.12, marginBottom: 12 }} />

              {/* Answer */}
              <p
                className="text-sm leading-relaxed font-medium"
                style={{ color: note.text }}
              >
                {note.answer}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
