import FadeUp from './FadeUp.jsx'

const cards = [
  {
    tag: 'new',
    title: 'reply autopilot',
    line: 'every review answered. in your voice.',
    foot: 'included in all plans',
  },
  {
    tag: 'new',
    title: 'sentiment radar',
    line: 'know what customers feel, not just what they type.',
    foot: 'from plus',
  },
  {
    tag: '',
    title: 'review campaigns',
    line: 'ask for reviews without the awkward part.',
    foot: 'from plus',
  },
  {
    tag: '',
    title: 'insight reports',
    line: 'what to fix, ranked by what it costs you.',
    foot: 'monthly, from plus',
  },
  {
    tag: 'new',
    title: 'multi location',
    line: 'every branch. one quiet dashboard.',
    foot: 'pro',
  },
]

export default function LatestRail() {
  return (
    <section className="bg-cloud py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            the latest.{' '}
            <span className="text-muted font-medium">
              take a look at what calma does now.
            </span>
          </h2>
        </FadeUp>
      </div>
      <FadeUp delay={0.1}>
        <div className="mt-12 md:mt-16 overflow-x-auto scrollbar-none snap-x snap-mandatory">
          <div className="flex gap-6 px-6 md:px-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))] w-max pb-2">
            {cards.map((c) => (
              <div
                key={c.title}
                className="snap-start shrink-0 w-72 md:w-80 h-96 bg-white rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-9 flex flex-col cursor-pointer hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)] transition-shadow duration-200"
              >
                <p className="text-xs tracking-widest uppercase text-muted h-4">
                  {c.tag}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">{c.line}</p>
                <p className="mt-auto text-sm text-muted">{c.foot}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
