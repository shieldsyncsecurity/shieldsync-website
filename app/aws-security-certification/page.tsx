import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { SchemaOrg } from "@/components/schema-org";
import { RelatedBlogSection } from "@/components/related-blog-section";
import { FaqSection } from "@/components/sections";
import { VideoEmbed } from "@/components/video-embed";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

const CERT_VIDEO_ID = "XBLtcjQaXZE";
const CERT_VIDEO_TITLE = "Inside a hands-on AWS Security Specialty lab";
import { ArrowRight, Check, Cloud } from "@/components/icons";
import { AWS_LABS, SITE } from "@/lib/site";
import { FreeBadge } from "@/components/status-badge";

const PAGE_URL = `${SITE.url}/aws-security-certification`;

export const metadata: Metadata = {
  title: "AWS Security Specialty (SCS-C03) — Free Practice Labs",
  description:
    "Practice every AWS Security Specialty (SCS-C03) domain in real, isolated AWS accounts. IAM, S3, KMS, VPC, GenAI/ML security, GuardDuty, CloudTrail. First lab free, no card needed. Upgraded from SCS-C02.",
  keywords: [
    "AWS security specialty",
    "SCS-C03 practice",
    "SCS-C03 vs SCS-C02",
    "AWS security certification labs",
    "AWS security certification practice",
    "AWS security specialty practice exam",
    "AWS security specialty hands-on",
    "free AWS security labs",
  ],
  alternates: { canonical: "/aws-security-certification" },
  openGraph: {
    title: "AWS Security Specialty (SCS-C03) — Free Practice Labs",
    description:
      "Practice every SCS-C03 domain in real, isolated AWS accounts. IAM, S3, KMS, VPC, GenAI/ML security, GuardDuty, CloudTrail. First lab free.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Security Specialty (SCS-C03) — Free Practice Labs",
    description: "Practice every SCS-C03 domain in real, isolated AWS accounts. First lab free.",
  },
};

// SCS-C03 official domains (live since Dec 2, 2025 — replaced SCS-C02, retired
// Dec 1, 2025). C03 adds GenAI/ML-security coverage and splits Detection &
// Incident Response into its own domain. Google rewards content that maps to
// canonical exam structure. Each AWS lab we publish should be referenceable here.
const SCS_DOMAINS: { code: string; name: string; weight: string; covers: string; matchTags: string[] }[] = [
  {
    code: "1",
    name: "Threat Detection & Incident Response",
    weight: "14%",
    covers: "GuardDuty, Security Hub, Detective, CloudTrail, incident response runbooks, forensics.",
    matchTags: ["CloudTrail", "Detection", "Incident", "GuardDuty"],
  },
  {
    code: "2",
    name: "Security Logging & Monitoring",
    weight: "18%",
    covers: "CloudTrail, CloudWatch, VPC Flow Logs, log analysis, alerting.",
    matchTags: ["CloudTrail", "Logging", "Monitoring"],
  },
  {
    code: "3",
    name: "Infrastructure Security",
    weight: "20%",
    covers: "VPC design, security groups, NACLs, edge security (WAF, Shield), patching.",
    matchTags: ["VPC", "Network", "WAF", "Infrastructure"],
  },
  {
    code: "4",
    name: "Identity & Access Management",
    weight: "16%",
    covers: "IAM users/roles/policies, least privilege, privilege escalation, federation, SSO, Identity Center.",
    matchTags: ["IAM", "Privilege Escalation", "Least Privilege", "Policy Analysis"],
  },
  {
    code: "5",
    name: "Data Protection",
    weight: "18%",
    covers: "KMS, S3 encryption, Secrets Manager, data classification, in-transit encryption, GenAI/ML data security.",
    matchTags: ["S3", "Encryption", "KMS", "Secrets"],
  },
  {
    code: "6",
    name: "Management & Security Governance",
    weight: "14%",
    covers: "AWS Organizations, SCPs, Config, Trusted Advisor, multi-account strategy.",
    matchTags: ["Governance", "Organizations", "SCP", "Config"],
  },
];

// Match each domain to the labs that exercise it (by tag overlap).
function labsForDomain(matchTags: string[]) {
  return AWS_LABS.filter((l) => l.tags.some((t) => matchTags.includes(t)));
}

const FAQS = [
  {
    q: "Do these labs cover the AWS Security Specialty (SCS-C03) exam objectives?",
    a: "Yes — every lab maps to one or more official SCS-C03 domains. The Identity & Access Management domain is covered by our IAM privilege escalation lab, Data Protection by the S3 misconfiguration audit and KMS encryption labs, Infrastructure Security by the VPC and network labs, and so on. The catalog grows as new lab content ships.",
  },
  {
    q: "What changed between SCS-C02 and SCS-C03?",
    a: "SCS-C03 went live December 2, 2025, replacing SCS-C02 (retired December 1, 2025). The biggest changes: new coverage of GenAI and ML-workload security (Bedrock, SageMaker data protection, model access controls), and Threat Detection & Incident Response is now its own standalone domain instead of being folded into logging and monitoring. The core services — IAM, KMS, VPC, GuardDuty, CloudTrail — are still the backbone of the exam.",
  },
  {
    q: "Is the first lab really free?",
    a: "Yes. The S3 Misconfiguration & Data Exposure lab is free — no credit card, just a Google sign-in. You get a real, isolated AWS account, you do the work in the live console, and the account is auto-wiped when you're done.",
  },
  {
    q: "How are these different from AWS Skill Builder or A Cloud Guru?",
    a: "Skill Builder and A Cloud Guru lean on simulators or shared sandboxes — you watch a walkthrough or click through a fixed UI. Our labs hand you a real, isolated AWS account with the live AWS console. You make the same mistakes you'd make in production, and our grader checks your live account, not a checkbox.",
  },
  {
    q: "Will these labs help with the AWS Certified Solutions Architect Associate (SAA) exam too?",
    a: "Indirectly. SAA is broader than security but has a meaningful security component (IAM, S3 policies, VPC, KMS). The labs that cover those domains will help. For pure security depth — IAM privilege escalation, KMS key policies, incident response — Security Specialty is the closer fit.",
  },
  {
    q: "How much hands-on practice do I need for SCS-C03?",
    a: "Most people who pass on the first attempt spend 40–80 hours in a real AWS console, not just reading. Our labs are 30–90 minutes each; a focused candidate clears the relevant 6–10 labs in 2–3 weeks alongside reading the AWS Security Specialty study guide and FAQ pages for the services in scope.",
  },
];

const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "AWS Security Specialty (SCS-C03) — Free Practice Labs",
    description:
      "Practice every AWS Security Specialty (SCS-C03) domain in real, isolated AWS accounts. First lab free. Upgraded from SCS-C02.",
    dateModified: "2026-06-30",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "AWS Security Certification", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "AWS Security Certification", url: PAGE_URL },
  ]),
  faqSchema(FAQS),
];

export default function AwsSecurityCertificationPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-6 sm:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                AWS Certification prep
              </span>
              <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
                <span className="text-gradient">AWS Security Specialty (SCS-C03)</span> — hands-on practice labs
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                Stop watching walkthroughs. Practise every SCS-C03 domain — IAM privilege escalation, S3 encryption, VPC, KMS, GenAI/ML security, GuardDuty, CloudTrail — in a real, isolated AWS account that&apos;s wiped when you&apos;re done.
              </p>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Upgraded from SCS-C02 — see <a href="#scs-c03-changes" className="font-semibold text-brand-bright hover:underline">what changed</a>.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/free-labs/aws-security">
                  Start free lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/labs" variant="secondary">
                  Browse all AWS labs
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted">
                First lab is <strong className="text-fg">free</strong> · no credit card · auto-wipe when done
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Card hover={false} className="p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                    <Cloud className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">SCS-C03 at a glance</p>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-muted">Format</dt>
                    <dd className="font-semibold text-fg">65 questions, 170 min</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Domains</dt>
                    <dd className="font-semibold text-fg">6 (see below)</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Cost</dt>
                    <dd className="font-semibold text-fg">USD 300</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Validity</dt>
                    <dd className="font-semibold text-fg">3 years</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-muted">
                  Most candidates clear it after 40–80 hours of console-time across the security services.
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Domain → lab mapping */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Domain coverage"
              title="Every SCS-C03 domain, mapped to real AWS labs"
              description="Pick a domain and jump straight to the labs that exercise it on a live AWS console."
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SCS_DOMAINS.map((d) => {
              const labs = labsForDomain(d.matchTags);
              return (
                <Card hover={false} key={d.code} className="flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-fg">
                      Domain {d.code} — {d.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand-bright">
                      {d.weight}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{d.covers}</p>
                  <div className="mt-3 border-t border-line pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">Practice labs</p>
                    {labs.length === 0 ? (
                      <p className="mt-1.5 text-sm italic text-muted">More labs landing soon for this domain.</p>
                    ) : (
                      <ul className="mt-1.5 grid gap-1.5">
                        {labs.map((l) => (
                          <li key={l.slug}>
                            <Link
                              href={`${SITE.labsUrl}/labs/${l.slug}`}
                              className="flex items-start gap-2 text-sm text-fg/90 hover:text-brand-bright"
                            >
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                              <span>
                                {l.title}
                                {l.slug === "s3-misconfiguration-audit" && <FreeBadge className="ml-2" />}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* What changed from SCS-C02 */}
      <section id="scs-c03-changes" className="border-b border-line py-8 sm:py-10 scroll-mt-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Exam transition"
              title="What changed from SCS-C02"
              description="SCS-C03 went live December 2, 2025, replacing SCS-C02 (retired December 1, 2025). Same core discipline, two real changes to how AWS tests it."
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-panel p-4">
              <h3 className="text-sm font-semibold text-fg">GenAI + ML security is now in scope</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">
                SCS-C03 adds coverage of securing generative-AI and machine-learning workloads — Bedrock guardrails, SageMaker data protection, and model access controls sit alongside the classic IAM/KMS/VPC material.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-panel p-4">
              <h3 className="text-sm font-semibold text-fg">Detection &amp; Incident Response is its own domain</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">
                What used to be blended with logging and monitoring is now a standalone domain, with more weight on GuardDuty, Security Hub, Detective, and incident-response runbooks.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-panel p-4">
              <h3 className="text-sm font-semibold text-fg">The core services didn&apos;t change</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">
                IAM, KMS, S3, VPC, GuardDuty, and CloudTrail are still the backbone of the exam. If you already started prepping on SCS-C02 material, most of it still applies — you&apos;re extending, not restarting.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How we differ */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why hands-on labs"
              title="Console time beats walkthroughs"
              description="The SCS-C03 exam tests judgment in scenarios you can only get from working an AWS console — not from a multiple-choice trainer."
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "Real AWS, not a simulator",
                d: "Every lab spins up an isolated AWS account in your browser. You hit the same UI, the same errors, the same eventual-consistency surprises as production.",
              },
              {
                t: "Auto-graded against your live account",
                d: "Hit Check my work and we read your live AWS state — IAM policies, S3 settings, KMS grants — and tell you what passed and what's still open.",
              },
              {
                t: "Wiped automatically",
                d: "When you finish, the account is destroyed. No setup, no cleanup, no surprise bill — you can practice the same scenario five times.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-line bg-panel p-4">
                <h3 className="text-sm font-semibold text-fg">{x.t}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Walkthrough video — full lab session for the qualified visitor who
          is researching SCS-C02 hands-on practice. */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Watch a lab end-to-end"
              title="What hands-on AWS Security Specialty practice actually looks like"
              description="The full lab run — provision, the misconfig scenario, the live grader, the auto-wipe. About 5 minutes."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-6 max-w-4xl">
              <VideoEmbed videoId={CERT_VIDEO_ID} title={CERT_VIDEO_TITLE} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ — shared component, consistent with the free-lab and labs pages */}
      <FaqSection faqs={FAQS} title="AWS Security Specialty — common questions" />

      {/* Related blog */}
      <RelatedBlogSection
        keywords={["Cloud", "AWS", "IAM", "S3", "KMS", "GuardDuty"]}
        title="Related reads for SCS-C03 prep (upgraded from SCS-C02)"
      />

      {/* CTA */}
      <section className="py-8 sm:py-10">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-fg sm:text-xl">Start with the free S3 lab</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                Sign in with Google, get a real isolated AWS account, work through a Domain 5 (Data Protection) scenario end to end.
              </p>
            </div>
            <Button href="/labs-wizard?track=aws">
              Start free lab
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
