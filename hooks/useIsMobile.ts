'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true on screens narrower than the breakpoint (default 768px — Tailwind md).
 * SSR-safe: initial state is false; updates after mount.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [breakpoint])
  return isMobile
}
