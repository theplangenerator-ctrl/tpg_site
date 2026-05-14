'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import ContactDetails from '@/components/contact/ContactDetails'
import ContactMap from '@/components/contact/ContactMap'

const faqs = [
  {
    q: 'How long does installation take?',
    a: 'A standard single-kiosk installation takes one working day — site survey, mounting, cabling, software setup, and member fingerprint enrollment. Multi-kiosk installs are scheduled over 2–3 days.',
  },
  {
    q: 'Does it work with our existing gym management software?',
    a: 'The kiosk runs as a standalone system and does not require integration with existing GMS. A lightweight cloud dashboard is included, and we have open webhooks for custom integrations on request.',
  },
  {
    q: 'What happens if the fingerprint sensor fails?',
    a: 'Each kiosk ships with a backup sensor and a PIN-based fallback. Our hardware team ships a replacement unit within 48 hours. Downtime has averaged under 2 hours across all deployments.',
  },
  {
    q: 'Can the kiosk run offline?',
    a: 'Yes. Core functionality — fingerprint auth, plan display, set tracking — runs fully offline. Telegram reports and cloud sync queue and dispatch automatically when connectivity is restored.',
  },
  {
    q: 'How is member data protected?',
    a: 'Fingerprint data is stored as encrypted templates on-device only — never transmitted to our servers. Member workout data is encrypted in transit and at rest. We are GDPR-compliant and can provide a full data processing agreement on request.',
  },
]

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b" style={{ borderColor: '#2a2a2a' }}>
      <button
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="font-barlow font-[700] uppercase tracking-tight text-white group-hover:text-red transition-colors duration-200"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
        >
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={20} className="text-red" strokeWidth={2} />
        </motion.div>
      </button>

      {/* Animated height */}
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pb-6">
          <p className="font-inter text-gray-muted text-sm leading-relaxed max-w-[70ch]">
            {item.a}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="relative pt-40 pb-16 overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(-6deg, transparent, transparent 60px, rgba(196,30,30,0.04) 60px, rgba(196,30,30,0.04) 61px)`,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="font-space text-xs text-red uppercase tracking-label font-semibold mb-5">
            Get In Touch
          </p>
          <h1
            className="font-barlow font-[900] uppercase text-white leading-hero tracking-display mb-5"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Let's Talk.
          </h1>
          <p className="font-inter text-gray-muted text-lg leading-relaxed max-w-[55ch]">
            Whether you want a demo, a quote, or just want to know how the kiosk
            works — drop us a message.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none" height="60">
            <polygon points="0,45 1440,10 1440,60 0,60" fill="#141414" />
          </svg>
        </div>
      </section>

      {/* Form + Details split */}
      <section className="py-24" style={{ background: '#141414' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 lg:gap-24">
            {/* Left — Form */}
            <div>
              <p className="font-space text-xs text-red uppercase tracking-label font-semibold mb-8">
                Send a Message
              </p>
              <ContactForm />
            </div>

            {/* Right — Details */}
            <div>
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-0" style={{ background: '#141414' }}>
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <ContactMap />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-space text-xs text-red uppercase tracking-label font-semibold mb-4">
              FAQ
            </p>
            <h2
              className="font-barlow font-[800] uppercase text-white leading-tight tracking-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              Common Questions
            </h2>
          </div>

          <div className="border-t" style={{ borderColor: '#2a2a2a' }}>
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
