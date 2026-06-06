import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { LegalDoc, type LegalSection } from "@/components/legal";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of ShieldSync Security's website, training, and labs.",
};

const PAGE_URL = `${SITE.url}/terms`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Terms of Service — ShieldSync Security",
    description: "Terms governing use of our website, training, and labs.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Terms of Service", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Terms of Service", url: PAGE_URL },
  ]),
];

const SECTIONS: LegalSection[] = [
  { h: "Acceptance of terms", p: [`By using ${SITE.url} or any ${SITE.legalName} service, you agree to these terms. If you do not agree, please do not use our services.`] },
  { h: "Our services", p: ["We provide cybersecurity services, training programs, an internship, and hands-on labs. Service availability and content may change over time."] },
  { h: "Accounts", p: ["You are responsible for keeping your account credentials secure and for activity under your account. Provide accurate information when you register or apply."] },
  { h: "Acceptable use", p: ["Our labs are for learning and authorised practice only. You agree not to use any techniques learned against systems you do not own or have explicit written permission to test, and not to misuse, disrupt, or attempt to breach our platform."] },
  { h: "Payments & access", p: ["Paid programs, services, and labs are billed as described at the point of purchase. Access is granted for the stated scope and duration. Pricing may be shown in your local currency at checkout."] },
  { h: "Intellectual property", p: ["All content, course material, lab environments, and branding are owned by ShieldSync or its licensors. You may use them for your own learning but may not redistribute or resell them without permission."] },
  { h: "Disclaimers", p: ["Services are provided “as is”. Training and labs are educational; we do not guarantee specific employment, certification, or security outcomes."] },
  { h: "Limitation of liability", p: ["To the maximum extent permitted by law, ShieldSync is not liable for indirect or consequential damages arising from use of our services."] },
  { h: "Governing law", p: ["These terms are governed by the laws of India, with exclusive jurisdiction of the courts at Noida, Uttar Pradesh."] },
  { h: "Changes", p: ["We may update these terms; material changes will be reflected by the “last updated” date. Continued use means acceptance of the updated terms."] },
  { h: "Contact", p: [`Questions about these terms? Email ${CONTACT.email}.`] },
];

export default function TermsPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero eyebrow="Legal" title="Terms of Service" description="The terms that govern your use of our website, training, and labs." />
      <LegalDoc updated="June 4, 2026" sections={SECTIONS} />
    </>
  );
}
