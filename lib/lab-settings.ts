// Per-lab settings overrides — MIRROR of the canonical file in
// labs-platform/app/lab-settings.json, kept identical by the labs /admin/labs
// panel (which commits both repos) or scripts/sync-lab-settings.mjs run from
// labs-platform. null / empty = no override.
import raw from "./lab-settings.json";
import type { Money } from "./region";

type Setting = {
  priceINR?: number | null; // rupees
  priceUSD?: number | null; // dollars
  keywords?: string[];
  live?: boolean | null;
  free?: boolean | null;
};

const SETTINGS: Record<string, Setting> = (raw as { labs?: Record<string, Setting> }).labs ?? {};

/** Price override (major units) merged over a level price. */
export function withPriceOverride(slug: string, base: Money): Money {
  const s = SETTINGS[slug];
  if (!s) return base;
  const inr = typeof s.priceINR === "number" ? s.priceINR : null;
  const usd = typeof s.priceUSD === "number" ? s.priceUSD : null;
  if (inr == null && usd == null) return base;
  return { inr: inr ?? base.inr, usd: usd ?? base.usd };
}

/** Merge keyword/free overrides onto a marketing lab entry. Pure — returns a copy. */
export function applyLabSettings<T extends { slug: string; tags: string[]; free?: boolean }>(lab: T): T {
  const s = SETTINGS[lab.slug];
  if (!s) return lab;
  const kw = Array.isArray(s.keywords) ? s.keywords.filter((k) => typeof k === "string" && k.trim()) : [];
  return {
    ...lab,
    tags: kw.length ? kw : lab.tags,
    ...(typeof s.free === "boolean" ? { free: s.free } : {}),
  };
}
