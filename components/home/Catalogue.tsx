'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '@/components/shared/SectionLabel'
import { products, type Product } from '@/lib/products'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Catalogue() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Header reveal
        gsap.from('[data-cat-header] [data-reveal]', {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '[data-cat-header]',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        // Per-row reveal
        gsap.utils.toArray<HTMLElement>('[data-cat-row]').forEach((row) => {
          const items = row.querySelectorAll('[data-reveal]')
          gsap.from(items, {
            y: 48,
            opacity: 0,
            duration: 1.0,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })

          // Subtle parallax on the row number as it scrolls past
          const number = row.querySelector('[data-cat-number]')
          if (number) {
            gsap.fromTo(
              number,
              { yPercent: 8 },
              {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              }
            )
          }
        })
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="catalogue"
      className="relative py-32"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          data-cat-header
          className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-8">
            <div data-reveal className="mb-5">
              <SectionLabel>The Catalogue</SectionLabel>
            </div>
            <h2
              data-reveal
              className="font-barlow font-[800] uppercase text-white leading-tight tracking-display"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              Selected
              <br />
              <span className="text-red">Works.</span>
            </h2>
          </div>
          <div
            data-reveal
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <p className="font-inter text-gray-muted leading-relaxed">
              Each product is treated as a project — researched, engineered,
              and shipped on its own terms. The catalogue grows as we ship.
            </p>
            <div className="flex items-center gap-4 mt-2 font-space text-xs uppercase tracking-label">
              <span className="text-white font-semibold">
                {String(
                  products.filter((p) => p.status === 'available').length
                ).padStart(2, '0')}{' '}
                Live
              </span>
              <span
                className="w-px h-3"
                style={{ background: '#2a2a2a' }}
                aria-hidden="true"
              />
              <span className="text-gray-muted">
                {String(products.length).padStart(2, '0')} Total
              </span>
            </div>
          </div>
        </div>

        {/* Index */}
        <div className="border-t" style={{ borderColor: '#2a2a2a' }}>
          {products.map((product) => (
            <CatalogueRow key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CatalogueRow({ product }: { product: Product }) {
  const isAvailable = product.status === 'available'
  const Wrapper: any = isAvailable && product.href ? Link : 'div'
  const wrapperProps =
    isAvailable && product.href
      ? {
          href: product.href,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            window.dispatchEvent(
              new CustomEvent('product-select', {
                detail: { id: product.id },
              })
            )
          },
        }
      : {}

  return (
    <Wrapper
      {...wrapperProps}
      data-cat-row
      className={`group relative grid grid-cols-12 gap-4 sm:gap-8 py-10 sm:py-14 border-b transition-colors duration-300 ${
        isAvailable ? '' : 'pointer-events-none'
      }`}
      style={{ borderColor: '#2a2a2a' }}
    >
      {/* Left rail: number */}
      <div className="col-span-2 sm:col-span-2 flex items-start">
        <span
          data-reveal
          data-cat-number
          className={`font-barlow font-[900] leading-none tracking-display block will-change-transform ${
            isAvailable ? 'text-red' : ''
          }`}
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 5rem)',
            color: isAvailable ? undefined : '#2a2a2a',
          }}
        >
          {product.number}
        </span>
      </div>

      {/* Middle: name + category + tagline */}
      <div className="col-span-10 sm:col-span-7 flex flex-col gap-3 sm:gap-4">
        <div data-reveal>
          <span
            className="font-space text-[11px] uppercase tracking-label font-semibold"
            style={{ color: isAvailable ? '#C41E1E' : '#6b6b6b' }}
          >
            {product.category}
          </span>
        </div>

        <h3
          data-reveal
          className={`font-barlow font-[800] uppercase leading-[0.95] tracking-display transition-colors duration-300 ${
            isAvailable ? 'text-white group-hover:text-red' : ''
          }`}
          style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 4rem)',
            color: isAvailable ? undefined : '#6b6b6b',
          }}
        >
          {product.name}
        </h3>

        <p
          data-reveal
          className="font-inter text-gray-muted leading-relaxed max-w-[60ch]"
          style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}
        >
          {product.tagline}
        </p>

        {isAvailable && product.highlights && (
          <ul data-reveal className="hidden sm:flex flex-wrap gap-x-5 gap-y-1.5 mt-2">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 font-space text-[11px] text-gray-muted uppercase tracking-label"
              >
                <span
                  className="w-1.5 h-1.5"
                  style={{ background: '#C41E1E' }}
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: status + arrow */}
      <div className="hidden sm:flex col-span-3 flex-col items-end justify-between text-right gap-3">
        <div data-reveal>
          {isAvailable ? (
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 font-space text-[10px] font-semibold text-white uppercase tracking-label"
              style={{ background: '#C41E1E' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow"
                aria-hidden="true"
              />
              Available
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 font-space text-[10px] font-semibold text-gray-muted uppercase tracking-label"
              style={{ border: '1px solid #2a2a2a' }}
            >
              Coming Soon
            </span>
          )}
        </div>

        {isAvailable && (
          <div
            data-reveal
            className="flex items-center gap-2 font-space text-xs font-semibold text-white uppercase tracking-label"
          >
            <span>View Case Study</span>
            <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={18} strokeWidth={2} />
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  )
}
