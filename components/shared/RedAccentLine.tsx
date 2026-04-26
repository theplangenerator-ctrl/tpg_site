'use client'

import { useEffect, useRef } from 'react'
import { useInView, motion } from 'framer-motion'

interface RedAccentLineProps {
  className?: string
  width?: number | string
  delay?: number
}

export default function RedAccentLine({
  className = '',
  width = 320,
  delay = 0.3,
}: RedAccentLineProps) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const pathLength = 1

  return (
    <svg
      ref={ref}
      width={width}
      height="4"
      viewBox={`0 0 ${width} 4`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="2"
        x2={width}
        y2="2"
        stroke="#C41E1E"
        strokeWidth="2"
        strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay },
          opacity: { duration: 0.2, delay },
        }}
      />
    </svg>
  )
}
