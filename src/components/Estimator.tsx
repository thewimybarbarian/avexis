import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Zap, Palette, Bot, Check, Clock, Minus } from 'lucide-react'

/* ── Service types ─────────────────────────────── */
const serviceTypes = [
  {
    id: 'website',
    icon: Globe,
    label: '48-Hour Website',
    base: 2500,
    perPage: 300,
    desc: 'Custom site, mobile-first, deployed live',
  },
  {
    id: 'automation',
    icon: Zap,
    label: 'AI Automation',
    base: 3500,
    perPage: 0,
    desc: 'Workflow + agent systems wired to your stack',
  },
  {
    id: 'brand',
    icon: Palette,
    label: 'Brand + Media',
    base: 2000,
    perPage: 0,
    desc: 'Identity, creative direction, assets',
  },
  {
    id: 'agent',
    icon: Bot,
    label: 'Agent System',
    base: 5000,
    perPage: 0,
    desc: 'Self-directing AI agents for your ops',
  },
]

/* ── Add-ons ───────────────────────────────────── */
const addOns = [
  { id: 'cms', label: 'CMS Integration', price: 500 },
  { id: 'seo', label: 'SEO Optimization', price: 400 },
  { id: 'analytics', label: 'Analytics Dashboard', price: 350 },
  { id: 'copywriting', label: 'AI Copywriting', price: 600 },
  { id: 'hosting', label: 'Managed Hosting (yr)', price: 480 },
  { id: 'support', label: 'Priority Support (mo)', price: 250 },
]

/* ── Timeline multipliers ──────────────────────── */
const timelines = [
  { id: 'rush', label: 'Rush (48hr)', multiplier: 1.5, icon: '⚡' },
  { id: 'standard', label: 'Standard (1-2 wk)', multiplier: 1.0, icon: '📅' },
  { id: 'flexible', label: 'Flexible (3-4 wk)', multiplier: 0.85, icon: '🕐' },
]

/* ── Competitor multipliers for comparison ─────── */
const competitors = {
  agency: { label: 'Traditional Agency', multiplier: 3.2 },
  freelancer: { label: 'Freelancer', multiplier: 1.6 },
}

function formatPrice(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export default function Estimator() {
  const [service, setService] = useState('website')
  const [pages, setPages] = useState(5)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [timeline, setTimeline] = useState('standard')

  const activeService = serviceTypes.find((s) => s.id === service)!
  const activeTimeline = timelines.find((t) => t.id === timeline)!

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )

  const estimate = useMemo(() => {
    const base = activeService.base
    const pagesCost = activeService.perPage * (pages - 1) // first page included
    const addOnsCost = addOns
      .filter((a) => selectedAddOns.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0)
    const subtotal = base + Math.max(0, pagesCost) + addOnsCost
    const total = Math.round(subtotal * activeTimeline.multiplier)
    return {
      total,
      agency: Math.round(total * competitors.agency.multiplier),
      freelancer: Math.round(total * competitors.freelancer.multiplier),
    }
  }, [service, pages, selectedAddOns, timeline, activeService, activeTimeline])

  return (
    <section id="estimate" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">
            // Estimate Your Build
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Know the cost before the call.
          </h2>
          <p className="mt-4 text-gray-light text-base sm:text-lg leading-relaxed">
            Configure your project and see a real-time estimate — no surprises.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-px bg-gradient-to-r from-cyan/40 via-cyan/20 to-transparent mb-16 origin-left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* ─── LEFT: Controls ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Service Type */}
            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-white mb-5">
                01 <span className="text-gray-dim ml-2">Service Type</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceTypes.map((s) => {
                  const active = service === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={`group relative text-left p-5 rounded-xl border transition-all ${
                        active
                          ? 'border-cyan/60 bg-cyan/5 shadow-[0_0_20px_rgba(0,212,255,0.08)]'
                          : 'border-dark-border bg-dark-card hover:border-cyan/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <s.icon
                          className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${
                            active ? 'text-cyan' : 'text-gray-dim group-hover:text-cyan/60'
                          }`}
                        />
                        <div>
                          <div className="font-display text-sm font-bold text-white tracking-wide">
                            {s.label}
                          </div>
                          <div className="text-xs text-gray-dim mt-1 leading-relaxed">
                            {s.desc}
                          </div>
                          <div className="text-xs text-cyan font-medium mt-2">
                            From {formatPrice(s.base)}
                          </div>
                        </div>
                      </div>
                      {/* Active indicator dot */}
                      {active && (
                        <motion.div
                          layoutId="service-dot"
                          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan"
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Page Count Slider (only for website) */}
            <AnimatePresence>
              {service === 'website' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-white mb-5">
                    02 <span className="text-gray-dim ml-2">Pages</span>
                  </h3>
                  <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-light">Number of pages</span>
                      <span className="font-display text-2xl font-bold text-white">
                        {pages}
                        <span className="text-cyan text-lg ml-1">pg</span>
                      </span>
                    </div>
                    {/* Custom slider */}
                    <div className="relative">
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="slider-cyan w-full"
                      />
                      {/* Track labels */}
                      <div className="flex justify-between mt-2 text-xs text-gray-dim">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-dim mt-3">
                      +{formatPrice(activeService.perPage)}/page after the first
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add-Ons */}
            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-white mb-5">
                {service === 'website' ? '03' : '02'}{' '}
                <span className="text-gray-dim ml-2">Add-Ons</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOns.map((a) => {
                  const active = selectedAddOns.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddOn(a.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                        active
                          ? 'border-cyan/40 bg-cyan/5'
                          : 'border-dark-border bg-dark-card hover:border-cyan/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            active
                              ? 'bg-cyan border-cyan'
                              : 'border-dark-border'
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-dark" />}
                        </div>
                        <span className="text-sm text-white">{a.label}</span>
                      </div>
                      <span className="text-xs font-medium text-cyan">
                        +{formatPrice(a.price)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-white mb-5">
                {service === 'website' ? '04' : '03'}{' '}
                <span className="text-gray-dim ml-2">Timeline</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timelines.map((t) => {
                  const active = timeline === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`relative p-5 rounded-xl border text-center transition-all ${
                        active
                          ? 'border-cyan/60 bg-cyan/5'
                          : 'border-dark-border bg-dark-card hover:border-cyan/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{t.icon}</div>
                      <div className="font-display text-sm font-bold text-white tracking-wide">
                        {t.label}
                      </div>
                      <div className="text-xs text-gray-dim mt-1">
                        {t.multiplier === 1
                          ? 'Base rate'
                          : t.multiplier > 1
                          ? `+${Math.round((t.multiplier - 1) * 100)}% rush fee`
                          : `${Math.round((1 - t.multiplier) * 100)}% discount`}
                      </div>
                      {active && (
                        <motion.div
                          layoutId="timeline-dot"
                          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cyan"
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: Sticky estimate panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
              {/* AVEXIS price */}
              <div className="p-8 border-b border-dark-border">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  <span className="text-xs tracking-[0.2em] uppercase text-cyan font-medium">
                    Your Estimate
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={estimate.total}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-5xl font-bold text-white mt-3 text-glow"
                  >
                    {formatPrice(estimate.total)}
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-gray-dim mt-2">
                  with AVEXIS · {activeTimeline.label}
                </p>
              </div>

              {/* Comparison */}
              <div className="p-8 space-y-4">
                <p className="text-xs tracking-[0.15em] uppercase text-gray-dim font-medium mb-4">
                  Compare
                </p>

                {/* Agency */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white">Agency</div>
                    <div className="text-xs text-gray-dim">4-8 week timeline</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-white/40 line-through">
                      {formatPrice(estimate.agency)}
                    </div>
                    <div className="text-xs text-red-400">
                      +{Math.round(((estimate.agency - estimate.total) / estimate.total) * 100)}% more
                    </div>
                  </div>
                </div>

                <div className="h-px bg-dark-border" />

                {/* Freelancer */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white">Freelancer</div>
                    <div className="text-xs text-gray-dim">Variable quality</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-white/40 line-through">
                      {formatPrice(estimate.freelancer)}
                    </div>
                    <div className="text-xs text-red-400">
                      +{Math.round(((estimate.freelancer - estimate.total) / estimate.total) * 100)}% more
                    </div>
                  </div>
                </div>

                <div className="h-px bg-dark-border" />

                {/* AVEXIS highlight */}
                <div className="flex items-center justify-between bg-cyan/5 -mx-3 px-3 py-3 rounded-lg border border-cyan/20">
                  <div>
                    <div className="text-sm text-white font-medium">AVEXIS</div>
                    <div className="text-xs text-cyan">Full stack · AI-native</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-cyan">
                      {formatPrice(estimate.total)}
                    </div>
                    <div className="text-xs text-green-400">Best value</div>
                  </div>
                </div>
              </div>

              {/* What's included */}
              <div className="px-8 pb-6">
                <p className="text-xs tracking-[0.15em] uppercase text-gray-dim font-medium mb-3">
                  Included
                </p>
                <ul className="space-y-2">
                  {[
                    'Full source code ownership',
                    'Mobile-first responsive',
                    'Live deployment',
                    'Post-launch support',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-light">
                      <Check className="w-3 h-3 text-cyan shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-2">
                <a
                  href="#contact"
                  data-magnetic
                  className="group flex items-center justify-center gap-2 w-full bg-cyan px-6 py-4 rounded-full text-dark font-semibold text-sm tracking-wide hover:bg-cyan-light transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                >
                  Start This Build
                  <Clock className="w-4 h-4 transition-transform group-hover:rotate-12" />
                </a>
                <p className="text-center text-xs text-gray-dim mt-3">
                  No commitment — we'll scope it for free
                </p>
              </div>
            </div>

            {/* Savings badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-4 bg-dark-card border border-dark-border rounded-xl text-center"
            >
              <div className="text-xs text-gray-dim uppercase tracking-[0.15em] mb-1">
                You save vs. agency
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={estimate.agency - estimate.total}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display text-2xl font-bold text-green-400"
                >
                  {formatPrice(estimate.agency - estimate.total)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
