import type { Metadata } from "next";
import { LabsWizard } from "@/components/labs-wizard";

export const metadata: Metadata = {
  title: "Start a hands-on lab",
  robots: { index: false, follow: false },
  alternates: { canonical: "/labs-wizard" },
};

export default async function LabsWizardPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string; plan?: string; level?: string }>;
}) {
  // Region/currency is resolved CLIENT-SIDE in <LabsWizard> (browser timezone →
  // INR for India, manual ₹/$ toggle otherwise). We dropped the edge middleware
  // because OpenNext/Cloudflare doesn't support Next 16's Node-runtime "Proxy"
  // yet — and the binary IN-vs-rest currency logic works fine from the timezone.

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
      initialCurrency="USD"
      serverDetected={false}
      initialTrack={initialTrack}
      initialPlan={initialPlan}
      initialLevel={initialLevel}
    />
  );
}
