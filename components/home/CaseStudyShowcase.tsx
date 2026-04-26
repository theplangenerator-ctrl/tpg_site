'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/shared/SectionLabel'
import ProductCaseStudy from './ProductCaseStudy'
import { products } from '@/lib/products'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CaseStudyShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  const studyTabs = products.filter((p) => p.caseStudy)
  const soonTabs = products.filter((p) => p.status === 'in-development')
  const totalCount = studyTabs.length + soonTabs.length

  const defaultId = studyTabs[0]?.id ?? ''
  const [selected, setSelected] = useState<string>(defaultId)

  // Sync with cross-component product selection (from Catalogue clicks)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail
      if (!detail) return
      const target = products.find((p) => p.id === detail.id)
      if (target?.caseStudy) {
        setSelected(detail.id)
      }
    }
    window.addEventListener('product-select', handler)
    return () => window.removeEventListener('product-select', handler)
  }, [])

  // Header / tab entrance
  useGSAP(
    () => {
      gsap.from('[data-cs-fade]', {
        y: 24,
        opacity: 0,
        stagger: 0.07,
        duration: 0.85,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-cs-header]',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: sectionRef }
  )

  const activeProduct = products.find((p) => p.id === selected)
  if (!activeProduct?.caseStudy) return null

  return (
    <section ref={sectionRef} id="case-studies">
      {/* Tab header — sits in normal flow above the pinned case study */}
      <div
        data-cs-header
        className="relative pt-32 pb-10"
        style={{ background: '#141414' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div data-cs-fade className="mb-5">
            <SectionLabel>
              Deep Dives — {String(totalCount).padStart(2, '0')}
            </SectionLabel>
          </div>

          <div
            data-cs-fade
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
          >
            <h2
              className="font-barlow font-[800] uppercase text-white leading-[0.95] tracking-display"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              Inside Each
              <br />
              <span className="text-red">Product.</span>
            </h2>
            <p className="font-inter text-gray-muted leading-relaxed max-w-[42ch]">
              Pick a product line to walk through its full case study.
              Use the tabs below or click a product in the catalogue.
            </p>
          </div>

          {/* Tabs */}
          <div
            data-cs-fade
            className="flex flex-wrap items-center"
            style={{ borderBottom: '1px solid #2a2a2a' }}
          >
            {studyTabs.map((p) => {
              const isActive = selected === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`relative px-5 py-4 font-space text-xs font-semibold uppercase tracking-label transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-muted hover:text-white'
                  }`}
                >
                  <span className="text-red mr-2">{p.number}</span>
                  {p.name}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: '#C41E1E' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}

            {soonTabs.map((p) => (
              <span
                key={p.id}
                className="relative px-5 py-4 font-space text-xs font-semibold uppercase tracking-label cursor-not-allowed flex items-center gap-2 select-none"
                style={{ color: 'rgba(107,107,107,0.55)' }}
                aria-label={`${p.number} - launching soon`}
              >
                <span style={{ color: 'rgba(196,30,30,0.55)' }}>
                  {p.number}
                </span>
                Launching Soon
                <span
                  className="inline-flex items-center px-1.5 py-0.5 text-[9px] tracking-label"
                  style={{
                    border: '1px solid rgba(196,30,30,0.4)',
                    color: 'rgba(196,30,30,0.7)',
                  }}
                >
                  Soon
                </span>
              </span>
            ))}

            <span className="ml-auto font-space text-[11px] text-gray-muted uppercase tracking-label hidden md:inline pr-2">
              {studyTabs.length} live · {soonTabs.length} upcoming
            </span>
          </div>
        </div>
      </div>

      {/* Active case study — keyed so it remounts cleanly when switching tabs */}
      <ProductCaseStudy key={activeProduct.id} product={activeProduct} />
    </section>
  )
}
