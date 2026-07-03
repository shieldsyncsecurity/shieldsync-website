import type { Metadata } from "next";
import { Container, Card, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { BlogCarousel } from "@/components/blog-carousel";
import { VideoEmbed } from "@/components/video-embed";
import {
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
  courseSchema,
} from "@/lib/schema";

const FREE_LAB_VIDEO_ID = "XBLtcjQaXZE";
const FREE_LAB_VIDEO_TITLE = "Watch a real AWS security lab end-to-end";
import { ArrowRight, Check, Cloud, Shield, Lock } from "@/components/icons";
import { SITE, BLOG_POSTS } from "@/lib/site";

const PAGE_URL = `${SITE.url}/free-lab`;
const LAUNCH_URL =
  "https://labs.shieldsyncsecurity.com/labs/s3-misconfiguration-audit?intent=launch";

export const metadata: Metadata = {
  title: "Free AWS Security Lab — Real Isolated AWS Account, No Credit Card | ShieldSync",
  description:
    "A 30-minute free AWS security lab in a real, isolated AWS account. Spot public S3 buckets, fix IAM, enforce KMS. No credit card, no setup, auto-wiped.",
  keywords: [
    "free AWS security lab",
    "free AWS hands-on",
    "free cloud security lab",
    "AWS S3 security lab",
    "free AWS sandbox",
    "AWS security practice free",
    "hands-on AWS security",
  ],
  alternates: { canonical: "/free-lab" },
  openGraph: {
    title: "Free AWS Security Lab — Real Isolated AWS Account, No Credit Card",
    description:
      "30 minutes in a real, isolated AWS account. Find the misconfigured S3 bucket, fix IAM, enforce KMS. Free, no card, auto-graded.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AWS Security Lab — Real Isolated AWS Account, No Credit Card",
    description:
      "30 min in a real AWS account. Find public S3, fix IAM, enforce KMS. Free, auto-graded.",
  },
};

const OUTCOMES = [
  "Spot public S3 buckets the way auditors actually find them",
  "Enforce KMS encryption (SSE-KMS) and verify it on live objects",
  "Tighten over-broad IAM policies down to least privilege",
  "Block public access at the account + bucket level",
  "Verify every fix with our auto-grader against your live AWS state",
  "Walk away with screenshots and a written record of what you did",
];

const STEPS = [
  {
    n: "1",
    t: "Sign in with Google",
    d: "No forms, no credit card. One click and you're in.",
  },
  {
    n: "2",
    t: "Get a real AWS account in ~30 seconds",
    d: "We provision an isolated AWS account just for you, with the broken S3 scenario pre-seeded.",
  },
  {
    n: "3",
    t: "30 min of hands-on work, then auto-wipe",
    d: "Fix the misconfigurations, click 'Check my work,' get graded. Account is wiped — zero AWS bill.",
  },
];

const DIFFS = [
  {
    icon: Cloud,
    t: "Real isolated AWS account",
    d: "Not a simulator. Not a video. You're clicking inside the actual AWS Console with real S3, IAM, and KMS resources.",
  },
  {
    icon: Check,
    t: "Grader checks your live state",
    d: "Our auto-grader hits the AWS APIs against your account and verifies the fix actually works — not just that you read the answer.",
  },
  {
    icon: Shield,
    t: "Auto-wipe, no setup, no bill",
    d: "Zero AWS setup on your side. When the session ends the account is destroyed. You never see a bill.",
  },
];

const FAQS = [
  {
    q: "Is it really free? What's the catch?",
    a: "Yes — the first AWS S3 security lab is fully free, no credit card. We cover the AWS cost. The catch: free seats are rate-limited, so at busy times you may need to wait a minute. Paid labs unlock the rest of the catalog (IAM privilege escalation, KMS, VPC, GuardDuty, CloudTrail).",
  },
  {
    q: "Do I need my own AWS account?",
    a: "No. We provision a dedicated, isolated AWS account for your session. You sign in with Google, click Launch, and you're in the AWS Console in about 30 seconds.",
  },
  {
    q: "What happens to my data when the lab ends?",
    a: "The entire AWS account is destroyed at session end — every S3 bucket, every IAM role, every log. Nothing persists. You can re-launch the lab any time to get a fresh environment.",
  },
  {
    q: "Can I get a certificate for finishing?",
    a: "The free lab issues a completion record once the auto-grader confirms your fix. For a formal certificate tied to the AWS Security Specialty (SCS-C03) syllabus, see our certification track.",
  },
  {
    q: "Can I retry if I get stuck or fail the grader?",
    a: "Yes. You can re-run the grader as many times as you want inside a session, and you can re-launch a fresh lab whenever you want a clean account to try again.",
  },
  {
    q: "How do I get access to more labs after this?",
    a: "After the free S3 lab, the full AWS catalog (IAM, KMS, VPC, GuardDuty, CloudTrail, incident response) is available on the paid track. We also publish SCS-C03-mapped study paths so each lab maps to an exam domain.",
  },
];

export default function FreeLabPage() {
  const KW = ["s3", "iam", "encryption", "kms", "aws", "cloud"];
  const matched = BLOG_POSTS.filter((p) =>
    KW.some((k) => p.category.toLowerCase().includes(k.toLowerCase())),
  );
  const rest = BLOG_POSTS.filter((p) => !matched.includes(p));
  const posts = [...matched, ...rest].slice(0, 6);

  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: "Free AWS Security Lab", url: PAGE_URL },
  ];

  return (
    <>
      <SchemaOrg
        schema={[
          webPageSchema({
            url: PAGE_URL,
            name: "Free AWS Security Lab — Real Isolated AWS Account",
            description:
              "A 30-minute free AWS security lab in a real, isolated AWS account. Spot public S3 buckets, fix IAM, enforce KMS. No credit card, auto-graded, auto-wiped.",
            breadcrumb: breadcrumbs,
          }),
          breadcrumbSchema(PAGE_URL, breadcrumbs),
          faqSchema(FAQS),
          courseSchema({
            url: PAGE_URL,
            name: "Free AWS S3 Security Lab — Misconfiguration Audit",
            description:
              "Hands-on AWS S3 security lab in a real, isolated AWS account. Identify and fix public buckets, over-broad IAM, and missing KMS encryption, then verify your fixes with an auto-grader.",
            level: "Beginner",
            hoursMin: 30,
            free: true,
          }),
        ]}
      />

      {/* Hero: two-column, CTA above the fold. Left = pitch + primary CTA,
          right = the three "not a simulator" differentiators (fills the
          dead whitespace and replaces the old standalone section below). */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Free · Real AWS · 30 min
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Free AWS Security Lab — Real Isolated AWS Account, No Credit Card
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Launch a 30-minute hands-on lab in your own isolated AWS account. Find the
              misconfigured S3 bucket, fix IAM, enforce KMS — graded against your live AWS state.
            </p>

            <div className="mt-5 flex flex-col items-start gap-1.5">
              <Button href={LAUNCH_URL} external newTab>
                Start free lab
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted">Google sign-in · no card · live in ~60 seconds</p>
            </div>

            <a
              href="#watch"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition hover:text-brand"
            >
              Watch a 2-min run ↓
            </a>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-line bg-panel p-5 shadow-xl shadow-slate-900/5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Not a simulator
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {DIFFS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.t} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                        <Icon className="h-5 w-5 text-brand-bright" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-fg">{d.t}</h3>
                        <p className="mt-1 text-xs leading-5 text-muted">{d.d}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What you'll learn */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What you'll learn"
              title="Concrete skills you'll walk away with"
            />
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {OUTCOMES.map((o) => (
              <div
                key={o}
                className="flex items-start gap-3 rounded-xl border border-line bg-panel p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                <p className="text-sm leading-6 text-fg">{o}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Three steps to a real AWS Console"
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <Card key={s.n} className="p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-mono text-sm font-bold text-brand-bright">
                  {s.n}
                </div>
                <h3 className="mt-3 text-base font-bold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Next step: SCS-C03 + paid labs */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="After the free lab"
              title="Your next step: SCS-C03 + the full AWS catalog"
              description="Once you finish the S3 lab, you can keep going on the AWS Security Specialty (SCS-C03) track and the rest of the paid labs."
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <Lock className="h-6 w-6 text-brand-bright" />
              <h3 className="mt-3 text-base font-bold text-fg">
                AWS Security Specialty (SCS-C03) prep
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Map every lab to an SCS-C03 exam domain. Practice IAM, KMS, VPC, GuardDuty, CloudTrail in real AWS — not flashcards.
              </p>
              <div className="mt-4">
                <Button href="/aws-security-certification" variant="secondary">
                  See the SCS-C03 track <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
            <Card className="p-5">
              <Cloud className="h-6 w-6 text-brand-bright" />
              <h3 className="mt-3 text-base font-bold text-fg">
                Browse all AWS security labs
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                IAM privilege escalation, KMS, VPC isolation, GuardDuty, CloudTrail forensics — every lab is a real, isolated AWS account with an auto-grader.
              </p>
              <div className="mt-4">
                <Button href="/labs" variant="secondary">
                  All AWS labs <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Related blog */}
      {posts.length > 0 && (
        <section className="border-b border-line py-8 sm:py-10">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                eyebrow="From the blog"
                title="Read more on AWS security"
              />
              <Button href="/blog" variant="secondary" className="shrink-0 self-start">
                All posts <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6">
              <BlogCarousel posts={posts} />
            </div>
          </Container>
        </section>
      )}

      {/* See it in action — full walkthrough (4-5 min) for the qualified
          visitor who's already landed on the free-lab page. Anchored by
          the "Watch a 2-min run" link in the hero. */}
      <section id="watch" className="border-b border-line py-8 sm:py-10 scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Watch a real run"
              title="What happens when you click Launch"
              description="The full lab walkthrough — provisioning, the misconfig scenario, the live grader, the auto-wipe. About 5 minutes."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-6 max-w-4xl">
              <VideoEmbed videoId={FREE_LAB_VIDEO_ID} title={FREE_LAB_VIDEO_TITLE} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <FaqSection faqs={FAQS} title="Free AWS lab — questions people ask" />

      {/* Final CTA */}
      <CtaBand
        title="Launch your free AWS security lab now"
        subtitle="Real isolated AWS account in 30 seconds. No credit card. Auto-graded. Auto-wiped."
        primary={{ label: "Start free lab", href: LAUNCH_URL }}
        primaryCaption="Google sign-in · no card · live in ~60 seconds"
        secondary={{ label: "Browse all AWS labs", href: "/labs" }}
      />
    </>
  );
}
