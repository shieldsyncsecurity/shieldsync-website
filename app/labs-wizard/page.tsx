import type { Metadata } from "next";
import { LabsWizard } from "@/components/labs-wizard";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start an AWS Security Lab — Pick a plan and launch",
  description:
    "Pick your plan and start a hands-on AWS security lab in a real, isolated AWS account. Free first lab, pay-per-lab from ₹99, or monthly access to every AWS security lab.",
  keywords: [
    "AWS security lab",
    "AWS security training",
    "AWS cloud security course",
    "hands-on AWS labs",
    "AWS IAM training",
  ],
  alternates: { canonical: "/labs-wizard" },
  openGraph: {
    title: "Start an AWS Security Lab — ShieldSync",
    description:
      "Pick your plan and launch a hands-on AWS security lab in a real, isolated AWS account. Free first lab.",
    url: `${SITE.url}/labs-wizard`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start an AWS Security Lab — ShieldSync",
    description: "Real, isolated AWS account. Free first lab. Pick your plan and launch.",
  },
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
