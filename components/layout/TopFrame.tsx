'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'

const NAV = [
  { label: 'System', href: '/#system' },
  { label: 'Kiosk', href: '/#kiosk' },
  { label: 'TMW', href: '/#tmw' },
  { label: 'Network', href: '/#network' },
  { label: 'Team', href: '/#team' },
]

const CONTACT = { label: 'Contact', href: '/contact' }

export function TopFrame() {
  const [time, setTime] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const contactActive = pathname === CONTACT.href

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const utc = d.toISOString().slice(11, 19)
      setTime(utc + ' UTC')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 ${
          menuOpen ? 'text-paper' : 'mix-blend-difference text-paper'
        }`}
      >
        <div className="page-x flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 group min-h-[44px]">
            <span
              aria-hidden
              className="inline-block w-2 h-2 bg-signal rounded-none animate-pulse-signal"
            />
            <span className="font-mono text-[0.625rem] md:text-[0.6875rem] tracking-[0.22em] uppercase">
              TPG / The_Plan-Generator
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase opacity-70 hover:opacity-100 transition-opacity"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
            <span aria-hidden className="hidden lg:inline opacity-70">
              v0.1 · EN-IN
            </span>
            <span className="tabular-nums opacity-70" suppressHydrationWarning>
              {time || '— — : — — : — —'}
            </span>
            <Link
              href={CONTACT.href}
              aria-current={contactActive ? 'page' : undefined}
              className={`mix-blend-normal inline-flex items-center gap-2 h-9 px-4 font-mono text-[0.6875rem] tracking-[0.18em] uppercase font-medium transition-[background-color,transform] duration-200 ease-out active:scale-[0.97] motion-reduce:active:scale-100 ${
                contactActive
                  ? 'bg-graphite-500 text-paper ring-1 ring-signal'
                  : 'bg-signal hover:bg-signal-hot text-paper'
              }`}
            >
              <span
                aria-hidden
                className={`inline-block w-1.5 h-1.5 animate-pulse-signal ${
                  contactActive ? 'bg-signal' : 'bg-paper'
                }`}
              />
              {CONTACT.label}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="md:hidden font-mono text-[0.6875rem] tracking-[0.22em] uppercase px-3 py-2 -mr-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Menu +
          </button>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[...NAV, CONTACT]}
      />
    </>
  )
}
