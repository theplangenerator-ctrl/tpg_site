'use client'

import { motion } from 'framer-motion'
import { MaskedReveal } from '@/components/motion/MaskedReveal'

const NODES = [
  { x: 18, y: 28, label: 'MUM · 01', live: true },
  { x: 42, y: 14, label: 'BLR · 02' },
  { x: 68, y: 30, label: 'DEL · 03' },
  { x: 32, y: 58, label: 'PUN · 04' },
  { x: 58, y: 62, label: 'HYD · 05' },
  { x: 82, y: 52, label: 'KOL · 06' },
  { x: 24, y: 80, label: 'AHM · 07' },
  { x: 72, y: 80, label: 'CHE · 08' },
]

export function Network() {
  return (
    <section
      id="network"
      className="relative bg-bone text-graphite-500 py-chapter overflow-hidden grain"
    >
      <div className="page-x grid-12">
        <div className="col-span-12 md:col-span-3">
          <span className="label-mono block mb-3">07 · Network</span>
          <p className="text-sm text-graphite-200 max-w-[26ch]">
            Your fitness data should follow you; not the other way around.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>One identity.</MaskedReveal></div>
            <div><MaskedReveal delay={0.12}>Every floor.</MaskedReveal></div>
            <div className="text-signal italic text-hero md:text-mega leading-crush"><MaskedReveal delay={0.24}>One graph.</MaskedReveal></div>
          </h2>
        </div>
      </div>

      <div className="page-x mt-10 md:mt-16 grid-12">
        <div className="col-span-12 md:col-span-8">
          <div className="relative aspect-[4/3] md:aspect-[16/10] bg-paper border border-graphite-500/15 overflow-hidden">
            <div className="absolute inset-0 blueprint opacity-50" />
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {NODES.map((a, i) =>
                NODES.slice(i + 1).map((b, j) => (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#0B0B0A"
                    strokeOpacity="0.18"
                    strokeWidth="0.15"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 1.6,
                      delay: 0.1 + (i + j) * 0.02,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                  />
                ))
              )}
            </svg>
            {/* Nodes */}
            {NODES.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className="relative">
                  <span
                    className={`block w-2 h-2 ${
                      n.live ? 'bg-signal animate-pulse-signal' : 'bg-graphite-500'
                    }`}
                  />
                  {n.live && (
                    <span className="absolute inset-0 -m-2 border border-signal/50 animate-pulse-signal" />
                  )}
                  <span className="hidden sm:inline absolute left-3 top-1/2 -translate-y-1/2 label-micro whitespace-nowrap">
                    {n.label}
                  </span>
                </div>
              </motion.div>
            ))}

            <div className="absolute top-2 left-2 md:top-3 md:left-3 label-mono text-[0.625rem] md:text-label">Network · live</div>
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 label-mono text-signal text-[0.625rem] md:text-label">8 NODES · 1 GRAPH</div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 md:pl-8 mt-6 md:mt-0">
          {[
            ['Walk into any TPG floor.', 'Your member graph loads before you finish your warm-up.'],
            ['Travel. Move cities. Switch gyms.', 'The data is the constant. Not the building.'],
            ['Coach changes. Equipment changes.', 'The system carries the context that they can’t.'],
          ].map(([t, b], i) => (
            <div key={i} className="border-t border-graphite-500/15 py-4 md:py-5">
              <p className="font-display text-2xl md:text-2xl uppercase tracking-editorial leading-tight">
                {t}
              </p>
              <p className="text-graphite-200 mt-2 text-[0.9rem] md:text-sm leading-snug">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
