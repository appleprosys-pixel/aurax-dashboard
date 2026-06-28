import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Reveal, useModal } from "../lib/ui";
import { Icon } from "./Icons";

const LOG_LINES = [
  "→ Booking confirmed · Aarav M.",
  "→ Call routed · Vault Pay",
  "→ Lead qualified · Lumen Logistics",
  "→ Follow-up scheduled · 14:30",
  "→ Outbound sent · 42 prospects",
];

function ConsoleMock() {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l + 1) % LOG_LINES.length), 2200);
    return () => clearInterval(id);
  }, []);

  const bars = [38, 62, 28, 80, 54, 70, 44, 90, 36, 66];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative w-full max-w-3xl rounded-2xl p-4 shadow-2xl sm:p-5"
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,rgba(124,58,237,0.4),transparent_40%,rgba(34,211,238,0.3))] opacity-60" />
      <div className="relative">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/45">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-emerald-400" />
            aurax · live operations
          </div>
        </div>

        {/* widgets */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              Operators online
            </p>
            <p className="font-display mt-1 text-xl font-semibold text-white">47</p>
            <div className="mt-2 flex h-8 items-end gap-1">
              {bars.slice(0, 6).map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm bg-[linear-gradient(to_top,#22d3ee,#8b5cf6)]"
                  animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">
              Calls today
            </p>
            <p className="font-display mt-1 text-xl font-semibold text-white">
              1,284
            </p>
            <p className="mt-2 text-[11px] font-medium text-emerald-400">▲ 12%</p>
          </div>

          <div className="col-span-2 rounded-xl bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Voice channel · en / hi
              </p>
              <span className="text-[10px] text-cyan">live</span>
            </div>
            <div className="mt-3 flex h-8 items-center gap-[3px]">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-cyan/70"
                  animate={{ scaleY: [0.2, 1, 0.3, 0.8, 0.2] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                  style={{ height: "100%", transformOrigin: "center" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* queue + log */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white/[0.03] p-3">
            <div className="flex items-center justify-between text-[11px] text-white/50">
              <span>Outbound queue</span>
              <span className="text-white/80">86%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ec4899,#8b5cf6)]"
                initial={{ width: "10%" }}
                animate={{ width: ["10%", "86%", "70%", "86%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          <div className="flex items-center rounded-xl bg-white/[0.03] p-3">
            <Icon name="check" className="mr-2 h-4 w-4 shrink-0 text-emerald-400" />
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="truncate font-mono text-[11px] text-white/70"
            >
              {LOG_LINES[line]}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { open } = useModal();

  return (
    <section id="top" className="relative px-4 pt-32 sm:pt-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-blink" />
            AI Agent Systems &amp; Infrastructure
          </span>
        </Reveal>

        <div className="mt-6 overflow-hidden pb-2">
          <motion.h1
            initial={{ y: "118%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            We don&apos;t sell usual{" "}
            <span className="text-white/55">end-to-end workflows.</span>
            <br />
            We build{" "}
            <span className="text-gradient-shimmer">AI systems &amp; infrastructure.</span>
          </motion.h1>
        </div>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            Not simple n8n workflows. Not copy-paste bots. Aurax ships
            production-grade AI agent systems — voice, outbound and multi-agent
            operators — plus the infrastructure that actually runs them.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Button onClick={() => open("call")}>
              Schedule a build call
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => open("message")}>
              Send a message
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-4 text-xs text-white/40">
            Or{" "}
            <button
              onClick={() => open("message", "custom")}
              className="text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              describe the agent you need →
            </button>
          </p>
        </Reveal>

        <div className="mt-14 w-full">
          <ConsoleMock />
        </div>
      </div>
    </section>
  );
}
