import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom glowing cursor — a bright aurora dot with a trailing ring.
 * The ring swells over interactive elements. Desktop (fine pointer) only.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHovering(
        !!t?.closest("a,button,input,textarea,select,label,[data-cursor]"),
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[200]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: hovering ? 56 : 34,
            height: hovering ? 56 : 34,
            opacity: hovering ? 1 : 0.6,
            scale: down ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            border: "1.5px solid rgba(167,139,250,0.9)",
            boxShadow:
              "0 0 18px rgba(139,92,246,0.5), inset 0 0 14px rgba(34,211,238,0.25)",
            background: hovering
              ? "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)"
              : "transparent",
          }}
        />
      </motion.div>

      {/* exact dot */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[201]"
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ scale: hovering ? 0.4 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{
            width: 8,
            height: 8,
            background: "linear-gradient(135deg,#fff,#a78bfa)",
            boxShadow: "0 0 10px 2px rgba(167,139,250,0.8)",
          }}
        />
      </motion.div>
    </>
  );
}
