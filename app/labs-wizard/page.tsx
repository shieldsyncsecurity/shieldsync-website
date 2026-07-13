import type { Metadata } from "next";
import { Suspense } from "react";
import { LabsWizardLauncher } from "@/components/labs-wizard-launcher";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start an AWS Security Lab — Pick a plan and launch",
  description:
    "Pick your plan and start a hands-on AWS security lab in a real, isolated AWS account. Free first lab, pay-per-lab ₹249, or monthly access to every AWS security lab.",
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

// STATIC route. Deep-link query params (?track=aws&plan=monthly, etc.) are read
// CLIENT-SIDE in <LabsWizardLauncher> via useSearchParams, so this page no
// longer server-renders per request — it's prerendered + edge-cached. That
// removes /labs-wizard from the worker SSR path, which is what was tripping
// 1101/1102 on it under the Cloudflare Free-plan CPU cap. Region/currency is
// likewise resolved client-side (browser timezone → INR for India).
export default function LabsWizardPage() {
  return (
    // The fallback carries a real H1 into the STATIC HTML (the client
    // component behind it renders nothing until hydration, so without this
    // fallback the page ships zero heading tags to a raw-HTML crawler —
    // matches <h1 className="sr-only"> in labs-wizard.tsx so there's no
    // visible flash when the client view takes over.
    <Suspense fallback={<h1 className="sr-only">Start an AWS Security Lab</h1>}>
      <LabsWizardLauncher />
    </Suspense>
  );
}
