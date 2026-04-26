'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TeamCard from './TeamCard'

const team = [
  {
    initials: 'AK',
    name: 'Ankit Khamitkar',
    role: 'Founder & CEO',
    bio: 'Started TPG to close the gap between gym tech that demos well and gym tech that survives a Tuesday at 6 PM. Drives product direction, partnerships, and the unreasonable belief that every member deserves a plan that actually fits.',
  },
  {
    initials: 'AD',
    name: 'Atharva Dharmadhikari',
    role: 'Chief of Logistics, Finance & Onboarding',
    bio: 'Turns signed contracts into running kiosks on the gym floor. Owns vendor logistics, finances, and white-glove installation — has zero patience for missed deadlines and a notebook of suppliers everyone else has forgotten.',
  },
  {
    initials: 'AS',
    name: 'Atharva Supe',
    role: 'Chief Technical Officer',
    bio: 'Owns everything that has to keep working when the gym does. Architects the kiosk firmware, the QML UI stack, and the guard rails that catch the bugs that should never reach a member mid-set. Believes in shipping, then fixing the right things.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function TeamGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Team grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={cardVariants}>
              <TeamCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
