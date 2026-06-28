import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "../data/content";
import { ModalShell, useModal } from "../lib/ui";
import { sendToTelegram, line, escapeHtml } from "../lib/telegram";
import { Icon } from "./Icons";

/* ---------- shared field styling (fat) ---------- */
const inputCls =
  "w-full min-h-[54px] rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] font-medium text-white placeholder:font-normal placeholder-white/30 outline-none transition focus:border-violet/60 focus:bg-white/[0.08]";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/55">{label}</span>
      {children}
    </label>
  );
}

type Result = "idle" | "sending" | "sent" | "error";

function ResultView({
  result,
  error,
  successTitle,
  successLines,
  onClose,
}: {
  result: Result;
  error?: string;
  successTitle: string;
  successLines: string[];
  onClose: () => void;
}) {
  if (result === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-6 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
        </div>
        <h4 className="font-display mt-5 text-2xl font-semibold text-white">
          Couldn&apos;t send
        </h4>
        <p className="mx-auto mt-2 max-w-sm text-sm text-white/55">
          Something went wrong reaching us. Please try again, or email{" "}
          <a className="text-cyan underline-offset-2 hover:underline" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
          .
        </p>
        <button
          onClick={onClose}
          className="mt-6 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
        >
          Close
        </button>
        {error && <p className="mt-3 font-mono text-[10px] text-white/25">{error}</p>}
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-6 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#34d399,#22d3ee)] text-white">
        <Icon name="check" className="h-8 w-8" />
      </div>
      <h4 className="font-display mt-5 text-2xl font-semibold text-white">{successTitle}</h4>
      {successLines.map((l) => (
        <p key={l} className="mx-auto mt-2 max-w-sm text-sm text-white/55">
          {l}
        </p>
      ))}
      <button
        onClick={onClose}
        className="mt-6 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
      >
        Done
      </button>
    </motion.div>
  );
}

const BUILD_TYPES = [
  "Conversational agent",
  "Voice / telephony",
  "Multi-agent system",
  "Autonomous outbound",
  "Custom — not sure yet",
];

/* ---------- Fatter custom dropdown ---------- */
function FatSelect({
  value,
  onChange,
  options,
  leadingIcon,
  accent = "#8b5cf6",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  leadingIcon?: string;
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={inputCls + " flex w-full items-center justify-between gap-2 text-left"}
      >
        <span className="flex items-center gap-2.5">
          {leadingIcon && (
            <span style={{ color: accent }}>
              <Icon name={leadingIcon} className="h-5 w-5" />
            </span>
          )}
          <span>{value}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-white/50">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl p-1.5 shadow-2xl"
          >
            {options.map((o) => {
              const active = o === value;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className={
                    "flex min-h-[48px] w-full items-center justify-between rounded-lg px-4 text-[15px] font-semibold transition-colors " +
                    (active
                      ? "bg-[linear-gradient(110deg,rgba(124,58,237,0.25),rgba(34,211,238,0.18))] text-white"
                      : "text-white/70 hover:bg-white/8 hover:text-white")
                  }
                >
                  {o}
                  {active && (
                    <span style={{ color: accent }}>
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubmitButton({
  children,
  accent,
  disabled,
  loading,
}: {
  children: ReactNode;
  accent: "violet" | "cyan";
  disabled: boolean;
  loading: boolean;
}) {
  const grad =
    accent === "violet"
      ? "bg-[linear-gradient(110deg,#7c3aed,#6366f1)] shadow-[0_10px_36px_-10px_rgba(124,58,237,0.9)]"
      : "bg-[linear-gradient(110deg,#22d3ee,#6366f1)] shadow-[0_10px_36px_-10px_rgba(34,211,238,0.8)]";
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={"flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 " + grad}
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
          </svg>
          Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

/* ---------- Message modal ---------- */
function MessageModal({ preset, onClose }: { preset: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState(
    preset === "custom" ? "Custom — not sure yet" : BUILD_TYPES[0],
  );
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result>("idle");
  const [error, setError] = useState<string>();

  const canSend = name.trim().length > 1 && message.trim().length > 3;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || result === "sending") return;
    setResult("sending");
    const text =
      `📩 <b>New message — Aurax site</b>\n\n` +
      `${line("👤 Name:", name.trim())}\n` +
      `${line("🏷 Interest:", type)}\n` +
      (contact.trim() ? `${line("✉️ Contact:", contact.trim())}\n` : "") +
      `\n💬 <b>Brief:</b>\n${escapeHtml(message.trim())}`;
    const r = await sendToTelegram(text);
    setError(r.error);
    setResult(r.ok ? "sent" : "error");
  }

  return (
    <ModalShell
      onClose={onClose}
      title="Send a message"
      subtitle="Describe the agent or system you want to build — we read every message and reply directly."
      accent="#22d3ee"
    >
      {result === "sent" || result === "error" ? (
        <ResultView
          result={result}
          error={error}
          successTitle="Message sent! 🚀"
          successLines={[
            "Thanks — your message just landed in our inbox. We'll get back to you shortly.",
            `Prefer email? Reach us at ${BRAND.email}.`,
          ]}
          onClose={onClose}
        />
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Your name *">
            <input
              className={inputCls}
              placeholder="e.g. Aarav Mehta"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email or phone (optional)">
              <input
                className={inputCls}
                placeholder="How can we reach you?"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Field>
            <Field label="What do you need?">
              <FatSelect
                value={type}
                onChange={setType}
                options={BUILD_TYPES}
                leadingIcon="spark"
                accent="#22d3ee"
              />
            </Field>
          </div>
          <Field label="Describe your build *">
            <textarea
              className={inputCls + " min-h-[120px] resize-y"}
              placeholder="I want an agent that handles inbound calls, books appointments into my calendar, and follows up by WhatsApp…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Field>
          <SubmitButton accent="cyan" disabled={!canSend} loading={result === "sending"}>
            <Icon name="send" className="h-4 w-4" />
            Send message
          </SubmitButton>
          <p className="text-center text-xs text-white/35">
            Your message is delivered straight to our team — no third-party clutter.
          </p>
        </form>
      )}
    </ModalShell>
  );
}

/* ---------- Call modal ---------- */
const SLOTS = [
  "09:00 – 10:00 IST",
  "11:00 – 12:00 IST",
  "14:00 – 15:00 IST",
  "16:00 – 17:00 IST",
  "18:00 – 19:00 IST",
];

function CallModal({ preset, onClose }: { preset: string; onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [details, setDetails] = useState(preset ? `Interested in: ${preset}` : "");
  const [result, setResult] = useState<Result>("idle");
  const [error, setError] = useState<string>();

  const canSend = name.trim().length > 1 && contact.trim().length > 2 && date;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || result === "sending") return;
    setResult("sending");
    const text =
      `📅 <b>New build-call request — Aurax</b>\n\n` +
      `${line("👤 Name:", name.trim())}\n` +
      `${line("✉️ Contact:", contact.trim())}\n` +
      `${line("🗓 Date:", date)}\n` +
      `${line("⏰ Time:", slot)}` +
      (details.trim() ? `\n${line("📝 Project:", details.trim())}` : "");
    const r = await sendToTelegram(text);
    setError(r.error);
    setResult(r.ok ? "sent" : "error");
  }

  return (
    <ModalShell
      onClose={onClose}
      title="Schedule a build call"
      subtitle="Pick a slot that works for you and we'll confirm the appointment."
      accent="#8b5cf6"
    >
      {result === "sent" || result === "error" ? (
        <ResultView
          result={result}
          error={error}
          successTitle="Slot requested! 📅"
          successLines={[
            `Got it — ${date} at ${slot}.`,
            "We'll confirm your appointment shortly via the contact you shared.",
          ]}
          onClose={onClose}
        />
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Your name *">
              <input
                className={inputCls}
                placeholder="e.g. Sarah Whitman"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field label="Email or phone *">
              <input
                className={inputCls}
                placeholder="Where should we confirm?"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Preferred date *">
              <input
                type="date"
                min={today}
                className={inputCls + " [color-scheme:dark]"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <Field label="Preferred time">
              <FatSelect
                value={slot}
                onChange={setSlot}
                options={SLOTS}
                leadingIcon="clock"
                accent="#8b5cf6"
              />
            </Field>
          </div>
          <Field label="What do you want to build?">
            <textarea
              className={inputCls + " min-h-[90px] resize-y"}
              placeholder="A short brief — your goals, tools, timeline…"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Field>
          <SubmitButton accent="violet" disabled={!canSend} loading={result === "sending"}>
            <Icon name="calendar" className="h-4 w-4" />
            Request appointment
          </SubmitButton>
          <p className="text-center text-xs text-white/35">
            We&apos;ll confirm your slot by the contact you share.
          </p>
        </form>
      )}
    </ModalShell>
  );
}

/* ---------- Wrapper bound to the modal store ---------- */
export default function Modals() {
  const { type, preset, close } = useModal();
  return (
    <AnimatePresence>
      {type === "message" && (
        <MessageModal key="message" preset={preset} onClose={close} />
      )}
      {type === "call" && <CallModal key="call" preset={preset} onClose={close} />}
    </AnimatePresence>
  );
}
