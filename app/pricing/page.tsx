import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PageHero, FaqSection, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { PricingTiers } from "@/components/pricing-tiers";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Check } from "@/components/icons";
import { SITE } from "@/lib/site";

const PAGE_URL = `${SITE.url}/pricing`;

export const metadata: Metadata = {
  title: "Pricing — AWS Security Labs & Monthly Access",
  description:
    "Simple pricing for hands-on AWS security: a free first lab, pay-per-lab from $3 / ₹99, or monthly all-access. Business services are custom-quoted.",
  keywords: [
    "AWS security labs pricing",
    "cloud security training cost",
    "AWS security lab price",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — ShieldSync AWS Security Labs",
    description: "Free first lab, pay-per-lab, or monthly all-access. Business services custom-quoted.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — ShieldSync AWS Security Labs",
    description: "Free first lab, pay-per-lab, or monthly all-access.",
  },
};

const FAQS = [
  {
    q: "Is the first lab really free?",
    a: "Yes. The S3 Misconfiguration & Data Exposure lab is free — no credit card. You sign in with Google, get a real isolated AWS account, do the work in the live console, and the account is wiped when you finish.",
  },
  {
    q: "What does pay-per-lab include?",
    a: "A one-time payment for a single lab gives you 30 launches within a 7-day window that starts on your first launch. You can re-run the same lab as many times as you need within that window to practise until it sticks.",
  },
  {
    q: "What's in the monthly plan?",
    a: "Every AWS security lab in the catalog, plus new labs as we ship them, with unlimited launches under fair use. Cancel anytime — your access runs to the end of the paid cycle.",
  },
  {
    q: "How much do business services cost?",
    a: "Services — cloud security assessments, compliance readiness, managed detection, AI/LLM security testing — are scoped per engagement and custom-quoted. Book a call and we'll size it to your environment.",
  },
  {
    q: "Which currencies and payment methods do you accept?",
    a: "Prices are shown in your region's currency. In India we support UPI and cards; international payments are processed securely at checkout. You're charged in your local currency.",
  },
];

const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Pricing — ShieldSync AWS Security Labs",
    description: "Free first lab, pay-per-lab, and monthly all-access. Business services custom-quoted.",
    dateModified: "2026-07-03",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Pricing", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Pricing", url: PAGE_URL },
  ]),
  faqSchema(FAQS),
];

export default function PricingPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Start free. <span className="text-gradient">Pay only when it&apos;s worth it.</span>
          </>
        }
        description="Real, isolated AWS accounts — not simulators. Begin with a free lab, buy single labs as you need them, or go monthly for the whole catalog."
      />

      {/* Tiers */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <PricingTiers />
        </Container>
      </section>

      {/* For businesses */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">For businesses</p>
                <h2 className="mt-1 text-xl font-bold text-fg sm:text-2xl">Services are scoped to your environment</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  Cloud security assessments, compliance readiness, managed detection, and AI/LLM security testing are
                  custom-quoted per engagement. Tell us your stack and goals — we&apos;ll size it.
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
                  {["AWS-deep assessments", "SOC 2 / ISO 27001 / GDPR / DPDP", "Detection & response", "AI/LLM security"].map((p) => (
                    <li key={p} className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 shrink-0 text-brand" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button href="/contact">
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/services" variant="secondary">
                  See services
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={FAQS} title="Pricing — questions people ask" />

      <CtaBand
        title="Start with the free lab"
        subtitle="Real isolated AWS account in 30 seconds. No credit card. See for yourself before you pay anything."
        primary={{ label: "Start free lab", href: "/free-lab" }}
        secondary={{ label: "Browse all AWS labs", href: "/labs" }}
      />
    </>
  );
}
