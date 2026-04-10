import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const STREAM_URL =
  'https://stream.mux.com/QgTir2Bu4u6d01CqyKEBCks68PIm2nCM7vhwXgenS00tw.m3u8'
const START_TIME = 0

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    function initVideo() {
      video!.currentTime = START_TIME
      video!.play().catch(() => {})
    }

    if (Hls.isSupported()) {
      hls = new Hls({ startPosition: START_TIME })
      hls.loadSource(STREAM_URL)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = START_TIME
        video.play().catch(() => {})
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = STREAM_URL
      video.addEventListener('loadedmetadata', initVideo, { once: true })
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [])

  return (
    <>
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
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
