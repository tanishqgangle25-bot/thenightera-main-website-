import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const messages = [
  'Received: "Food was amazing but service was a bit slow..." (4 Stars)',
  "Extracting sentiment → Positive intent, minor service complaint",
  "Fetching restaurant context: Weekend rush hours, signature dishes",
  "Injecting context into empathy engine (420 tokens)",
  "Calma AI: 3 parallel actions dispatched",
  "Action: auto_reply → Drafted personalized response, 45 words",
  "Action: post_google → Reply successfully published to Google Business",
  "Action: notify_owner → WhatsApp alert sent regarding service speed",
  "Workflow complete. 3 actions executed in 1.2s.",
  "Idle. Listening for next review event...",
]

function AnimatedDot({
  path,
  duration,
  delay,
  size,
  opacity,
}) {
  return (
    <circle r={size} fill="#0052FF" opacity={opacity}>
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        path={path}
      />
    </circle>
  )
}

function PulsingDot({
  cx,
  cy,
  color,
  duration,
  delay = 0,
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.8}
      fill={color}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

function StatusIndicator({
  cx,
  cy,
  color,
  pulsing = false,
  duration = 1.9,
  delay = 0,
}) {
  if (pulsing) {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    )
  }
  return <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.95} />
}

export default function EnterpriseAIPipeline() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [workflows, setWorkflows] = useState(1247)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2700)

    const workflowInterval = setInterval(() => {
      setWorkflows((prev) => prev + 1)
    }, 7200)

    return () => {
      clearInterval(messageInterval)
      clearInterval(workflowInterval)
    }
  }, [])

  const paths = {
    p1: "M116,88 L158,88",
    p2: "M268,88 L306,88",
    p3: "M411,88 C425,88 435,50 448,50",
    p4: "M411,88 L448,88",
    p5: "M411,88 C425,88 435,126 448,126",
  }

  return (
    <div className="bg-white border border-[#e5e5ea] shadow-sm rounded-2xl overflow-hidden font-sans w-full max-w-[620px] mx-auto">
      {/* Header */}
      <div className="px-[18px] py-[11px] border-b border-[#e5e5ea] flex items-center justify-between bg-[#fbfbfd]">
        <div className="flex items-center gap-[7px]">
          <motion.span
            className="w-[6px] h-[6px] rounded-full bg-green-500 inline-block"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] text-[#86868b] tracking-[0.1em] font-mono font-semibold uppercase">
            CALMA ENGINE · LIVE
          </span>
        </div>
        <span className="text-[10px] text-[#86868b] font-mono font-semibold uppercase">
          0 errors
        </span>
      </div>

      {/* SVG Pipeline Visualization */}
      <svg width="100%" viewBox="0 0 580 172" className="block bg-white">
        <defs>
          <marker
            id="ma"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="M2 1.5L7.5 5L2 8.5"
              fill="none"
              stroke="rgba(0,82,255,0.6)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Connection Paths */}
        <path
          d={paths.p1}
          fill="none"
          stroke="rgba(0,82,255,0.3)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          markerEnd="url(#ma)"
        />
        <path
          d={paths.p2}
          fill="none"
          stroke="rgba(0,82,255,0.3)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          markerEnd="url(#ma)"
        />
        <path
          d={paths.p3}
          fill="none"
          stroke="rgba(0,82,255,0.2)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <path
          d={paths.p4}
          fill="none"
          stroke="rgba(0,82,255,0.2)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
        <path
          d={paths.p5}
          fill="none"
          stroke="rgba(0,82,255,0.2)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />

        {/* Animated dots along paths */}
        <AnimatedDot path={paths.p1} duration={1.05} delay={0} size={2.5} opacity={1} />
        <AnimatedDot path={paths.p1} duration={1.05} delay={0.35} size={1.8} opacity={0.65} />
        <AnimatedDot path={paths.p1} duration={1.05} delay={0.7} size={1.3} opacity={0.35} />

        <AnimatedDot path={paths.p2} duration={0.88} delay={0.18} size={2.5} opacity={1} />
        <AnimatedDot path={paths.p2} duration={0.88} delay={0.62} size={1.8} opacity={0.65} />

        <AnimatedDot path={paths.p3} duration={1.3} delay={0.08} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p3} duration={1.3} delay={0.65} size={1.5} opacity={0.55} />

        <AnimatedDot path={paths.p4} duration={1.15} delay={0.28} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p4} duration={1.15} delay={0.85} size={1.5} opacity={0.55} />

        <AnimatedDot path={paths.p5} duration={1.4} delay={0.45} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p5} duration={1.4} delay={1.0} size={1.5} opacity={0.55} />

        {/* Trigger Node */}
        <rect
          x="16"
          y="66"
          width="100"
          height="44"
          rx="8"
          fill="#fbfbfd"
          stroke="#e5e5ea"
          strokeWidth="1"
        />
        <text
          x="66"
          y="83"
          textAnchor="middle"
          fontSize="9.5"
          fill="#86868b"
          fontFamily="system-ui"
          letterSpacing=".07em"
          fontWeight="600"
        >
          TRIGGER
        </text>
        <text
          x="66"
          y="100"
          textAnchor="middle"
          fontSize="12"
          fill="#1d1d1f"
          fontFamily="system-ui"
          fontWeight="500"
        >
          Google Review
        </text>
        <text
          x="66"
          y="122"
          textAnchor="middle"
          fontSize="8.5"
          fill="#86868b"
          fontFamily="monospace"
        >
          api-webhook
        </text>

        {/* DB/Context Node */}
        <rect
          x="158"
          y="66"
          width="110"
          height="44"
          rx="8"
          fill="#fbfbfd"
          stroke="#e5e5ea"
          strokeWidth="1"
        />
        <text
          x="213"
          y="83"
          textAnchor="middle"
          fontSize="9.5"
          fill="#86868b"
          fontFamily="system-ui"
          letterSpacing=".07em"
          fontWeight="600"
        >
          ANALYSIS
        </text>
        <text
          x="213"
          y="100"
          textAnchor="middle"
          fontSize="12"
          fill="#1d1d1f"
          fontFamily="system-ui"
          fontWeight="500"
        >
          Context Engine
        </text>
        <text
          x="213"
          y="122"
          textAnchor="middle"
          fontSize="8.5"
          fill="#86868b"
          fontFamily="monospace"
        >
          brand-tone
        </text>

        {/* LLM Agent Node */}
        <rect
          x="306"
          y="53"
          width="105"
          height="70"
          rx="10"
          fill="#f4f7ff"
          stroke="#0052FF"
          strokeWidth="1.5"
        />
        <rect x="318" y="53.5" width="80" height="1" rx="0.5" fill="rgba(0,82,255,0.3)" />
        <text
          x="358"
          y="78"
          textAnchor="middle"
          fontSize="9.5"
          fill="#0052FF"
          fontFamily="system-ui"
          letterSpacing=".07em"
          fontWeight="700"
        >
          CALMA AI
        </text>
        <text
          x="358"
          y="97"
          textAnchor="middle"
          fontSize="13"
          fill="#1d1d1f"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Processing
        </text>
        <PulsingDot cx={346} cy={113} color="#0052FF" duration={1.2} delay={0} />
        <PulsingDot cx={358} cy={113} color="#0052FF" duration={1.2} delay={0.4} />
        <PulsingDot cx={370} cy={113} color="#0052FF" duration={1.2} delay={0.8} />
        <text
          x="358"
          y="139"
          textAnchor="middle"
          fontSize="8.5"
          fill="#0052FF"
          fontFamily="monospace"
          fontWeight="500"
        >
          neural-engine
        </text>

        {/* Output Nodes */}
        <rect
          x="448"
          y="35"
          width="116"
          height="30"
          rx="7"
          fill="#fbfbfd"
          stroke="#e5e5ea"
          strokeWidth="1"
        />
        <text
          x="490"
          y="53.5"
          textAnchor="middle"
          fontSize="11"
          fill="#1d1d1f"
          fontFamily="system-ui"
          fontWeight="500"
        >
          Auto-Reply
        </text>
        <StatusIndicator cx={550} cy={43} color="#22c55e" />

        <rect
          x="448"
          y="73"
          width="116"
          height="30"
          rx="7"
          fill="#fbfbfd"
          stroke="#e5e5ea"
          strokeWidth="1"
        />
        <text
          x="490"
          y="91.5"
          textAnchor="middle"
          fontSize="11"
          fill="#1d1d1f"
          fontFamily="system-ui"
          fontWeight="500"
        >
          WhatsApp Alert
        </text>
        <StatusIndicator cx={550} cy={81} color="#22c55e" pulsing duration={1.9} />

        <rect
          x="448"
          y="111"
          width="116"
          height="30"
          rx="7"
          fill="#fbfbfd"
          stroke="#e5e5ea"
          strokeWidth="1"
        />
        <text
          x="490"
          y="129.5"
          textAnchor="middle"
          fontSize="11"
          fill="#1d1d1f"
          fontFamily="system-ui"
          fontWeight="500"
        >
          Owner Report
        </text>
        <StatusIndicator cx={550} cy={119} color="#f59e0b" pulsing duration={2.2} delay={0.35} />
      </svg>

      {/* Message Display */}
      <div className="border-t border-[#e5e5ea] px-[18px] py-[10px] h-[52px] bg-[#fbfbfd]">
        <div className="flex gap-2 items-start h-full">
          <span className="text-[#0052FF] font-mono text-[13px] leading-[1.5] shrink-0 font-bold">
            ›
          </span>
          <div className="relative flex-1 overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[11px] text-[#1d1d1f] leading-[1.55] absolute inset-0 font-medium"
              >
                {messages[messageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="border-t border-[#e5e5ea] px-[18px] py-[12px] flex gap-[22px] items-center bg-white">
        <div>
          <div className="text-[9px] text-[#86868b] tracking-[0.09em] mb-[3px] font-bold">REVIEWS PROCESSED</div>
          <motion.div
            key={workflows}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-[14px] text-[#1d1d1f] font-mono font-semibold"
          >
            {workflows.toLocaleString()}
          </motion.div>
        </div>
        <div>
          <div className="text-[9px] text-[#86868b] tracking-[0.09em] mb-[3px] font-bold">AVG RESPONSE</div>
          <div className="text-[14px] text-[#1d1d1f] font-mono font-semibold">1.2s</div>
        </div>
        <div>
          <div className="text-[9px] text-[#86868b] tracking-[0.09em] mb-[3px] font-bold">RATING LIFT</div>
          <div className="text-[14px] text-green-600 font-mono font-semibold">+0.4 ★</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[9px] text-[#86868b] tracking-[0.09em] mb-[3px] font-bold">SYSTEM</div>
          <div className="text-[10px] text-[#0052FF] font-mono font-semibold">Calma Engine</div>
        </div>
      </div>
    </div>
  )
}
