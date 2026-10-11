import { motion } from 'framer-motion'
import FadeUp from './FadeUp.jsx'

const tiers = [
  {
    name: 'basic',
    price: '₹5,999',
    features: [
      'guest feedback overview',
      'recurring theme summaries',
      'team-ready insight notes',
      'one location',
    ],
    popular: false,
  },
  {
    name: 'plus',
    price: '₹9,999',
    features: [
      'everything in basic',
      'feedback trend summaries',
      'location-level views',
      'monthly insight reports',
      'up to three locations',
    ],
    popular: true,
  },
  {
    name: 'pro',
    price: '₹16,999',
    features: [
      'everything in plus',
      'multi-location insight views',
      'priority support',
      'custom feedback categories',
      'unlimited locations',
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            simple pricing.
          </h2>
          <p className="mt-4 text-lg text-muted">
            no setup fees. cancel anytime.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6 mt-16 md:mt-20 items-start">
          {tiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.1}>
              <div className="relative pt-8">
                {tier.popular && (
                  <p className="absolute top-0 left-0 text-sm text-muted">
                    most popular
                  </p>
                )}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`bg-white rounded-2xl p-10 ${
                    tier.popular
                      ? 'border border-ink'
                      : 'shadow-[0_2px_16px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  <h3 className="text-xl font-medium">{tier.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-semibold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-muted text-base">/mo</span>
                  </p>
                  <ul className="mt-8 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="text-muted leading-relaxed">
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
