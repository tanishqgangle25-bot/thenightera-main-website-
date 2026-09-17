import { motion } from 'framer-motion'

export default function PageMoment({
  bg,           // card background color
  glow,         // glow radial color
  accentText,   // eyebrow + pill text color
  headlineColor = '#fff',
  subColor,
  eyebrow,
  headline,
  sub,
  pill,
  image,        // local path e.g. /images/features/moment.jpg
  fallback,     // Pollinations URL if no local image
  imageSide = 'right',
  imageClass = '',
}) {
  const isRight = imageSide === 'right'

  function handleError(e) {
    if (fallback && e.target.src !== fallback) e.target.src = fallback
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-3 md:mx-6 mb-4 rounded-2xl md:rounded-3xl overflow-hidden"
      style={{ background: bg }}
    >
      {/* Glow orb */}
      {glow && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500, height: 500, borderRadius: '50%',
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            opacity: 0.35,
            top: isRight ? '-100px' : 'auto',
            bottom: isRight ? 'auto' : '-100px',
            left: isRight ? '-100px' : 'auto',
            right: isRight ? 'auto' : '-100px',
          }}
        />
      )}

      <div
        className={`relative z-10 flex flex-col ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 p-6 md:p-16`}
        style={{ minHeight: 'auto' }}
      >
        {/* Text */}
        <div className="flex-1 max-w-lg">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-[4px] uppercase mb-5" style={{ color: accentText }}>
              {eyebrow}
            </p>
          )}
          <h2
            className="text-[clamp(34px,4.5vw,60px)] font-semibold tracking-tight leading-[1.05]"
            style={{ color: headlineColor }}
            dangerouslySetInnerHTML={{ __html: headline }}
          />
          {sub && (
            <p className="mt-5 text-base font-light leading-relaxed max-w-sm" style={{ color: subColor || headlineColor + '99' }}>
              {sub}
            </p>
          )}
          {pill && (
            <div
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full"
              style={{ background: headlineColor + '18', color: accentText || headlineColor, border: `1px solid ${headlineColor}22` }}
            >
              <span>✦</span> {pill}
            </div>
          )}
        </div>

        {/* Image */}
        {(image || fallback) && (
          <div className="flex-1 flex items-center justify-center">
            <img
              src={image || fallback}
              onError={handleError}
              alt=""
              loading="lazy"
              className={`w-full max-w-[260px] md:max-w-sm rounded-2xl object-cover drop-shadow-2xl ${imageClass}`}
              style={{ maxHeight: 300 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
