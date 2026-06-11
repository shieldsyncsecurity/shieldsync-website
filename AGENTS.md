<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Build & deploy (read before shipping)

- **Prod build MUST use webpack:** `package.json` `build` = `next build --webpack`. Next 16
  defaults to Turbopack, whose SSR chunks (`server/chunks/ssr/[root-of-the-server]__*._.js`)
  **`@opennextjs/cloudflare` cannot load at runtime** → the deployed Worker throws
  `ChunkLoadError` and pages 500. `next.config.ts` keeps `turbopack:{root}` for **dev only**.
  Do not revert the `--webpack` flag.
- **Deploy:** `npm run deploy` (= `opennextjs-cloudflare build && opennextjs-cloudflare deploy`)
  or `npx wrangler deploy`. Worker = `shieldsync-website`, live at `shieldsyncsecurity.com`.
- **CI/CD is on push to `main`** — every push auto-rebuilds + redeploys. So **uncommitted
  changes never reach the live site.** Always commit + push to ship.
