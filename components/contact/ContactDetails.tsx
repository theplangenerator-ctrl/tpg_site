import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Github } from 'lucide-react'

const details = [
  {
    icon: Mail,
    label: 'General Enquiries',
    value: 'hello@tpgfitness.com',
    sub: null,
  },
  {
    icon: Mail,
    label: 'Demo Requests',
    value: 'demo@tpgfitness.com',
    sub: null,
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (555) 000-0000',
    sub: 'Mon–Fri, 9am–6pm',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: '42 Iron District, Tech Park\nDubai, UAE',
    sub: null,
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '@TPGFitnessSupport',
    sub: 'Fastest response — usually under an hour',
  },
]

const socials = [
  { label: 'Instagram', handle: '@tpgfitness', icon: Instagram, href: '#' },
  { label: 'LinkedIn', handle: 'tpg-fitness', icon: Linkedin, href: '#' },
  { label: 'Telegram', handle: '@TPGFitnessSupport', icon: Send, href: '#' },
  { label: 'GitHub', handle: 'tpg-fitness', icon: Github, href: '#' },
]

export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-0">
      <p className="font-space text-xs text-red uppercase tracking-label font-semibold mb-8">
        Contact Details
      </p>

      {details.map((item, i) => {
        const Icon = item.icon
        return (
          <div key={item.label}>
            <div className="flex items-start gap-4 py-6">
              <div
                className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(196,30,30,0.1)' }}
              >
                <Icon size={16} className="text-red" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-space text-[10px] text-gray-muted uppercase tracking-label font-semibold mb-1">
                  {item.label}
                </p>
                <p className="font-inter text-sm text-white whitespace-pre-line leading-relaxed">
                  {item.value}
                </p>
                {item.sub && (
                  <p className="font-inter text-xs text-gray-muted mt-1">{item.sub}</p>
                )}
              </div>
            </div>
            {i < details.length - 1 && (
              <div className="h-px w-full" style={{ background: '#2a2a2a' }} aria-hidden="true" />
            )}
          </div>
        )
      })}

      {/* Social links */}
      <div className="mt-8 pt-8 border-t" style={{ borderColor: '#2a2a2a' }}>
        <p className="font-space text-[10px] text-gray-muted uppercase tracking-label font-semibold mb-5">
          Follow Us
        </p>
        <div className="flex flex-col gap-3">
          {socials.map(({ label, handle, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label}: ${handle}`}
            >
              <Icon size={16} className="text-gray-muted group-hover:text-red transition-colors duration-200" strokeWidth={1.5} />
              <span className="font-inter text-sm text-gray-muted group-hover:text-white transition-colors duration-200">
                {handle}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Response badge */}
      <div className="mt-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2"
          style={{ background: '#1c1c1c', border: '1px solid #2a2a2a' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red" aria-hidden="true" />
          <span className="font-space text-xs text-gray-muted font-medium">
            Average response: under 24 hours
          </span>
        </div>
      </div>
    </div>
  )
}
