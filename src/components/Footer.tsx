import { BRAND, NAV_LINKS } from "../data/content";
import { Icon } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-4 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute inset-0 rounded-xl bg-[linear-gradient(135deg,#7c3aed,#22d3ee)]" />
                <span className="absolute inset-[2px] rounded-[10px] bg-ink-950" />
                <span className="relative font-display text-base font-bold text-white">A</span>
              </span>
              <span className="font-display text-lg font-semibold text-white">Aurax</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              We don&apos;t sell chatbots or simple n8n workflows. We build proper
              AI agent systems and the infrastructure to run them.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg glass text-white/70 transition-colors hover:text-white"
                aria-label="Email"
              >
                <Icon name="mail" className="h-4 w-4" />
              </a>
              <a
                href={`https://instagram.com/${BRAND.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg glass text-white/70 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.9.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-.9.04-1.39.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.8-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.2 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.8.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.2 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.8.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.2-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.8-.28-1.71-.32C15.52 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06zm0 8.15A3.21 3.21 0 1 0 8.79 12 3.21 3.21 0 0 0 12 15.21zm6.29-8.35a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-white">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${BRAND.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  @{BRAND.instagram}
                </a>
              </li>
              <li className="text-white/40">Replies within a few hours</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Aurax. AI agent systems &amp; infrastructure.</p>
          <p>Built for web &amp; mobile.</p>
        </div>
      </div>
    </footer>
  );
}


