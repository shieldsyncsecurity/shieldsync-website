# ShieldSync Security — marketing + training website

The company storefront and training funnel for **ShieldSync Security** — hands-on AWS
security labs (the flagship), a SOC (SIEM/SOAR) track, services, internship, and blog.
**🟢 LIVE at [shieldsyncsecurity.com](https://shieldsyncsecurity.com).** The labs
*platform* (the authenticated app that runs labs) lives separately in `../labs-platform`.

> **⚠️ Read [`AGENTS.md`](./AGENTS.md) before changing build/deploy** — prod builds MUST
> use `next build --webpack` (Turbopack breaks OpenNext on Workers → `ChunkLoadError`).

## Stack
- **Next.js 16** (App Router) + **React 19**, **Tailwind v4**, **Manrope** + JetBrains Mono.
- Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare` (Worker `shieldsync-website`).
  No Vercel.
- Content is centralized in **`lib/site.ts`** (nav, labs, pricing tables, etc.); blog posts
  in `content/blog/*.json` (run `scripts/build-blog.mjs` + the cover generator to add one).
- Regional pricing (INR/USD) via edge geo headers — see `lib/region.ts` (`?country=IN`/`US` to test).

## Develop
```bash
npm run dev      # http://localhost:3000
npm run build    # next build --webpack (prod build — do NOT switch to Turbopack)
```

## Deploy
**CI/CD on push to `main`** auto-rebuilds + redeploys the Worker. Uncommitted changes
never reach the live site — always commit + push to ship. Manual: `npm run deploy`
(`opennextjs-cloudflare build && deploy`).

## The funnel
Every "Start free lab" CTA → the wizard (`/labs-wizard`) → deep-links to the labs platform
(`labs.shieldsyncsecurity.com/labs/<slug>?intent=launch`), which gates sign-in and launches.
The first beginner lab is free (1 launch / 48h). See `../labs-platform/AUTH_AND_DEPLOY_RUNBOOK.md`
for the platform side.
