import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import HeroVideo from './HeroVideo'
import AuroraShader from './AuroraShader'
import DecryptText from './DecryptText'
import ShinyText from './ShinyText'

export default function Hero({ animate = true }: { animate?: boolean }) {
  const show = animate
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-dark">
      {/* Video background */}
      <HeroVideo />

      {/* GPU Aurora shader — layered on top of video with blend */}
      <div className="absolute inset-0 mix-blend-screen opacity-60">
        <AuroraShader />
      </div>

      {/* Top cyan accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 border border-dark-border rounded-full px-5 py-2 bg-dark/60 backdrop-blur-sm"
          data-magnetic
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-gray-light font-medium">
            <DecryptText
              text="AI-Powered Design & Development"
              trigger={show}
              delay={200}
              speed={30}
            />
          </span>
        </motion.div>

        {/* Main heading — decrypt then shiny */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight"
        >
          <DecryptText
            text="Intelligence"
            className="text-white"
            trigger={show}
            delay={600}
            speed={50}
            scrambleDuration={4}
          />
          <br />
          <ShinyText text="Engineered." className="text-glow" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-gray-light leading-relaxed"
        >
          We design and develop AI-integrated solutions that transform how
          businesses operate. From intelligent automation to custom AI
          platforms&nbsp;— we build what's next.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            data-magnetic
            className="group inline-flex items-center gap-3 bg-cyan px-8 py-4 rounded-full text-dark font-semibold text-sm tracking-wide hover:bg-cyan-light transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            data-magnetic
            className="group inline-flex items-center gap-3 border border-dark-border px-8 py-4 rounded-full text-white/80 text-sm tracking-wide hover:border-cyan/50 hover:text-white transition-all"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-5 h-5 text-gray-dim animate-bounce" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
