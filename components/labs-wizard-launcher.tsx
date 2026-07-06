"use client";

import { useSearchParams } from "next/navigation";
import { LabsWizard } from "@/components/labs-wizard";

/* Reads the deep-link query params CLIENT-SIDE so the /labs-wizard route can
 * stay STATIC. Reading searchParams in the page's Server Component would make
 * the route dynamic, which the Amplify static export (output: "export") cannot
 * build — so the params must resolve in the browser, wrapped in <Suspense> by
 * the page (Next requirement for useSearchParams in a static route). */
export function LabsWizardLauncher() {
  const sp = useSearchParams();
  const track = sp.get("track");
  const plan = sp.get("plan");
  const level = sp.get("level");

  const initialTrack = track === "aws" || track === "soc" ? track : undefined;
  const initialPlan = plan === "per-lab" || plan === "monthly" ? plan : undefined;
  const initialLevel =
    level === "Beginner" || level === "Intermediate" || level === "Advanced" ? level : undefined;

  return <LabsWizard initialTrack={initialTrack} initialPlan={initialPlan} initialLevel={initialLevel} />;
}
