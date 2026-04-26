'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Activity,
  Brain,
  Cloud,
  Eye,
  Fingerprint,
  Gauge,
  Lock,
  Send,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import SectionLabel from '@/components/shared/SectionLabel'
import {
  overviewCapabilities,
  products,
  type Capability,
  type CapabilityIcon,
} from '@/lib/products'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ICONS: Record<CapabilityIcon, typeof Fingerprint> = {
  fingerprint: Fingerprint,
  brain: Brain,
  activity: Activity,
  send: Send,
  shield: Shield,
  zap: Zap,
  users: Users,
  cloud: Cloud,
  gauge: Gauge,
  sparkles: Sparkles,
  eye: Eye,
  lock: Lock,
}

const HEADING_LINES = ['Built For', 'Every Member.']

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<string>('overview')

  // Build tabs from available products that have capabilities
  const productTabs = products.filter(
    (p) => p.status === 'available' && p.capabilities && p.capabilities.length
  )

  const tabs = [
    { id: 'overview', label: 'Overview' },
    ...productTabs.map((p) => ({ id: p.id, label: p.name })),
  ]

  // Resolve current capabilities from selected
  const currentProduct = products.find((p) => p.id === selected)
  const capabilities =
    selected === 'overview'
      ? overviewCapabilities
      : currentProduct?.capabilities ?? overviewCapabilities

  const subtitle =
    selected === 'overview'
      ? 'Every set, every session, every signal — captured across the catalogue.'
      : `What lives inside ${currentProduct?.name ?? 'this product'}.`

  // Listen for cross-component selection (Catalogue rows dispatch this)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail
      if (!detail) return
      // Only react if the product has capabilities (otherwise stay on overview)
      const target = products.find((p) => p.id === detail.id)
      if (target?.capabilities) {
        setSelected(detail.id)
      } else {
        setSelected('overview')
      }
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    window.addEventListener('product-select', handler)
    return () => window.removeEventListener('product-select', handler)
  }, [])

  // Hook 1: Entrance + continuous marquees (runs once)
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Heading char-by-char reveal — masked + skewed
        gsap.from('[data-cap-char]', {
          yPercent: 110,
          rotate: -8,
          opacity: 0,
          stagger: 0.022,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '[data-cap-heading]',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        // Eyebrow + sub + tabs fade up
        gsap.from('[data-cap-fade]', {
          y: 28,
          opacity: 0,
          stagger: 0.07,
          duration: 0.85,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        })

        // Marquees — continuous, opposite directions
        gsap.to('[data-marquee-1]', {
          xPercent: -50,
          duration: 38,
          ease: 'none',
          repeat: -1,
        })
        gsap.fromTo(
          '[data-marquee-2]',
          { xPercent: -50 },
          {
            xPercent: 0,
            duration: 44,
            ease: 'none',
            repeat: -1,
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  // Hook 2: Cards animate on entrance + on every filter change
  useGSAP(
    () => {
      gsap.from('[data-cap-card]', {
        y: 44,
        opacity: 0,
        duration: 0.75,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '[data-cap-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Subtle subtitle re-reveal
      gsap.from('[data-cap-sub]', {
        y: 12,
        opacity: 0,
        duration: 0.5,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef, dependencies: [selected], revertOnUpdate: true }
  )

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-32 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Top outline marquee */}
      <div
        className="relative overflow-hidden pointer-events-none mb-24"
        aria-hidden="true"
      >
        <div
          data-marquee-1
          className="flex whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  className="font-barlow font-[900] uppercase mx-8 leading-none tracking-display"
                  style={{
                    fontSize: 'clamp(3rem, 9vw, 8rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1px #2a2a2a',
                  }}
                >
                  What We Build —
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <div data-cap-fade className="mb-6">
          <SectionLabel>
            Capabilities — {String(capabilities.length).padStart(2, '0')}
          </SectionLabel>
        </div>

        {/* Heading with char reveal */}
        <h2
          data-cap-heading
          className="font-barlow font-[900] uppercase text-white leading-[0.92] tracking-display mb-8"
          style={{ fontSize: 'clamp(2.75rem, 10vw, 9rem)' }}
        >
          {HEADING_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {Array.from(line).map((char, charIdx) => {
                const isLastLine = lineIdx === HEADING_LINES.length - 1
                const isFinalChar = isLastLine && charIdx === line.length - 1
                return (
                  <span
                    key={`${lineIdx}-${charIdx}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ paddingBottom: '0.06em' }}
                  >
                    <span
                      data-cap-char
                      className="inline-block will-change-transform"
                      style={{
                        color: isFinalChar ? '#C41E1E' : undefined,
                      }}
                    >
                      {char === ' ' ? ' ' : char}
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </h2>

        {/* Subtitle that reacts to filter */}
        <p
          data-cap-fade
          data-cap-sub
          key={selected}
          className="font-inter text-gray-muted text-lg max-w-[60ch] leading-relaxed mb-14"
        >
          {subtitle}
        </p>

        {/* Filter tabs */}
        <div
          data-cap-fade
          className="mb-16 flex flex-wrap items-center"
          style={{ borderBottom: '1px solid #2a2a2a' }}
        >
          {tabs.map((tab) => {
            const isActive = selected === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelected(tab.id)}
                className={`relative px-5 py-4 font-space text-xs font-semibold uppercase tracking-label transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-muted hover:text-white'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span
                    data-cap-tab-underline
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: '#C41E1E' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
          <span className="ml-auto font-space text-[11px] text-gray-muted uppercase tracking-label hidden sm:inline pr-2">
            {String(capabilities.length).padStart(2, '0')} cards
          </span>
        </div>

        {/* Cards grid */}
        <div
          data-cap-grid
          key={`grid-${selected}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: '#2a2a2a' }}
        >
          {capabilities.map((cap) => (
            <CapabilityCard key={`${selected}-${cap.number}`} capability={cap} />
          ))}
        </div>
      </div>

      {/* Bottom solid marquee */}
      <div
        className="relative overflow-hidden pointer-events-none mt-32"
        aria-hidden="true"
      >
        <div
          data-marquee-2
          className="flex whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  className="font-barlow font-[900] uppercase mx-8 leading-none tracking-display text-red"
                  style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                >
                  For Serious Gyms —
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = ICONS[capability.icon]
  return (
    <article
      data-cap-card
      className="group relative p-8 flex flex-col gap-5 cursor-default overflow-hidden"
      style={{ background: '#1c1c1c' }}
    >
      {/* Hover red border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px #C41E1E' }}
        aria-hidden="true"
      />

      {/* Top row: number + icon */}
      <div className="flex items-start justify-between">
        <span
          className="font-barlow font-[900] text-red leading-none tracking-display"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)' }}
        >
          {capability.number}
        </span>
        <div
          className="w-10 h-10 flex items-center justify-center transition-colors duration-300 group-hover:bg-red/20"
          style={{ background: 'rgba(196,30,30,0.1)' }}
        >
          <Icon size={20} className="text-red" strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-barlow font-[700] text-xl text-white uppercase tracking-tight leading-[1.1]">
        {capability.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-gray-muted text-sm leading-relaxed flex-1">
        {capability.description}
      </p>
    </article>
  )
}
