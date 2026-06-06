// Next.js 16 "Proxy" (formerly Middleware). Runs at the edge before requests.
// Resolves the visitor's country and forwards it to the app so server
// components can pick the right currency / regional pricing.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COUNTRY_COOKIE } from "@/lib/region";

function detectCountry(req: NextRequest): string {
  // Manual override for testing locally: /labs-wizard?country=IN
  const override = req.nextUrl.searchParams.get("country");
  if (override) return override.toUpperCase();

  // Edge geo headers (set by the CDN in production):
  // - CloudFront (our SST/AWS deploy) → CloudFront-Viewer-Country
  // - Cloudflare → CF-IPCountry · Vercel → x-vercel-ip-country
  const h = req.headers;
  return (
    h.get("cloudfront-viewer-country") ||
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    req.cookies.get(COUNTRY_COOKIE)?.value ||
    ""
  ).toUpperCase();
}

export function proxy(req: NextRequest) {
  const country = detectCountry(req);

  const headers = new Headers(req.headers);
  if (country) headers.set("x-ss-country", country);

  const res = NextResponse.next({ request: { headers } });
  if (country) {
    res.cookies.set(COUNTRY_COOKIE, country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  // Run on pages, not on static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)"],
};
