# ShieldSync Security — marketing + training website

The company storefront and training funnel for **ShieldSync Security** — hands-on AWS
security labs (the flagship), a SOC (SIEM/SOAR) track, services, internship, and blog.
**🟢 LIVE at [shieldsyncsecurity.com](https://shieldsyncsecurity.com).** The labs
*platform* (the authenticated app that runs labs) lives separately in `../labs-platform`.

> **⚠️ Read [`AGENTS.md`](./AGENTS.md) before changing build/deploy** — the live site is a
> STATIC EXPORT on AWS Amplify; prod builds MUST use `next build --webpack`.

## Stack
- **Next.js 16** (App Router) + **React 19**, **Tailwind v4**, **Manrope** + JetBrains Mono.
- **Static export on AWS Amplify Hosting** (`STATIC_EXPORT=true npm run build` → `out/`;
  account 750294427884, us-east-1; platform stays `WEB`). DNS on Cloudflare, grey-cloud.
  The old Cloudflare Worker is dead / pending decommission — never `wrangler deploy`.
  See `../AMPLIFY-MIGRATION-RUNBOOK.md`.
- Content is centralized in **`lib/site.ts`** (nav, labs, pricing tables, etc.); blog posts
  in `content/blog/*.json` (run `scripts/build-blog.mjs` + the cover generator to add one).
- **Regional pricing (INR/USD)**: a pre-paint script in `app/layout.tsx` sets
  `<html data-region>` (localStorage `ss_region` cache → timezone fallback → IP via
  `labs.shieldsyncsecurity.com/api/geo`), and priced components read that attribute /
  the `ss:region` event — see `lib/region.ts` for the price tables. Test by setting
  `data-region` in devtools or clearing `ss_region` in localStorage.
- Redirects (301s for removed/renamed URLs) live in **`amplify-custom-rules.json`** —
  apply with `aws amplify update-app` per AGENTS.md; they are NOT in next.config.

## Develop
```bash
npm run dev      # http://localhost:3000
npm run build    # next build --webpack (prod build — do NOT switch to Turbopack)
STATIC_EXPORT=true npm run build   # the EXPORT build Amplify runs — verify before pushing
```

## Deploy
**Deploy = commit + push to `main`.** Amplify watches the repo and rebuilds via
`amplify.yml` (publishes `out/`). Uncommitted changes never reach the live site.
There is no manual deploy script.

## The funnel
- **Free:** "Start free lab" CTAs → `/free-labs/<topic>` landing page → plain labs URL
  (`labs.shieldsyncsecurity.com/labs/<slug>`, no auto-launch) → learner signs in and
  clicks **Launch lab** themselves. First beginner lab is free (launch limits live in
  `../labs-platform/app/lib/access-rules.ts` — the authoritative source).
- **Paid:** the wizard (`/labs-wizard`) → checkout handoff carries `?intent=launch` so the
  lab auto-launches right after sign-in/payment (the one sanctioned auto-action).

See `../labs-platform/AUTH_AND_DEPLOY_RUNBOOK.md` for the platform side.
