import { motion } from 'framer-motion'

interface ShinyTextProps {
  text: string
  className?: string
}

export default function ShinyText({ text, className = '' }: ShinyTextProps) {
  return (
    <motion.span
      className={className}
      style={{
        display: 'inline-block',
        backgroundImage: `linear-gradient(
          100deg,
          #00D4FF 0%,
          #00D4FF 40%,
          #ffffff 50%,
          #00D4FF 60%,
          #00D4FF 100%
        )`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
      animate={{
        backgroundPosition: ['200% center', '-200% center'],
      }}
      transition={{
        duration: 3,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {text}
    </motion.span>
  )
}
