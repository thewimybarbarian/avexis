import { motion } from 'framer-motion'
import { Globe, Zap, Palette, Bot, Wrench } from 'lucide-react'
import TiltCard from './TiltCard'

const services = [
  {
    num: '01',
    price: '$2,500',
    icon: Globe,
    title: '48-Hour Websites',
    desc: 'Custom website build, mobile-first layout, messaging & copy, lead capture, live deployment, and full source code ownership. Launched in 48 hours.',
    stat: '48',
    statUnit: 'hr',
    statLabel: 'Delivery',
  },
  {
    num: '02',
    price: 'Scoped',
    icon: Zap,
    title: 'AI Automations',
    desc: 'Workflow automation, agent systems, and intake routing. Real operator logic wired behind every build.',
    stat: '12',
    statUnit: '+',
    statLabel: 'Integrations',
  },
  {
    num: '03',
    price: 'Scoped',
    icon: Palette,
    title: 'Brand + Media',
    desc: 'Brand alignment, creative direction, and production support. We make you look as sharp as your operation runs.',
    stat: '4K',
    statUnit: '',
    statLabel: 'Deliverables',
  },
  {
    num: '04',
    price: 'Scoped',
    icon: Bot,
    title: 'Agent Systems',
    desc: 'Team operating layer and internal automation. Deploy self-directing AI agents that adapt to your workflows.',
    stat: '24',
    statUnit: '/7',
    statLabel: 'Autonomous',
  },
  {
    num: '05',
    price: 'Retainer',
    icon: Wrench,
    title: 'Ongoing Support',
    desc: 'Monthly updates, priority fixes, and iteration support. We stay in the loop so your site never falls behind.',
    stat: '99',
    statUnit: '%',
    statLabel: 'Uptime',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
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
          className="mb-6 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">
            // The Machine Room
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            One team handles launch and operator layer.
          </h2>
          <p className="mt-4 text-gray-light text-base sm:text-lg leading-relaxed">
            No hand-offs, no vendor chains.
          </p>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-px bg-gradient-to-r from-cyan/40 via-cyan/20 to-transparent mb-16 origin-left"
        />

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <TiltCard className="group relative bg-dark-card border border-dark-border rounded-2xl p-8 sm:p-10 hover:border-cyan/30 transition-all h-full cursor-default overflow-hidden">
                {/* Number + price header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs tracking-[0.2em] text-gray-dim">
                    {s.num}
                  </span>
                  <span className="text-xs font-medium tracking-wider uppercase text-cyan bg-cyan/10 px-3 py-1 rounded-full">
                    {s.price}
                  </span>
                </div>

                {/* Icon + Title */}
                <s.icon className="w-7 h-7 text-cyan mb-4 group-hover:text-cyan-light transition-colors" />
                <h3 className="font-display text-xl font-bold text-white mb-3 tracking-wide">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-gray-light text-sm leading-relaxed mb-8">
                  {s.desc}
                </p>

                {/* Stat callout */}
                <div className="mt-auto pt-6 border-t border-dark-border flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-white">
                    {s.stat}
                  </span>
                  <span className="font-display text-lg font-bold text-cyan">
                    {s.statUnit}
                  </span>
                  <span className="ml-2 text-xs tracking-[0.15em] uppercase text-gray-dim">
                    {s.statLabel}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
