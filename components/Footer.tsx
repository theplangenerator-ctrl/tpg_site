import Link from 'next/link'
import { Instagram, Send, Github } from 'lucide-react'

function WhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

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
  { href: '#', label: 'WhatsApp', icon: WhatsApp },
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
                'theplangerator@gmail.com',
                '+918149888054',
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
