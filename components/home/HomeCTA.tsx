'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Headline word reveal — stagger via masks
        gsap.from('[data-cta-word]', {
          yPercent: 110,
          duration: 1.0,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        // Eyebrow + sub + CTA reveal
        gsap.from('[data-cta-fade]', {
          y: 24,
          opacity: 0,
          duration: 0.85,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        // Parallax on the diagonal accent
        gsap.fromTo(
          '[data-cta-accent]',
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )

        // Background image — slow upward drift for depth
        gsap.fromTo(
          '[data-cta-bg]',
          { yPercent: -8, scale: 1.06 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  const headline = [
    ['Ready', 'to', 'Upgrade'],
    ['Your', 'Gym?'],
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background image — full-bleed, parallax, dark overlay */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          data-cta-bg
          className="absolute -inset-y-16 inset-x-0 will-change-transform"
        >
          <Image
            src="/images/cta.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        {/* Vignette + dark overlay so the centred CTA copy reads */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.85) 75%, #0a0a0a 100%)',
          }}
        />
      </div>

      {/* Brush-stroke texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -6deg,
            transparent,
            transparent 60px,
            rgba(196, 30, 30, 0.05) 60px,
            rgba(196, 30, 30, 0.05) 61px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Red diagonal accent — parallax */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div data-cta-accent className="will-change-transform">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            className="w-full"
            preserveAspectRatio="none"
            height="80"
          >
            <polygon points="0,0 1440,0 1440,20 0,60" fill="#C41E1E" opacity="0.08" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p
          data-cta-fade
          className="font-space text-red text-xs font-semibold uppercase tracking-label mb-6"
        >
          Take the Next Step
        </p>

        <h2
          className="font-barlow font-[900] uppercase text-white leading-[0.95] tracking-display mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {headline.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((word, wordIdx) => {
                const trailing = wordIdx < line.length - 1 ? ' ' : ''
                return (
                  <span
                    key={`${lineIdx}-${wordIdx}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ paddingBottom: '0.04em' }}
                  >
                    <span
                      data-cta-word
                      className="inline-block will-change-transform"
                    >
                      {word}
                      {trailing}
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </h2>

        <p
          data-cta-fade
          className="font-inter text-gray-muted text-lg leading-relaxed max-w-[60ch] mx-auto mb-10"
        >
          Installation, fingerprint enrollment, Telegram bot setup, and ongoing
          sync to your cloud dashboard — all included.
        </p>

        <div data-cta-fade>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-5 bg-red hover:bg-red-hover font-space font-semibold text-sm text-white uppercase tracking-label transition-colors duration-200"
            style={{ minHeight: '56px' }}
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
