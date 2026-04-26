interface DiagonalDividerProps {
  topColor?: string
  bottomColor?: string
  direction?: 'left' | 'right'
  height?: number
}

export default function DiagonalDivider({
  topColor = '#0a0a0a',
  bottomColor = '#141414',
  direction = 'right',
  height = 80,
}: DiagonalDividerProps) {
  const points =
    direction === 'right'
      ? `0,0 1440,0 1440,${height} 0,${height * 0.25}`
      : `0,0 1440,0 1440,${height * 0.25} 0,${height}`

  return (
    <div
      className="relative overflow-hidden"
      style={{ height, background: topColor, marginBottom: -1 }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points={points} fill={bottomColor} />
      </svg>
    </div>
  )
}
