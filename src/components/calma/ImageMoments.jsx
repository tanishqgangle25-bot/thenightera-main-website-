import { motion } from 'framer-motion'

function aiImg(prompt, w = 1400, h = 900, seed = 42) {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&model=flux&nologo=true&seed=${seed}`
}

// Drop your images in /public/images/ with these exact filenames.
// If the file exists it loads instantly. If not, falls back to AI-generated.
const IMGS = {
  restaurant: '/images/calma/restaurant.jpg',
  reviews: '/images/calma/reviews.jpg',
  owner: '/images/calma/owner.jpg',
  coffee: '/images/calma/coffee.jpg',
}

const FALLBACK = {
  restaurant: aiImg('empty luxury restaurant interior at night, warm amber candlelight, dark moody atmosphere, bokeh background, no people, cinematic photography, 50mm lens, shallow depth of field', 1400, 900, 42),
  reviews: aiImg('restaurant owner reviewing a clean guest feedback dashboard on a smartphone, no visible text, no ratings or logos, warm dark background, soft studio lighting, editorial product photography', 900, 1100, 42),
  owner: aiImg('young indian woman restaurant owner smiling at smartphone in warm cafe, candid editorial photography, golden hour, shallow depth of field, film grain', 900, 1100, 42),
  coffee: aiImg('overhead flat lay of latte art coffee on dark wood table, warm golden light, lifestyle photography, hyperrealistic, minimal, editorial, cozy cafe atmosphere', 1400, 900, 42),
}

function imgSrc(key) {
  return IMGS[key]
}

function onImgError(e, key) {
  if (e.target.src !== FALLBACK[key]) e.target.src = FALLBACK[key]
}

const fade = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }
  })
}

export default function ImageMoments() {
  return (
    <section className="bg-white py-4 px-4 md:px-6">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-4">

        {/* ROW 1: Two equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* 1A — Dark card with restaurant image */}
          <motion.div
            variants={fade} custom={0} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="relative rounded-3xl overflow-hidden bg-[#1d1d1f]"
            style={{ minHeight: 580 }}
          >
            <img src={imgSrc('restaurant')} onError={e => onImgError(e, 'restaurant')} alt="warm restaurant interior at night, ambient lighting" loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-[#1d1d1f]/30 to-transparent" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-between" style={{ minHeight: 580 }}>
              <div>
                <p className="text-xs font-semibold tracking-[4px] text-white/40 uppercase mb-4">for restaurants</p>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
                  your best table.
                  <br />
                  <span className="text-white/40">also online.</span>
                </h2>
              </div>
              <p className="text-base font-light text-white/50 max-w-xs leading-relaxed">
                individual comments make more sense when recurring themes are easy to see.
              </p>
            </div>
          </motion.div>

          {/* 1B — Light card with phone/reviews image */}
          <motion.div
            variants={fade} custom={1} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="relative rounded-3xl overflow-hidden bg-[#f5f5f7]"
            style={{ minHeight: 580 }}
          >
            <div className="relative z-10 p-10 pb-0 flex flex-col" style={{ minHeight: 580 }}>
              <p className="text-xs font-semibold tracking-[4px] text-[#6e6e73] uppercase mb-4">reviews</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[#1d1d1f]">
                  feedback.
                  <br />
                  <span className="text-[#6e6e73]">with more context.</span>
              </h2>
              <p className="mt-4 text-base font-light text-[#6e6e73] max-w-xs leading-relaxed">
                read guest comments with the broader experience in mind.
              </p>
              {/* Phone image rising from bottom */}
              <div className="flex-1 flex items-end justify-center mt-8">
                <img src={imgSrc('reviews')} onError={e => onImgError(e, 'reviews')} alt="restaurant owner reviewing guest feedback on a smartphone" loading="lazy"
                  className="h-[320px] w-auto object-contain object-bottom drop-shadow-2xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROW 2: Full-width stat + coffee image card */}
        <motion.div
          variants={fade} custom={2} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="relative rounded-3xl overflow-hidden bg-[#1d1d1f]"
          style={{ minHeight: 480 }}
        >
          <img src={imgSrc('coffee')} onError={e => onImgError(e, 'coffee')} alt="overhead flat lay of latte art coffee on wooden table" loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(94,92,230,0.18) 0%, transparent 60%)' }} />

          <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10" style={{ minHeight: 480 }}>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[4px] text-white/30 uppercase mb-6">a clearer process</p>
              <h2 className="text-[clamp(40px,5vw,72px)] font-semibold tracking-tight leading-[1.0] text-white">
                  see the pattern
                  <br />
                  <span className="text-white/40">behind the comments.</span>
              </h2>
              <a href="https://heycalma.in/" className="mt-8 inline-flex items-center gap-2 text-[#5e5ce6] text-base font-medium hover:opacity-70 transition-opacity" target="_blank" rel="noreferrer">
                visit calma →
              </a>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold tracking-[3px] uppercase text-white/35">from feedback</p>
              <p className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white">to insight</p>
              <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-white/45">A clearer view of what guests mention, repeatedly.</p>
            </div>
          </div>
        </motion.div>

        {/* ROW 3: Phone card — calma lives in your phone */}
        <motion.div
          variants={fade} custom={3} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="relative rounded-3xl overflow-hidden bg-[#e8f0e0]"
          style={{ minHeight: 520 }}
        >
          {/* subtle green glow */}
          <div className="absolute top-[-60px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, #6abf69 0%, transparent 70%)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full p-12 md:px-20 gap-8" style={{ minHeight: 520 }}>
            {/* Text left */}
            <div className="flex-1 max-w-md">
              <p className="text-xs font-semibold tracking-[4px] text-[#4a7c40] uppercase mb-5">always with you</p>
              <h2 className="text-[clamp(36px,4.5vw,64px)] font-semibold tracking-tight leading-[1.05] text-[#1d1d1f]">
                make feedback
                <br />easier to act on.
              </h2>
              <p className="mt-5 text-base font-light text-[#4a5568] leading-relaxed max-w-sm">
                spot recurring guest themes, share them with the right people, and decide what to improve next.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-[#1d1d1f] text-white text-sm font-medium px-5 py-3 rounded-full">
                <span className="text-base">✦</span>
                feedback, with context
              </div>
            </div>

            {/* Phone image right */}
            <div className="flex-1 flex items-center justify-center md:justify-end">
              <img
                src="/images/calma/phone-case.jpg"
                alt="Illustrative calma guest feedback view displayed on a smartphone"
                loading="lazy"
                className="h-[340px] md:h-[420px] w-auto object-cover object-top drop-shadow-2xl"
                style={{ clipPath: 'inset(0 0 28% 0 round 16px)' }}
              />
            </div>
          </div>
        </motion.div>

        {/* ROW 4: Three stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { num: '01', label: 'Guest feedback', sub: 'listen to what people share', dark: true },
            { num: '02', label: 'Recurring themes', sub: 'see what comes up again', dark: false },
            { num: '03', label: 'Team next steps', sub: 'decide what to improve', dark: true },
          ].map((s, i) => (
            <motion.div
              key={s.num}
              variants={fade} custom={3 + i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="rounded-3xl px-10 py-10 flex flex-col justify-between"
              style={{ background: s.dark ? '#1d1d1f' : '#f5f5f7', minHeight: 200 }}
            >
              <p className={`text-xs font-semibold tracking-[3px] uppercase ${s.dark ? 'text-white/30' : 'text-[#6e6e73]'}`}>
                {s.label}
              </p>
              <div>
                <div className={`text-[64px] font-bold leading-none tracking-tight ${s.dark ? 'text-white' : 'text-[#1d1d1f]'}`}>
                  {s.num}
                </div>
                <p className={`mt-1 text-xs font-light ${s.dark ? 'text-white/20' : 'text-[#aeaeb2]'}`}>{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
