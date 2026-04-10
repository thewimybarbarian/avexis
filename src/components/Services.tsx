import { motion } from 'framer-motion'
import { Brain, Code, Layers, Sparkles, Cpu, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Consulting',
    desc: 'We assess your business and identify where AI creates the most impact — then build the roadmap to get there.',
  },
  {
    icon: Code,
    title: 'Custom AI Development',
    desc: 'From LLM-powered platforms to computer vision systems — we build production-grade AI solutions from scratch.',
  },
  {
    icon: Layers,
    title: 'AI-Integrated Web & Apps',
    desc: 'Full-stack web and mobile applications with intelligent features baked in — not bolted on.',
  },
  {
    icon: Sparkles,
    title: 'Design & UX for AI',
    desc: 'Interfaces that make complex AI feel simple. We design experiences people actually want to use.',
  },
  {
    icon: Cpu,
    title: 'Automation & Workflows',
    desc: 'Intelligent process automation that eliminates repetitive work and scales with your business.',
  },
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    desc: 'Turn raw data into actionable insights with custom dashboards, pipelines, and predictive models.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">
            What We Build
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            End-to-end AI solutions
          </h2>
          <p className="mt-4 text-gray-light text-base sm:text-lg leading-relaxed">
            We don't just consult — we design, build, and ship. Every solution
            is engineered for real-world performance.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border rounded-2xl overflow-hidden border border-dark-border">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group bg-dark-card p-8 sm:p-10 hover:bg-dark-border/30 transition-colors"
            >
              <s.icon className="w-8 h-8 text-cyan mb-6 group-hover:text-cyan-light transition-colors" />
              <h3 className="font-display text-lg font-semibold text-white mb-3 tracking-wide">
                {s.title}
              </h3>
              <p className="text-gray-light text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
