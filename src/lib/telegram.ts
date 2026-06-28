import { BRAND } from "../data/content";

/**
 * Sends a message to the Aurax Telegram bot.
 *
 * Credentials resolve in this order:
 *   1. Build-time env vars  VITE_TELEGRAM_TOKEN / VITE_TELEGRAM_CHAT_ID
 *   2. The test values in content.ts (works immediately, but exposed in the bundle)
 *
 * For production you should deploy the included Cloudflare Pages Function
 * (functions/api/telegram.ts) and set VITE_TELEGRAM_PROXY to its URL. That
 * keeps the token server-side — see DEPLOY.md.
 */

type SendResult = { ok: boolean; error?: string };

const ENV = (import.meta as unknown as { env?: Record<string, string> }).env ?? {};

const BOT_TOKEN = ENV.VITE_TELEGRAM_TOKEN ?? BRAND.telegramBot;
const CHAT_ID = ENV.VITE_TELEGRAM_CHAT_ID ?? BRAND.telegramChat;

/** If set, all messages are proxied through your Cloudflare Function (recommended). */
const PROXY = ENV.VITE_TELEGRAM_PROXY ?? "";

export async function sendToTelegram(text: string): Promise<SendResult> {
  try {
    if (PROXY) {
      const res = await fetch(PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      return { ok: !!data.ok, error: data.ok ? undefined : "proxy-error" };
    }

    // Direct Telegram Bot API call. Using form-urlencoded makes this a
    // "simple" request (no CORS preflight), and Telegram returns the
    // Access-Control-Allow-Origin header needed to read the response.
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: "true",
        }),
      },
    );
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      description?: string;
    };
    return { ok: !!data.ok, error: data.ok ? undefined : data.description };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Helper to format an HTML message line (Telegram supports <b>, emojis, etc.). */
export function line(label: string, value: string) {
  return `${label} <b>${escapeHtml(value)}</b>`;
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
