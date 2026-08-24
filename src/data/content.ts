// ===== Central content for the Aurax site =====

export const BRAND = {
  name: "Aurax",
  email: "auraxatsite@gmail.com",
  instagram: "aurax.systems",
  // ---- TEST Telegram bot credentials ----
  // Every message + booking on the site lands in your Telegram.
  // These are test creds — rotate them and/or move to env vars for production
  // (see DEPLOY.md). Better still, deploy the included Cloudflare Pages
  // Function so the token never ships to the browser.
  telegramBot: "8633493021:AAGKNk1nwpiD1mjoGv1A1CXurL1ia7FWSNw",
  telegramChat: "6120960593",
};

export const NAV_LINKS = [
  { label: "Systems", href: "#systems" },
  { label: "Agents", href: "#agents" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// ===== The six systems =====
export type System = {
  id: string;
  icon: string;
  name: string;
  tag: string;
  desc: string;
  accent: string;
  custom?: boolean;
};

export const SYSTEMS: System[] = [
  {
    id: "conversational",
    icon: "chat",
    name: "Conversational Agents",
    tag: "Chat & Support",
    desc: "Real-time agents that remember context, reason across your documents, and respond like your sharpest operator — across web, app and chat.",
    accent: "#8b5cf6",
  },
  {
    id: "voice",
    icon: "voice",
    name: "Voice & Telephony",
    tag: "Live Calls",
    desc: "Human-grade voice handling on live inbound and outbound calls — booking, qualifying and routing around the clock with natural interruption.",
    accent: "#22d3ee",
  },
  {
    id: "multi",
    icon: "grid",
    name: "Multi-Agent Operators",
    tag: "End-to-End Ops",
    desc: "Orchestrated crews of specialised agents that hand work to one another and run entire workflows autonomously, with a human only in oversight.",
    accent: "#6366f1",
  },
  {
    id: "outbound",
    icon: "send",
    name: "Autonomous Outbound",
    tag: "Always-On Growth",
    desc: "Always-on outreach that prospects, follows up, qualifies and books meetings — without a human in the loop, ever.",
    accent: "#ec4899",
  },
  {
    id: "strategy",
    icon: "compass",
    name: "Strategy & Consulting",
    tag: "Architecture First",
    desc: "We architect the whole system — model choice, data flow, fail-safes and escalation — before a single line of code ships.",
    accent: "#34d399",
  },
  {
    id: "custom",
    icon: "spark",
    name: "Custom Workflow",
    tag: "Build Your Own",
    desc: "Describe the agent or system you need and we'll scope a custom build around your exact workflow, data and stack.",
    accent: "#f59e0b",
    custom: true,
  },
];

// ===== Top performing agents =====
export type Agent = {
  id: string;
  icon: string;
  name: string;
  tag: string;
  desc: string;
  metric: string;
  accent: string;
};

export const AGENTS: Agent[] = [
  {
    id: "sales",
    icon: "send",
    name: "Sales Automation Agent",
    tag: "Pipeline on autopilot",
    desc: "Qualifies leads, follows up relentlessly and books meetings into your calendar — your pipeline runs itself, day and night.",
    metric: "+38% pipeline",
    accent: "#8b5cf6",
  },
  {
    id: "meta-ads",
    icon: "spark",
    name: "Meta Ads Marketing Agent",
    tag: "Paid social, optimised",
    desc: "Launches, monitors and optimises your Meta ad campaigns continuously, tuning budgets and creatives toward real ROAS.",
    metric: "2.4× ROAS",
    accent: "#ec4899",
  },
  {
    id: "marketing",
    icon: "grid",
    name: "Marketing Automation Agent",
    tag: "One brain, every channel",
    desc: "Orchestrates emails, segmentation, journeys and reporting across every channel from a single, learning system.",
    metric: "5+ channels",
    accent: "#22d3ee",
  },
  {
    id: "receptionist",
    icon: "phone",
    name: "AI Receptionist",
    tag: "Calls · follow-up · booking",
    desc: "Answers every call, handles follow-ups and books appointments around the clock — never misses a lead, even at 2am.",
    metric: "24/7 uptime",
    accent: "#6366f1",
  },
  {
    id: "d2c",
    icon: "chat",
    name: "D2C Commerce Agent",
    tag: "For e-commerce brands",
    desc: "Guides shoppers, answers product questions instantly and recovers abandoned carts for direct-to-consumer brands.",
    metric: "−47% support load",
    accent: "#34d399",
  },
];

// ===== Stats =====
export const STATS = [
  { value: 84.4, decimals: 1, suffix: "K", label: "hours automated monthly", sub: "across all systems" },
  { value: 4.7, decimals: 1, suffix: "/5", label: "average operator rating", sub: "verified clients" },
  { value: 180, decimals: 0, suffix: "+", label: "AI systems in production", sub: "shipping daily" },
  { value: 99.98, decimals: 2, suffix: "%", label: "uptime across deployments", sub: "last 12 months" },
];

// ===== Reviews =====
// Ratings are intentionally varied (3.5 → 5) and ordered so that in the
// rotating dial, every visible frame shows a genuine mix — never all 5s —
// while the overall average sits around 4.6–4.7.
export type Review = {
  name: string;
  role: string;
  company: string;
  flag: string;
  rating: number;
  text: string;
  featured?: boolean;
};

export const REVIEWS: Review[] = [
  // ---- featured (top 4) ----
  {
    name: "Aarav Mehta",
    role: "Head of Operations",
    company: "Logistics company",
    flag: "🇮🇳",
    rating: 4.9,
    text: "The system paid for itself in the first month. Our outbound never sleeps and the pipeline grew without us hiring a single person.",
    featured: true,
  },
  {
    name: "Mariam Al Mansoori",
    role: "Founder",
    company: "Property group",
    flag: "🇦🇪",
    rating: 4.6,
    text: "The voice operator answers customers and books appointments after hours. Our team is calmer and more organised.",
    featured: true,
  },
  {
    name: "Lena Hoffmann",
    role: "Growth Lead",
    company: "Fintech startup",
    flag: "🇩🇪",
    rating: 4.8,
    text: "The voice agents sound genuinely human. We lose fewer enquiries and our calendar fills more reliably.",
    featured: true,
  },
  {
    name: "Dewi Pratama",
    role: "Chief Operating Officer",
    company: "Meris Health",
    flag: "🇮🇩",
    rating: 4.9,
    text: "They understood our workflow before building anything. The system feels made for us, not like another widget.",
    featured: true,
  },
  // ---- dial · row A (14) — varied + interleaved ----
  { name: "Liam Carter", role: "Director", company: "Investment firm", flag: "🇬🇧", rating: 5, text: "Cleanest AI handoff I've seen. Felt like working with a senior team, not a vendor." },
  { name: "Sofia Rossi", role: "Marketing VP", company: "D2C fashion brand", flag: "🇮🇹", rating: 4.5, text: "Our campaigns now run themselves. Bookings are up and I finally got my evenings back." },
  { name: "Chen Wei", role: "CTO", company: "SaaS company", flag: "🇸🇬", rating: 5, text: "They understood our stack on the first call. The custom endpoints just worked from day one." },
  { name: "Omar Haddad", role: "Owner", company: "Property group", flag: "🇦🇪", rating: 4.7, text: "The voice operator books viewings at 2am. I've woken up to a full calendar more than once." },
  { name: "Hannah Berg", role: "Ops Manager", company: "E-commerce store", flag: "🇩🇪", rating: 4.3, text: "Reliable, fast, and genuinely intelligent. Support tickets dropped noticeably within weeks." },
  { name: "Marcus Bell", role: "CEO", company: "B2B agency", flag: "🇨🇦", rating: 5, text: "Not a chatbot — a workforce. The multi-agent crew handles intake to close without me." },
  { name: "Fatima Zahra", role: "Founder", company: "Design studio", flag: "🇫🇷", rating: 3.5, text: "Beautiful build quality, but the first iteration needed a couple of rounds to nail our tone." },
  { name: "Rahul Verma", role: "Product Lead", company: "Quick-commerce", flag: "🇮🇳", rating: 4.8, text: "Outbound that actually converts. We tripled qualified meetings in a quarter." },
  { name: "Emma Johansson", role: "COO", company: "SaaS startup", flag: "🇸🇪", rating: 5, text: "The fail-safes alone are worth it. Nothing slips through the cracks anymore." },
  { name: "Diego Martins", role: "Growth", company: "App startup", flag: "🇧🇷", rating: 4.3, text: "Felt like the agent knew our customers personally. Conversion went up nicely." },
  { name: "Grace Mwangi", role: "Director", company: "Health clinic", flag: "🇰🇪", rating: 4.5, text: "Patient scheduling finally runs itself. Our staff can focus on care, not phones." },
  { name: "Tomás Rivera", role: "Founder", company: "SaaS company", flag: "🇲🇽", rating: 4.2, text: "From idea to production in days, and the quality was solid. Great value." },
  { name: "Ananya Gupta", role: "CMO", company: "D2C skincare brand", flag: "🇮🇳", rating: 5, text: "They get branding. The agent sounds exactly like our brand, not a robot." },
  { name: "Lucas Meyer", role: "CTO", company: "Robotics startup", flag: "🇺🇸", rating: 4.6, text: "Rock-solid infrastructure. We pushed it hard and it never buckled." },
  // ---- dial · row B (14) — varied + interleaved ----
  { name: "Yuki Tanaka", role: "Ops", company: "Travel company", flag: "🇯🇵", rating: 4.7, text: "予約対応がすごく楽になりました。ありがとう。" },
  { name: "Nadia van Dijk", role: "Owner", company: "Creative agency", flag: "🇳🇱", rating: 4.4, text: "Goed werk. Ze begrepen meteen wat we nodig hadden." },
  { name: "Kwame Mensah", role: "Founder", company: "Payments startup", flag: "🇬🇭", rating: 5, text: "Our onboarding is now automated end to end. Activation went up." },
  { name: "Isabella Cruz", role: "VP Sales", company: "Cloud company", flag: "🇪🇸", rating: 4.7, text: "El operador consigue reuniones. Sencillo y sólido." },
  { name: "Arjun Reddy", role: "Director", company: "Logistics company", flag: "🇮🇳", rating: 4.0, text: "आवाज़ अच्छी है। थोड़ा समय लगा, पर काम करता है।" },
  { name: "Olivia Brooks", role: "COO", company: "Ed-tech startup", flag: "🇦🇺", rating: 5, text: "Thoughtful, fast, and the documentation was good. Real engineers." },
  { name: "Hassan Ali", role: "CEO", company: "Auto dealership", flag: "🇦🇪", rating: 4.5, text: "الخدمة جيدة جداً وسهّلت علينا الحجوزات." },
  { name: "Mei Lin", role: "Product", company: "Cloud company", flag: "🇨🇳", rating: 4.4, text: "系统很好，数据流也变得清楚多了。" },
  { name: "Samuel Adeyemi", role: "Founder", company: "Food delivery", flag: "🇳🇬", rating: 5, text: "Order support runs 24/7 now. Complaints dropped, reviews went up." },
  { name: "Camille Dubois", role: "Marketing", company: "Beauty brand", flag: "🇨🇦", rating: 4.4, text: "The custom build landed on brief. Felt tailor-made because it was." },
  { name: "Vikram Singh", role: "CTO", company: "Data startup", flag: "🇮🇳", rating: 3.5, text: "Smart model routing, but it took a week of tuning to get the latency where we wanted." },
  { name: "Zoe Adams", role: "Owner", company: "Wellness studio", flag: "🇺🇸", rating: 4.2, text: "Bookings and reminders are automatic now. Works well once it's live." },
  { name: "Kenji Sato", role: "Director", company: "Retail chain", flag: "🇯🇵", rating: 5, text: "Across multiple stores now. Consistent, fast, and the reporting is clean." },
  { name: "Riya Kapoor", role: "Growth", company: "D2C brand", flag: "🇮🇳", rating: 4.8, text: "The Meta ads agent pays for itself. ROAS climbed within the first month." },
];

// ===== Pricing (simplified: Prototype anchor + Custom) =====
export type Tier = {
  name: string;
  price: string;
  unit: string;
  blurb: string;
  features: string[];
  accent: string;
  popular?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Prototype Models",
    price: "₹499",
    unit: "starting at just",
    blurb: "A working prototype of your agent — to prove the value fast.",
    accent: "#8b5cf6",
    popular: true,
    features: [
      "Working prototype of your agent",
      "Trained on your data",
      "Shipped in days",
      "Email support",
    ],
  },
  {
    name: "Custom Agent Systems",
    price: "Custom",
    unit: "scoped on your call",
    blurb: "Production-grade systems built around your exact infrastructure.",
    accent: "#22d3ee",
    features: [
      "Multi-agent, voice & outbound systems",
      "Private endpoints & integrations",
      "Built around your stack",
      "Scoped transparently on the call",
    ],
  },
];

// ===== "We don't sell / What we build" contrast =====
export const NOT_SELLING = [
  "Usual end-to-end workflows",
  "Simple n8n automations",
  "Copy-paste prompt templates",
  "Demos that never reach production",
];

export const WHAT_WE_BUILD = [
  "AI agent systems + infrastructure",
  "Voice, outbound & multi-agent ops",
  "Production-grade & monitored",
  "Architected, fail-safe & reliable",
];
