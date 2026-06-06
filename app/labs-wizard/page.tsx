import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { LabsWizard } from "@/components/labs-wizard";
import { currencyForCountry, COUNTRY_COOKIE } from "@/lib/region";

export const metadata: Metadata = {
  title: "Start a hands-on lab",
  robots: { index: false, follow: false },
};

export default async function LabsWizardPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string; plan?: string; level?: string }>;
}) {
  // Region resolved by proxy.ts (edge geo header / ?country= / cookie).
  const h = await headers();
  const c = await cookies();
  const country = (h.get("x-ss-country") || c.get(COUNTRY_COOKIE)?.value || "").toUpperCase();
  const detected = country.length === 2;

  // Campaign deep-links (e.g. AWS-labs ads) skip the "which track?" step:
  //   /labs-wizard?track=aws              → opens on the Plan step, AWS pre-selected
  //   /labs-wizard?track=aws&plan=monthly → jumps straight to the subscription
  const sp = await searchParams;
  const initialTrack = sp.track === "aws" || sp.track === "soc" ? sp.track : undefined;
  const initialPlan = sp.plan === "per-lab" || sp.plan === "monthly" ? sp.plan : undefined;
  const initialLevel =
    sp.level === "Beginner" || sp.level === "Intermediate" || sp.level === "Advanced" ? sp.level : undefined;

  return (
    <LabsWizard
      initialCurrency={currencyForCountry(country)}
      serverDetected={detected}
      initialTrack={initialTrack}
      initialPlan={initialPlan}
      initialLevel={initialLevel}
    />
  );
}
