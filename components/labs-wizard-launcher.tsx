"use client";

import { useSearchParams } from "next/navigation";
import { LabsWizard } from "@/components/labs-wizard";

/* Reads the deep-link query params CLIENT-SIDE so the /labs-wizard route can
 * stay STATIC. Reading searchParams in the page's Server Component would make
 * the route dynamic, which the Amplify static export (output: "export") cannot
 * build — so the params must resolve in the browser, wrapped in <Suspense> by
 * the page (Next requirement for useSearchParams in a static route). */
// Descriptive ?track= slugs (owner, 2026-07-07) mapped to the wizard's internal
// track keys; legacy short values stay accepted so old links/ads keep working.
const TRACK_PARAM: Record<string, "aws" | "soc" | "ai" | "azure" | "free"> = {
  "aws-security-labs": "aws",
  aws: "aws",
  "soc-labs": "soc",
  soc: "soc",
  "ai-security-labs": "ai",
  ai: "ai",
  "azure-security-labs": "azure",
  azure: "azure",
  "free-security-labs": "free",
  free: "free",
};

export function LabsWizardLauncher() {
  const sp = useSearchParams();
  const track = sp.get("track");
  const plan = sp.get("plan");
  const level = sp.get("level");

  const initialTrack = track ? TRACK_PARAM[track] : undefined;
  const initialPlan = plan === "per-lab" || plan === "monthly" ? plan : undefined;
  const initialLevel =
    level === "Beginner" || level === "Intermediate" || level === "Advanced" ? level : undefined;

  return <LabsWizard initialTrack={initialTrack} initialPlan={initialPlan} initialLevel={initialLevel} />;
}
