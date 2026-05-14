'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MaskedReveal } from '@/components/motion/MaskedReveal'
import { useIsMobile } from '@/hooks/useIsMobile'

const VIDEO_SRC = '/kiosk.mp4'

const FRAMES = [
  { src: '/images/kiosk/01.jpg', code: 'TOUCH', body: 'Authenticate in under a second. No app, no QR.' },
  { src: '/images/kiosk/02.jpg', code: 'PLAN', body: 'The kiosk drafts your session live, on the floor.' },
  { src: '/images/kiosk/03.jpg', code: 'TRACK', body: 'Every set, rep, and rest captured and validated.' },
  { src: '/images/kiosk/04.jpg', code: 'SYNC', body: 'Pushed to your timeline before you leave the rack.' },
  { src: '/images/kiosk/05.avif', code: 'REST', body: 'Logs out. Ready for the next member on the floor.' },
]

type Active = number | 'video'

export function KioskFilm() {
  const ref = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isMobile = useIsMobile()
  const [active, setActive] = useState<Active>('video')
  const [muted, setMuted] = useState(true)

  const showingVideo = active === 'video'
  const currentFrame = showingVideo ? null : FRAMES[active as number]
  const frameLabel = showingVideo ? 'FILM' : String((active as number) + 1).padStart(2, '0')
  const frameCode = showingVideo ? 'KIOSK_01' : currentFrame!.code
  const totalLabel = String(FRAMES.length).padStart(2, '0')

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = muted
    if (!muted) {
      v.play().catch(() => setMuted(true))
    }
  }, [muted])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lift = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section
      ref={ref}
      id="kiosk-film"
      className="relative bg-graphite-400 text-paper py-chapter overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] [background:repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_4px)]" />

      <div className="page-x grid-12 mb-12 md:mb-16 relative">
        <div className="col-span-12 md:col-span-3">
          <span className="label-mono text-paper/60 block mb-3">GALLERY · KIOSK_01</span>
          <p className="text-sm text-paper/65 max-w-[26ch]">
            The film plays by default. Tap a frame to inspect a still.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>Watch it</MaskedReveal></div>
            <div className="text-signal italic text-hero md:text-mega leading-crush">
              <MaskedReveal delay={0.12}>think.</MaskedReveal>
            </div>
          </h2>
        </div>
      </div>

      {/* Sticky gallery frame + scrolling notes */}
      <div className="page-x grid-12 items-start relative">
        <div className="col-span-12 md:col-span-8">
          <div className="md:sticky md:top-24">
            <motion.div
              style={isMobile ? undefined : { y: lift }}
              className="relative aspect-video bg-graphite-500 border border-paper/15 overflow-hidden"
            >
              {/* Video — always mounted so it keeps playing behind stills */}
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Still overlay — fades in over the playing video */}
              <AnimatePresence mode="sync">
                {!showingVideo && currentFrame && (
                  <motion.div
                    key={currentFrame.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentFrame.src}
                      alt={`Kiosk frame ${frameLabel} — ${currentFrame.code}`}
                      fill
                      sizes="(min-width: 768px) 66vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle vignette so labels stay readable */}
              <div className="absolute inset-0 pointer-events-none [background:linear-gradient(180deg,rgba(0,0,0,0.18)_0%,transparent_22%,transparent_70%,rgba(0,0,0,0.32)_100%)]" />

              {/* Corner labels */}
              <div className="absolute top-2 left-2 md:top-3 md:left-3 label-micro text-paper/80">
                {showingVideo ? 'FILM · KIOSK_01' : `FRAME · ${frameLabel}`}
              </div>
              <div className="absolute top-2 right-2 md:top-3 md:right-3 label-micro text-signal animate-pulse-signal">● LIVE</div>
              <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 label-micro text-paper/80">{frameCode}</div>
              {!showingVideo && (
                <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 label-micro text-paper/80">
                  {frameLabel} / {totalLabel}
                </div>
              )}

              {/* Mute toggle — only when video is playing */}
              {showingVideo && (
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? 'Unmute film' : 'Mute film'}
                  aria-pressed={!muted}
                  className="absolute bottom-2 right-2 md:bottom-3 md:right-3 label-micro text-paper hover:text-signal transition-colors px-2 py-1 border border-paper/30 hover:border-signal/60 bg-graphite-500/50 backdrop-blur-sm flex items-center gap-1.5"
                >
                  <span aria-hidden>{muted ? '🔇' : '🔊'}</span>
                  <span>{muted ? 'UNMUTE' : 'MUTE'}</span>
                </button>
              )}

              {/* Return-to-film overlay control when viewing a still */}
              {!showingVideo && (
                <button
                  type="button"
                  onClick={() => setActive('video')}
                  aria-label="Return to film"
                  className="absolute top-2 right-12 md:top-3 md:right-16 label-micro text-paper/80 hover:text-signal transition-colors px-2 py-1 border border-paper/20 hover:border-signal/60 bg-graphite-500/40 backdrop-blur-sm"
                >
                  ▶ PLAY FILM
                </button>
              )}
            </motion.div>

            {/* Thumbnail strip — film first, then stills */}
            <div className="mt-3 grid grid-cols-6 gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => setActive('video')}
                aria-label="Show film"
                aria-pressed={showingVideo}
                className={`relative aspect-[4/3] overflow-hidden border transition-colors min-h-[44px] ${
                  showingVideo
                    ? 'border-signal'
                    : 'border-paper/15 hover:border-paper/50'
                }`}
              >
                <video
                  src={VIDEO_SRC}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
                    showingVideo ? 'opacity-100' : 'opacity-55 hover:opacity-85'
                  }`}
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="label-micro text-paper bg-graphite-500/60 px-1.5 py-0.5 backdrop-blur-sm">▶ FILM</span>
                </span>
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors ${
                    showingVideo ? 'bg-signal' : 'bg-transparent'
                  }`}
                />
              </button>
              {FRAMES.map((f, i) => {
                const isActive = !showingVideo && i === active
                return (
                  <button
                    key={f.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show frame ${i + 1}: ${f.code}`}
                    aria-pressed={isActive}
                    className={`relative aspect-[4/3] overflow-hidden border transition-colors min-h-[44px] ${
                      isActive
                        ? 'border-signal'
                        : 'border-paper/15 hover:border-paper/50'
                    }`}
                  >
                    <Image
                      src={f.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 11vw, 16vw"
                      className={`object-cover transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-55 hover:opacity-85'
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors ${
                        isActive ? 'bg-signal' : 'bg-transparent'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-3 flex items-baseline justify-between label-mono text-paper/60">
              <span>{showingVideo ? 'FOOTAGE · FILM' : 'FOOTAGE · STILLS'}</span>
              <span className="text-steel">REV · 0.7</span>
            </div>
          </div>
        </div>

        {/* Timestamped notes — scroll past the pinned frame */}
        <ol className="col-span-12 md:col-span-4 md:pl-8 mt-8 md:mt-0 space-y-4 md:space-y-6">
          {FRAMES.map((f, i) => {
            const isActive = !showingVideo && i === active
            return (
              <motion.li
                key={f.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive('video')}
                onClick={() => setActive(i)}
                className={`border-t pt-4 md:pt-5 transition-colors cursor-pointer ${
                  isActive ? 'border-signal' : 'border-paper/15'
                }`}
              >
                <div className="flex items-baseline gap-3 md:gap-4">
                  <span className={`label-mono shrink-0 transition-colors ${isActive ? 'text-signal' : 'text-paper/40'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="label-mono text-paper/50">{f.code}</span>
                </div>
                <p
                  className={`mt-2 md:mt-3 font-display text-xl md:text-2xl leading-tight tracking-editorial uppercase transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-55'
                  }`}
                >
                  {f.body}
                </p>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
