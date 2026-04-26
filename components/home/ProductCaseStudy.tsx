'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Fingerprint, Send } from 'lucide-react'
import SectionLabel from '@/components/shared/SectionLabel'
import type {
  CaseStudyPanel,
  CaseStudyVisualKey,
  Product,
} from '@/lib/products'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ProductCaseStudyProps {
  product: Product
}

export default function ProductCaseStudy({ product }: ProductCaseStudyProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  const caseStudy = product.caseStudy
  const panels = caseStudy?.panels ?? []

  useGSAP(
    () => {
      if (!panels.length) return
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1024px)', () => {
          const track = trackRef.current
          const section = sectionRef.current
          if (!track || !section) return

          const getDistance = () => track.scrollWidth - window.innerWidth

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              id: `case-${product.id}`,
              trigger: section,
              pin: true,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressRef.current) {
                  gsap.set(progressRef.current, { scaleX: self.progress })
                }
                if (counterRef.current) {
                  const current = Math.min(
                    panels.length,
                    Math.floor(self.progress * panels.length) + 1
                  )
                  counterRef.current.textContent = String(current).padStart(
                    2,
                    '0'
                  )
                }
              },
            },
          })

          gsap.utils
            .toArray<HTMLElement>('[data-panel]')
            .forEach((panel) => {
              const items = panel.querySelectorAll('[data-panel-reveal]')
              if (!items.length) return
              gsap.from(items, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'expo.out',
                stagger: 0.08,
                scrollTrigger: {
                  containerAnimation: tween,
                  trigger: panel,
                  start: 'left 70%',
                  toggleActions: 'play none none reverse',
                },
              })
            })
        })

        mm.add('(max-width: 1023px)', () => {
          gsap.utils
            .toArray<HTMLElement>('[data-panel]')
            .forEach((panel) => {
              const items = panel.querySelectorAll('[data-panel-reveal]')
              gsap.from(items, {
                y: 32,
                opacity: 0,
                duration: 0.8,
                ease: 'expo.out',
                stagger: 0.08,
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              })
            })
        })
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef, dependencies: [product.id] }
  )

  if (!caseStudy) return null

  return (
    <section
      ref={sectionRef}
      id={product.id}
      className="relative lg:h-screen overflow-hidden"
      style={{ background: '#141414' }}
    >
      {/* Sticky chapter header — desktop only */}
      <div className="hidden lg:flex absolute top-24 left-0 right-0 z-20 px-6">
        <div className="max-w-7xl mx-auto w-full flex items-end justify-between">
          <div>
            <SectionLabel>{caseStudy.eyebrow}</SectionLabel>
            <h2
              className="font-barlow font-[800] uppercase text-white leading-[0.95] tracking-display mt-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {caseStudy.headline}
            </h2>
          </div>
          <div className="flex items-center gap-4 font-space text-xs uppercase tracking-label">
            <span className="text-white font-semibold">
              <span ref={counterRef}>01</span> /{' '}
              {String(panels.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden px-6 pt-24 pb-12 max-w-7xl mx-auto">
        <SectionLabel>{caseStudy.eyebrow}</SectionLabel>
        <h2
          className="font-barlow font-[800] uppercase text-white leading-[0.95] tracking-display mt-3"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          {caseStudy.headline}
        </h2>
      </div>

      {/* Track — horizontal on desktop, vertical on mobile */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:h-full will-change-transform"
      >
        {panels.map((panel) => (
          <Panel key={panel.number} panel={panel} />
        ))}
      </div>

      {/* Progress bar — desktop only */}
      <div
        className="hidden lg:block absolute bottom-12 left-6 right-6 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div
            className="relative h-px w-full"
            style={{ background: '#2a2a2a' }}
          >
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left will-change-transform"
              style={{ background: '#C41E1E', transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({ panel }: { panel: CaseStudyPanel }) {
  return (
    <article
      data-panel
      className="relative w-full lg:w-screen lg:h-full shrink-0 flex items-center px-6 lg:px-12 py-24 lg:py-0"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div data-panel-reveal className="flex items-baseline gap-5">
            <span
              className="font-barlow font-[900] text-red leading-none tracking-display"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              {panel.number}
            </span>
            <span className="font-space text-xs text-gray-muted uppercase tracking-label font-semibold">
              {panel.label}
            </span>
          </div>

          <h3
            data-panel-reveal
            className="font-barlow font-[800] uppercase text-white leading-[0.95] tracking-display"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
          >
            {panel.title}
          </h3>

          <p
            data-panel-reveal
            className="font-inter text-gray-muted text-base lg:text-lg leading-relaxed max-w-[52ch]"
          >
            {panel.description}
          </p>

          <div data-panel-reveal className="flex items-center gap-3 mt-2">
            <div
              className="w-2 h-2"
              style={{ background: '#C41E1E' }}
              aria-hidden="true"
            />
            <span className="font-space text-xs text-gray-muted uppercase tracking-label">
              {panel.caption}
            </span>
          </div>
        </div>

        <div
          data-panel-reveal
          className="lg:col-span-6 flex items-center justify-center"
        >
          <PanelVisual variant={panel.visual} />
        </div>
      </div>
    </article>
  )
}

function PanelVisual({ variant }: { variant: CaseStudyVisualKey }) {
  const base =
    'w-full max-w-md lg:max-w-lg aspect-square relative flex items-center justify-center overflow-hidden'

  if (variant === 'auth') {
    return (
      <div className={base} style={{ background: '#1c1c1c' }}>
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {[60, 110, 160, 210].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#C41E1E"
              strokeWidth="1"
              opacity={0.15 + i * 0.07}
            />
          ))}
          <circle cx="200" cy="200" r="4" fill="#C41E1E" />
        </svg>
        <Fingerprint
          size={140}
          strokeWidth={1.2}
          className="text-red relative z-10"
        />
        <div className="absolute bottom-5 left-5 flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-red animate-pulse-slow"
            aria-hidden="true"
          />
          <span className="font-space text-[10px] text-gray-muted uppercase tracking-label">
            Match · 0.82s
          </span>
        </div>
        <div className="absolute top-5 right-5 font-space text-[10px] text-gray-muted uppercase tracking-label">
          R307 · 1:1
        </div>
      </div>
    )
  }

  if (variant === 'plan') {
    const exercises = [
      { name: 'Bench Press', sets: '4 × 8', wt: '80 kg', active: true },
      { name: 'Incline DB Press', sets: '3 × 10', wt: '30 kg' },
      { name: 'Shoulder Press', sets: '3 × 12', wt: '50 kg' },
      { name: 'Lateral Raises', sets: '4 × 15', wt: '12 kg' },
    ]
    return (
      <div className={base} style={{ background: '#1c1c1c' }}>
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className="font-space text-[10px] text-gray-muted uppercase tracking-label">
            Push Day · A
          </span>
          <span className="font-space text-[10px] text-red uppercase tracking-label">
            Auto-tuned
          </span>
        </div>
        <div className="w-full px-5">
          {exercises.map((ex) => (
            <div
              key={ex.name}
              className="flex items-center justify-between py-3 border-b"
              style={{
                borderColor: '#2a2a2a',
                background: ex.active ? 'rgba(196,30,30,0.08)' : 'transparent',
              }}
            >
              <div>
                <p
                  className={`font-barlow font-[700] text-sm uppercase tracking-tight ${
                    ex.active ? 'text-white' : 'text-gray-muted'
                  }`}
                >
                  {ex.name}
                </p>
                <p className="font-inter text-[10px] text-gray-muted">
                  {ex.sets}
                </p>
              </div>
              <p
                className={`font-barlow font-[700] text-sm ${
                  ex.active ? 'text-red' : 'text-gray-muted'
                }`}
              >
                {ex.wt}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'track') {
    const muscles = [
      { x: 90, y: 60, w: 40, h: 20, opacity: 0.9 },
      { x: 80, y: 88, w: 25, h: 30, opacity: 0.6 },
      { x: 135, y: 88, w: 25, h: 30, opacity: 0.4 },
      { x: 95, y: 125, w: 30, h: 40, opacity: 0.7 },
      { x: 85, y: 175, w: 25, h: 45, opacity: 0.55 },
      { x: 130, y: 175, w: 25, h: 45, opacity: 0.85 },
    ]
    return (
      <div className={base} style={{ background: '#1c1c1c' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196,30,30,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,30,30,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 220 320"
          className="h-full max-h-80 relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Body muscle activation map"
        >
          <ellipse
            cx="110"
            cy="35"
            rx="25"
            ry="28"
            stroke="#2a2a2a"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M85 62 Q55 85 50 130 Q48 155 60 170 L75 175 L80 230 Q80 265 85 280 L100 280 L105 230 L115 230 L120 280 L135 280 Q140 265 140 230 L145 175 L160 170 Q172 155 170 130 Q165 85 135 62 Z"
            stroke="#2a2a2a"
            strokeWidth="1.5"
            fill="none"
          />
          {muscles.map((m, i) => (
            <rect
              key={i}
              x={m.x}
              y={m.y}
              width={m.w}
              height={m.h}
              rx="3"
              fill={`rgba(196, 30, 30, ${m.opacity})`}
            />
          ))}
        </svg>
        <div className="absolute top-5 left-5 font-space text-[10px] text-gray-muted uppercase tracking-label">
          Front · Live
        </div>
        <div className="absolute bottom-5 right-5 font-space text-[10px] text-red uppercase tracking-label">
          00:47:23
        </div>
      </div>
    )
  }

  // report
  return (
    <div className={base} style={{ background: '#1c1c1c' }}>
      <div className="w-full max-w-[280px] mx-auto px-5 flex flex-col gap-3">
        <div
          className="p-4 flex flex-col gap-3"
          style={{ background: '#0a0a0a', border: '1px solid #2a2a2a' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{ background: '#C41E1E' }}
            >
              <span className="font-barlow font-[800] text-[10px] text-white">
                TPG
              </span>
            </div>
            <div>
              <p className="font-space text-[11px] text-white font-semibold">
                TPG Bot
              </p>
              <p className="font-space text-[9px] text-gray-muted">just now</p>
            </div>
          </div>
          <div
            className="aspect-[4/3] flex items-center justify-center"
            style={{
              background:
                'repeating-linear-gradient(-12deg, transparent, transparent 8px, rgba(196,30,30,0.18) 8px, rgba(196,30,30,0.18) 9px), #141414',
            }}
          >
            <Send size={28} className="text-red" strokeWidth={1.2} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-space text-[10px] text-white">
              Push Day A · 47:23
            </span>
            <span className="font-space text-[10px] text-red font-semibold">
              Streak 12
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-red animate-pulse-slow"
            aria-hidden="true"
          />
          <span className="font-space text-[10px] text-gray-muted uppercase tracking-label">
            Delivered · 0.4s
          </span>
        </div>
      </div>
    </div>
  )
}
