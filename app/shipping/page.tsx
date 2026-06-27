import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { LegalDoc, type LegalSection } from "@/components/legal";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "How ShieldSync Security delivers its digital services — training, hands-on labs, and services. All products are delivered electronically; nothing is physically shipped.",
  alternates: { canonical: "/shipping" },
};

const PAGE_URL = `${SITE.url}/shipping`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Shipping & Delivery Policy — ShieldSync Security",
    description: "How our digital services (training, labs, services) are delivered electronically.",
    dateModified: "2026-06-27",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Shipping & Delivery Policy", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Shipping & Delivery Policy", url: PAGE_URL },
  ]),
];

const SECTIONS: LegalSection[] = [
  {
    h: "Digital products only — no physical shipping",
    p: [
      `${SITE.legalName} provides digital services: cybersecurity training, hands-on cloud-security labs, an internship program, and professional services. We do not sell or ship any physical goods, so no shipping method, shipping charge, or courier is involved.`,
    ],
  },
  {
    h: "How and when you receive access",
    p: [
      "Hands-on labs: access is provisioned electronically and is available immediately on the platform after a successful payment — you launch your own isolated lab environment directly from your account, typically within a few minutes.",
      "Training, cohorts & internship: joining details (schedule, access links, and instructions) are sent to your registered email address, generally within 24 hours of a successful payment, and before the program start date for scheduled cohorts.",
      "Professional services: delivery is governed by the specific statement of work or agreement signed for that engagement.",
    ],
  },
  {
    h: "Where delivery is made",
    p: [
      "All delivery is electronic — to the email address you provide at the time of purchase and/or to your account on our platform. Please ensure your email address is correct, and check your spam/promotions folder if you do not see our messages.",
    ],
  },
  {
    h: "If you don't receive access",
    p: [
      `If you have completed a payment but have not received access or joining details within the timeframes above, please contact us at ${CONTACT.email} (or via WhatsApp / phone listed on our Contact page) with your name, order details, and the date of purchase. We will verify the payment and either provision access promptly or, where appropriate, process a refund in line with our Refund & Cancellation Policy.`,
    ],
  },
  {
    h: "Contact",
    p: [`Questions about delivery? Email ${CONTACT.email} or reach us through the channels on our Contact page.`],
  },
];

export default function ShippingPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero
        eyebrow="Legal"
        title="Shipping & Delivery Policy"
        description="How we deliver our digital training, labs, and services — everything is delivered electronically."
      />
      <LegalDoc updated="June 27, 2026" sections={SECTIONS} />
    </>
  );
}
