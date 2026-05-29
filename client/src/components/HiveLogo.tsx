export function HiveLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 32"
      className={className}
      aria-label="LM Tek AI Hive"
      fill="none"
    >
      {/* mark: stacked hex hive cells */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M4 8 L10 4 L16 8 L16 16 L10 20 L4 16 Z" />
        <path d="M16 16 L22 12 L28 16 L28 24 L22 28 L16 24 Z" />
      </g>
      <circle cx="10" cy="12" r="1.5" fill="hsl(var(--hive-cyan))" />
      <circle cx="22" cy="20" r="1.5" fill="hsl(var(--hive-cyan))" />
      {/* wordmark */}
      <text
        x="38"
        y="14"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.18em"
        fill="currentColor"
      >
        LM TEK
      </text>
      <text
        x="38"
        y="26"
        fontFamily="var(--font-sans)"
        fontSize="9"
        fontWeight="500"
        letterSpacing="0.32em"
        fill="hsl(var(--hive-cyan))"
      >
        AI HIVE
      </text>
    </svg>
  );
}
