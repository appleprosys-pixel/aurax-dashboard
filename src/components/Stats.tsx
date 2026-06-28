import { STATS } from "../data/content";
import { Counter, Reveal } from "../lib/ui";

export default function Stats() {
  return (
    <section className="relative px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full bg-ink-950/60 p-7 text-center backdrop-blur-sm sm:p-9">
                <div className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  <span className="text-gradient-shimmer">
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
                <p className="text-xs text-white/35">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-white/40">
          * 84.4K hours automated monthly across systems — by our operators.
        </p>
      </div>
    </section>
  );
}
