import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Oswald } from 'next/font/google'
import './globals.css'
import { TopFrame } from '@/components/layout/TopFrame'
import { StatusRail } from '@/components/layout/StatusRail'

const display = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TPG — The Gym That Knows You',
    template: '%s · TPG',
  },
  description:
    'Fitness infrastructure for the modern era. An intelligent gym kiosk and a portable AI trainer — your gym, everywhere. Your data follows you.',
  openGraph: {
    title: 'TPG — The Gym That Knows You',
    description: 'Fitness infrastructure for the modern era.',
    type: 'website',
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <TopFrame />
        <StatusRail />
        <main>{children}</main>
      </body>
    </html>
  )
}
