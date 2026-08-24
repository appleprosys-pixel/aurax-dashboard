import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "../data/content";
import { Icon } from "./Icons";

type Message = { role: "assistant" | "user"; text: string };

const fallback = "You don't need to know which type of agent you need. Tell us the problem that is slowing the business down. In under 48 hours, our team will come back with the right system to build around it.";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi, I’m Aura. What’s stealing time from your team?" },
  ]);

  async function submit(text = input) {
    const value = text.trim();
    if (!value || sending) return;
    setInput("");
    setMessages((current) => [...current, { role: "user", text: value }]);
    setSending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value, history: messages.slice(-6) }),
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
      {open && <motion.div initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }} transition={{ duration: .22, ease: [0.22, 1, .36, 1] }} className="chatbot-panel mb-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f7f6f1] shadow-[0_25px_80px_-30px_rgba(0,0,0,.55)]">
        <div className="flex items-center justify-between bg-[#131416] px-4 py-4 text-white"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d7ff42] text-[#131416]"><Icon name="spark" className="h-4 w-4" /></span><div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/45">Aura / Aurax assistant</p><p className="mt-0.5 text-xs font-semibold">Here to find the bottleneck</p></div></div><button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:text-white" aria-label="Close assistant"><span className="text-lg leading-none">×</span></button></div>
        <div className="max-h-[330px] space-y-3 overflow-y-auto p-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[86%] rounded-2xl px-3.5 py-3 text-xs leading-relaxed ${message.role === "user" ? "bg-[#131416] text-white" : "border border-black/8 bg-white text-black/65"}`}>{message.text}</div></div>)}{sending && <div className="flex justify-start"><div className="flex items-center gap-1.5 rounded-2xl border border-black/8 bg-white px-3.5 py-3"><span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" /></div></div>}</div>
        {messages.length === 1 && <div className="flex flex-wrap gap-2 px-4 pb-3">{["Inbound leads", "Support load", "Something custom"].map((prompt) => <button type="button" key={prompt} onClick={() => submit(prompt)} className="rounded-full border border-black/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-black/55 transition hover:border-black/30 hover:text-black">{prompt}</button>)}</div>}
        <form onSubmit={(event) => { event.preventDefault(); void submit(); }} className="flex items-center gap-2 border-t border-black/10 p-3"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Tell us what’s slowing you down…" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-black outline-none placeholder:text-black/30" aria-label="Message Aura" /><button type="submit" disabled={!input.trim() || sending} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#131416] text-[#d7ff42] transition hover:-translate-y-0.5 disabled:opacity-30" aria-label="Send message"><Icon name="send" className="h-4 w-4" /></button></form><p className="px-4 pb-3 font-mono text-[8px] uppercase tracking-[.12em] text-black/25">Or reach the team at {BRAND.email}</p>
      </motion.div>}
    </AnimatePresence>
    <div className="flex items-center justify-end gap-3"><AnimatePresence>{!open && <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} className="hidden rounded-full border border-black/10 bg-[#f7f6f1] px-3.5 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-black/55 shadow-lg sm:block">Hi, how can we help?</motion.span>}</AnimatePresence><button type="button" onClick={() => setOpen((value) => !value)} className="chatbot-trigger group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#131416] text-[#d7ff42] shadow-[0_15px_35px_-12px_rgba(0,0,0,.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-12px_rgba(0,0,0,.55)]" aria-label={open ? "Close Aura assistant" : "Open Aura assistant"}><span className="chatbot-ring absolute inset-0 rounded-full border border-[#d7ff42]/60" /><Icon name={open ? "check" : "chat"} className="relative z-10 h-5 w-5" /></button></div>
  </div>;
}
