import { motion } from "framer-motion";
import { Reveal, SectionHeading, useModal } from "../lib/ui";
import { Icon } from "./Icons";

export default function Contact() {
  const { open } = useModal();

  const options = [
    {
      key: "call",
      icon: "calendar",
      accent: "#8b5cf6",
      kicker: "Book a slot",
      title: "Schedule a build call",
      desc: "Pick a date and time that works, tell us what you want to build, and we'll lock it in — fast, no back-and-forth.",
      bullets: ["Choose your date & time", "Share your build idea", "Get a confirmed appointment"],
      cta: "Book a call",
      glow: "rgba(124,58,237,0.5)",
    },
    {
      key: "message",
      icon: "send",
      accent: "#22d3ee",
      kicker: "Quick question?",
      title: "Send a message",
      desc: "Describe the agent or system you need in your own words. We read every message and reply directly.",
      bullets: ["No forms to fight with", "Describe it your way", "We reply fast"],
      cta: "Send a message",
      glow: "rgba(34,211,238,0.45)",
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Let's build"
          title={
            <>
              Two ways to{" "}
              <span className="text-gradient">start with Aurax.</span>
            </>
          }
          subtitle="Whether you want a quick chat about your idea or a booked call to scope it properly — your move."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {options.map((o, i) => (
            <Reveal key={o.key} delay={i * 0.1} className="h-full">
              <motion.button
                onClick={() => open(o.key as "call" | "message")}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full w-full flex-col items-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-left"
              >
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(500px circle at 50% 0%, ${o.glow}, transparent 55%)`,
                  }}
                />
                <div className="relative flex w-full items-start justify-between">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                    style={{
                      background: `${o.accent}1a`,
                      boxShadow: `0 0 34px -10px ${o.accent}`,
                      color: o.accent,
                    }}
                  >
                    <Icon name={o.icon} className="h-7 w-7" />
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/45">
                    {o.kicker}
                  </span>
                </div>

                <h3 className="font-display relative mt-6 text-2xl font-semibold text-white">
                  {o.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                  {o.desc}
                </p>

                <ul className="relative mt-5 space-y-2">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-white/65">
                      <Icon name="check" className="h-4 w-4 text-emerald-400" />
                      {b}
                    </li>
                  ))}
                </ul>

                <span
                  className="relative mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all"
                  style={{ background: o.accent + "22", color: o.accent }}
                >
                  {o.cta}
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
