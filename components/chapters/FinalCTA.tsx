'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

export function FinalCTA() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const lift = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.15])

  return (
    <section
      ref={ref}
      id="final"
      className="relative bg-graphite-500 text-paper py-chapter overflow-hidden"
    >
      <motion.div
        style={isMobile ? { opacity: 0.35 } : { opacity: glow }}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#D72323_0,transparent_60%)]" />
      </motion.div>

      <div className="page-x relative z-10">
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <span className="label-mono text-paper/60">09 · End sequence</span>
          <span className="label-mono text-signal animate-pulse-signal">
            TPG_OS · LIVE
          </span>
        </div>

        <motion.h2
          style={isMobile ? undefined : { y: lift }}
          className="font-display text-mega md:text-colossal leading-crush tracking-crush uppercase break-words hyphens-none"
        >
          <div>Your gym</div>
          <div className="opacity-70">just got</div>
          <div>an</div>
          <div className="text-signal italic">operating</div>
          <div className="text-signal italic">system.</div>
        </motion.h2>

        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-4 md:gap-6 items-end">
          <p className="col-span-12 md:col-span-5 text-paper/70 max-w-[44ch] text-[0.95rem] md:text-base leading-snug">
            Gyms close. Trainers move on. Apps get shut down. The work you put
            in shouldn’t go with them.
          </p>

          <div className="col-span-12 md:col-span-7 flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center justify-start md:justify-end gap-3 md:gap-4">
            <CTAFilled href="#">Request demo</CTAFilled>
            <CTAGhostDark href="#">Join the network</CTAGhostDark>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="page-x mt-20 md:mt-32 border-t border-paper/15 pt-6 flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-3 md:gap-4 label-mono text-paper/60">
        <span>© 2026 · TPG · The_Plan-Generator</span>
        <span>We are totally bootstrapped</span>
      </div>
    </section>
  )
}

function CTAFilled({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-between md:justify-start gap-3 bg-signal text-paper pl-6 pr-5 py-4 overflow-hidden isolate min-h-[52px] w-full md:w-auto"
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-paper translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-industrial -z-10"
      />
      <span className="font-mono text-[0.75rem] tracking-[0.22em] uppercase group-hover:text-graphite-500 transition-colors">
        {children}
      </span>
      <span className="flex items-center gap-3">
        <span className="block w-8 h-px bg-paper group-hover:bg-graphite-500 transition-colors" />
        <span className="font-mono text-sm group-hover:text-graphite-500 transition-colors">→</span>
      </span>
    </a>
  )
}

function CTAGhostDark({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 border border-paper/40 hover:border-paper px-6 py-4 transition-colors min-h-[52px] w-full md:w-auto"
    >
      <span className="w-1.5 h-1.5 bg-signal" />
      <span className="font-mono text-[0.75rem] tracking-[0.22em] uppercase">
        {children}
      </span>
    </a>
  )
}
