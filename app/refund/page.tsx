import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { LegalDoc, type LegalSection } from "@/components/legal";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "ShieldSync Security's refund and cancellation policy for training, the internship, and labs.",
};

const PAGE_URL = `${SITE.url}/refund`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Refund Policy — ShieldSync Security",
    description: "Refund and cancellation policy for training, internship, and labs.",
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
  { h: "Internship & paid programs", p: ["You may request a full refund within 7 days of enrolment, provided the program has not yet started and you have not received substantial materials. Once a program has begun, fees are non-refundable, except where required by law.", "(Adjust this window and conditions to your final policy.)"] },
  { h: "Paid labs & subscriptions", p: ["One-time lab purchases are non-refundable once the lab has been launched. Subscriptions can be cancelled anytime and stop renewing at the end of the current period; partial periods are not refunded."] },
  { h: "Services engagements", p: ["Professional services are governed by the specific statement of work or agreement signed for that engagement."] },
  { h: "How to request a refund", p: [`Email ${CONTACT.email} with your name, what you purchased, and the date. We aim to respond within 2 business days and process eligible refunds to the original payment method.`] },
  { h: "Contact", p: [`Questions about refunds? Email ${CONTACT.email}.`] },
];

export default function RefundPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero eyebrow="Legal" title="Refund Policy" description="Our refund and cancellation policy for training, the internship, and labs." />
      <LegalDoc updated="June 4, 2026" sections={SECTIONS} />
    </>
  );
}
