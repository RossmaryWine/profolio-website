// Decorative geometric mark for the hero. Concentric squares, crop marks, and
// a diagonal set drawn over a fine schematic grid that fades toward the edges.
// Purely visual: it carries no information and is hidden from assistive tech.

export function HeroMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern id="hero-mark-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" stroke="currentColor" strokeWidth="1" className="text-ink-faint" />
        </pattern>
        <radialGradient id="hero-mark-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-mark-mask">
          <rect width="420" height="420" fill="url(#hero-mark-fade)" />
        </mask>
      </defs>

      {/* schematic grid, faded at the edges */}
      <rect
        width="420"
        height="420"
        fill="url(#hero-mark-grid)"
        mask="url(#hero-mark-mask)"
        opacity="0.5"
      />

      {/* outer frame */}
      <rect x="60" y="60" width="300" height="300" className="stroke-line-strong" strokeWidth="1" />

      {/* corner crop marks */}
      <g className="stroke-signal" strokeWidth="1.5" strokeLinecap="square">
        <path d="M60 60h24M60 60v24" />
        <path d="M360 60h-24M360 60v24" />
        <path d="M60 360h24M60 360v-24" />
        <path d="M360 360h-24M360 360v-24" />
      </g>

      {/* edge ticks */}
      <g className="stroke-line-strong" strokeWidth="1">
        <path d="M210 50v10M210 360v10M50 210h10M360 210h10" />
      </g>

      {/* inner frame */}
      <rect
        x="120"
        y="120"
        width="180"
        height="180"
        className="stroke-ink-faint"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* pads at the inner frame corners */}
      <g className="stroke-ink-faint" strokeWidth="1" opacity="0.85">
        <rect x="117" y="117" width="6" height="6" />
        <rect x="297" y="117" width="6" height="6" />
        <rect x="117" y="297" width="6" height="6" />
        <rect x="297" y="297" width="6" height="6" />
      </g>

      {/* diagonal set */}
      <g className="stroke-teal" strokeWidth="1" opacity="0.45">
        <path d="M120 240L240 120" />
        <path d="M120 300L300 120" />
        <path d="M180 300L300 180" />
      </g>

      {/* core */}
      <rect x="185" y="185" width="50" height="50" className="stroke-teal" strokeWidth="1" opacity="0.75" />
      <rect x="204" y="204" width="12" height="12" className="fill-signal" />
    </svg>
  );
}
