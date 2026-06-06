# Security

How this site is built defensively, and why each dependency exists.

## Posture / controls

- **Security headers + CSP** (`next.config.ts`): baseline `Content-Security-Policy`,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo off),
  `Strict-Transport-Security`, and `poweredByHeader: false`.
  - `script-src`/`style-src` use `'unsafe-inline'` (justified inline: Next hydration scripts,
    JSON-LD, consent-gated GA). Hardening path: nonce-based CSP via middleware (TODO).
- **XSS**: only one `dangerouslySetInnerHTML` exists (`components/schema-org.tsx`) for JSON-LD;
  it stringifies **server-generated, trusted** data and escapes `<` to prevent `</script>` breakout.
  No user/markdown input is rendered as HTML anywhere.
- **Secrets**: none in the repo. `.gitignore` excludes `.env*` and `*.pem`. The only key
  (`GOOGLE_API_KEY`) is read at runtime by an offline Node script — never shipped to the client.
  `NEXT_PUBLIC_GA_ID` is intentionally public (a GA measurement ID, not a secret).
- **Dependencies**: pinned to exact versions; `postcss` is forced to a patched range via
  `overrides` (fixes the transitive moderate advisory without downgrading Next).
- **Forms**: the contact form posts to Formspree (`form-action` is CSP-restricted to it).

## Dependencies (minimal footprint)

Runtime:
| Package | Why |
|---|---|
| `next` | The framework (App Router) |
| `react`, `react-dom` | UI runtime |

Dev / build only (not shipped to the client):
| Package | Why |
|---|---|
| `tailwindcss`, `@tailwindcss/postcss` | Styling (CSS-first design system) |
| `typescript`, `@types/*` | Type safety |
| `eslint`, `eslint-config-next` | Linting |
| `@google/genai` | **Only** used by `scripts/generate-images.mjs` (offline lab-image generation). Safe to remove if the image pipeline isn't needed in this repo. |

## Reporting

Found something? Email **info@shieldsyncsecurity.com**.
