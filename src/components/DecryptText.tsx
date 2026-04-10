import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>{}[]'

interface DecryptTextProps {
  text: string
  className?: string
  delay?: number       // ms before starting
  speed?: number       // ms per character reveal
  scrambleDuration?: number // how many frames each char scrambles
  trigger?: boolean
}

export default function DecryptText({
  text,
  className = '',
  delay = 0,
  speed = 40,
  scrambleDuration = 6,
  trigger = true,
}: DecryptTextProps) {
  const [displayed, setDisplayed] = useState('')
  const frameRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!trigger) {
      setDisplayed('')
      return
    }

    let revealIndex = 0
    let scrambleFrame = 0
    let started = false

    const timeout = setTimeout(() => {
      started = true
    }, delay)

    function tick() {
      if (!started) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      scrambleFrame++

      if (scrambleFrame >= scrambleDuration) {
        scrambleFrame = 0
        revealIndex++
      }

      // Build the display string
      let result = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' '
        } else if (i < revealIndex) {
          result += text[i]
        } else if (i < revealIndex + 3) {
          // Scrambling zone — 3 chars ahead of reveal point
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        } else {
          result += ' '
        }
      }

      setDisplayed(result)

      if (revealIndex <= text.length) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    // Kick off at the desired speed using rAF for smoothness
    const interval = setInterval(() => {
      frameRef.current++
    }, speed)

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
      cancelAnimationFrame(rafRef.current)
    }
  }, [text, delay, speed, scrambleDuration, trigger])

  return (
    <span className={className} aria-label={text}>
      {displayed || (trigger ? '' : text)}
    </span>
  )
}
