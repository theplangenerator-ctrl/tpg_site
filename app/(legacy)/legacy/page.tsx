import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Catalogue from '@/components/home/Catalogue'
import Capabilities from '@/components/home/Capabilities'
import CaseStudyShowcase from '@/components/home/CaseStudyShowcase'
import StatsBanner from '@/components/home/StatsBanner'
import Testimonials from '@/components/home/Testimonials'
import HomeCTA from '@/components/home/HomeCTA'

export const metadata: Metadata = {
  title: 'TPG Fitness — Intelligent Gym Equipment',
  description:
    'A growing catalogue of intelligent gym equipment for serious facilities. Currently featuring The Smart Kiosk — biometric auth, AI workout plans, real-time muscle tracking, Telegram progress reports.',
  openGraph: {
    title: 'TPG Fitness — Intelligent Gym Equipment',
    description:
      'A catalogue of intelligent gym equipment, engineered for serious facilities. Featuring The Smart Kiosk.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Catalogue />
      <Capabilities />
      <CaseStudyShowcase />
      <StatsBanner />
      <Testimonials />
      <HomeCTA />
    </>
  )
}
