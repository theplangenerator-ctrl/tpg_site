'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINES = [
  '> initializing TPG_OS · v0.1.0',
  '> loading biometric kernel',
  '> mounting member graph',
  '> calibrating muscle telemetry',
  '> link · cross-gym network',
  '> system online',
]

export function BootSequence() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('tpg-booted') === '1') {
      setDone(true)
      return
    }
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setStep(i)
      if (i >= LINES.length) {
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          sessionStorage.setItem('tpg-booted', '1')
        }, 700)
      }
    }, 360)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }}
          className="fixed inset-0 z-[100] bg-graphite-500 text-paper flex flex-col"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-signal" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-paper/20" />

          <div className="flex-1 grid place-items-center page-x">
            <div className="w-full max-w-3xl">
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-paper/60">
                  TPG_OS · Boot
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-signal tabular-nums">
                  {String(Math.min(step, LINES.length)).padStart(2, '0')} / {String(LINES.length).padStart(2, '0')}
                </span>
              </div>

              <div className="font-mono text-[0.78rem] md:text-base leading-[1.85] md:leading-[2] text-paper/85 space-y-0 break-words">
                {LINES.map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={i < step ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="flex items-baseline gap-3"
                  >
                    <span className="text-signal">{line}</span>
                    {i === step - 1 && i < LINES.length - 1 && (
                      <span className="inline-block w-2 h-3 bg-signal animate-pulse-signal" />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 h-px w-full bg-paper/10 relative overflow-hidden">
                <motion.span
                  className="absolute left-0 top-0 bottom-0 bg-signal"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(Math.min(step, LINES.length) / LINES.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
