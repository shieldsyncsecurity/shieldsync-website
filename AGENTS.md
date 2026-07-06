<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Build & deploy (read before shipping)

**HOSTING MOVED 2026-07-01: the live site is a STATIC EXPORT on AWS Amplify Hosting**
(account 750294427884, us-east-1; Amplify app platform must stay `WEB`, not `WEB_COMPUTE`).
Cloudflare keeps DNS only (grey-cloud). Do NOT use `npm run deploy` / wrangler — the old
`shieldsync-website` Worker is dead and pending decommission. See AMPLIFY-MIGRATION-RUNBOOK.md.

- **Deploy = commit + push to `main`** — Amplify watches the repo and rebuilds via
  `amplify.yml` (`STATIC_EXPORT=true npm run build`, publishes `out/`). Uncommitted changes
  never reach the live site.
- **Before pushing, verify the EXPORT build locally:** `STATIC_EXPORT=true npm run build`
  (plain `npm run build` can pass while the export variant fails — e.g. dynamic OG routes,
  non-static sitemap/robots).
- **Prod build MUST use webpack:** `package.json` `build` = `next build --webpack`. Next 16
  defaults to Turbopack; `next.config.ts` keeps `turbopack:{root}` for **dev only**. Do not
  revert the `--webpack` flag.
- Security headers for the static build live in `customHttp.yml` (mirrors next.config).
- **Redirects live in Amplify custom-rules, NOT `next.config.ts`** — a static export
  (`output: export`) silently ignores `redirects()`. The canonical, version-controlled copy is
  [`amplify-custom-rules.json`](amplify-custom-rules.json); apply it to the live app with
  (assume `OrganizationAccountAccessRole` into 750294427884 first):
  `aws amplify update-app --app-id d2d3yptdwi41th --region us-east-1 --custom-rules file://amplify-custom-rules.json`
  `update-app` REPLACES the whole set, so **edit the JSON, never hand-append one rule**. Order
  matters: specific 301s must precede the `/<*>` → `/index.html` catch-all. Whenever a route is
  renamed or removed, add a 301 for the old URL here (and re-apply) so indexed links don't 404.
