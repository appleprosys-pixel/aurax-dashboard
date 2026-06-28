import { motion } from "framer-motion";
import { TIERS } from "../data/content";
import { Reveal, SectionHeading, useModal } from "../lib/ui";
import { Icon } from "./Icons";

export default function Pricing() {
  const { open } = useModal();

  return (
    <section id="pricing" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              We don&apos;t charge the usual{" "}
              <span className="text-gradient">high fixed prices.</span>
            </>
          }
          subtitle="The price of an automation or agent system depends on the type of infrastructure, quality of build, build time, precision and the work output required. We scope it properly on a call — starting at just ₹499."
        />

        <div className="mx-auto mt-14 grid max-w-3xl items-stretch gap-6 sm:grid-cols-2">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 " +
                  (t.popular
                    ? "border-violet/40 bg-[linear-gradient(165deg,rgba(124,58,237,0.16),rgba(34,211,238,0.06))] glow-violet"
                    : "border-white/8 bg-white/[0.02]")
                }
              >
                {t.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-[linear-gradient(110deg,#7c3aed,#22d3ee)] px-3 py-1 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                )}

                <div
                  className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full opacity-30 blur-3xl"
                  style={{ background: t.accent }}
                />

                <div className="relative">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {t.name}
                  </h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span
                      className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
                      style={{ textShadow: `0 0 30px ${t.accent}55` }}
                    >
                      {t.price}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/40">
                    {t.unit}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    {t.blurb}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ background: `${t.accent}33`, color: t.accent }}
                        >
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-8 pt-2">
                  <button
                    onClick={() => open("call", t.name)}
                    className={
                      "w-full rounded-full px-6 py-3 text-sm font-semibold transition-all " +
                      (t.popular
                        ? "bg-[linear-gradient(110deg,#7c3aed,#6366f1)] text-white shadow-[0_10px_36px_-10px_rgba(124,58,237,0.9)] hover:shadow-[0_12px_46px_-10px_rgba(124,58,237,1)]"
                        : "glass text-white hover:bg-white/10")
                    }
                  >
                    Scope on a build call
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/45">
            Prototype models start at just <span className="text-white/70">₹499</span>.
            Everything else is scoped transparently on your build call — no inflated
            agency rates, ever.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
