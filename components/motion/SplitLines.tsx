'use client'

import { MaskedReveal } from './MaskedReveal'

type Props = {
  lines: string[]
  className?: string
  lineClassName?: string
  startDelay?: number
  staggerStep?: number
  duration?: number
}

export function SplitLines({
  lines,
  className,
  lineClassName,
  startDelay = 0,
  staggerStep = 0.09,
  duration = 1.1,
}: Props) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className={lineClassName} style={{ display: 'block' }}>
          <MaskedReveal
            delay={startDelay + i * staggerStep}
            duration={duration}
          >
            {line}
          </MaskedReveal>
        </div>
      ))}
    </div>
  )
}
