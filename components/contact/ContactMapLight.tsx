export default function ContactMapLight() {
  return (
    <div
      className="w-full aspect-video relative overflow-hidden border border-ash bg-paper"
      aria-label="TPG Fitness headquarters — 4 Chetan Nagar, Nanded City, Maharashtra, India"
    >
      <div
        className="absolute inset-0 blueprint"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
        <div className="relative">
          <div
            className="w-5 h-5 rounded-full bg-signal"
            style={{
              boxShadow:
                '0 0 0 4px rgba(215,35,35,0.18), 0 0 0 9px rgba(215,35,35,0.06)',
            }}
            aria-hidden="true"
          />
        </div>
        <div className="text-center">
          <p className="font-mono text-[0.6875rem] text-graphite-500 uppercase tracking-[0.22em] font-medium">
            4 Chetan Nagar, Nanded City
          </p>
          <p className="font-body text-xs text-graphite-100 mt-0.5">
            Maharashtra, India
          </p>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <span className="font-mono text-[0.625rem] text-graphite-100 uppercase tracking-[0.22em]">
          Headquarters
        </span>
      </div>
    </div>
  )
}
