import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">
            Let's Build
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to integrate AI into your business?
          </h2>
          <p className="mt-6 text-gray-light text-base sm:text-lg leading-relaxed">
            Tell us about your project. We'll get back to you within 24 hours
            with a tailored proposal.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-12 flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white text-sm placeholder:text-gray-dim focus:outline-none focus:border-cyan/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white text-sm placeholder:text-gray-dim focus:outline-none focus:border-cyan/50 transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Company / Project Name"
            className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white text-sm placeholder:text-gray-dim focus:outline-none focus:border-cyan/50 transition-colors"
          />
          <textarea
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full bg-dark-card border border-dark-border rounded-xl px-5 py-4 text-white text-sm placeholder:text-gray-dim focus:outline-none focus:border-cyan/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="group mt-2 inline-flex items-center justify-center gap-3 bg-cyan px-8 py-4 rounded-full text-dark font-semibold text-sm tracking-wide hover:bg-cyan-light transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] self-center"
          >
            Send Message
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </section>
  )
}
