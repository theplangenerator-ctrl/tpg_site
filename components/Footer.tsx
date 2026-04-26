import Link from 'next/link'
import { Instagram, Linkedin, Send, Github } from 'lucide-react'

const productLinks = [
  { href: '/#catalogue', label: 'Catalogue' },
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/contact', label: 'Request Demo' },
]

const companyLinks = [
  { href: '/', label: 'About' },
  { href: '/team', label: 'Team' },
]

const socialLinks = [
  { href: '#', label: 'Instagram', icon: Instagram },
  { href: '#', label: 'LinkedIn', icon: Linkedin },
  { href: '#', label: 'Telegram', icon: Send },
  { href: '#', label: 'GitHub', icon: Github },
]

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: '#0a0a0a', borderColor: '#2a2a2a' }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-0.5">
              <span className="font-barlow font-[800] text-2xl text-white">TPG</span>
              <span className="font-barlow font-[800] text-2xl text-red">FITNESS</span>
            </Link>
            <p className="font-inter text-sm text-gray-muted leading-relaxed max-w-[20ch]">
              The Gym That Knows You
            </p>
            <div className="flex items-center gap-4 mt-1">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-muted hover:text-red transition-colors duration-200"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h3 className="font-space text-xs text-white font-semibold uppercase tracking-label mb-6">
              Product
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-gray-muted hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="font-space text-xs text-white font-semibold uppercase tracking-label mb-6">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-gray-muted hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-space text-xs text-white font-semibold uppercase tracking-label mb-6">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                'hello@tpgfitness.com',
                '+1 (555) 000-0000',
                '@TPGFitnessSupport',
              ].map((item) => (
                <li key={item}>
                  <span className="font-inter text-sm text-gray-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: '#2a2a2a' }}
        >
          <p className="font-inter text-xs text-gray-muted">
            © 2025 TPG Fitness. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-inter text-xs text-gray-muted hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="font-inter text-xs text-gray-muted hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
