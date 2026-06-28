/**
 * Cloudflare Pages Function — secure Telegram relay.
 *
 * Why this exists:
 *   Putting your bot token in the browser bundle exposes it to anyone who
 *   views your site's source. This function keeps the token server-side and
 *   lets the frontend POST to a same-origin endpoint (/api/telegram) — so
 *   there are no CORS issues either.
 *
 * Deploy:
 *   - This file lives at  functions/api/telegram.ts  → exposed at  /api/telegram
 *   - In Cloudflare Pages → Settings → Environment variables, add:
 *       TELEGRAM_BOT_TOKEN  = <your bot token>
 *       TELEGRAM_CHAT_ID    = <your chat id>
 *   - In your frontend build, set  VITE_TELEGRAM_PROXY=/api/telegram
 *     (and optionally remove VITE_TELEGRAM_TOKEN so the token isn't bundled).
 *
 * Request body (JSON):  { "text": "..." }
 * Response (JSON):      { "ok": true }  |  { "ok": false, "error": "..." }
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  let text = "";
  try {
    const body = (await request.json()) as { text?: string };
    text = (body?.text ?? "").toString().slice(0, 4000);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "bad-body" }), {
      status: 400,
      headers: cors,
    });
  }

  if (!text.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "empty" }), {
      status: 400,
      headers: cors,
    });
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return new Response(
      JSON.stringify({ ok: false, error: "not-configured" }),
      { status: 500, headers: cors },
    );
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    const data = (await res.json()) as { ok?: boolean; description?: string };
    return new Response(
      JSON.stringify({ ok: !!data.ok, error: data.description }),
      { status: data.ok ? 200 : 502, headers: cors },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message }),
      { status: 502, headers: cors },
    );
  }
};

// Handle CORS preflight.
export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
