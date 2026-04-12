import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 48, suffix: 'hr', label: 'Avg. Launch Time' },
  { value: 99, suffix: '%', label: 'Client Retention' },
  { value: 12, suffix: '+', label: 'AI Integrations' },
  { value: 24, suffix: '/7', label: 'Agent Uptime' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = 40
    const step = () => {
      frame++
      const progress = frame / totalFrames
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (frame < totalFrames) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      <span className="text-cyan">{suffix}</span>
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">
              // About AVEXIS
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              One team. Full stack. Zero gaps.
            </h2>
            <p className="mt-6 text-gray-light text-base sm:text-lg leading-relaxed">
              AVEXIS is a build studio for the AI era. We handle websites,
              automation, brand, and agent systems — all under one roof. No
              freelancers, no vendor chains, no hand-offs.
            </p>
            <p className="mt-4 text-gray-light text-base sm:text-lg leading-relaxed">
              You bring the business. We bring the machine room. Every
              deliverable is built to operate — not just to look good in a
              pitch deck.
            </p>
          </motion.div>

          {/* Right — animated stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-px bg-dark-border rounded-2xl overflow-hidden border border-dark-border"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-dark-card p-8 sm:p-10 text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-white text-glow">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-gray-light">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
