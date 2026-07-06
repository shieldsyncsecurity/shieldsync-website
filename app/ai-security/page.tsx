import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, Card, Pill, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, courseListSchema } from "@/lib/schema";
import { ArrowRight, Shield, Lock, Code } from "@/components/icons";
import { SITE, BLOG_POSTS } from "@/lib/site";
import { InDevelopmentBadge } from "@/components/status-badge";

export const metadata: Metadata = {
  title: "AI & LLM Security Training — Hands-on, on AWS",
  description:
    "Practical AI and LLM security for cloud teams — securing Amazon Bedrock, RAG pipelines, AI agents (MCP), and AI coding assistants. SCS-C03 now covers GenAI security. Hands-on Bedrock lab in development.",
  keywords: [
    "AI security",
    "LLM security",
    "GenAI security training",
    "Amazon Bedrock security",
    "RAG security",
    "AI agent security",
    "MCP security",
    "OWASP LLM Top 10",
    "AI coding assistant security",
  ],
  alternates: { canonical: "/ai-security" },
  openGraph: {
    title: "AI & LLM Security Training — Hands-on, on AWS",
    description:
      "Practical AI security for cloud teams — Bedrock, RAG, AI agents, and AI coding assistants. Hands-on Bedrock security lab in development.",
    url: `${SITE.url}/ai-security`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & LLM Security Training — Hands-on, on AWS",
    description: "Practical AI security for cloud teams — Bedrock, RAG, AI agents, and AI coding assistants.",
  },
};

const PAGE_URL = `${SITE.url}/ai-security`;

const AI_SECURITY_SLUGS = [
  "securing-amazon-bedrock",
  "rag-security-vector-db",
  "securing-ai-agents-mcp",
  "llm-security-checklist-aws-bedrock",
  "securing-ai-coding-assistants",
] as const;

const AI_POSTS = AI_SECURITY_SLUGS
  .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "AI & LLM Security Training — Hands-on, on AWS",
    description:
      "Practical AI and LLM security for cloud teams — securing Amazon Bedrock, RAG pipelines, AI agents (MCP), and AI coding assistants.",
    dateModified: "2026-07-03",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "AI Security", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "AI Security", url: PAGE_URL },
  ]),
  courseListSchema({
    url: PAGE_URL,
    name: "AI & LLM Security guides",
    items: AI_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      name: p.title,
      description: p.excerpt,
    })),
  }),
];

export default function AiSecurityPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-6 sm:py-8">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              AI Security
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
              <span className="text-gradient">AI &amp; LLM Security</span> — learn it hands-on.
            </h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Practical AI security for cloud teams — securing what you actually run in production: Amazon Bedrock,
              RAG pipelines, AI agents, and the coding assistants your developers already use. Our AWS Security
              Specialty (SCS-C03) track now includes GenAI security as part of the syllabus.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/aws-security-certification">
                See the SCS-C03 track
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={SITE.freeLabUrl} variant="secondary" external newTab>
                Start free lab
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Guides grid ──────────────────────────────────────────────── */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Guides"
              title="Practitioner guides — AI &amp; LLM security on AWS"
              description="Five deep, practitioner-written guides covering the AI security surfaces cloud and security teams run into first."
            />
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AI_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60} className="h-full">
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col p-5">
                    <Pill tone="brand">{post.category}</Pill>
                    <h3 className="mt-3 text-base font-bold leading-snug text-fg group-hover:text-brand-bright">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                      <span>{post.read} read</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-bright">
                        Read guide <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What's coming ────────────────────────────────────────────── */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-bright">
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-fg">
                    What&apos;s coming
                    <InDevelopmentBadge />
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    A hands-on Amazon Bedrock security lab — find and fix real IAM, Guardrails, and data-isolation
                    misconfigurations in a live AWS account, the same way our AWS security labs work today.
                  </p>
                </div>
              </div>
              <Button href="/contact" variant="secondary" className="shrink-0">
                Get notified <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Why ShieldSync for AI security ──────────────────────────── */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why ShieldSync" title="Security for AI, built by cloud security practitioners" />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <Shield className="h-6 w-6 text-brand-bright" />
              <h3 className="mt-3 text-base font-bold text-fg">AWS-native, not generic</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Every guide maps to concrete AWS controls — IAM policies, Bedrock Guardrails, KMS, VPC endpoints —
                not abstract AI-safety theory.
              </p>
            </Card>
            <Card className="p-5">
              <Code className="h-6 w-6 text-brand-bright" />
              <h3 className="mt-3 text-base font-bold text-fg">Covers what you already run</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Bedrock, RAG over vector databases, agent tool-use via MCP, and the AI coding assistants your
                developers use daily — the real attack surface, today.
              </p>
            </Card>
            <Card className="p-5">
              <Lock className="h-6 w-6 text-brand-bright" />
              <h3 className="mt-3 text-base font-bold text-fg">Part of a bigger track</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                GenAI security is now part of our AWS Security Specialty (SCS-C03) prep — learn it alongside IAM,
                data protection, and detection, not as a bolt-on.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Bring AI security into your cloud security program"
        subtitle="Start with a free hands-on AWS security lab, or talk to us about securing your Bedrock, RAG, and AI-agent workloads."
        primary={{ label: "Start free lab", href: SITE.freeLabUrl }}
        secondary={{ label: "Book a call", href: "/contact" }}
      />
    </>
  );
}
