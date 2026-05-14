'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MaskedReveal } from '@/components/motion/MaskedReveal'
import { useIsMobile } from '@/hooks/useIsMobile'

const FRAGMENTS = [
  { label: 'WEEK 03', value: 'PUSH · 5x5 · 87.5kg', state: 'lost' },
  { label: 'WEEK 07', value: 'PULL · 4x8 · 65kg', state: 'lost' },
  { label: 'WEEK 12', value: 'LEG · 3x10 · 110kg', state: 'lost' },
  { label: 'WEEK 18', value: 'PUSH · 6x4 · 92.5kg', state: 'fading' },
  { label: 'WEEK 24', value: '—— · —— · ——', state: 'gone' },
]

export function Problem() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const drift = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={ref}
      id="problem"
      className="relative bg-graphite-500 text-paper py-chapter overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] [background:repeating-linear-gradient(0deg,transparent_0,transparent_3px,#fff_3px,#fff_4px)]" />

      <div className="page-x grid-12 relative">
        <div className="col-span-12 md:col-span-3 mb-10 md:mb-0">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-signal" />
            <span className="label-mono text-paper/60">02 · Problem</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>Most gyms forget you</MaskedReveal></div>
            <div className="text-signal text-hero md:text-mega leading-crush">
              <MaskedReveal delay={0.12}>the second</MaskedReveal>
            </div>
            <div className="opacity-30">
              <MaskedReveal delay={0.24}>you leave.</MaskedReveal>
            </div>
          </h2>
        </div>
      </div>

      <motion.div
        style={isMobile ? undefined : { x: drift }}
        className="mt-12 md:mt-20 page-x"
      >
        <div className="grid-12 items-start">
          <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
            <p className="label-mono text-paper/50 mb-3">Member · history</p>
            <p className="text-sm text-paper/70 max-w-[28ch]">
              Track yourself. Compare yourself. Improve yourself.
            </p>
          </div>

          <ul className="col-span-12 md:col-span-9 divide-y divide-paper/10 border-y border-paper/10 font-mono text-[0.78rem] md:text-base">
            {FRAGMENTS.map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className={`grid grid-cols-12 gap-2 md:gap-4 items-baseline py-3 md:py-4 ${
                  f.state === 'gone'
                    ? 'opacity-25'
                    : f.state === 'fading'
                    ? 'opacity-55'
                    : ''
                }`}
              >
                <span className="col-span-4 md:col-span-2 label-mono text-paper/60 text-[0.625rem] md:text-label">
                  {f.label}
                </span>
                <span
                  className={`col-span-5 md:col-span-8 tracking-wider truncate ${
                    f.state === 'gone' ? 'text-paper/30' : 'text-paper'
                  }`}
                >
                  {f.value}
                </span>
                <span
                  className={`col-span-3 md:col-span-2 text-right label-mono text-[0.625rem] md:text-label ${
                    f.state === 'gone'
                      ? 'text-signal'
                      : f.state === 'fading'
                      ? 'text-signal/60'
                      : 'text-paper/50'
                  }`}
                >
                  {f.state.toUpperCase()}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
