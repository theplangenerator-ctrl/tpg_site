'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Github } from 'lucide-react'

interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
  image?: string
  linkedin?: string
  github?: string
}

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.article
      className="flex flex-col"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Image area — actual photo if provided, otherwise styled initials placeholder */}
      <div
        className="aspect-square relative overflow-hidden"
        style={{
          background: '#1c1c1c',
          backgroundImage: member.image
            ? undefined
            : 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.02) 12px, rgba(255,255,255,0.02) 13px)',
          borderTop: '2px solid #C41E1E',
        }}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            {/* Large initials placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-barlow font-[900] uppercase select-none"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  color: 'rgba(196, 30, 30, 0.12)',
                  letterSpacing: '-0.02em',
                }}
                aria-hidden="true"
              >
                {member.initials}
              </span>
            </div>

            {/* Corner accent */}
            <div
              className="absolute bottom-0 right-0 w-12 h-12"
              style={{
                background:
                  'linear-gradient(135deg, transparent 50%, rgba(196,30,30,0.15) 50%)',
              }}
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* Info */}
      <div className="pt-5 flex flex-col gap-2">
        <div>
          <h3 className="font-barlow font-[700] text-white uppercase tracking-tight text-xl">
            {member.name}
          </h3>
          <p className="font-space text-red text-xs uppercase tracking-label font-semibold mt-0.5">
            {member.role}
          </p>
        </div>

        <p className="font-inter text-gray-muted text-sm leading-relaxed">
          {member.bio}
        </p>

        {/* Social icons */}
        {(member.linkedin || member.github) && (
          <div className="flex items-center gap-3 mt-1">
            {member.linkedin && (
              <a
                href={member.linkedin}
                aria-label={`${member.name} on LinkedIn`}
                className="text-gray-muted hover:text-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                aria-label={`${member.name} on GitHub`}
                className="text-gray-muted hover:text-red transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
