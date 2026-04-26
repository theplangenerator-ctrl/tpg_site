import type { Metadata } from 'next'
import TeamGrid from '@/components/team/TeamGrid'
import RedAccentLine from '@/components/shared/RedAccentLine'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the engineers and fitness obsessives behind the TPG Fitness kiosk.',
  openGraph: {
    title: 'Team | TPG Fitness',
    description: 'The people who built the kiosk.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function TeamPage() {
  return (
    <>
      {/* Page hero strip */}
      <section
        className="relative pt-40 pb-20 overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Brush texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -6deg,
              transparent,
              transparent 60px,
              rgba(196, 30, 30, 0.04) 60px,
              rgba(196, 30, 30, 0.04) 61px
            )`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <p className="font-space text-xs text-red uppercase tracking-label font-semibold mb-5">
            Meet the Team
          </p>

          <RedAccentLine width={200} delay={0.2} className="mb-8" />

          <h1
            className="font-barlow font-[900] uppercase text-white leading-tight tracking-display mb-6"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
          >
            The People Behind<br />the Kiosk
          </h1>
          <p className="font-inter text-gray-muted text-lg leading-relaxed max-w-[55ch]">
            A small team of engineers and fitness obsessives who believe every
            gym member deserves a personalised experience.
          </p>
        </div>

        {/* Bottom diagonal */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none" height="60">
            <polygon points="0,45 1440,10 1440,60 0,60" fill="#0a0a0a" />
          </svg>
        </div>
      </section>

      <TeamGrid />
    </>
  )
}
