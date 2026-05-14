'use client'

type Props = { className?: string }

/**
 * TMW Device — compact wearable (AirPods-case-meets-fitness-AI form).
 * 400 x 280 viewBox.
 */
export function TMWSilhouette({ className }: Props) {
  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label="TMW Device">
      <defs>
        <linearGradient id="tmwBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#252523" />
          <stop offset="50%" stopColor="#161614" />
          <stop offset="100%" stopColor="#0B0B0A" />
        </linearGradient>
        <radialGradient id="tmwGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#D72323" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D72323" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft floor shadow */}
      <ellipse cx="200" cy="240" rx="120" ry="8" fill="#0B0B0A" opacity="0.18" />

      {/* Body — pebble form */}
      <g>
        <rect x="100" y="90" width="200" height="120" rx="60" fill="url(#tmwBody)" />
        {/* Seam (hinge line) */}
        <line x1="100" y1="150" x2="300" y2="150" stroke="#3F3F3C" strokeWidth="0.5" />
        {/* Top highlight */}
        <rect x="100" y="90" width="200" height="6" rx="3" fill="#3F3F3C" opacity="0.5" />
        {/* Status LED */}
        <circle cx="200" cy="115" r="14" fill="url(#tmwGlow)" />
        <circle cx="200" cy="115" r="3.5" fill="#D72323" />
        {/* Etched brand */}
        <text
          x="200"
          y="190"
          textAnchor="middle"
          fill="#3F3F3C"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          letterSpacing="3"
        >
          TMW · 01
        </text>
        {/* Magnetic dock dots */}
        <circle cx="140" cy="170" r="1.5" fill="#3F3F3C" />
        <circle cx="260" cy="170" r="1.5" fill="#3F3F3C" />
      </g>
    </svg>
  )
}
