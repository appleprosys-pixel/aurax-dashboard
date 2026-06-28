import { motion } from "framer-motion";
import { AGENTS } from "../data/content";
import { SectionHeading, staggerChild, staggerParent, useModal } from "../lib/ui";
import { Icon } from "./Icons";

export default function TopAgents() {
  const { open } = useModal();

  return (
    <section id="agents" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our top performing agents"
          title={
            <>
              Meet the agents{" "}
              <span className="text-gradient">doing the real work.</span>
            </>
          }
          subtitle="Not demos — these are the agents our clients already run in production, every single day."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AGENTS.map((a) => (
            <motion.div
              key={a.id}
              variants={staggerChild}
              onClick={() => open("message", a.name)}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(420px circle at 50% 0%, ${a.accent}22, transparent 60%)`,
                }}
              />

              <div className="relative flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                  style={{
                    background: `${a.accent}1a`,
                    boxShadow: `0 0 30px -8px ${a.accent}`,
                    color: a.accent,
                  }}
                >
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
                  style={{ background: `${a.accent}1f`, color: a.accent }}
                >
                  {a.metric}
                </span>
              </div>

              <h3 className="font-display relative mt-5 text-xl font-semibold text-white">
                {a.name}
              </h3>
              <p className="relative mt-1 text-xs font-medium uppercase tracking-wider text-white/40">
                {a.tag}
              </p>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/55">
                {a.desc}
              </p>

              <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors group-hover:text-white/80">
                Deploy this agent
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}

          {/* CTA tile */}
          <motion.button
            variants={staggerChild}
            onClick={() => open("message", "Custom agent")}
            className="group relative flex flex-col items-start justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/[0.015] p-6 text-left transition-all duration-300 hover:border-violet/40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7c3aed,#22d3ee)] text-white">
              <Icon name="spark" className="h-6 w-6" />
            </span>
            <h3 className="font-display mt-5 text-xl font-semibold text-white">
              Need something else?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Tell us the outcome you want and we&apos;ll build a custom agent for it.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-violet">
              Describe your build
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
