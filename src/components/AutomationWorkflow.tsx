import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icons";
import { Reveal, SectionHeading } from "../lib/ui";

type StepTone = "violet" | "cyan" | "amber" | "pink" | "mint";
type StepKind = "trigger" | "tool" | "ai" | "decision" | "action";

type WorkflowStep = {
  id: string;
  kind: StepKind;
  title: string;
  detail: string;
  meta: string;
  tone: StepTone;
  icon: "mail" | "grid" | "spark" | "compass" | "send" | "shield" | "phone" | "clock" | "calendar";
  x: number;
  y: number;
  width?: number;
};

type Workflow = {
  id: string;
  name: string;
  label: string;
  description: string;
  runTime: string;
  volume: string;
  steps: WorkflowStep[];
};

const workflows: Workflow[] = [
  {
    id: "lead-ops",
    name: "Inbound lead ops",
    label: "Sales",
    description: "Route every serious conversation to the right human before the intent goes cold.",
    runTime: "00:04.28",
    volume: "1,284 runs this week",
    steps: [
      { id: "lead-trigger", kind: "trigger", title: "New lead arrives", detail: "Form · Email · WhatsApp", meta: "TRIGGER", tone: "cyan", icon: "mail", x: 4, y: 9, width: 22 },
      { id: "company", kind: "tool", title: "Look up the company", detail: "HubSpot · Clearbit", meta: "TOOL", tone: "violet", icon: "grid", x: 31, y: 9, width: 22 },
      { id: "score", kind: "ai", title: "Read & score", detail: "Fit + intent + urgency", meta: "AI STEP", tone: "pink", icon: "spark", x: 58, y: 9, width: 22 },
      { id: "decision", kind: "decision", title: "Worth a call?", detail: "Score > 72 · ICP match", meta: "DECISION", tone: "amber", icon: "compass", x: 76, y: 44, width: 20 },
      { id: "rep", kind: "action", title: "Ping the right rep", detail: "Slack DM · owner routing", meta: "ACTION", tone: "mint", icon: "send", x: 35, y: 44, width: 22 },
      { id: "reply", kind: "action", title: "Send a useful reply", detail: "Pricing · FAQ · deck", meta: "ACTION", tone: "cyan", icon: "send", x: 35, y: 75, width: 22 },
      { id: "crm", kind: "tool", title: "Update the CRM", detail: "HubSpot · activity log", meta: "TOOL", tone: "violet", icon: "grid", x: 4, y: 75, width: 22 },
    ],
  },
  {
    id: "support",
    name: "Support command center",
    label: "Customer success",
    description: "Classify, prioritize, and resolve high-signal requests without creating a ticket graveyard.",
    runTime: "00:02.91",
    volume: "842 runs this week",
    steps: [
      { id: "support-trigger", kind: "trigger", title: "Customer writes in", detail: "Inbox · Chat · Voice", meta: "TRIGGER", tone: "cyan", icon: "mail", x: 4, y: 9, width: 22 },
      { id: "context", kind: "tool", title: "Pull customer context", detail: "Plan · health · history", meta: "TOOL", tone: "violet", icon: "shield", x: 31, y: 9, width: 22 },
      { id: "intent", kind: "ai", title: "Detect intent", detail: "Sentiment + topic + SLA", meta: "AI STEP", tone: "pink", icon: "spark", x: 58, y: 9, width: 22 },
      { id: "escalate", kind: "decision", title: "Needs a human?", detail: "SLA risk · churn signal", meta: "DECISION", tone: "amber", icon: "compass", x: 76, y: 44, width: 20 },
      { id: "success", kind: "action", title: "Alert success lead", detail: "Slack · PagerDuty", meta: "ACTION", tone: "mint", icon: "phone", x: 35, y: 44, width: 22 },
      { id: "answer", kind: "action", title: "Draft the answer", detail: "Docs · policy · product", meta: "ACTION", tone: "cyan", icon: "send", x: 35, y: 75, width: 22 },
      { id: "ticket", kind: "tool", title: "Close the loop", detail: "Linear · Intercom", meta: "TOOL", tone: "violet", icon: "grid", x: 4, y: 75, width: 22 },
    ],
  },
  {
    id: "ops",
    name: "Operations heartbeat",
    label: "Back office",
    description: "Keep teams aligned with a quiet layer of checks, reminders, and handoffs running all day.",
    runTime: "00:06.14",
    volume: "2,106 runs this week",
    steps: [
      { id: "ops-trigger", kind: "trigger", title: "A system changes", detail: "Database · Calendar · API", meta: "TRIGGER", tone: "cyan", icon: "clock", x: 4, y: 9, width: 22 },
      { id: "validate", kind: "tool", title: "Validate the record", detail: "Rules · duplicates · owner", meta: "TOOL", tone: "violet", icon: "shield", x: 31, y: 9, width: 22 },
      { id: "summarize", kind: "ai", title: "Summarize impact", detail: "Risk + next best action", meta: "AI STEP", tone: "pink", icon: "spark", x: 58, y: 9, width: 22 },
      { id: "urgent", kind: "decision", title: "Is it urgent?", detail: "Impact > 3 · due < 24h", meta: "DECISION", tone: "amber", icon: "compass", x: 76, y: 44, width: 20 },
      { id: "owner", kind: "action", title: "Assign an owner", detail: "Teams · role · workload", meta: "ACTION", tone: "mint", icon: "send", x: 35, y: 44, width: 22 },
      { id: "reminder", kind: "action", title: "Schedule follow-up", detail: "Calendar · email · task", meta: "ACTION", tone: "cyan", icon: "calendar", x: 35, y: 75, width: 22 },
      { id: "audit", kind: "tool", title: "Write the audit trail", detail: "Notion · database", meta: "TOOL", tone: "violet", icon: "grid", x: 4, y: 75, width: 22 },
    ],
  },
];

const toneStyles: Record<StepTone, { color: string; soft: string; glow: string }> = {
  violet: { color: "#a78bfa", soft: "rgba(167,139,250,.12)", glow: "rgba(124,58,237,.35)" },
  cyan: { color: "#67e8f9", soft: "rgba(34,211,238,.12)", glow: "rgba(34,211,238,.3)" },
  amber: { color: "#fbbf24", soft: "rgba(245,158,11,.13)", glow: "rgba(245,158,11,.3)" },
  pink: { color: "#f9a8d4", soft: "rgba(236,72,153,.13)", glow: "rgba(236,72,153,.28)" },
  mint: { color: "#6ee7b7", soft: "rgba(52,211,153,.12)", glow: "rgba(52,211,153,.3)" },
};

function Connector({ from, to, active }: { from: WorkflowStep; to: WorkflowStep; active: boolean }) {
  const x1 = from.x + (from.width ?? 22);
  const y1 = from.y + 11;
  const x2 = to.x;
  const y2 = to.y + 11;
  const bend = x1 + (x2 - x1) * 0.5;
  const path = `M ${x1} ${y1} H ${bend} V ${y2} H ${x2}`;

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
      <path d={path} fill="none" stroke="rgba(148,163,184,.18)" strokeWidth=".28" vectorEffect="non-scaling-stroke" />
      <motion.path
        d={path}
        fill="none"
        stroke={active ? "url(#workflow-gradient)" : "rgba(148,163,184,.42)"}
        strokeWidth={active ? ".55" : ".32"}
        strokeDasharray={active ? "2 2" : undefined}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <circle cx={x2} cy={y2} r=".75" fill={active ? "#67e8f9" : "#64748b"} />
      <defs>
        <linearGradient id="workflow-gradient" x1="0" x2="1">
          <stop stopColor="#a78bfa" />
          <stop offset=".55" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WorkflowNode({ step, active }: { step: WorkflowStep; active: boolean }) {
  const tone = toneStyles[step.tone];
  return (
    <motion.div
      className="absolute z-10"
      style={{ left: `${step.x}%`, top: `${step.y}%`, width: `${step.width ?? 22}%` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: step.y * 0.002 }}
    >
      <div
        className={`workflow-node group relative min-h-[88px] overflow-hidden rounded-2xl border p-3.5 transition-all duration-300 ${step.kind === "decision" ? "border-dashed" : ""} ${active ? "workflow-node-active" : ""}`}
        style={{ borderColor: `${tone.color}35`, background: `linear-gradient(140deg, ${tone.soft}, rgba(11,14,25,.96) 68%)`, boxShadow: active ? `0 0 32px -12px ${tone.glow}` : undefined }}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: tone.color }}>
            {step.meta}
          </span>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/10" style={{ color: tone.color, background: tone.soft }}>
            <Icon name={step.icon} className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-2 truncate text-[12px] font-semibold tracking-tight text-white/90">{step.title}</p>
        <p className="mt-1 truncate text-[10px] text-white/40">{step.detail}</p>
        <span className="absolute bottom-0 left-0 h-px w-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: tone.color, boxShadow: `0 0 14px ${tone.color}` }} />
      </div>
    </motion.div>
  );
}

export default function AutomationWorkflow() {
  const [selectedId, setSelectedId] = useState(workflows[0].id);
  const [isRunning, setIsRunning] = useState(true);
  const [activeStep, setActiveStep] = useState(2);
  const selected = useMemo(() => workflows.find((workflow) => workflow.id === selectedId) ?? workflows[0], [selectedId]);

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
  ];

  return (
    <section id="workflows" className="relative overflow-hidden px-4 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,.13),transparent_68%)]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The orchestration layer"
          title={<>Your operation, <span className="text-gradient">drawn in motion.</span></>}
          subtitle="We connect the signals, decisions, and actions your team repeats every day — then give every handoff a visible place to land."
        />

        <Reveal delay={0.12} className="mt-14">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0d16]/90 shadow-[0_30px_100px_-40px_rgba(99,102,241,.55)] backdrop-blur-xl">
            <div className="flex flex-col border-b border-white/8 bg-white/[.025] lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                  <Icon name="grid" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Workflow studio</p>
                  <p className="text-sm font-medium text-white/80">Live automation map</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 pb-4 lg:px-6 lg:pb-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/80">
                  <span className={`h-1.5 w-1.5 rounded-full bg-emerald-300 ${isRunning ? "animate-blink" : "opacity-35"}`} />
                  {isRunning ? "Running" : "Paused"}
                </span>
                <button type="button" onClick={() => setIsRunning((value) => !value)} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:border-white/25 hover:text-white/80">
                  {isRunning ? "Pause" : "Resume"}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="border-b border-white/8 bg-black/10 p-4 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center justify-between px-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Playbooks</span>
                  <span className="text-[10px] text-white/25">{workflows.length} active</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {workflows.map((workflow) => {
                    const isSelected = selected.id === workflow.id;
                    return (
                      <button key={workflow.id} type="button" onClick={() => { setSelectedId(workflow.id); setActiveStep(2); }} className={`group relative rounded-2xl border p-3 text-left transition-all duration-200 ${isSelected ? "border-violet-300/25 bg-violet-300/[.09]" : "border-transparent hover:border-white/10 hover:bg-white/[.035]"}`}>
                        {isSelected && <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-violet-300" />}
                        <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${isSelected ? "text-violet-200/80" : "text-white/35"}`}>{workflow.label}</p>
                        <p className={`mt-1 text-sm font-medium ${isSelected ? "text-white" : "text-white/65 group-hover:text-white/85"}`}>{workflow.name}</p>
                        <p className="mt-1 text-[10px] text-white/30">{workflow.volume}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 hidden rounded-2xl border border-white/8 bg-white/[.025] p-3 lg:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">Runtime health</p>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="font-display text-2xl text-white">99.8<span className="text-sm text-white/35">%</span></span>
                    <span className="text-[10px] text-emerald-300/70">+2.4% this month</span>
                  </div>
                  <div className="mt-3 flex h-8 items-end gap-1">
                    {[18, 24, 20, 30, 24, 31, 27, 35, 29, 38, 34, 42, 39, 46, 43, 50, 48, 56].map((height, index) => <span key={index} className="flex-1 rounded-full bg-gradient-to-t from-violet-400/20 to-cyan-300/80" style={{ height: `${height}%`, opacity: index < 2 ? 0.35 : 0.95 }} />)}
                  </div>
                </div>
              </aside>

              <div className="min-w-0 p-4 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div key={selected.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/65">{selected.label} / {selected.name}</p>
                        <p className="mt-1 max-w-lg text-sm leading-relaxed text-white/48">{selected.description}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-[10px] text-white/35">
                    <span className="rounded-full border border-white/8 bg-white/[.03] px-2.5 py-1.5">Last run <span className="text-white/65">just now</span></span>
                    <span className="rounded-full border border-white/8 bg-white/[.03] px-2.5 py-1.5">Avg <span className="text-white/65">{selected.runTime}</span></span>
                  </div>
                </div>

                <div className="workflow-canvas relative min-h-[520px] overflow-hidden rounded-2xl border border-white/8 bg-[#080b13] dot-bg sm:min-h-[550px]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,.12),transparent_24%),radial-gradient(circle_at_80%_65%,rgba(34,211,238,.08),transparent_26%)]" />
                  <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    Canvas / {selected.id}
                  </div>
                  <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/8 bg-white/[.035] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/25">Zoom 78%</div>

                  {connections.map(([fromIndex, toIndex], index) => (
                    <Connector key={`${selected.id}-${index}`} from={selected.steps[fromIndex]} to={selected.steps[toIndex]} active={isRunning && activeStep >= Math.min(index, 5)} />
                  ))}
                  {selected.steps.map((step, index) => <WorkflowNode key={step.id} step={step} active={isRunning && activeStep === index} />)}

                  <div className="absolute bottom-4 left-4 flex items-center gap-3 text-[9px] uppercase tracking-[0.14em] text-white/25">
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Trigger</span>
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-pink-300" />AI step</span>
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />Decision</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[.025] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[["#8b5cf6", "A"], ["#22d3ee", "R"], ["#ec4899", "S"]].map(([color, initial]) => <span key={initial} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0a0d16] text-[10px] font-bold text-white" style={{ background: color }}>{initial}</span>)}
                    </div>
                    <p className="text-xs text-white/45"><span className="text-white/75">3 agents</span> are watching this workflow</p>
                  </div>
                  <button type="button" onClick={() => setActiveStep((step) => (step + 1) % selected.steps.length)} className="inline-flex items-center gap-2 self-start text-xs font-semibold text-cyan-200/80 transition-colors hover:text-cyan-100 sm:self-auto">
                    Inspect next handoff <Icon name="arrow" className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
