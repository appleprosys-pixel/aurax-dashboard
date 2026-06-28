const WORDS = [
  "Voice Operators",
  "Multi-Agent Crews",
  "Autonomous Outbound",
  "Custom Endpoints",
  "Production-Grade AI",
  "24/7 Uptime",
  "Agent Infrastructure",
  "Live Telephony",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="mask-fade-x relative overflow-hidden py-2">
      <div className="marquee-track flex w-max items-center gap-3">
        {row.map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
              {w}
            </span>
            <span className="text-white/15">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
