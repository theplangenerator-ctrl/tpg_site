'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!barRef.current) return

      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })

      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div ref={barRef} className="h-full" style={{ background: '#C41E1E' }} />
    </div>
  )
}
