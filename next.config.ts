import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// STATIC_EXPORT=true → build a pure static site (`out/`) for AWS Amplify hosting.
// A static site is served entirely from CDN (no Worker, no Lambda), so the
// Cloudflare Free-plan 10ms-CPU cap that caused Error 1102 cannot exist. Gated by
// an env var so the Cloudflare/OpenNext build (which does NOT set it) is completely
// unaffected during the migration — both targets build from one repo.
// NOTE: static export can't run next.config `headers()`, so the security headers
// below are mirrored in `customHttp.yml` (read by Amplify) for the exported build.
const isExport = process.env.STATIC_EXPORT === "true";

/**
 * Baseline Content-Security-Policy.
 *
 * 'unsafe-inline' justification (script-src): Next.js App Router injects inline
 * hydration / RSC bootstrap scripts, and we render inline JSON-LD plus a
 * consent-gated GA init snippet. A nonce-based CSP via middleware is the
 * hardening path (TODO) — this baseline already blocks the main XSS,
 * clickjacking, and injection vectors. 'unsafe-eval' + ws: are dev-only (HMR).
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "style-src-elem 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
  `script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com`,
  // api.web3forms.com = the internship application form's submit endpoint
  // (client-side fetch POST → emails the submission to internship@…).
  // labs.shieldsyncsecurity.com = the /api/geo country lookup the pre-paint
  // region script fetches for IP-based currency (CSP blocks it otherwise).
  `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.web3forms.com https://labs.shieldsyncsecurity.com${isDev ? " ws:" : ""}`,
  // Allow YouTube iframe embeds (homepage hero + /free-labs/aws-security + /aws-security-certification).
  // Without this, frame-src falls back to default-src 'self' and the browser blocks
  // every <iframe src="youtube.com/embed/..."> silently — no console error in many
  // cases, just a blank player. youtube-nocookie included for the privacy-preserving
  // variant the facade falls back to in some browsers.
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  // No inline audio/video on this site; YouTube embeds load via frame-src above.
  "media-src 'none'",
  // No service workers on the static marketing site.
  "worker-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Marketing site has no cross-origin popups; strict same-origin isolation is safe.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Don't leak the framework version.
  poweredByHeader: false,
  // Pin Turbopack's workspace root to THIS app (a sibling package-lock.json
  // higher up otherwise gets inferred as root and breaks module resolution).
  turbopack: { root: process.cwd() },
  ...(isExport
    ? {
        // Amplify static-export target: emit `out/`. `next/image` optimization
        // needs a server, so serve images as-is from the CDN (unoptimized).
        // `headers()` is intentionally omitted (unsupported in export) → served
        // via customHttp.yml instead.
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {
        // Legacy Cloudflare/OpenNext target (pre-Amplify; Worker pending
        // decommission): keep serving the security headers from the framework.
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
