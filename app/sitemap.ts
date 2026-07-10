import type { MetadataRoute } from "next";
import { SITE, AWS_LABS, SOC_LABS, BLOG_POSTS } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/service-pages";

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
      url: `${base}/cybersecurity-foundation-program`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/aws-security-certification`,
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
      url: `${base}/aws-security-labs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/labs-wizard`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/soc-labs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
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
    ...[...AWS_LABS, ...SOC_LABS].map((l) => ({
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
