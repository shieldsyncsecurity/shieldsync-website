import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

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
  "form-action 'self' https://formspree.io",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
  // api.web3forms.com = the internship application form's submit endpoint
  // (client-side fetch POST → emails the submission to internship@…).
  `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.web3forms.com${isDev ? " ws:" : ""}`,
  // Allow YouTube iframe embeds (homepage hero + /free-lab + /aws-security-certification).
  // Without this, frame-src falls back to default-src 'self' and the browser blocks
  // every <iframe src="youtube.com/embed/..."> silently — no console error in many
  // cases, just a blank player. youtube-nocookie included for the privacy-preserving
  // variant the facade falls back to in some browsers.
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Don't leak the framework version.
  poweredByHeader: false,
  // Pin Turbopack's workspace root to THIS app (a sibling package-lock.json
  // higher up otherwise gets inferred as root and breaks module resolution).
  turbopack: { root: process.cwd() },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
