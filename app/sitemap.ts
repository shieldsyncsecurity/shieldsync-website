import type { MetadataRoute } from "next";
import { SITE, AWS_LABS } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { CCAF_BASE, CCAF_LIVE_ROUTES } from "@/lib/free-courses";

// Required for `output: export` (static Amplify build) — emit a static sitemap.xml
// at build time. Harmless on the Cloudflare build (already static there).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  // Site-wide constant for static/lab pages (bump on meaningful content updates).
  // Blog posts use their own `date` field instead — see below.
  const now = new Date("2026-07-03");

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/start-here`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/ai-security`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/labs-wizard`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/free-courses`,
      lastModified: new Date("2026-07-21"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}${CCAF_BASE}`,
      lastModified: new Date("2026-07-21"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    // Only LIVE lesson routes are indexed (mirrors the labs rule above):
    // "coming soon" lessons have no pages yet, so nothing to list.
    ...CCAF_LIVE_ROUTES.map((l) => ({
      url: `${base}${CCAF_BASE}/${l.slug}`,
      lastModified: new Date("2026-07-21"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/shipping`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...SERVICE_PAGES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Only LIVE lab detail pages belong in the sitemap. SOC labs are "coming soon"
    // (not built) — their /labs/<slug> pages still resolve for direct links, but
    // submitting them for indexing as in-stock courses would be wrong. The funnel
    // for not-yet-live tracks is the wizard, not indexed detail pages.
    ...AWS_LABS.map((l) => ({
      url: `${base}/labs/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Blog posts use each post's real published date instead of the
    // site-wide constant, so the sitemap reflects actual content freshness.
    ...BLOG_POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: parseBlogDate(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

// BLOG_POSTS store `date` as a human string (e.g. "Jun 30, 2026"), which
// Date() parses fine in Node/browsers. Fall back to the site-wide constant
// if a date is ever missing/malformed so the build never emits an Invalid Date.
function parseBlogDate(date: string): Date {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date("2026-07-03") : parsed;
}
