# Deploying Aurax on Cloudflare (free)

Aurax is a single-page static site — it runs for free on **Cloudflare Pages**
forever. This guide covers two things:

1. **Hosting the site** (always free).
2. **Where your messages & bookings go** (Telegram) — and how to keep the bot
   token secret using a Pages Function.

---

## 1) Build the site

```bash
npm install
npm run build
```

This produces a single self-contained file in **`dist/index.html`** — that's
the whole site. That's all you upload.

---

## 2) Host it on Cloudflare Pages

**Option A — Upload the folder (fastest, no Git):**
1. Go to **Cloudflare → Workers & Pages → Create → Pages → Upload assets**.
2. Drag in everything inside the **`dist/`** folder (or upload `dist/`).
3. Set the project name (e.g. `aurax`) and **Deploy**.
4. Your site is live at `https://aurax.pages.dev`.

**Option B — Connect your Git repo (auto-deploys on every push):**
1. Push this project to GitHub/GitLab.
2. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy.** Future pushes redeploy automatically.

You can later attach a custom domain (e.g. `aurax.com`) in
**Pages → Custom domains** — also free.

---

## 3) Your messages & bookings → Telegram

By default, the site sends every message and build-call request **straight to
your Telegram bot** using the test token in `src/data/content.ts`:

- Bot: `t.me/Eysgtsbot`
- Chat ID: `6120960593`

> ⚠️ **Rotate this token.** Anything in `content.ts` ships inside the public
> bundle, so anyone can read it. For production, use the secure option below.

### Secure option — token stays server-side (recommended)

The repo includes a Cloudflare Pages Function at
**`functions/api/telegram.ts`**. It's automatically picked up by Pages (no extra
config) and exposes a same-origin endpoint `/api/telegram`.

**Steps:**
1. In **Cloudflare Pages → your project → Settings → Environment variables**,
   add (Production + Preview):
   - `TELEGRAM_BOT_TOKEN` = your bot token
   - `TELEGRAM_CHAT_ID` = `6120960593`
2. Set the frontend build variable `VITE_TELEGRAM_PROXY` = `/api/telegram`
   (same screen — "Environment and build variables").
3. Trigger a redeploy.

Now the browser POSTs to `/api/telegram` (same origin, no CORS issues), the
Function forwards to Telegram using the secret token, and **the token is never
exposed in the site's source**.

> If you used Option A (upload `dist/`), you can't set build env vars easily, so
> either use Option B (Git), or keep the test token in `content.ts` and rotate
> it regularly. The Function approach needs a Git-connected project.

---

## 4) Public site experience

The public site is intentionally static and does not include a chatbot or browser-side AI API integration. Workflow visuals are rendered as responsive SVG graphs so their nodes and connections remain visible as the viewport narrows.

## 5) Appointment requests → WhatsApp

The build-call and message forms continue to deliver to Telegram and now also
support an optional WhatsApp relay. Set the frontend build variable
`VITE_WHATSAPP_PROXY` to a secure server-side webhook or WhatsApp Business
relay that accepts `{ "text": "..." }`. Keep the destination number inside
that server-side relay only. Do not put a WhatsApp access token or personal
number in the browser bundle. The public site intentionally does not expose a
direct WhatsApp link.

---

## Quick checks after deploy

- Open the site, click **Send a message**, fill it, submit → you should get a
  Telegram message within a couple of seconds.
- Do the same for **Schedule a build call** → you'll get the date/time/project.
- Make sure you've sent `/start` to `t.me/Eysgtsbot` from your Telegram account
  at least once, otherwise the bot can't message you.
