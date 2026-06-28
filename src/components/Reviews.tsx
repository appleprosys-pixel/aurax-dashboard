import { REVIEWS, type Review } from "../data/content";
import { Reveal, SectionHeading, Stars } from "../lib/ui";

const GRADS: [string, string][] = [
  ["#8b5cf6", "#22d3ee"],
  ["#ec4899", "#f59e0b"],
  ["#6366f1", "#ec4899"],
  ["#34d399", "#22d3ee"],
  ["#f59e0b", "#8b5cf6"],
  ["#22d3ee", "#6366f1"],
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function Avatar({ name, i }: { name: string; i: number }) {
  const [a, b] = GRADS[i % GRADS.length];
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      {initials(name)}
    </span>
  );
}

function FeaturedCard({ r, i }: { r: Review; i: number }) {
  return (
    <Reveal delay={i * 0.08} className="h-full">
      <figure className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-25 blur-2xl"
          style={{ background: GRADS[i % GRADS.length][0] }}
        />
        <div className="relative flex items-center gap-3">
          <Avatar name={r.name} i={i} />
          <div>
            <figcaption className="flex items-center gap-1.5 font-semibold text-white">
              {r.name} <span className="text-sm">{r.flag}</span>
            </figcaption>
            <p className="text-xs text-white/45">
              {r.role}, {r.company}
            </p>
          </div>
        </div>
        <Stars rating={r.rating} className="mt-4" />
        <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-white/75">
          “{r.text}”
        </blockquote>
      </figure>
    </Reveal>
  );
}

function MiniCard({ r, i }: { r: Review; i: number }) {
  return (
    <figure className="glass w-[300px] shrink-0 rounded-2xl p-5 sm:w-[340px]">
      <div className="flex items-center gap-3">
        <Avatar name={r.name} i={i} />
        <div className="min-w-0">
          <figcaption className="flex items-center gap-1.5 truncate text-sm font-semibold text-white">
            <span className="truncate">{r.name}</span> <span>{r.flag}</span>
          </figcaption>
          <p className="truncate text-xs text-white/45">
            {r.role} · {r.company}
          </p>
        </div>
      </div>
      <Stars rating={r.rating} className="mt-3" />
      <blockquote className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/65">
        “{r.text}”
      </blockquote>
    </figure>
  );
}

export default function Reviews() {
  const featured = REVIEWS.filter((r) => r.featured);
  const dial = REVIEWS.filter((r) => !r.featured);
  const rowA = dial.slice(0, 14);
  const rowB = dial.slice(14);
  const dupA = [...rowA, ...rowA];
  const dupB = [...rowB, ...rowB];

  return (
    <section id="reviews" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Loved by operators"
          title={
            <>
              Rated <span className="text-gradient">4.7 / 5</span> by teams
              worldwide.
            </>
          }
          subtitle="From Bangalore to Lagos to Toronto — founders and operators running real systems on Aurax."
        />

        {/* rating summary */}
        <Reveal>
          <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl glass px-6 py-4">
            <span className="font-display text-4xl font-bold text-white">4.7</span>
            <div>
              <Stars rating={4.7} size="h-6 w-6" />
              <p className="mt-1 text-xs text-white/45">average across verified clients</p>
            </div>
          </div>
        </Reveal>

        {/* 4 featured */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((r, i) => (
            <FeaturedCard key={r.name} r={r} i={i} />
          ))}
        </div>
      </div>

      {/* rotating dial */}
      <div className="mt-14 space-y-4">
        <p className="mx-auto mb-2 w-fit text-center text-xs uppercase tracking-[0.25em] text-white/35">
          Other reviews
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track flex w-max gap-4">
            {dupA.map((r, i) => (
              <MiniCard key={`a-${i}`} r={r} i={i} />
            ))}
          </div>
        </div>
        <div className="mask-fade-x overflow-hidden">
          <div className="marquee-track-rev flex w-max gap-4">
            {dupB.map((r, i) => (
              <MiniCard key={`b-${i}`} r={r} i={i + 7} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
