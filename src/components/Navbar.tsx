import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "../data/content";
import { useModal } from "../lib/ui";
import { Icon } from "./Icons";
import { cn } from "../utils/cn";

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span className="absolute inset-0 rounded-xl bg-[linear-gradient(135deg,#7c3aed,#22d3ee)] opacity-90 transition-transform duration-500 group-hover:rotate-180" />
        <span className="absolute inset-[2px] rounded-[10px] bg-ink-950" />
        <span className="relative font-display text-base font-bold text-white">A</span>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        Aurax
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-5",
          scrolled ? "glass-strong shadow-lg shadow-black/30" : "bg-transparent",
        )}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => openModal("message")}
            className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Send a message
          </button>
          <button
            type="button"
            onClick={() => openModal("call")}
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,#7c3aed,#6366f1)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.8)] transition-all hover:shadow-[0_10px_40px_-8px_rgba(124,58,237,0.95)]"
          >
            Schedule a call
            <Icon
              name="arrow"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white md:hidden"
          aria-label="Menu"
        >
          <Icon name={open ? "menu" : "menu"} className="h-5 w-5" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong absolute inset-x-4 top-20 z-50 rounded-2xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    openModal("message");
                  }}
                  className="rounded-xl glass px-4 py-3 text-sm font-semibold text-white"
                >
                  Message
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    openModal("call");
                  }}
                  className="rounded-xl bg-[linear-gradient(110deg,#7c3aed,#6366f1)] px-4 py-3 text-sm font-semibold text-white"
                >
                  Schedule call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
