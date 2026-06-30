"use client";

import { useSearchParams } from "next/navigation";
import { LabsWizard } from "@/components/labs-wizard";

/* Reads the deep-link query params CLIENT-SIDE so the /labs-wizard route can
 * stay STATIC (edge-cached) instead of server-rendering on every request.
 *
 * Why this matters: reading searchParams in the page's Server Component forces
 * the route to be dynamic (ƒ) — a full worker SSR per hit — which on the
 * Cloudflare Free plan is the page most likely to trip the 10ms CPU cap
 * (surfacing as 1101/1102). Moving the read here keeps the HTML static and
 * served from the edge; the params resolve in the browser. Must be wrapped in
 * <Suspense> by the page (Next requirement for useSearchParams in a static route). */
export function LabsWizardLauncher() {
  const sp = useSearchParams();
  const track = sp.get("track");
  const plan = sp.get("plan");
  const level = sp.get("level");

  const initialTrack = track === "aws" || track === "soc" ? track : undefined;
  const initialPlan = plan === "per-lab" || plan === "monthly" ? plan : undefined;
  const initialLevel =
    level === "Beginner" || level === "Intermediate" || level === "Advanced" ? level : undefined;

  return (
    <LabsWizard
      initialCurrency="USD"
      serverDetected={false}
      initialTrack={initialTrack}
      initialPlan={initialPlan}
      initialLevel={initialLevel}
    />
  );
}
