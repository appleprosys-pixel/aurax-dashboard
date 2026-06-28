import { motion } from "framer-motion";
import { SYSTEMS } from "../data/content";
import { SectionHeading, staggerChild, staggerParent, useModal } from "../lib/ui";
import { Icon } from "./Icons";

export default function Systems() {
  const { open } = useModal();

  return (
    <section id="systems" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Six systems"
          title={
            <>
              One stack. <span className="text-gradient">Six ways</span> we run
              your operations.
            </>
          }
          subtitle="Each system is production-grade on its own — and they compose into a single orchestrated operation that runs while you sleep."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SYSTEMS.map((s) => {
            const isCustom = s.custom;
            return (
              <motion.div
                key={s.id}
                variants={staggerChild}
                onClick={isCustom ? () => open("message", "custom") : undefined}
                className={
                  "group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 " +
                  (isCustom
                    ? "cursor-pointer border-white/15 bg-[linear-gradient(160deg,rgba(245,158,11,0.12),rgba(124,58,237,0.08))]"
                    : "border-white/8 bg-white/[0.02] hover:-translate-y-1 hover:border-white/20")
                }
              >
                {/* hover sheen */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at 50% 0%, ${s.accent}22, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                      style={{
                        background: `${s.accent}1a`,
                        boxShadow: `0 0 30px -8px ${s.accent}`,
                        color: s.accent,
                      }}
                    >
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/45">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-xl font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {s.desc}
                  </p>

                  {isCustom ? (
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber">
                      Describe your build
                      <Icon
                        name="arrow"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  ) : (
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors group-hover:text-white/70">
                      Learn more
                      <Icon name="arrow" className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
