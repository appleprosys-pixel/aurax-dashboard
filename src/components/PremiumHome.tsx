import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AGENTS, BRAND, NOT_SELLING, REVIEWS, SYSTEMS, TIERS, WHAT_WE_BUILD } from "../data/content";
import { Reveal, ScrollProgress, useModal } from "../lib/ui";
import { Icon } from "./Icons";
import Chatbot from "./Chatbot";

const workflowPresets = [
  {
    id: "lead",
    number: "01",
    label: "Revenue system",
    title: "Lead to meeting",
    summary: "Every inbound signal gets read, scored, routed, and followed up before it cools off.",
    steps: [
      ["TRIGGER", "New lead arrives", "Form · Email · WhatsApp", "cyan"],
      ["CONTEXT", "Look up the company", "CRM · Enrichment", "blue"],
      ["AI STEP", "Read & score", "Fit · intent · urgency", "violet"],
      ["DECISION", "Worth a call?", "ICP match > 72", "orange"],
      ["ACTION", "Route + respond", "Rep alert · useful reply", "lime"],
    ],
  },
  {
    id: "support",
    number: "02",
    label: "Customer system",
    title: "Inbox to resolution",
    summary: "The right context, priority, and response appear before a support request becomes a fire.",
    steps: [
      ["TRIGGER", "Customer writes in", "Inbox · Chat · Voice", "cyan"],
      ["CONTEXT", "Pull account history", "Plan · health · SLA", "blue"],
      ["AI STEP", "Detect intent", "Sentiment · topic · risk", "violet"],
      ["DECISION", "Needs a human?", "Churn signal · urgency", "orange"],
      ["ACTION", "Resolve or escalate", "Answer · Slack · Linear", "lime"],
    ],
  },
  {
    id: "ops",
    number: "03",
    label: "Operations system",
    title: "Request to rollout",
    summary: "A quiet control layer turns scattered requests into owned, scheduled, auditable work.",
    steps: [
      ["TRIGGER", "A system changes", "Database · Calendar · API", "cyan"],
      ["CONTEXT", "Validate the record", "Rules · owner · duplicates", "blue"],
      ["AI STEP", "Summarize impact", "Risk · next best action", "violet"],
      ["DECISION", "Is it urgent?", "Impact · due date", "orange"],
      ["ACTION", "Assign + schedule", "Teams · tasks · audit trail", "lime"],
    ],
  },
] as const;

const toneMap = {
  cyan: { line: "#57d9d0", wash: "rgba(87,217,208,.12)" },
  blue: { line: "#7187ff", wash: "rgba(113,135,255,.12)" },
  violet: { line: "#b39bff", wash: "rgba(179,155,255,.14)" },
  orange: { line: "#ff946e", wash: "rgba(255,148,110,.14)" },
  lime: { line: "#d7ff42", wash: "rgba(215,255,66,.12)" },
};

function ArrowMark({ className = "h-4 w-4" }: { className?: string }) {
  return <Icon name="arrow" className={className} />;
}

function LiveOperationsCard() {
  const bars = [28, 44, 35, 62, 50, 78, 58, 86, 72, 94, 67, 88, 56, 80, 65, 91, 74, 98, 82, 92];
  return (
    <div className="ops-card relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#131416] p-5 text-white shadow-[0_35px_90px_-35px_rgba(17,18,20,.65)] sm:p-7">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#d7ff42]/10 blur-3xl" />
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#d7ff42]"><Icon name="grid" className="h-4 w-4" /></span>
          <div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-white/35">Aurax / console</p><p className="mt-0.5 text-sm font-medium text-white/80">Live operations</p></div>
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-[#d7ff42]"><span className="live-dot h-1.5 w-1.5 rounded-full bg-[#d7ff42]" /> All systems nominal</span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[['47', 'operators online'], ['1,284', 'calls today'], ['86%', 'outbound queue']].map(([value, label]) => <div key={label} className="rounded-2xl border border-white/8 bg-white/[.045] p-3.5"><p className="font-display text-2xl tracking-tight text-white sm:text-3xl">{value}</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[.16em] text-white/35">{label}</p></div>)}
      </div>
      <div className="mt-3 rounded-2xl border border-white/8 bg-white/[.035] p-4">
        <div className="flex items-center justify-between"><p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/35">Signal activity / 24h</p><span className="font-mono text-[9px] text-[#57d9d0]">+12.4%</span></div>
        <div className="mt-5 flex h-20 items-end gap-1.5">{bars.map((height, index) => <span key={index} className="ops-bar flex-1 rounded-full bg-gradient-to-t from-[#7187ff] via-[#57d9d0] to-[#d7ff42]" style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }} />)}</div>
        <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[.16em] text-white/25"><span>00:00</span><span>12:00</span><span>Now</span></div>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.035] p-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d7ff42]/15 text-[#d7ff42]"><Icon name="check" className="h-4 w-4" /></span><div className="min-w-0"><p className="truncate text-xs text-white/80">Booking confirmed · Aarav M.</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[.16em] text-white/30">voice operator / 00:04.28</p></div><span className="ml-auto font-mono text-[9px] text-[#d7ff42]">LIVE</span></div>
    </div>
  );
}

function WorkflowCanvas() {
  const [selected, setSelected] = useState<(typeof workflowPresets)[number]>(workflowPresets[0]);
  const [running, setRunning] = useState(true);
  const [active, setActive] = useState(2);
  const activeStep = selected.steps[active % selected.steps.length];

  return (
    <div className="workflow-frame overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f6f1] shadow-[0_30px_80px_-40px_rgba(17,18,20,.3)]">
      <div className="flex flex-col gap-4 border-b border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131416] text-[#d7ff42]"><Icon name="spark" className="h-4 w-4" /></span><div><p className="font-mono text-[9px] uppercase tracking-[.22em] text-black/40">Automation studio</p><p className="mt-1 text-sm font-semibold text-[#131416]">Build the system behind the outcome</p></div></div>
        <div className="flex items-center gap-2"><span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-[.15em] text-black/60"><span className={`h-1.5 w-1.5 rounded-full ${running ? "bg-[#8fba00]" : "bg-black/25"}`} />{running ? "Running" : "Paused"}</span><button type="button" onClick={() => setRunning((value) => !value)} className="rounded-full border border-black/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[.15em] text-black/55 transition hover:border-black/30 hover:text-black">{running ? "Pause" : "Resume"}</button></div>
      </div>
      <div className="grid lg:grid-cols-[230px_1fr]">
        <aside className="border-b border-black/10 p-4 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between px-2"><span className="font-mono text-[9px] uppercase tracking-[.2em] text-black/35">Playbooks</span><span className="font-mono text-[9px] text-black/35">03 active</span></div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">{workflowPresets.map((item) => <button key={item.id} type="button" onClick={() => { setSelected(item); setActive(2); }} className={`workflow-tab relative rounded-2xl border p-3 text-left transition ${selected.id === item.id ? "border-black/10 bg-[#131416] text-white" : "border-transparent hover:border-black/10 hover:bg-black/[.035]"}`}><span className={`font-mono text-[9px] tracking-[.16em] ${selected.id === item.id ? "text-[#d7ff42]" : "text-black/35"}`}>{item.number} / {item.label}</span><span className={`mt-1 block text-sm font-semibold ${selected.id === item.id ? "text-white" : "text-black/75"}`}>{item.title}</span><span className={`mt-2 block text-[10px] leading-relaxed ${selected.id === item.id ? "text-white/45" : "text-black/40"}`}>Custom logic, visible.</span></button>)}</div>
          <div className="mt-5 hidden rounded-2xl bg-[#e8e7df] p-4 lg:block"><p className="font-mono text-[9px] uppercase tracking-[.18em] text-black/35">Current handoff</p><p className="mt-3 text-sm font-semibold text-black/80">{activeStep[1]}</p><p className="mt-1 text-[10px] leading-relaxed text-black/45">{activeStep[2]}</p><button type="button" onClick={() => setActive((value) => value + 1)} className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em] text-black/60 transition hover:text-black">Inspect next <ArrowMark className="h-3 w-3" /></button></div>
        </aside>
        <div className="min-w-0 p-4 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-black/40">{selected.label} / {selected.title}</p><p className="mt-2 max-w-xl text-sm leading-relaxed text-black/55">{selected.summary}</p></div><span className="font-mono text-[9px] uppercase tracking-[.16em] text-black/35">Last run · just now</span></div>
          <div className="workflow-grid mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-[#131416] p-5 sm:p-7"><div className="workflow-grid-inner relative min-w-[690px] py-3 sm:py-6"><div className="workflow-grid-lines" />
            <div className="workflow-connector-track" />
            {selected.steps.map((step, index) => { const tone = toneMap[step[3]]; return <motion.button key={step[1]} type="button" onClick={() => setActive(index)} className={`workflow-node group relative z-10 w-[150px] text-left ${running && active === index ? "is-active" : ""}`} animate={running && active === index ? { y: [0, -4, 0] } : { y: 0 }} transition={{ duration: 2.2, repeat: running && active === index ? Infinity : 0, ease: "easeInOut" }}><span className="block rounded-2xl border p-3.5 transition duration-300 group-hover:-translate-y-1" style={{ borderColor: `${tone.line}55`, background: `linear-gradient(145deg, ${tone.wash}, rgba(255,255,255,.045))`, boxShadow: running && active === index ? `0 0 30px -12px ${tone.line}` : undefined }}><span className="flex items-center justify-between"><span className="font-mono text-[8px] uppercase tracking-[.16em]" style={{ color: tone.line }}>{step[0]}</span><span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.line }} /></span><span className="mt-3 block truncate text-[12px] font-semibold text-white/90">{step[1]}</span><span className="mt-1 block truncate text-[9px] text-white/40">{step[2]}</span></span></motion.button> })}
          </div></div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em] text-black/35"><span className="h-1.5 w-1.5 rounded-full bg-[#57d9d0]" />Trigger <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#b39bff]" />Intelligence <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#d7ff42]" />Action</div><button type="button" onClick={() => setActive((value) => (value + 1) % selected.steps.length)} className="inline-flex items-center gap-2 self-start font-mono text-[9px] uppercase tracking-[.14em] text-black/60 transition hover:text-black sm:self-auto">Play next handoff <ArrowMark className="h-3 w-3" /></button></div>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const { open } = useModal();
  return <header className="site-nav fixed inset-x-0 top-0 z-50"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8"><a href="#top" className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#131416] text-[11px] font-bold text-[#d7ff42]">A</span><span className="font-display text-lg font-semibold tracking-[-.04em] text-[#131416]">Aurax<span className="text-[#6e7f24]">.</span></span></a><nav className="hidden items-center gap-7 md:flex">{[["Systems", "#systems"], ["The work", "#work"], ["Reviews", "#reviews"], ["Pricing", "#pricing"]].map(([label, href]) => <a key={label} href={href} className="nav-link font-mono text-[10px] uppercase tracking-[.16em] text-black/55 transition hover:text-black">{label}</a>)}</nav><div className="flex items-center gap-3"><span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[.15em] text-black/45 lg:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-[#8fba00]" /> Live systems</span><button type="button" onClick={() => open("call")} className="nav-cta inline-flex items-center gap-2 rounded-full bg-[#131416] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2b2d2d]">Start a build <ArrowMark className="h-3.5 w-3.5 text-[#d7ff42]" /></button></div></div></header>;
}

export default function PremiumHome() {
  const { open } = useModal();
  const [activeAgent, setActiveAgent] = useState(0);
  const featured = useMemo(() => REVIEWS.filter((review) => review.featured), []);
  return <>
    <ScrollProgress />
    <Navigation />
    <main id="top">
      <section className="hero-section relative overflow-hidden"><div className="hero-aurora" /><div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-20 lg:pb-28 lg:pt-44"><div className="relative z-10"><Reveal><p className="eyebrow"><span className="eyebrow-mark" /> AI systems & infrastructure / India</p></Reveal><Reveal delay={.06}><h1 className="hero-title mt-7 max-w-3xl">The work behind <em>better work.</em></h1></Reveal><Reveal delay={.12}><p className="hero-copy mt-7 max-w-xl">We don't sell usual end-to-end workflows. We build AI systems & infrastructure that help your team move faster, respond better, and get time back.</p></Reveal><Reveal delay={.18}><div className="mt-9 flex flex-wrap items-center gap-4"><button type="button" onClick={() => open("call")} className="button-primary group">Schedule a build call <ArrowMark className="h-4 w-4 transition group-hover:translate-x-1" /></button><button type="button" onClick={() => open("message")} className="button-text">Describe the problem <ArrowMark className="h-4 w-4" /></button></div></Reveal><Reveal delay={.24}><div className="mt-12 flex max-w-xl items-center gap-5 border-t border-black/10 pt-5"><div className="flex -space-x-2">{[["#131416", "A"], ["#7187ff", "R"], ["#ff946e", "S"]].map(([color, initial]) => <span key={initial} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#eeece6] text-[10px] font-bold text-white" style={{ background: color }}>{initial}</span>)}</div><p className="text-xs leading-relaxed text-black/50"><span className="font-semibold text-black/75">3 operators</span> already watching your next system.</p></div></Reveal></div><Reveal delay={.1} className="relative z-10"><LiveOperationsCard /></Reveal></div><div className="marquee-light border-y border-black/10"><div className="marquee-light-track">{["VOICE OPERATORS", "MULTI-AGENT CREWS", "AUTONOMOUS OUTBOUND", "CUSTOM ENDPOINTS", "PRODUCTION-GRADE AI", "24/7 UPTIME", "VOICE OPERATORS", "MULTI-AGENT CREWS"].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✳</i></span>)}</div></div></section>

      <section className="section-light px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Reveal><p className="eyebrow"><span className="eyebrow-mark" /> The difference</p></Reveal><Reveal delay={.05}><h2 className="section-title mt-6">Not another <span>AI wrapper.</span></h2></Reveal></div><Reveal delay={.1}><p className="section-lede max-w-2xl">Every business has a bottleneck that steals time or keeps growth just out of reach. We find it, design around it, and build the operating layer that gives your team the room to do higher-value work.</p></Reveal></div><div className="mx-auto mt-14 grid max-w-[1200px] gap-4 md:grid-cols-2"><Reveal className="h-full"><div className="contrast-card contrast-muted"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.2em] text-black/35">What we don't sell</span><span className="text-black/25">01—04</span></div><div className="mt-10 space-y-5">{NOT_SELLING.map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-black/8 pb-4 text-sm text-black/48"><span className="font-mono text-[9px] text-black/25">0{index + 1}</span><span>{item}</span></div>)}</div></div></Reveal><Reveal delay={.08} className="h-full"><div className="contrast-card contrast-dark"><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.2em] text-[#d7ff42]">What we build</span><span className="text-white/25">01—04</span></div><div className="mt-10 space-y-5">{WHAT_WE_BUILD.map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-white/10 pb-4 text-sm text-white/85"><span className="font-mono text-[9px] text-[#d7ff42]">0{index + 1}</span><span>{item}</span><Icon name="check" className="ml-auto h-4 w-4 text-[#d7ff42]" /></div>)}</div></div></Reveal></div></section>

      <section id="work" className="section-dark px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1200px]"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Reveal><p className="eyebrow eyebrow-dark"><span className="eyebrow-mark" /> The orchestration layer</p></Reveal><Reveal delay={.05}><h2 className="section-title section-title-dark mt-6">Your operation, <span>drawn in motion.</span></h2></Reveal></div><Reveal delay={.1}><p className="section-lede section-lede-dark max-w-xl">Signals, decisions, and actions your team repeats every day — given a visible place to land, a responsible agent to own, and a system that keeps moving.</p></Reveal></div><Reveal delay={.14} className="mt-14"><WorkflowCanvas /></Reveal></div></section>

      <section id="systems" className="section-light px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1200px]"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Reveal><p className="eyebrow"><span className="eyebrow-mark" /> Six systems / one stack</p></Reveal><Reveal delay={.05}><h2 className="section-title mt-6 max-w-2xl">Built around the <span>way work really happens.</span></h2></Reveal></div><Reveal delay={.1}><p className="section-lede max-w-md md:text-right">Start with the constraint. We bring the right mix of agents, tools, orchestration, and guardrails.</p></Reveal></div><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{SYSTEMS.map((system, index) => <Reveal key={system.id} delay={index * .04}><button type="button" onClick={system.custom ? () => open("message", "custom") : undefined} className="service-card group text-left"><div className="flex items-start justify-between"><span className="font-mono text-[10px] text-black/30">0{index + 1}</span><span className="service-icon" style={{ color: system.accent }}><Icon name={system.icon} className="h-5 w-5" /></span></div><p className="mt-12 font-mono text-[9px] uppercase tracking-[.17em] text-black/40">{system.tag}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em] text-black/85">{system.name}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-black/50">{system.desc}</p><span className="mt-7 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em] text-black/50 transition group-hover:text-black">{system.custom ? "Describe your system" : "Explore the system"}<ArrowMark className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span><span className="service-sweep" style={{ background: system.accent }} /></button></Reveal>)}</div></div></section>

      <section id="agents" className="section-ink px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1200px]"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start"><div><Reveal><p className="eyebrow eyebrow-dark"><span className="eyebrow-mark" /> Agents doing the work</p></Reveal><Reveal delay={.05}><h2 className="section-title section-title-dark mt-6">Not demos. <span>Operators.</span></h2></Reveal><Reveal delay={.1}><p className="section-lede section-lede-dark mt-6 max-w-md">Specialised systems for the work that keeps a business moving — shipped with the context and guardrails to operate in production.</p></Reveal><Reveal delay={.15}><button type="button" onClick={() => open("message", "custom")} className="button-light mt-8">Build something custom <ArrowMark className="h-4 w-4" /></button></Reveal></div><div className="agent-showcase"><div className="agent-tabs">{AGENTS.map((agent, index) => <button type="button" key={agent.id} onClick={() => setActiveAgent(index)} className={`agent-tab ${activeAgent === index ? "is-selected" : ""}`}><span>{String(index + 1).padStart(2, "0")}</span><span>{agent.name.replace(" Automation Agent", "").replace(" Agent", "")}</span></button>)}</div><div className="agent-detail"><div className="flex items-start justify-between gap-6"><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#d7ff42]">{AGENTS[activeAgent].metric}</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] text-white sm:text-5xl">{AGENTS[activeAgent].name}</h3><p className="mt-3 font-mono text-[10px] uppercase tracking-[.14em] text-white/40">{AGENTS[activeAgent].tag}</p></div><span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10" style={{ color: AGENTS[activeAgent].accent }}><Icon name={AGENTS[activeAgent].icon} className="h-6 w-6" /></span></div><p className="mt-12 max-w-lg text-base leading-relaxed text-white/55">{AGENTS[activeAgent].desc}</p><div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-white/30">System status</span><span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-[#d7ff42]"><span className="live-dot h-1.5 w-1.5 rounded-full bg-[#d7ff42]" /> Ready to deploy</span></div></div></div></div></div></section>

      <section id="reviews" className="section-light px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1200px]"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Reveal><p className="eyebrow"><span className="eyebrow-mark" /> Proof from the operators</p></Reveal><Reveal delay={.05}><h2 className="section-title mt-6">Rated <span>4.7 / 5</span> by teams worldwide.</h2></Reveal></div><Reveal delay={.1}><p className="max-w-sm text-sm leading-relaxed text-black/50 md:text-right">From Bangalore to Lagos to Toronto — founders and operators running real systems on Aurax.</p></Reveal></div><div className="mt-14 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">{featured.slice(0, 2).map((review, index) => <Reveal key={review.name} delay={index * .08}><article className={`review-card ${index === 0 ? "review-featured" : ""}`}><div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-black/35">Verified client / 0{index + 1}</span><span className="text-[#f29b57]">★★★★★</span></div><blockquote className="mt-10 max-w-xl font-display text-2xl leading-tight tracking-[-.04em] text-black/80 sm:text-3xl">“{review.text}”</blockquote><div className="mt-10 flex items-center gap-3 border-t border-black/10 pt-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">{review.name.split(" ").map((part) => part[0]).join("")}</span><div><p className="text-sm font-semibold text-black/75">{review.name} {review.flag}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.14em] text-black/35">{review.role} · {review.company}</p></div></div></article></Reveal>)}<Reveal delay={.16}><div className="review-stack grid gap-4 sm:grid-cols-2 lg:col-span-2">{REVIEWS.slice(4, 8).map((review) => <article key={review.name} className="review-small"><span className="font-mono text-[9px] text-black/30">{review.flag} / {review.rating.toFixed(1)}</span><p className="mt-5 text-base leading-relaxed text-black/65">“{review.text}”</p><p className="mt-6 font-mono text-[9px] uppercase tracking-[.14em] text-black/35">{review.name} · {review.company}</p></article>)}</div></Reveal></div></div></section>

      <section id="pricing" className="section-dark px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1200px]"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Reveal><p className="eyebrow eyebrow-dark"><span className="eyebrow-mark" /> Start where the problem is</p></Reveal><Reveal delay={.05}><h2 className="section-title section-title-dark mt-6">No inflated agency rate. <span>Just the right system.</span></h2></Reveal></div><Reveal delay={.1}><p className="section-lede section-lede-dark max-w-xl">Prototype the value fast, or scope a production-grade build around the stack you already have.</p></Reveal></div><div className="mt-14 grid gap-4 md:grid-cols-2">{TIERS.map((tier, index) => <Reveal key={tier.name} delay={index * .08}><div className={`price-card ${tier.popular ? "price-card-featured" : ""}`}><div className="flex items-start justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/35">{tier.unit}</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] text-white">{tier.name}</h3></div>{tier.popular && <span className="rounded-full bg-[#d7ff42] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[.14em] text-[#131416]">Most popular</span>}</div><p className="mt-10 font-display text-5xl font-semibold tracking-[-.06em] text-white">{tier.price}</p><p className="mt-4 max-w-sm text-sm leading-relaxed text-white/45">{tier.blurb}</p><div className="mt-8 space-y-3 border-t border-white/10 pt-6">{tier.features.map((feature) => <div key={feature} className="flex items-center gap-3 text-sm text-white/70"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[#d7ff42]"><Icon name="check" className="h-3 w-3" /></span>{feature}</div>)}</div><button type="button" onClick={() => open("call", tier.name)} className="button-outline-light mt-9 w-full">Scope this build <ArrowMark className="h-4 w-4" /></button></div></Reveal>)}</div></div></section>

      <section id="contact" className="contact-section px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1200px]"><div className="contact-panel"><div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(215,255,66,.2),transparent_55%)]" /><div className="relative max-w-3xl"><Reveal><p className="eyebrow eyebrow-dark"><span className="eyebrow-mark" /> The first move</p></Reveal><Reveal delay={.05}><h2 className="contact-title mt-6">Tell us what keeps <em>stealing time.</em></h2></Reveal><Reveal delay={.1}><p className="mt-7 max-w-xl text-base leading-relaxed text-white/55">You don't need to know what type of agent you need. Tell us the problem. In under 48 hours, we'll come back with the system we'd build around it.</p></Reveal><Reveal delay={.16}><div className="mt-9 flex flex-wrap gap-4"><button type="button" onClick={() => open("call")} className="button-light">Schedule a build call <ArrowMark className="h-4 w-4" /></button><button type="button" onClick={() => open("message")} className="button-outline-light">Send a message <ArrowMark className="h-4 w-4" /></button></div></Reveal></div><div className="relative mt-16 grid gap-4 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:grid-cols-3"><div><span className="block font-mono uppercase tracking-[.16em]">WhatsApp</span><a href="https://wa.me/919123771413" target="_blank" rel="noreferrer" className="mt-2 block text-sm text-white/70 transition hover:text-[#d7ff42]">+91 91237 71413</a></div><div><span className="block font-mono uppercase tracking-[.16em]">Email</span><a href={`mailto:${BRAND.email}`} className="mt-2 block text-sm text-white/70 transition hover:text-[#d7ff42]">{BRAND.email}</a></div><div><span className="block font-mono uppercase tracking-[.16em]">Response</span><span className="mt-2 block text-sm text-white/70">Within a few hours</span></div></div></div></div></section>
    </main>
    <footer className="site-footer bg-[#131416] px-5 py-8 text-white sm:px-8"><div className="mx-auto flex max-w-[1200px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><a href="#top" className="font-display text-lg font-semibold tracking-[-.04em]">Aurax<span className="text-[#d7ff42]">.</span></a><p className="font-mono text-[9px] uppercase tracking-[.16em] text-white/35">AI agent systems & infrastructure / built for web & mobile</p><a href="https://instagram.com/aurax.systems" target="_blank" rel="noreferrer" className="font-mono text-[9px] uppercase tracking-[.16em] text-white/45 transition hover:text-[#d7ff42]">@aurax.systems</a></div></footer>
    <Chatbot />
  </>;
}
