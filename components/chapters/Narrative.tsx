'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

type Stage = {
  word: string
  index: string
  caption: string
  detail: string
  bg: string
  fg: string
  accent: string
}

const STAGES: Stage[] = [
  {
    word: 'Scan',
    index: '01',
    caption: 'Identify the body.',
    detail: 'Biometric handshake. Member, fatigue, recovery — known on contact.',
    bg: 'bg-bone',
    fg: 'text-graphite-500',
    accent: 'text-signal',
  },
  {
    word: 'Plan',
    index: '02',
    caption: 'Engineer the session.',
    detail: 'Goals × history × floor availability. A draft you can actually do.',
    bg: 'bg-fog',
    fg: 'text-graphite-500',
    accent: 'text-signal',
  },
  {
    word: 'Train',
    index: '03',
    caption: 'Move with intent.',
    detail: 'On-floor guidance, set by set. The kiosk talks. The device listens.',
    bg: 'bg-graphite-300',
    fg: 'text-paper',
    accent: 'text-signal',
  },
  {
    word: 'Track',
    index: '04',
    caption: 'Capture the truth.',
    detail: 'Validated reps, load, tempo, rest — locked into your timeline.',
    bg: 'bg-graphite-400',
    fg: 'text-paper',
    accent: 'text-signal',
  },
  {
    word: 'Evolve',
    index: '05',
    caption: 'Compound the work.',
    detail: 'Plans rewrite themselves as you improve. The system stays ahead.',
    bg: 'bg-graphite-500',
    fg: 'text-paper',
    accent: 'text-signal',
  },
]

export function Narrative() {
  const ref = useRef<HTMLElement | null>(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Mobile uses a slightly taller scroll budget so each stage stays readable
  const heightVh = isMobile ? 220 : 180

  return (
    <section
      ref={ref}
      id="narrative"
      className="relative"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {STAGES.map((s, i) => (
          <StageLayer
            key={s.word}
            stage={s}
            index={i}
            progress={scrollYProgress}
            total={STAGES.length}
          />
        ))}
        <div className="absolute top-0 inset-x-0 h-14 z-10" />
        <div className="absolute bottom-4 md:bottom-6 left-[var(--page-pad)] right-[var(--page-pad)] z-20 flex items-center justify-between gap-3 label-mono text-[0.625rem] md:text-label mix-blend-difference text-paper">
          <span>Seq · 06</span>
          <ProgressTicks progress={scrollYProgress} total={STAGES.length} />
          <span className="truncate">SCAN · PLAN · TRAIN · TRACK · EVOLVE</span>
        </div>
      </div>
    </section>
  )
}

function StageLayer({
  stage,
  index,
  progress,
  total,
}: {
  stage: Stage
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  total: number
}) {
  const start = index / total
  const peak = (index + 0.5) / total
  const end = (index + 1) / total

  const opacity = useTransform(
    progress,
    [start - 0.01, start + 0.03, end - 0.03, end + 0.01],
    [0, 1, 1, 0]
  )
  const y = useTransform(progress, [start, end], ['4%', '-4%'])

  return (
    <motion.div
      style={{ opacity }}
      className={`absolute inset-0 ${stage.bg} ${stage.fg} flex items-center`}
    >
      <div className="page-x grid-12 w-full">
        <div className="col-span-12 md:col-span-3 mb-4 md:mb-0">
          <span className="label-mono opacity-70 block mb-2">Stage · {stage.index}</span>
          <p className="text-[0.85rem] md:text-sm opacity-75 max-w-[28ch] leading-snug">{stage.detail}</p>
        </div>
        <motion.div style={{ y }} className="col-span-12 md:col-span-9 relative">
          <h2 className="font-display text-mega md:text-colossal leading-crush tracking-crush uppercase">
            {stage.word}
            <span className={stage.accent}>.</span>
          </h2>
          <p className="mt-3 md:mt-0 md:absolute md:right-0 md:top-0 font-display text-2xl md:text-3xl uppercase tracking-editorial opacity-70">
            {stage.caption}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

function ProgressTicks({
  progress,
  total,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  total: number
}) {
  return (
    <div className="hidden md:flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const a = useTransform(
          progress,
          [i / total - 0.05, i / total + 0.05, (i + 1) / total - 0.05, (i + 1) / total + 0.05],
          [0.25, 1, 1, 0.25]
        )
        return (
          <motion.span
            key={i}
            style={{ opacity: a }}
            className="block w-6 h-px bg-current"
          />
        )
      })}
    </div>
  )
}
