import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "../data/content";
import { Icon } from "./Icons";

type Message = { role: "assistant" | "user"; text: string };
type SavedChat = { sessionId: string; messages: Message[] };

const STORAGE_KEY = "aurax:aura-memory:v1";
const opening = "Hey there! I'm Aura 👋 I help businesses figure out what they can automate to save time and money. What does your business do?";
const fallback = "You don't need to know which type of agent you need. Tell me what is eating the most time, and I’ll help you find the right next move.";
const starterPrompts = ["What can you automate for my business?", "We lose too many inbound leads", "I need a custom AI system"];

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `aura-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadSaved(): SavedChat {
  if (typeof window === "undefined") return { sessionId: createSessionId(), messages: [{ role: "assistant", text: opening }] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") as SavedChat | null;
    if (parsed?.sessionId && Array.isArray(parsed.messages) && parsed.messages.length) return parsed;
  } catch {
    // A broken local cache should never prevent the assistant from opening.
  }
  return { sessionId: createSessionId(), messages: [{ role: "assistant", text: opening }] };
}

export default function Chatbot() {
  const saved = useMemo(loadSaved, []);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(saved.sessionId);
  const [messages, setMessages] = useState<Message[]>(saved.messages);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, messages: messages.slice(-24) } satisfies SavedChat));
  }, [messages, sessionId]);

  const memory = useMemo(() => messages.filter((message) => message.role === "user").slice(-8).map((message) => message.text).join("\n").slice(0, 3200), [messages]);

  function clearMemory() {
    const nextSession = createSessionId();
    setSessionId(nextSession);
    setMessages([{ role: "assistant", text: opening }]);
    setInput("");
  }

  async function submit(text = input) {
    const value = text.trim();
    if (!value || sending) return;
    const priorMessages = messages;
    setInput("");
    setMessages((current) => [...current, { role: "user", text: value }]);
    setSending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          sessionId,
          memory,
          history: priorMessages.slice(-10).map((message) => ({ role: message.role, content: message.text })),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string };
      setMessages((current) => [...current, { role: "assistant", text: data.reply || fallback }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: fallback }]);
    } finally {
      setSending(false);
    }
  }

  return <div className="chatbot-root fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }} transition={{ duration: .22, ease: [0.22, 1, .36, 1] }} className="chatbot-panel mb-3 w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f7f6f1] shadow-[0_25px_80px_-30px_rgba(0,0,0,.55)]">
        <div className="flex items-center justify-between bg-[#131416] px-4 py-4 text-white"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d7ff42] text-[#131416]"><Icon name="spark" className="h-4 w-4" /></span><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/45">Aura / memory online</p><p className="mt-0.5 text-xs font-semibold">Your bottleneck, first.</p></div></div><div className="flex items-center gap-1"><button type="button" onClick={clearMemory} className="rounded-full px-2 py-1 font-mono text-[8px] uppercase tracking-[.1em] text-white/35 transition hover:text-white" aria-label="Clear Aura memory">Clear</button><button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:text-white" aria-label="Close assistant"><span className="text-lg leading-none">×</span></button></div></div>
        <div className="max-h-[350px] space-y-3 overflow-y-auto p-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-3.5 py-3 text-xs leading-relaxed ${message.role === "user" ? "bg-[#131416] text-white" : "border border-black/8 bg-white text-black/65"}`}>{message.text}</div></div>)}{sending && <div className="flex justify-start"><div className="flex items-center gap-1.5 rounded-2xl border border-black/8 bg-white px-3.5 py-3"><span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" /></div></div>}</div>
        {messages.length === 1 && <div className="flex flex-wrap gap-2 px-4 pb-3">{starterPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => void submit(prompt)} className="rounded-full border border-black/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-black/55 transition hover:border-black/30 hover:text-black">{prompt}</button>)}</div>}
        <form onSubmit={(event) => { event.preventDefault(); void submit(); }} className="flex items-center gap-2 border-t border-black/10 p-3"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Tell Aura what’s slowing you down…" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-black outline-none placeholder:text-black/30" aria-label="Message Aura" /><button type="submit" disabled={!input.trim() || sending} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#131416] text-[#d7ff42] transition hover:-translate-y-0.5 disabled:opacity-30" aria-label="Send message"><Icon name="send" className="h-4 w-4" /></button></form><p className="px-4 pb-3 font-mono text-[8px] uppercase tracking-[.12em] text-black/25">Aura remembers this conversation on this device · {BRAND.email}</p>
      </motion.div>}
    </AnimatePresence>
    <div className="flex items-center justify-end gap-3"><AnimatePresence>{!open && <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="hidden rounded-full border border-black/10 bg-[#f7f6f1] px-3.5 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-black/55 shadow-lg sm:block">Hey, how can we help?</motion.span>}</AnimatePresence><button type="button" onClick={() => setOpen((value) => !value)} className="chatbot-trigger group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#131416] text-[#d7ff42] shadow-[0_15px_35px_-12px_rgba(0,0,0,.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-12px_rgba(0,0,0,.55)]" aria-label={open ? "Close Aura assistant" : "Open Aura assistant"}><span className="chatbot-ring absolute inset-0 rounded-full border border-[#d7ff42]/60" /><Icon name={open ? "check" : "chat"} className="relative z-10 h-5 w-5" /></button></div>
  </div>;
}
