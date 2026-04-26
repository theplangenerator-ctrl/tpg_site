'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const stats = [
  { value: 10, prefix: '', suffix: '+', label: 'Muscle Groups Tracked' },
  { value: 6, prefix: '', suffix: '', label: 'Days Per Week Planned' },
  { value: 1, prefix: '< ', suffix: 's', label: 'Fingerprint Recognition' },
  { value: 100, prefix: '', suffix: '%', label: 'Personalised' },
]

export default function StatsBanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>('[data-stat]')

        items.forEach((item) => {
          const target = parseFloat(item.dataset.value || '0')
          const prefix = item.dataset.prefix || ''
          const suffix = item.dataset.suffix || ''
          const valueEl = item.querySelector(
            '[data-stat-value]'
          ) as HTMLElement | null
          const obj = { val: 0 }

          // Scroll-scrubbed counter
          gsap.to(obj, {
            val: target,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.5,
            },
            onUpdate: () => {
              if (valueEl) {
                valueEl.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
              }
            },
          })
        })

        // Reveal each stat block
        gsap.from('[data-stat]', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-24"
      style={{ background: '#C41E1E' }}
    >
      {/* Subtle diagonal texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-6deg, transparent, transparent 40px, rgba(0,0,0,0.06) 40px, rgba(0,0,0,0.06) 41px)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              data-value={stat.value}
              data-prefix={stat.prefix}
              data-suffix={stat.suffix}
              className="text-center md:text-left"
            >
              <div
                className="font-barlow font-[900] text-white leading-none mb-2 tabular-nums"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
              >
                <span data-stat-value>
                  {stat.prefix}0{stat.suffix}
                </span>
              </div>
              <p className="font-space text-xs text-white/75 uppercase tracking-label font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
          height="60"
        >
          <polygon points="0,60 1440,20 1440,60" fill="#141414" />
        </svg>
      </div>
    </section>
  )
}
