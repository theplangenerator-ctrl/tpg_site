'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
import ContactForm from '@/components/contact/ContactFormLight'
import ContactDetails from '@/components/contact/ContactDetailsLight'
import ContactMap from '@/components/contact/ContactMapLight'

const INTENT_MESSAGES: Record<string, string> = {
  demo: "Hi, I'd like to request a demo of the All_X2 kiosk for my gym.",
  partner: "Hi, I'm interested in joining the TPG network as a partner gym.",
  pricing: "Hi, I'd like to discuss pricing options for the All_X2 kiosk.",
}

const faqs = [
  {
    q: 'How long does installation take?',
    a: 'A standard single-kiosk installation takes one working day — site survey, mounting, cabling, software setup, and member fingerprint enrollment. Installation timelines for multi-kiosk setups are confirmed per project based on kiosk count and site readiness.',
  },
  {
    q: 'Does it work with our existing gym management software?',
    a: 'The kiosk runs as a standalone system and does not require integration with existing GMS. A lightweight cloud dashboard is included, and we have open webhooks for custom integrations on request.',
  },
  {
    q: 'What happens if the fingerprint sensor fails?',
    a: 'Each kiosk ships with a backup sensor and a PIN-based fallback. We provide remote diagnostics and on-site support. Replacement and repair timelines are agreed during onboarding based on your location. The system is designed for under 2 hours recovery time in the event of hardware or network failure.',
  },
  {
    q: 'Can the kiosk run offline?',
    a: 'Yes. Core functionality — fingerprint auth, plan display, set tracking — runs fully offline. Telegram reports and cloud sync queue and dispatch automatically when connectivity is restored.',
  },
  {
    q: 'How is member data protected?',
    a: "Fingerprint data is stored as encrypted templates on-device only — never transmitted to our servers. Member biometric data never leaves the kiosk. Workout data is encrypted in transit and at rest, in compliance with India's DPDP Act 2023. We can provide a full data processing agreement on request.",
  },
]

function FAQItem({ item }: { item: typeof faqs[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-ash">
      <button
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="font-display text-graphite-500 group-hover:text-signal transition-colors duration-200"
          style={{ fontSize: 'clamp(1rem, 2.4vw, 1.25rem)', lineHeight: 1.1 }}
        >
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={20} className="text-signal" strokeWidth={2} />
        </motion.div>
      </button>

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
          <p className="font-body text-graphite-200 text-sm leading-relaxed max-w-[70ch]">
            {item.a}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function ContactFormSection() {
  const searchParams = useSearchParams()
  const intent = searchParams.get('intent') ?? ''
  const defaultMessage = INTENT_MESSAGES[intent] ?? ''
  return <ContactForm defaultMessage={defaultMessage} />
}

export default function ContactPage() {
  const reduceMotion = useReducedMotion()
  const rise = (delay: number) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
        }

  return (
    <>
      <section className="relative pt-40 pb-16 overflow-hidden bg-bone">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(-6deg, transparent, transparent 60px, rgba(215,35,35,0.05) 60px, rgba(215,35,35,0.05) 61px)`,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto page-x">
          <motion.p
            {...rise(0)}
            className="font-mono text-[0.6875rem] text-signal uppercase tracking-[0.22em] font-medium mb-5"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="font-display text-graphite-500 mb-5"
            style={{ fontSize: 'clamp(4.5rem, 16vw, 8rem)' }}
          >
            Let&apos;s Talk.
          </motion.h1>
          <motion.p
            {...rise(0.18)}
            className="font-body text-graphite-200 text-lg leading-relaxed max-w-[55ch]"
          >
            Whether you want a demo, a quote, or just want to know how the kiosk
            works — drop us a message.
          </motion.p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full"
            preserveAspectRatio="none"
            height="60"
          >
            <polygon points="0,45 1440,10 1440,60 0,60" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      <section className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto page-x">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-16 lg:gap-24">
            <div>
              <p className="font-mono text-[0.6875rem] text-signal uppercase tracking-[0.22em] font-medium mb-8">
                Send a Message
              </p>
              <Suspense fallback={<ContactForm />}>
                <ContactFormSection />
              </Suspense>
            </div>

            <div>
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>

      <section className="py-0 bg-paper">
        <div className="max-w-7xl mx-auto page-x pb-16">
          <ContactMap />
        </div>
      </section>

      <section className="py-24 bg-bone">
        <div className="max-w-4xl mx-auto page-x">
          <div className="mb-12">
            <p className="font-mono text-[0.6875rem] text-signal uppercase tracking-[0.22em] font-medium mb-4">
              FAQ
            </p>
            <h2
              className="font-display text-graphite-500"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)' }}
            >
              Common Questions
            </h2>
          </div>

          <div className="border-t border-ash">
            {faqs.map((item) => (
              <FAQItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
