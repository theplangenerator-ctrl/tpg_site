export default function ContactMap() {
  return (
    <div
      className="w-full aspect-video relative overflow-hidden"
      style={{ background: '#1c1c1c' }}
      aria-label="TPG Fitness headquarters location — 42 Iron District, Tech Park, Dubai, UAE"
    >
      {/* Map placeholder with diagonal texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(42,42,42,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,42,42,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Center pin */}
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
        <div className="relative">
          <div
            className="w-5 h-5 rounded-full bg-red"
            style={{ boxShadow: '0 0 0 4px rgba(196,30,30,0.2), 0 0 0 8px rgba(196,30,30,0.08)' }}
            aria-hidden="true"
          />
        </div>
        <div className="text-center">
          <p className="font-space text-xs text-white uppercase tracking-label font-semibold">
            42 Iron District, Tech Park
          </p>
          <p className="font-inter text-xs text-gray-muted mt-0.5">Dubai, UAE</p>
        </div>
      </div>

      {/* Corner label */}
      <div className="absolute top-4 left-4">
        <span className="font-space text-[9px] text-gray-muted uppercase tracking-label">
          Headquarters
        </span>
      </div>
    </div>
  )
}
