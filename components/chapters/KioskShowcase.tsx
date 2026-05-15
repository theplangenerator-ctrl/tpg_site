'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MaskedReveal } from '@/components/motion/MaskedReveal'
import { KioskSilhouette } from '@/components/scenes/kiosk/KioskSilhouette'
import { useIsMobile } from '@/hooks/useIsMobile'

const PANELS = [
  {
    code: 'A · AUTH',
    title: 'Biometric, in under a second.',
    body:
      'Touch the pad. The kiosk knows who you are, what you did last, and what you are doing today. No app, no QR, no friction.',
  },
  {
    code: 'B · PLAN',
    title: 'A new plan, generated on the floor.',
    body:
      'Goals, fatigue, history, equipment availability. The kiosk drafts your session in seconds — and adapts it as you go.',
  },
  {
    code: 'C · TRACK',
    title: 'Real-time muscle telemetry.',
    body:
      'Sets, reps, load, rest, tempo. Tracked, validated, and pushed into your timeline. Nothing slips off the page.',
  },
  {
    code: 'D · REPORT',
    title: 'Telegram pings, weekly receipts.',
    body:
      'A clean progress summary delivered where you already are. No another app. No another login.',
  },
]

export function KioskShowcase() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const lift = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      ref={ref}
      id="kiosk"
      className="relative bg-bone text-graphite-500 py-chapter overflow-hidden"
    >
      <div className="page-x grid-12 mb-7 md:mb-16">
        <div className="col-span-12 md:col-span-3">
          <span className="label-mono block mb-3">04 · Product 01</span>
          <p className="text-sm text-graphite-200 max-w-[26ch]">
            Wall-mounted intelligence. The terminal that turns a gym into a
            system.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>The Kiosk.</MaskedReveal></div>
            <div className="opacity-60">
              <MaskedReveal delay={0.12}>Hardware that</MaskedReveal>
            </div>
            <div><MaskedReveal delay={0.24}>remembers.</MaskedReveal></div>
          </h2>
        </div>
      </div>

      <div className="page-x grid-12 items-start">
        {/* Industrial hardware on the left, sticky on desktop */}
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-28">
            <div className="relative aspect-[4/5] bg-paper border border-graphite-500/15 overflow-hidden">
              <div className="absolute inset-0 blueprint opacity-40 pointer-events-none" />
              <motion.div
                style={isMobile ? undefined : { rotateZ: rotate, y: lift }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <KioskSilhouette className="w-[92%] h-auto" showAnnotations={!isMobile} />
              </motion.div>
              {/* Caliper marks */}
              <div className="absolute top-2 left-2 md:top-3 md:left-3 label-micro">H · 720</div>
              <div className="absolute top-2 right-2 md:top-3 md:right-3 label-micro">W · 560</div>
              <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 label-micro">D · 95</div>
              <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 label-micro text-signal">LIVE</div>
            </div>
            <div className="mt-3 flex items-baseline justify-between label-mono">
              <span>TPG_KSK_01 · INDUSTRIAL</span>
              <span className="text-steel">REV · 0.7</span>
            </div>
          </div>
        </div>

        {/* Panels */}
        <ol className="col-span-12 md:col-span-7 space-y-2">
          {PANELS.map((p, i) => (
            <motion.li
              key={p.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.9,
                delay: i * 0.06,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="border border-graphite-500/15 bg-paper p-5 md:p-8 group hover:border-graphite-500 active:border-graphite-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="label-mono">{p.code}</span>
                <span className="label-mono text-steel">0{i + 1} / 04</span>
              </div>
              <h3 className="font-display text-h1 md:text-[clamp(1.5rem,3.5vw,2.75rem)] leading-tight tracking-editorial uppercase">
                {p.title}
              </h3>
              <p className="mt-3 md:mt-4 text-[0.95rem] md:text-base text-graphite-200 max-w-[52ch] leading-snug">{p.body}</p>
              <div className="mt-5 md:mt-6 h-px w-full bg-graphite-500/15 relative overflow-hidden">
                <span className="absolute inset-y-0 left-0 w-0 group-hover:w-full group-active:w-full bg-signal transition-all duration-700 ease-industrial" />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
