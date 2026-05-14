'use client'

import { useEffect, useState } from 'react'

export function StatusRail() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside
      aria-hidden
      className="fixed left-0 top-0 bottom-0 z-40 w-[var(--page-pad)] hidden md:flex flex-col items-center justify-between py-20 pointer-events-none mix-blend-difference text-paper"
    >
      <span className="font-mono text-[0.5625rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 opacity-60">
        TPG · System Boot 01
      </span>

      <div className="flex flex-col items-center gap-2 opacity-70">
        <span className="font-mono text-[0.5625rem] tracking-[0.25em] tabular-nums">
          {String(Math.round(progress * 100)).padStart(2, '0')}
        </span>
        <span className="block w-px h-24 bg-current/40 relative overflow-hidden">
          <span
            className="absolute inset-x-0 top-0 bg-signal block"
            style={{ height: `${progress * 100}%` }}
          />
        </span>
      </div>

      <span className="font-mono text-[0.5625rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 opacity-60">
        Lat 19.07 · Lon 72.87
      </span>
    </aside>
  )
}
