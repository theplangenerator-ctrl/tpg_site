'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MaskedReveal } from '@/components/motion/MaskedReveal'
import { TMWSilhouette } from '@/components/scenes/tmw/TMWSilhouette'
import { useIsMobile } from '@/hooks/useIsMobile'

export function TMWShowcase() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const float = useTransform(scrollYProgress, [0, 0.5, 1], [10, -10, 10])

  return (
    <section
      ref={ref}
      id="tmw"
      className="relative bg-graphite-500 text-paper py-chapter overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background:radial-gradient(circle_at_50%_30%,#fff_0,transparent_55%)]" />

      <div className="page-x grid-12 relative">
        <div className="col-span-12 md:col-span-3">
          <span className="label-mono text-paper/60 block mb-3">05 · Product 02</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-signal/60 mb-3">
            <span className="w-1.5 h-1.5 bg-signal" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-signal">In Development</span>
          </div>
          <p className="text-sm text-paper/65 max-w-[26ch]">
            Currently in firmware development. Sign up to be notified at launch.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>TMW.</MaskedReveal></div>
            <div className="opacity-70"><MaskedReveal delay={0.12}>Your coach,</MaskedReveal></div>
            <div className="text-signal italic"><MaskedReveal delay={0.24}>pocketable.</MaskedReveal></div>
          </h2>
        </div>
      </div>

      <div className="page-x mt-8 md:mt-20 grid-12 items-center">
        <div className="col-span-12 md:col-span-7 relative">
          <div className="relative aspect-[4/3] md:aspect-[16/10] bg-graphite-400 border border-paper/10">
            {/* Concentric rings */}
            <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
              {[60, 120, 180, 240].map((r) => (
                <circle
                  key={r}
                  cx="300"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke="#3F3F3C"
                  strokeWidth="0.5"
                />
              ))}
              <circle cx="300" cy="200" r="2" fill="#D72323" />
            </svg>

            <motion.div
              style={isMobile ? undefined : { y: float }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <TMWSilhouette className="w-[55%] md:w-[42%]" />
            </motion.div>

            <div className="absolute top-2 left-2 md:top-3 md:left-3 label-mono text-paper/60 text-[0.625rem] md:text-label">TMW · idle</div>
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 label-mono text-signal text-[0.625rem] md:text-label">SYNC · OK</div>
          </div>
        </div>

        <ul className="col-span-12 md:col-span-5 md:pl-8 mt-8 md:mt-0 space-y-4 md:space-y-5">
          {[
            ['01', 'Voice + haptic', 'Tells you the next set. Provides rep and rest cues through haptic feedback.'],
            ['02', 'Magnetic dock', 'Snaps to the kiosk. Charges. Hands off the session.'],
            ['03', 'Cross-gym sync', 'Designed to carry your workout history across every TPG-enabled gym.'],
            ['04', 'No app required', 'The device is the interface.'],
          ].map(([n, t, b]) => (
            <li key={n} className="border-t border-paper/15 pt-3 md:pt-4 flex items-baseline gap-4 md:gap-5">
              <span className="label-mono text-signal w-7 md:w-8 shrink-0">{n}</span>
              <div>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-editorial leading-tight">
                  {t}
                </h3>
                <p className="text-paper/65 mt-1.5 md:mt-2 text-[0.95rem] md:text-base leading-snug max-w-[40ch]">{b}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
