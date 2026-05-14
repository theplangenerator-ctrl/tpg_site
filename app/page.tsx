import { BootSequence } from '@/components/cinematic/BootSequence'
import { Hero } from '@/components/cinematic/Hero'
import { Problem } from '@/components/chapters/Problem'
import { Ecosystem } from '@/components/chapters/Ecosystem'
import { KioskShowcase } from '@/components/chapters/KioskShowcase'
import { KioskFilm } from '@/components/chapters/KioskFilm'
import { TMWShowcase } from '@/components/chapters/TMWShowcase'
import { Narrative } from '@/components/chapters/Narrative'
import { Network } from '@/components/chapters/Network'
import { About } from '@/components/chapters/About'
import { FinalCTA } from '@/components/chapters/FinalCTA'

export default function HomePage() {
  return (
    <>
      <BootSequence />
      <Hero />
      <Problem />
      <Ecosystem />
      <KioskShowcase />
      <KioskFilm />
      <TMWShowcase />
      <Narrative />
      <Network />
      <About />
      <FinalCTA />
    </>
  )
}
