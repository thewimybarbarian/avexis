import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const FOOTER_STREAM =
  'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

function FooterVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(FOOTER_STREAM)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = FOOTER_STREAM
      video.addEventListener('loadedmetadata', () => video.play().catch(() => {}), { once: true })
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-dark-border">
      {/* Video background */}
      <FooterVideo />
      <div className="absolute inset-0 bg-black/60" />

      {/* Footer content */}
      <div className="relative z-10 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-cyan rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan rounded-sm" />
            </div>
            <span className="font-display text-xs font-bold tracking-[0.3em] text-white/60 uppercase">
              Avexis
            </span>
          </div>
          <p className="text-xs text-gray-dim">
            &copy; {new Date().getFullYear()} AVEXIS. Intelligence &middot; Engineered.
          </p>
        </div>
      </div>
    </footer>
  )
}
