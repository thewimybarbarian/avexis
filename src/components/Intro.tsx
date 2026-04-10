import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntroProps {
  onComplete: () => void
  visible: boolean
}

export default function Intro({ onComplete, visible }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          {/* Centered video — contained, not stretched */}
          <div className="relative w-full max-w-2xl px-6">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={onComplete}
              className="w-full h-auto rounded-lg"
            >
              <source src="https://pub-30dc4f9c80c642e487b510dcdbc90114.r2.dev/0410(2).mp4" type="video/mp4" />
            </video>
          </div>

          {/* Skip button */}
          <button
            onClick={onComplete}
            className="absolute bottom-10 right-10 text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors cursor-pointer"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
