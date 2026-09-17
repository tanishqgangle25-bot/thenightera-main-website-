import { motion } from 'framer-motion'

const notes = [
  {
    doubt: '"price is too high yaar"',
    answer: 'ek bad review pe ₹2,000+ ki booking jaati hai. calma ₹5,999/mo. ek bura weekend aapko zyada cost karta hai. do the math 💀',
    color: '#7D2027',
    text: '#ECE6D8',
    rotate: -3,
    size: 'big',
  },
  {
    doubt: '"kaam karega kya actually?"',
    answer: '200+ restaurants. indore mein. real owners, real stars. agar 60 din mein rating na badhe — full refund. zero drama 🤝',
    color: '#4D4828',
    text: '#ECE6D8',
    rotate: 2,
    size: 'big',
  },
  {
    doubt: '"main khud dekh leta hoon reviews"',
    answer: 'sunday raat 11 baje, 3 star review aaya. aap so rahe the. calma ne already reply kar diya. 😌',
    color: '#ECE6D8',
    text: '#372713',
    rotate: -2,
    size: 'normal',
  },
  {
    doubt: '"time nahi hai seekhne ka"',
    answer: '10 min setup. phir bhool jaiye. calma sab kuch khud karta hai. aap apna kaam kariye 🌿',
    color: '#D9C4B1',
    text: '#372713',
    rotate: 3,
    size: 'normal',
  },
  {
    doubt: '"data safe rahega?"',
    answer: 'official google API use hoti hai. aapka data = aapka data. hum kuch bhi store nahi karte. pinky promise 🤙',
    color: '#4D4828',
    text: '#ECE6D8',
    rotate: -1,
    size: 'normal',
  },
  {
    doubt: '"competitors use nahi karte toh main kyun?"',
    answer: 'exactly. woh nahi use kar rahe. isliye aapka chance hai aage nikal jaane ka. first mover wins 😤',
    color: '#7D2027',
    text: '#ECE6D8',
    rotate: 2,
    size: 'normal',
  },
  {
    doubt: '"ek aur app nahi chahiye"',
    answer: 'calma aapke phone mein already fit ho jaata hai. ek WhatsApp message. ek summary. khatam 📲',
    color: '#ECE6D8',
    text: '#372713',
    rotate: -3,
    size: 'normal',
  },
  {
    doubt: '"customer service kharab hoga"',
    answer: 'WhatsApp pe milte hain. 2 ghante mein reply guaranteed. ek baar try kariye — aap khud judge karenge 🫡',
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
