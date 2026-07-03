import type { ReactNode } from "react";

/* ----------------------------------------------------------------------------
   Single source of truth for the small colored level/status badges scattered
   across labs pages (Beginner/Intermediate/Advanced, SIEM/SOAR, "coming soon",
   "in development", "FREE"). Dedup only — colors are unchanged from what was
   previously hardcoded in each page.
---------------------------------------------------------------------------- */

export type BadgeTone = "emerald" | "amber" | "rose" | "violet";

// Tailwind can't see dynamically-built class strings, so each tone's full
// class list is spelled out here (not templated) to survive purging.
const TONE_CLASS: Record<BadgeTone, string> = {
  emerald: "border-emerald-300 bg-emerald-50 text-emerald-700",
  amber: "border-amber-300 bg-amber-50 text-amber-700",
  rose: "border-rose-300 bg-rose-50 text-rose-700",
  violet: "border-violet-300 bg-violet-50 text-violet-700",
};

const TONE_DOT: Record<BadgeTone, string> = {
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
};

/** Lab difficulty level -> badge tone. Emerald=Beginner, amber=Intermediate, rose=Advanced. */
export const LEVEL_TONE: Record<string, BadgeTone> = {
  Beginner: "emerald",
  Intermediate: "amber",
  Advanced: "rose",
};

/** SOC product -> badge tone. Emerald=SIEM, violet=SOAR. */
export const PRODUCT_TONE: Record<string, BadgeTone> = {
  SIEM: "emerald",
  SOAR: "violet",
};

/** "SOC" (used in the Start-here roadmap level chip) rounds out the level map. */
export const ROADMAP_LEVEL_TONE: Record<string, BadgeTone> = {
  ...LEVEL_TONE,
  SOC: "violet",
};

/** Class string for a level/product badge, given any of the tone maps above. */
export function toneClass(tone: BadgeTone): string {
  return TONE_CLASS[tone];
}

/** Small solid dot color for a tone (e.g. labs-wizard category dots). */
export function toneDotClass(tone: BadgeTone): string {
  return TONE_DOT[tone];
}

/** Border/bg/text classes for a lab level (Beginner/Intermediate/Advanced). */
export function levelBadgeClass(level: string): string {
  return TONE_CLASS[LEVEL_TONE[level] ?? "emerald"];
}

/** Border/bg/text classes for a SOC product (SIEM/SOAR). */
export function productBadgeClass(product: string): string {
  return TONE_CLASS[PRODUCT_TONE[product] ?? "emerald"];
}

/** Dot color for a lab level. */
export function levelDotClass(level: string): string {
  return TONE_DOT[LEVEL_TONE[level] ?? "emerald"];
}

type StatusBadgeProps = {
  children: ReactNode;
  tone: BadgeTone;
  className?: string;
};

/** Generic pill badge in one of the four shared tones — border+bg+text, no dot. */
export function StatusBadge({ children, tone, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase ${TONE_CLASS[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** "Coming soon" — amber, the shape used on labs/soc hero + labs/[slug]. */
export function ComingSoonBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700 ${className}`}
    >
      Coming soon
    </span>
  );
}

/** "In development" — amber, the shape used on ai-security + labs/soc pill variants. */
export function InDevelopmentBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 ${className}`}
    >
      In development
    </span>
  );
}

/** "FREE" — emerald, the small inline chip used next to free labs. */
export function FreeBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 ${className}`}
    >
      FREE
    </span>
  );
}
