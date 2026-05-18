'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MaskedReveal } from '@/components/motion/MaskedReveal'

const TEAM = [
  {
    name: 'Ankit Khamitkar',
    role: 'The Guy Who Makes It Work',
    credential: 'Founder · Electronics & Telecom Engineering · Competitive Powerlifter',
    monogram: 'AK',
    image: '/images/team/ankit.jpg',
  },
  {
    name: 'Atharva Supe',
    role: 'The Guy Who Makes It Work',
    credential: 'Full-Stack & Systems Development',
    monogram: 'AS',
    image: '/images/team/supe.jpg',
  },
  {
    name: 'Atharva Dharmadhikari',
    role: 'The One Who Keeps It Real',
    credential: 'Operations & Finance',
    monogram: 'AD',
    image: '/images/team/d.jpeg',
  },
]

export function About() {
  return (
    <section
      id="team"
      className="relative bg-paper text-graphite-500 py-chapter overflow-hidden"
    >
      <div className="page-x grid-12">
        <div className="col-span-12 md:col-span-3">
          <span className="label-mono block mb-3">08 · About</span>
          <p className="text-sm text-graphite-200 max-w-[28ch]">
            We started this because walking into a gym shouldn’t feel like
            starting from scratch.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-display md:text-hero leading-crush tracking-crush uppercase">
            <div><MaskedReveal>Built by</MaskedReveal></div>
            <div className="opacity-60">
              <MaskedReveal delay={0.12}>athletes,</MaskedReveal>
            </div>
            <div>
              <MaskedReveal delay={0.24}>for gym</MaskedReveal>
            </div>
            <div className="text-signal italic text-hero md:text-mega leading-crush">
              <MaskedReveal delay={0.36}>operators.</MaskedReveal>
            </div>
          </h2>

          <p className="mt-10 max-w-[58ch] text-graphite-200 leading-relaxed">
            Three people who got tired of seeing overcomplicated fitness apps
            that forget you the moment you switch gyms.
          </p>
        </div>
      </div>

      <div className="page-x mt-8 md:mt-20 grid-12 gap-y-8 md:gap-y-0">
        {TEAM.map((p, i) => (
          <motion.figure
            key={p.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.0,
              delay: i * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="col-span-12 md:col-span-4"
          >
            <div className="relative aspect-[4/5] bg-bone border border-graphite-500/15 overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 md:top-3 md:left-3 label-micro text-white mix-blend-difference">
                0{i + 1} · PORTRAIT
              </div>
              <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 label-micro text-signal">
                LIVE
              </div>
            </div>
            <figcaption className="mt-3 md:mt-4">
              <p className="font-display text-xl md:text-2xl uppercase tracking-editorial leading-tight">
                {p.name}
              </p>
              <p className="label-mono mt-1">{p.role}</p>
              <p className="text-[0.8rem] md:text-xs text-graphite-100 mt-1.5 max-w-[36ch] leading-snug">
                {p.credential}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="page-x mt-10 md:mt-24 hairline-t pt-6 flex flex-col md:flex-row md:flex-wrap md:items-baseline md:justify-between gap-3 md:gap-4">
        <span className="font-display text-h1 uppercase tracking-editorial">
          We’re just getting started.
        </span>
        <span className="label-mono text-steel">EST · 2025 · NANDED</span>
      </div>
    </section>
  )
}
