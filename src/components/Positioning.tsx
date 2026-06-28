import { motion } from "framer-motion";
import { NOT_SELLING, WHAT_WE_BUILD } from "../data/content";
import { Reveal, SectionHeading } from "../lib/ui";
import { Icon } from "./Icons";

export default function Positioning() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The difference"
          title={
            <>
              This isn&apos;t a simple workflow.{" "}
              <span className="text-gradient">It&apos;s infrastructure.</span>
            </>
          }
          subtitle="Most agencies hand you a glued-together workflow and call it AI. We design, build and run the full system — the way a real engineering team would."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* don't sell */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.015] p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                What we don&apos;t sell
              </span>
              <ul className="mt-6 space-y-4">
                {NOT_SELLING.map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-white/30">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </span>
                    <span className="text-white/45 line-through decoration-white/20">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
                style={{ background: "#475569" }}
              />
            </div>
          </Reveal>

          {/* what we build */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-violet/30 bg-[linear-gradient(160deg,rgba(124,58,237,0.12),rgba(34,211,238,0.05))] p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                What we build
              </span>
              <ul className="mt-6 space-y-4">
                {WHAT_WE_BUILD.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#22d3ee)] text-white">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium text-white">{t}</span>
                  </motion.li>
                ))}
              </ul>
              <div
                className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "#8b5cf6" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
