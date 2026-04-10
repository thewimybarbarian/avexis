import { motion } from 'framer-motion'

const stats = [
  { value: '50+', label: 'AI Projects Shipped' },
  { value: '99%', label: 'Client Retention' },
  { value: '3x', label: 'Avg. Efficiency Gain' },
  { value: '24/7', label: 'Monitoring & Support' },
]

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
              About AVEXIS
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              We turn AI ambition into shipped products.
            </h2>
            <p className="mt-6 text-gray-light text-base sm:text-lg leading-relaxed">
              AVEXIS is a design and development studio that specializes in
              AI-integrated solutions. We work with startups and enterprises to
              bring intelligent products to market — fast, scalable, and built
              to last.
            </p>
            <p className="mt-4 text-gray-light text-base sm:text-lg leading-relaxed">
              Our team combines deep AI/ML expertise with world-class product
              design. The result? Technology that doesn't just work — it works
              beautifully.
            </p>
          </motion.div>

          {/* Right — stats grid */}
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
                <div className="font-display text-3xl sm:text-4xl font-bold text-cyan text-glow">
                  {s.value}
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
