import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const VIDEOS = [
  'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085844_21a8f4b3-dea5-4ede-be16-d53f6973bb14.mp4',
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8',
  'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8',
  'https://stream.mux.com/Si6ej2ZRrxRCnTYBXSScDRCdd7CGnyTqiPszZcw3z4I.m3u8',
  'https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8',
]

function isHls(url: string) {
  return url.endsWith('.m3u8')
}

// Pick a random video on each page load
function getRandomVideo() {
  return VIDEOS[Math.floor(Math.random() * VIDEOS.length)]
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const url = getRandomVideo()

    if (isHls(url) && Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls
      hls.loadSource(url)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
    } else if (isHls(url) && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = url
      video.addEventListener('loadedmetadata', () => video.play().catch(() => {}), { once: true })
    } else {
      // Regular MP4
      video.src = url
      video.load()
      video.addEventListener('loadeddata', () => video.play().catch(() => {}), { once: true })
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [])

  return (
    <>
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />
    </>
  )
}
