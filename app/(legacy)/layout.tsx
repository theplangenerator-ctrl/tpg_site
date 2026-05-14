import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'
import ScrollProgress from '@/components/shared/ScrollProgress'

export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionProvider>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </MotionProvider>
  )
}
