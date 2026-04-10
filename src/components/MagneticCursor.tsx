import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springX = useSpring(trailX, { damping: 25, stiffness: 200 })
  const springY = useSpring(trailY, { damping: 25, stiffness: 200 })

  const visible = useRef(false)
  const opacityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouch(true)
      return
    }

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)

      if (!visible.current && opacityRef.current) {
        opacityRef.current.style.opacity = '1'
        visible.current = true
      }

      const magnetics = document.querySelectorAll('[data-magnetic]')
      magnetics.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2)
        const threshold = 120

        if (dist < threshold) {
          const strength = 1 - dist / threshold
          const pullX = (e.clientX - cx) * strength * 0.3
          const pullY = (e.clientY - cy) * strength * 0.3
          ;(el as HTMLElement).style.transform = `translate(${pullX}px, ${pullY}px)`
          ;(el as HTMLElement).style.transition = 'transform 0.2s ease-out'
        } else {
          ;(el as HTMLElement).style.transform = ''
          ;(el as HTMLElement).style.transition = 'transform 0.4s ease-out'
        }
      })
    }

    function onLeave() {
      if (opacityRef.current) opacityRef.current.style.opacity = '0'
      visible.current = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [cursorX, cursorY, trailX, trailY])

  if (isTouch) return null

  return (
    <div
      ref={opacityRef}
      className="pointer-events-none fixed inset-0 z-[999] opacity-0 transition-opacity duration-300 mix-blend-screen hidden md:block"
    >
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-cyan"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-cyan/40"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)',
        }}
      />
    </div>
  )
}
