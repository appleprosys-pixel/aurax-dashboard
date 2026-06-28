import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  animate,
  type Variants,
} from "framer-motion";
import { cn } from "../utils/cn";

/* =========================================================
   Modal store — any button can open the message / call form
   ========================================================= */
type ModalType = "message" | "call" | null;
type ModalCtx = {
  type: ModalType;
  preset: string;
  open: (t: Exclude<ModalType, null>, preset?: string) => void;
  close: () => void;
};
const Ctx = createContext<ModalCtx | null>(null);

export function useModal() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useModal must be used within ModalProvider");
  return c;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<ModalType>(null);
  const [preset, setPreset] = useState("");
  const open: ModalCtx["open"] = (t, p = "") => {
    setPreset(p);
    setType(t);
  };
  const close = () => setType(null);
  return (
    <Ctx.Provider value={{ type, preset, open, close }}>{children}</Ctx.Provider>
  );
}

/* =========================================================
   Scroll reveal
   ========================================================= */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* =========================================================
   Scroll progress bar
   ========================================================= */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-[linear-gradient(90deg,#7c3aed,#6366f1,#22d3ee,#ec4899)]"
    />
  );
}

/* =========================================================
   Magnetic — element gently follows the cursor
   ========================================================= */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   Button
   ========================================================= */
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  href?: string;
  className?: string;
  magnetic?: boolean;
};

export function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className,
  magnetic = true,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-12px_rgba(124,58,237,0.8)] bg-[linear-gradient(110deg,#7c3aed,#6366f1_55%,#22d3ee)] hover:shadow-[0_14px_50px_-10px_rgba(124,58,237,0.95)]"
      : variant === "outline"
        ? "text-white glass hover:bg-white/10"
        : "text-white/80 hover:text-white";

  const inner = (
    <span className={cn(base, styles, className)}>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(120px_60px_at_50%_120%,rgba(255,255,255,0.35),transparent)]" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </span>
  );

  if (magnetic) {
    return (
      <Magnetic strength={0.25}>
        {href ? (
          <a href={href} onClick={onClick}>
            {inner}
          </a>
        ) : (
          <button type="button" onClick={onClick}>
            {inner}
          </button>
        )}
      </Magnetic>
    );
  }
  return href ? (
    <a href={href} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  );
}

/* =========================================================
   Section heading
   ========================================================= */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-blink" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* =========================================================
   Count-up number
   ========================================================= */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* =========================================================
   Star rating
   ========================================================= */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M12 2.5l2.9 6.06 6.6.78-4.86 4.62 1.27 6.54L12 17.9l-5.91 2.6 1.27-6.54L2.5 9.34l6.6-.78L12 2.5z" />
    </svg>
  );
}

export function Stars({
  rating,
  className,
  size = "h-4 w-4",
}: {
  rating: number;
  className?: string;
  size?: string;
}) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block">
            <Star className={cn(size, "text-white/15")} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={cn(size, "text-amber-400")} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* =========================================================
   Modal shell
   ========================================================= */
export function ModalShell({
  children,
  onClose,
  title,
  subtitle,
  accent = "#8b5cf6",
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        className="glass-strong relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-7 shadow-2xl sm:p-9"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: accent, opacity: 0.25 }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full glass text-white/70 transition-colors hover:bg-white/15 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="relative">
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h3>
          {subtitle && <p className="mt-2 text-sm text-white/55">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
