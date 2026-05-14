'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down'
  className?: string
  as?: 'div' | 'span'
}

export function MaskedReveal({
  children,
  delay = 0,
  duration = 1.1,
  direction = 'up',
  className,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const yFrom = direction === 'up' ? '101%' : '-101%'
  const Wrapper = as === 'span' ? motion.span : motion.div

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
    >
      <Wrapper
        initial={{ y: yFrom }}
        animate={inView ? { y: '0%' } : { y: yFrom }}
        transition={{
          duration,
          delay,
          ease: [0.2, 0.8, 0.2, 1],
        }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </Wrapper>
    </span>
  )
}
