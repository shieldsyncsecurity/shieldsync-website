import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { LegalDoc, type LegalSection } from "@/components/legal";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ShieldSync Security collects, uses, and protects your personal information.",
};

const PAGE_URL = `${SITE.url}/privacy`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Privacy Policy — ShieldSync Security",
    description: "How we collect, use, and protect personal information.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Privacy Policy", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Privacy Policy", url: PAGE_URL },
  ]),
];

const SECTIONS: LegalSection[] = [
  { h: "Who we are", p: [`${SITE.legalName} ("ShieldSync", "we", "us") operates ${SITE.url} and related training and labs services. We are based in ${CONTACT.addressLine}.`] },
  { h: "Information we collect", p: ["Information you provide — such as your name, email, phone number, and message — when you contact us, apply for the internship, or sign up for training or labs.", "Usage data — basic, privacy-respecting analytics about how the site is used (pages visited, device type), to improve the experience."] },
  { h: "How we use your information", p: ["To respond to enquiries, deliver services, training, and labs, process applications and payments, send relevant updates you've asked for, and improve our offerings.", "We do not sell your personal information."] },
  { h: "Sharing", p: ["We share information only with service providers who help us operate (for example, form delivery, payment, hosting, and email), bound by confidentiality, and where required by law."] },
  { h: "Data retention", p: ["We keep personal information only as long as needed for the purposes above, or as required by law, after which it is deleted or anonymised."] },
  { h: "Your rights", p: ["Depending on your location (including under GDPR and India's DPDP Act), you may have rights to access, correct, delete, or restrict use of your information, and to withdraw consent. To exercise these, contact us at " + CONTACT.email + "."] },
  { h: "Cookies", p: ["We use minimal cookies necessary for the site to function and for privacy-respecting analytics. You can control cookies through your browser settings."] },
  { h: "Security", p: ["We apply reasonable technical and organisational measures to protect your information. No method of transmission or storage is perfectly secure, but we work to keep your data safe."] },
  { h: "Contact", p: [`Questions about this policy? Email ${CONTACT.email}.`] },
];

export default function PrivacyPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero eyebrow="Legal" title="Privacy Policy" description="How we collect, use, and protect your information." />
      <LegalDoc updated="June 4, 2026" sections={SECTIONS} />
    </>
  );
}
