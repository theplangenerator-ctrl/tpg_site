'use client'

import { motion } from 'framer-motion'
import { MaskedReveal } from '@/components/motion/MaskedReveal'
import { KioskSilhouette } from '@/components/scenes/kiosk/KioskSilhouette'
import { TMWSilhouette } from '@/components/scenes/tmw/TMWSilhouette'

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative bg-bone text-graphite-500 py-chapter overflow-hidden grain">
      <div className="page-x grid-12">
        <div className="col-span-12 md:col-span-3">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1.5 h-1.5 bg-signal" />
            <span className="label-mono">03 · System</span>
          </div>
          <p className="text-sm text-graphite-200 max-w-[28ch]">
            Two products. One operating system. Built to talk to each other —
            and to remember you between them.
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>One system.</MaskedReveal></div>
            <div><MaskedReveal delay={0.12}>Two surfaces.</MaskedReveal></div>
            <div className="text-signal italic text-hero md:text-mega leading-crush"><MaskedReveal delay={0.24}>Zero amnesia.</MaskedReveal></div>
          </h2>
        </div>
      </div>

      {/* Bus diagram */}
      <div className="page-x mt-8 md:mt-20 grid-12 items-center">
        {/* Left: Kiosk card */}
        <ProductCard
          number="01"
          name="TPG · Kiosk"
          subtitle="The gym operating system"
          bullets={[
            'Face recognition',
            'Personalised AI plans',
            'Fully modifiable',
            'Real-time tracking',
            'Video-guided exercises',
            'Leaderboards',
          ]}
          art={
            <div className="aspect-[4/5] flex items-center justify-center">
              <KioskSilhouette className="w-[88%] h-auto" showAnnotations={false} />
            </div>
          }
          className="col-span-12 md:col-span-5"
        />

        {/* Center: connection bus — horizontal on mobile, vertical on desktop */}
        <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col items-center justify-center gap-3 my-6 md:my-0">
          <span className="label-mono text-steel">sync</span>
          <div className="md:hidden flex-1">
            <BusLineHorizontal />
          </div>
          <div className="hidden md:block">
            <BusLine />
          </div>
          <span className="label-mono text-signal animate-pulse-signal">live</span>
        </div>

        {/* Right: TMW card */}
        <ProductCard
          number="02"
          name="TMW · Device"
          subtitle="Portable AI trainer"
          bullets={[
            'Tells you the next set',
            'Attach anywhere',
            'Easy to carry',
            'Watch your next move',
            'Fidgety',
            'Hidden surprises, if you can find them',
          ]}
          art={
            <div className="aspect-[4/5] flex items-center justify-center">
              <TMWSilhouette className="w-3/4" />
            </div>
          }
          className="col-span-12 md:col-span-5"
        />
      </div>
    </section>
  )
}

function ProductCard({
  number,
  name,
  subtitle,
  bullets,
  art,
  className,
}: {
  number: string
  name: string
  subtitle: string
  bullets: string[]
  art: React.ReactNode
  className?: string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative bg-paper border border-graphite-500/15 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0 px-4 md:px-5 py-3 border-b border-graphite-500/15">
        <span className="label-mono">{number} · {name}</span>
        <span className="label-mono text-steel">{subtitle}</span>
      </div>
      <div className="px-4 md:px-5 pt-6 pb-2 bg-bone">{art}</div>
      <ul className="border-t border-graphite-500/15 divide-y divide-graphite-500/10">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-baseline gap-3 px-4 md:px-5 py-3 font-mono text-[0.78rem] tracking-wide"
          >
            <span className="text-signal">+</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function BusLine() {
  return (
    <svg viewBox="0 0 60 220" className="w-12 h-56" aria-hidden>
      <line x1="30" y1="0" x2="30" y2="220" stroke="#0B0B0A" strokeWidth="0.6" />
      <motion.circle
        cx="30"
        r="3"
        fill="#D72323"
        initial={{ cy: 0 }}
        animate={{ cy: [0, 220, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="22" y1={y} x2="38" y2={y} stroke="#0B0B0A" strokeWidth="0.4" />
      ))}
    </svg>
  )
}

function BusLineHorizontal() {
  return (
    <svg viewBox="0 0 220 24" className="w-full h-6" preserveAspectRatio="none" aria-hidden>
      <line x1="0" y1="12" x2="220" y2="12" stroke="#0B0B0A" strokeWidth="0.6" />
      {[40, 80, 120, 160].map((x) => (
        <line key={x} x1={x} y1="6" x2={x} y2="18" stroke="#0B0B0A" strokeWidth="0.4" />
      ))}
      <motion.circle
        cy="12"
        r="3"
        fill="#D72323"
        initial={{ cx: 0 }}
        animate={{ cx: [0, 220, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
