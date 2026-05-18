'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MaskedReveal } from '@/components/motion/MaskedReveal'
import { KioskSilhouette } from '@/components/scenes/kiosk/KioskSilhouette'
import { useIsMobile } from '@/hooks/useIsMobile'

export function Hero() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Desktop parallax — skipped on mobile for perf + simpler layout
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const kioskY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const kioskScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      ref={ref}
      id="system"
      className="relative min-h-[100dvh] bg-bone text-graphite-500 overflow-hidden grain"
    >
      {/* Top hairline + corner ticks */}
      <div className="absolute top-14 inset-x-0 h-px bg-graphite-500/15" />
      <Corners />
      {/* Blueprint backdrop */}
      <div className="absolute inset-0 blueprint opacity-30 md:opacity-40 pointer-events-none" />

      {/* ===== MOBILE FLOW ===== stacked: heading → kiosk → CTAs */}
      <div className="md:hidden relative z-10 page-x pt-24 pb-10 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block w-1.5 h-1.5 bg-signal animate-pulse-signal" />
            <span className="label-mono">Sys · TPG_OS · Active</span>
          </div>

          <h1 className="font-display text-hero leading-crush tracking-crush uppercase">
            <div className="block">
              <MaskedReveal delay={0.1} duration={1.0}>The Gym</MaskedReveal>
            </div>
            <div className="block translate-x-[0.4em]">
              <MaskedReveal delay={0.22} duration={1.0}>That</MaskedReveal>
            </div>
            <div className="block flex items-baseline gap-3 flex-wrap">
              <MaskedReveal delay={0.34} duration={1.0}>Knows</MaskedReveal>
              <MaskedReveal delay={0.46} duration={1.0}>
                <span className="text-signal italic font-display">You.</span>
              </MaskedReveal>
            </div>
          </h1>
        </div>

        {/* Kiosk inline — bounded height so it never overruns the viewport */}
        <div className="relative w-full max-w-[420px] mx-auto aspect-[600/780]">
          <div className="absolute inset-x-0 -bottom-6 h-1/4 bg-gradient-to-t from-fog to-transparent pointer-events-none" />
          <KioskSilhouette className="w-full h-full drop-shadow-[0_20px_40px_rgba(11,11,10,0.22)]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[0.95rem] leading-snug text-graphite-200 max-w-[42ch]"
        >
          Fitness infrastructure for the modern era. An intelligent kiosk and a
          portable AI trainer — your data follows you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col gap-3 w-full"
        >
          <CTAPrimary href="/contact" full>Enter the future</CTAPrimary>
          <CTAGhost href="#kiosk" full>Watch system</CTAGhost>
        </motion.div>

        {/* Mobile telemetry — single row, scrolls hint */}
        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-graphite-500/15">
          <MobileTelemetry k="Build" v="v0.1" />
          <MobileTelemetry k="Network" v="2026" />
          <MobileTelemetry k="Status" v="Onboarding" />
          <MobileTelemetry k="↓" v="Begin sequence" />
        </div>
      </div>

      {/* ===== DESKTOP FLOW ===== layered with parallax */}
      <motion.div
        style={isMobile ? undefined : { y: kioskY, scale: kioskScale, opacity: fade }}
        className="hidden md:flex absolute inset-0 items-end justify-center pointer-events-none"
      >
        <div className="relative w-[min(60vw,640px)] aspect-[600/780] max-h-[88dvh]">
          <div className="absolute inset-x-0 -bottom-10 h-1/3 bg-gradient-to-t from-fog to-transparent pointer-events-none" />
          <KioskSilhouette className="w-full h-full drop-shadow-[0_40px_80px_rgba(11,11,10,0.25)]" />
        </div>
      </motion.div>

      <motion.div
        style={isMobile ? undefined : { y: titleY, opacity: fade }}
        className="hidden md:block relative z-10 pt-48 page-x"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block w-1.5 h-1.5 bg-signal animate-pulse-signal" />
          <span className="label-mono">Sys · TPG_OS · Active</span>
        </div>

        <h1 className="font-display text-mega leading-crush tracking-crush uppercase">
          <div className="block">
            <MaskedReveal delay={0.1} duration={1.0}>The Gym</MaskedReveal>
          </div>
          <div className="block translate-x-[1em]">
            <MaskedReveal delay={0.22} duration={1.0}>That</MaskedReveal>
          </div>
          <div className="block flex items-baseline gap-4">
            <MaskedReveal delay={0.34} duration={1.0}>Knows</MaskedReveal>
            <MaskedReveal delay={0.46} duration={1.0}>
              <span className="text-signal italic font-display">You.</span>
            </MaskedReveal>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 max-w-[40ch] text-lg leading-snug text-graphite-200"
        >
          A kiosk in the gym. A trainer in your pocket. Your progress comes
          with you, even when the gym doesn’t.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <CTAPrimary href="/contact">Enter the future</CTAPrimary>
          <CTAGhost href="#kiosk">Watch system</CTAGhost>
        </motion.div>
      </motion.div>

      {/* Desktop telemetry bar */}
      <motion.div
        style={isMobile ? undefined : { opacity: fade }}
        className="hidden md:block absolute bottom-0 inset-x-0 hairline-t bg-bone/70 backdrop-blur-[2px]"
      >
        <div className="page-x py-3 grid grid-cols-4 gap-4 label-mono">
          <Telemetry k="Build" v="v0.1 · NANDED" />
          <Telemetry k="Members" v="Onboarding" />
          <Telemetry k="Network" v="Planned · 2026" />
          <Telemetry k="Scroll" v="↓ Begin sequence" />
        </div>
      </motion.div>
    </section>
  )
}

function Telemetry({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-steel">{k}</span>
      <span className="h-px flex-1 bg-graphite-500/15" />
      <span className="text-graphite-300">{v}</span>
    </div>
  )
}

function MobileTelemetry({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-2 label-mono">
      <span className="text-steel">{k}</span>
      <span className="h-px flex-1 bg-graphite-500/15" />
      <span className="text-graphite-300 truncate">{v}</span>
    </div>
  )
}

function Corners() {
  const tick = 'absolute w-3 h-3 border-graphite-500/30'
  return (
    <>
      <span className={`${tick} top-14 left-[var(--page-pad)] border-t border-l`} />
      <span className={`${tick} top-14 right-[var(--page-pad)] border-t border-r`} />
      <span className={`${tick} bottom-6 md:bottom-12 left-[var(--page-pad)] border-b border-l`} />
      <span className={`${tick} bottom-6 md:bottom-12 right-[var(--page-pad)] border-b border-r`} />
    </>
  )
}

function CTAPrimary({
  href,
  children,
  full = false,
}: {
  href: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-3 bg-graphite-500 text-paper pl-5 pr-4 py-3 overflow-hidden isolate min-h-[48px] ${
        full ? 'w-full justify-between' : ''
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-signal translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-industrial -z-10"
      />
      <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase">
        {children}
      </span>
      <span className="flex items-center gap-3">
        <span className="block w-6 h-px bg-paper" />
        <span className="font-mono text-[0.6875rem] tracking-[0.22em]">→</span>
      </span>
    </a>
  )
}

function CTAGhost({
  href,
  children,
  full = false,
}: {
  href: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 border border-graphite-500/30 hover:border-graphite-500 transition-colors px-5 py-3 min-h-[48px] ${
        full ? 'w-full' : ''
      }`}
    >
      <span aria-hidden className="w-1.5 h-1.5 bg-signal" />
      <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase">
        {children}
      </span>
    </a>
  )
}
