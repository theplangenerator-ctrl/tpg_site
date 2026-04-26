interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`font-space text-red text-xs uppercase tracking-label font-semibold ${className}`}
    >
      {children}
    </span>
  )
}
