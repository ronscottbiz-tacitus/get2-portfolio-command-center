# Ron Scott | Portfolio Command Center

**Live at [portfolio.get2.one](https://portfolio.get2.one)**

An interactive portfolio site — not just a static resume. Every project is
presented as a browser-chrome styled card with real screenshots/video, and a
Gemini-powered chatbot answers questions about the work grounded in the
actual project and resume data, not generic guesses.

## Why this exists

Most portfolios are read passively. This one is designed to be *queried* —
a hiring manager can ask "what did you build at Lyft?" or "walk me through
the Get2 projects" and get an answer sourced directly from real project data
(`src/data/projects.ts`, `src/data/profile.ts`), not a canned script.

## Stack

- **React + TypeScript + Vite** — frontend
- **Tailwind CSS** — styling
- **Express** — thin server layer, proxies the Gemini API and serves the
  built frontend with explicit cache-control rules (see below)
- **Google Gemini API** — powers the chatbot
- **Google Cloud Run** — hosting, with a custom domain mapping to
  `portfolio.get2.one`

## Architecture notes worth knowing

- **Chatbot grounding**: the chatbot's knowledge is generated dynamically
  from `src/data/profile.ts` and `src/data/projects.ts` at request time
  (`src/data/grounding.ts`) — facts can't drift stale, because there's
  nothing hardcoded to go stale. Update the data files, the chatbot's
  answers update with them.
- **Cache-control**: `server.ts` sets different caching rules per asset
  type — `index.html` is always revalidated (`no-cache`), hashed JS/CSS
  bundles are cached for a year (safe, since their filename changes on
  every build), and project images/videos get a 1-hour cache so updates to
  a fixed filename (like a project's screenshot) show up for returning
  visitors reasonably fast instead of being stuck indefinitely.
- **Per-project accent system**: each project in `projects.ts` carries its
  own `accent` color, layered on top of a shared black/electric-blue brand
  system — a "branded house" rather than visually unrelated project pages.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to a real Gemini
   API key (from [Google AI Studio](https://aistudio.google.com/apikey)).
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Build & verify

Before every deploy:

```bash
npx tsc --noEmit
npx vite build
```

## Deploy

```bash
gcloud run deploy get2-portfolio-live --source . --region us-east1
```
