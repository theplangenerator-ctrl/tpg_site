'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

type NavItem = { label: string; href: string }

type Props = {
  open: boolean
  onClose: () => void
  items: NavItem[]
}

export function MobileNav({ open, onClose, items }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Close on escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[90] md:hidden"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-graphite-500/96 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 bg-graphite-500 text-paper flex flex-col"
          >
            {/* Top bar — mirrors TopFrame */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-paper/10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-signal animate-pulse-signal" />
                <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase">
                  TPG · MENU
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase px-3 py-2 -mr-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                Close ×
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-5 pt-8 pb-10">
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.05,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 py-4 border-b border-paper/10 min-h-[64px]"
                    >
                      <span className="font-mono text-[0.625rem] tracking-[0.22em] text-paper/40 uppercase w-8">
                        0{i + 1}
                      </span>
                      <span className="font-display text-4xl uppercase tracking-editorial leading-none">
                        {item.label}
                      </span>
                      <span className="ml-auto text-signal font-mono text-sm group-active:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer chrome */}
            <div className="px-5 py-5 border-t border-paper/10 flex items-center justify-between font-mono text-[0.625rem] tracking-[0.22em] uppercase text-paper/50">
              <span>v0.1 · EN-IN</span>
              <span className="text-signal animate-pulse-signal">SYS · LIVE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
