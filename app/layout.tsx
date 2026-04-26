import type { Metadata } from 'next'
import { Barlow_Condensed, Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'
import ScrollProgress from '@/components/shared/ScrollProgress'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TPG Fitness — The Gym That Knows You',
    template: '%s | TPG Fitness',
  },
  description:
    'AI-powered gym kiosk systems with fingerprint auth, personalised workout plans, real-time muscle activation tracking, and Telegram progress reports. Built for serious gyms.',
  openGraph: {
    title: 'TPG Fitness — The Gym That Knows You',
    description:
      'AI-powered gym kiosk systems. Fingerprint auth, AI workout plans, real-time muscle tracking, Telegram progress bot.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TPG Fitness — The Gym That Knows You',
    description: 'AI-powered gym kiosk systems for serious gyms.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${inter.variable} ${space.variable}`}
    >
      <body>
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
