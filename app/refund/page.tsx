import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { LegalDoc, type LegalSection } from "@/components/legal";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "ShieldSync Security's refund and cancellation policy for training, the Foundation Program, and labs.",
  alternates: { canonical: "/refund" },
};

const PAGE_URL = `${SITE.url}/refund`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Refund Policy — ShieldSync Security",
    description: "Refund and cancellation policy for training, the Foundation Program, and labs.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Refund Policy", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Refund Policy", url: PAGE_URL },
  ]),
];

const SECTIONS: LegalSection[] = [
  { h: "Overview", p: ["We want you to be confident in enrolling. This policy explains when refunds apply across our programs and services."] },
  { h: "Free labs", p: ["Free labs carry no charge and therefore no refund."] },
  { h: "Foundation Program & paid programs", p: ["You may request a full refund within 7 days of enrolment, provided the program has not yet started and you have not received substantial materials. Once a program has begun, fees are non-refundable, except where required by law."] },
  { h: "Paid labs & subscriptions", p: ["Each hands-on lab provisions a real, dedicated cloud environment for you, so a one-time lab purchase is non-refundable once the lab has been launched. If you purchased a lab but have not launched it, you may request a refund within 7 days of purchase.", "Subscriptions can be cancelled anytime from your account or by emailing us; cancellation stops future renewals and your access continues until the end of the current paid period. Partial or unused periods are not refunded."] },
  { h: "Cancellation", p: ["You can cancel an order or subscription before access is delivered/launched for a full refund. To cancel, email us at the address below with your order details."] },
  { h: "Services engagements", p: ["Professional services are governed by the specific statement of work or agreement signed for that engagement."] },
  { h: "How to request a refund", p: [`Email ${CONTACT.email} with your name, what you purchased, and the date of purchase. We aim to respond within 2 business days. Approved refunds are processed to the original payment method, typically within 5–7 business days (the time for funds to appear depends on your bank or card issuer).`] },
  { h: "Contact", p: [`Questions about refunds or cancellations? Email ${CONTACT.email} or reach us through the channels on our Contact page.`] },
];

export default function RefundPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero eyebrow="Legal" title="Refund & Cancellation Policy" description="Our refund and cancellation policy for training, the Foundation Program, and labs." />
      <LegalDoc updated="June 4, 2026" sections={SECTIONS} />
    </>
  );
}
