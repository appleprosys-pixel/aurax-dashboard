/**
 * Aurora background — replaces stock photography with a fast, cohesive
 * visual identity (the "Aura" in Aurax). Pure CSS: drifting gradient orbs,
 * a faded grid, film grain and a vignette. No images, no canvas = not laggy.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* faded grid */}
      <div
        className="grid-bg absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />

      {/* aurora orbs */}
      <div
        className="absolute -left-[20%] top-[-15%] h-[70vmax] w-[70vmax] animate-drift-a rounded-full opacity-50 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.6), transparent 60%)",
        }}
      />
      <div
        className="absolute -right-[15%] top-[10%] h-[55vmax] w-[55vmax] animate-drift-b rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,211,238,0.55), transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[60vmax] w-[60vmax] animate-drift-c rounded-full opacity-35 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(236,72,153,0.5), transparent 60%)",
        }}
      />

      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette + bottom fade for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 30%, transparent 40%, rgba(5,6,11,0.7) 100%)",
        }}
      />
    </div>
  );
}
