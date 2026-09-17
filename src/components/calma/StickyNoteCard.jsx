import { motion } from 'framer-motion'

export default function StickyNoteCard({
  doubt,
  answer,
  color = '#7D2027',
  textColor = '#ECE6D8',
  rotate = -3,
  className = '',
  delay = 0,
  from = 'bottom', // 'bottom' | 'left' | 'right'
}) {
  const initial = {
    opacity: 0,
    rotate: rotate * 2,
    y: from === 'bottom' ? 60 : 0,
    x: from === 'left' ? -80 : from === 'right' ? 80 : 0,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, rotate, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
      className={`relative inline-block ${className}`}
      style={{
        background: color,
        borderRadius: 4,
        padding: '22px 20px 28px',
        boxShadow: '4px 6px 20px rgba(55,39,19,0.2), 0 1px 4px rgba(55,39,19,0.1)',
        transformOrigin: 'center top',
        maxWidth: 280,
        cursor: 'default',
      }}
    >
      {/* Tape */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 44, height: 14,
          background: textColor === '#ECE6D8' ? 'rgba(236,230,216,0.3)' : 'rgba(55,39,19,0.15)',
          borderRadius: 2,
        }}
      />

      {/* Doubt */}
      <p
        className="text-xs font-semibold mb-3 leading-snug"
        style={{ color: textColor, opacity: 0.5, fontStyle: 'italic' }}
      >
        {doubt}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: textColor, opacity: 0.12, marginBottom: 10 }} />

      {/* Answer */}
      <p
        className="text-sm leading-relaxed font-medium"
        style={{ color: textColor }}
      >
        {answer}
      </p>
    </motion.div>
  )
}
