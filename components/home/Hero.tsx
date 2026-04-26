'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Play } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const HEADLINE_LINES = [
  ['The', 'Gym'],
  ['That', 'Knows'],
  ['You.'],
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // 1) Entrance: word-mask reveal + cascading details
        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          delay: 0.15,
        })

        tl.from('[data-hero-eyebrow]', {
          y: 24,
          opacity: 0,
          duration: 0.9,
        })
          .from(
            '[data-hero-word]',
            {
              yPercent: 110,
              duration: 1.0,
              stagger: 0.06,
            },
            '-=0.6'
          )
          .from(
            '[data-hero-sub]',
            { y: 24, opacity: 0, duration: 0.9 },
            '-=0.5'
          )
          .from(
            '[data-hero-cta]',
            { y: 24, opacity: 0, stagger: 0.08, duration: 0.8 },
            '-=0.6'
          )
          .from(
            '[data-hero-meta]',
            { y: 16, opacity: 0, duration: 0.7 },
            '-=0.5'
          )
          .from(
            '[data-hero-accent]',
            { scaleX: 0, duration: 1.4, transformOrigin: 'left center' },
            '-=1.2'
          )

        // 2) Parallax on the entire hero content as user scrolls past it
        gsap.to('[data-hero-parallax]', {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        })

        // 3) Fade hero out slightly on exit
        gsap.to('[data-hero-fade]', {
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center top',
            end: 'bottom top',
            scrub: 0.4,
          },
        })

        // 4) Scroll indicator fades as user scrolls
        gsap.to('[data-hero-scroll]', {
          opacity: 0,
          y: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200',
            scrub: true,
          },
        })

        // 5) Background image — slow parallax (slower than content for depth)
        gsap.to('[data-hero-bg]', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
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
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background image — parallax + dark gradient overlay */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          data-hero-bg
          className="absolute -inset-y-12 inset-x-0 will-change-transform"
        >
          <Image
            src="/images/hero.avif"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>
        {/* Vertical fade so headline reads + bottom blends into next section */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.65) 35%, rgba(10,10,10,0.85) 70%, #0a0a0a 100%)',
          }}
        />
        {/* Left-side fade so the catalogue meta strip stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0) 100%)',
          }}
        />
      </div>

      {/* Brush-stroke texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -6deg,
            transparent,
            transparent 60px,
            rgba(196, 30, 30, 0.06) 60px,
            rgba(196, 30, 30, 0.06) 61px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Animated SVG accent line — upper third */}
      <div
        className="absolute top-[28%] left-0 right-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          data-hero-accent
          className="h-px w-full"
          style={{ background: '#C41E1E', opacity: 0.55 }}
        />
      </div>

      {/* Main content */}
      <div
        data-hero-parallax
        data-hero-fade
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full"
      >
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div data-hero-eyebrow className="mb-6">
            <span className="font-space text-red text-xs font-semibold uppercase tracking-label">
              Intelligent Gym Equipment
            </span>
          </div>

          {/* Headline — each word in a mask */}
          <h1
            className="font-barlow font-[900] uppercase text-white leading-hero tracking-display mb-8"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
          >
            {HEADLINE_LINES.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.map((word, wordIdx) => {
                  const isFinalWord =
                    lineIdx === HEADLINE_LINES.length - 1 &&
                    wordIdx === line.length - 1
                  const trailingSpace = wordIdx < line.length - 1 ? ' ' : ''
                  return (
                    <span
                      key={`${lineIdx}-${wordIdx}`}
                      className="inline-block overflow-hidden align-bottom"
                      style={{ paddingBottom: '0.04em' }}
                    >
                      <span
                        data-hero-word
                        className="inline-block will-change-transform"
                        style={{
                          color: isFinalWord ? '#C41E1E' : undefined,
                        }}
                      >
                        {word}
                        {trailingSpace}
                      </span>
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            data-hero-sub
            className="font-inter text-gray-muted text-lg leading-relaxed max-w-[600px] mb-10"
          >
            A growing catalogue of intelligent equipment for serious gyms.
            Engineered for the way modern members actually train —
            and built to evolve, one product at a time.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              data-hero-cta
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-red hover:bg-red-hover font-space font-semibold text-sm text-white uppercase tracking-label transition-colors duration-200"
            >
              Request a Demo
            </Link>
            <button
              data-hero-cta
              className="inline-flex items-center gap-3 px-8 py-4 border font-space font-semibold text-sm text-white uppercase tracking-label hover:bg-white hover:text-black transition-colors duration-200"
              style={{ borderColor: '#2a2a2a' }}
            >
              <Play size={14} strokeWidth={2} fill="currentColor" />
              Watch the Kiosk
            </button>
          </div>

          {/* Catalogue meta */}
          <div
            data-hero-meta
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-8"
            style={{ borderTop: '1px solid #2a2a2a' }}
          >
            <span className="font-space text-[11px] text-gray-muted uppercase tracking-label">
              The Catalogue
            </span>
            <span
              className="w-px h-3 inline-block"
              style={{ background: '#2a2a2a' }}
              aria-hidden="true"
            />
            <span className="font-space text-[11px] font-semibold text-white uppercase tracking-label">
              01 Available
            </span>
            <span
              className="w-px h-3 inline-block"
              style={{ background: '#2a2a2a' }}
              aria-hidden="true"
            />
            <span className="font-space text-[11px] text-gray-muted uppercase tracking-label">
              More in development
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-space text-[10px] text-gray-muted uppercase tracking-label">
          Scroll
        </span>
        <ChevronDown size={20} className="text-red animate-pulse-slow" strokeWidth={2} />
      </div>

      {/* Bottom diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
