'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/shared/SectionLabel'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const testimonials = [
  {
    quote:
      "We installed two TPG kiosks in January. By March, member retention was up 31%. People actually show up because they know the machine has their plan ready. It's not just a novelty — it's infrastructure.",
    name: 'Marcus Halvorsen',
    role: 'Owner',
    gym: 'Iron Peak Fitness',
  },
  {
    quote:
      "The Telegram reports are the single best thing we've ever added. Members share them. They bring friends in. We've signed 14 new members in two months just from screenshots of the muscle tracking.",
    name: 'Priya Nambiar',
    role: 'Operations Director',
    gym: 'FormFit Studios',
  },
  {
    quote:
      "I was sceptical about the biometrics. Now I can't imagine running without them. Queue time at opening dropped from 8 minutes to under 40 seconds. The kiosk just handles it.",
    name: 'Rafael Guerrero',
    role: 'Founder & Head Coach',
    gym: 'Carga Athletic',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Header reveal
        gsap.from('[data-test-header] [data-reveal]', {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '[data-test-header]',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })

        // Card reveal — staggered
        gsap.from('[data-test-card]', {
          y: 56,
          opacity: 0,
          duration: 0.95,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '[data-test-grid]',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        // Subtle scroll parallax on the giant quote marks
        gsap.utils
          .toArray<HTMLElement>('[data-test-quote-mark]')
          .forEach((mark) => {
            gsap.fromTo(
              mark,
              { yPercent: 12 },
              {
                yPercent: -8,
                ease: 'none',
                scrollTrigger: {
                  trigger: mark.closest('[data-test-card]'),
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              }
            )
          })
      }, sectionRef)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-32"
      style={{ background: '#141414' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div data-test-header className="mb-16">
          <div data-reveal className="mb-4">
            <SectionLabel>From The Field</SectionLabel>
          </div>
          <h2
            data-reveal
            className="font-barlow font-[800] uppercase text-white leading-tight tracking-display"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            What Gym
            <br />
            Owners Say.
          </h2>
        </div>

        {/* Cards */}
        <div
          data-test-grid
          className="grid grid-cols-1 lg:grid-cols-3 gap-px"
          style={{ background: '#2a2a2a' }}
        >
          {testimonials.map((t) => (
            <article
              key={t.name}
              data-test-card
              className="relative flex flex-col gap-6 p-8 overflow-hidden"
              style={{ background: '#1c1c1c' }}
            >
              {/* Stars */}
              <div
                className="flex items-center gap-1"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="#C41E1E"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M7 1L8.545 5.09H12.95L9.5 7.545L10.82 11.5L7 9L3.18 11.5L4.5 7.545L1.05 5.09H5.455L7 1Z" />
                  </svg>
                ))}
              </div>

              {/* Large quote mark */}
              <span
                data-test-quote-mark
                className="font-barlow font-[900] leading-none select-none will-change-transform"
                style={{ fontSize: '5rem', color: '#C41E1E', lineHeight: '0.8' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="font-inter text-white text-sm leading-relaxed flex-1">
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <div className="border-t pt-5" style={{ borderColor: '#2a2a2a' }}>
                <p className="font-space text-sm text-white font-semibold">
                  {t.name}
                </p>
                <p className="font-space text-xs text-red uppercase tracking-label mt-0.5">
                  {t.role}
                </p>
                <p className="font-inter text-xs text-gray-muted mt-1">
                  {t.gym}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
