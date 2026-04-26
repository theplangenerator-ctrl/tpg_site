import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Github } from 'lucide-react'

function WhatsApp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const details = [
  {
    icon: Mail,
    label: 'General Enquiries',
    value: 'theplangerator@gmail.com',
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
    value: '+918149888054',
    sub: 'Mon–Fri, 9am–6pm',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: '4 Chetan Nagar, Nanded City, Maharashtra, India',
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
  { label: 'WhatsApp', handle: '+918149888054', icon: WhatsApp, href: '#' },
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
