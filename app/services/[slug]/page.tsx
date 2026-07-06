import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Card, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { RelatedBlogSection } from "@/components/related-blog-section";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Check, Cloud, Shield, Flask, Compliance, Cap, Radar, Code, Lock } from "@/components/icons";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE, CONTACT } from "@/lib/site";

const ICONS = { cloud: Cloud, shield: Shield, flask: Flask, compliance: Compliance, cap: Cap, radar: Radar, code: Code, lock: Lock } as const;
const WA_BASE = CONTACT.whatsappHref.split("?")[0];

// Match each service slug to the blog category keyword(s) we want to surface
// underneath it. Falls back to most-recent posts if nothing matches.
const SERVICE_BLOG_KEYWORDS: Record<string, string[]> = {
  "cloud-infrastructure-security": ["Cloud", "AWS", "IAM", "S3", "VPC", "KMS"],
  "soc-managed-detection": ["Detection", "SOC", "SIEM", "SOAR", "IR", "Incident", "GuardDuty", "CloudTrail"],
  "application-security-devsecops": ["AppSec", "Application", "DevSecOps", "AI Security"],
  "advanced-emerging-security": ["AI Security", "AI", "LLM", "Agent", "RAG", "Bedrock", "Zero Trust"],
  "governance-risk-compliance": ["Compliance", "DPDP", "GDPR", "ISO", "SOC 2"],
};

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = SERVICE_PAGES.find((x) => x.slug === slug);
  if (!p) return { title: "Service" };
  const url = `${SITE.url}/services/${slug}`;
  // Slug-specific SEO title overrides (lead with the keyword the page should rank for)
  const TITLE_OVERRIDE: Record<string, string> = {
    "cloud-infrastructure-security": "AWS, Cloud & Infrastructure Security Services",
    "soc-managed-detection": "Managed SOC, SIEM & SOAR — 24/7 Detection & Response",
    "application-security-devsecops": "Application Security & DevSecOps Services",
    "advanced-emerging-security": "AI & LLM Security Testing, Zero Trust & ASM",
    "governance-risk-compliance": "SOC 2, ISO 27001, GDPR & DPDP Compliance",
  };
  const title = TITLE_OVERRIDE[slug] ?? `${p.title} — Cybersecurity Services`;
  return {
    title,
    description: p.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title,
      description: p.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: p.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = SERVICE_PAGES.find((x) => x.slug === slug);
  if (!p) notFound();

  const Icon = ICONS[p.icon];
  const PAGE_URL = `${SITE.url}/services/${slug}`;
  const crumbs = [
    { name: "Home", url: SITE.url },
    { name: "Services", url: `${SITE.url}/services` },
    { name: p.title, url: PAGE_URL },
  ];
  const schema = [
    webPageSchema({ url: PAGE_URL, name: `${p.title} — ShieldSync Security`, description: p.metaDescription, dateModified: "2026-06-30", breadcrumb: crumbs }),
    breadcrumbSchema(PAGE_URL, crumbs),
    faqSchema(p.faqs),
  ];
  const quoteHref = `${WA_BASE}?text=${encodeURIComponent(`Hi ShieldSync — I'd like to talk about ${p.title}.`)}`;

  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero — title + intro + CTAs left, "what's included" snapshot right */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-6 lg:py-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                Cybersecurity services
              </span>
              <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
                {p.title}
              </h1>
              <p className="mt-3 text-base leading-7 text-muted">{p.tagline}</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{p.intro}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/contact">
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={quoteHref} external variant="secondary">
                  Request a quote
                </Button>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-line bg-panel/80 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">What&apos;s included</p>
                </div>
                <ul className="mt-3 grid gap-2">
                  {p.whatsIncluded.slice(0, 5).map((w) => (
                    <li key={w.title} className="flex items-start gap-2 text-sm text-fg/90">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      <span className="font-medium">{w.title}</span>
                    </li>
                  ))}
                  {p.whatsIncluded.length > 5 && (
                    <li className="text-xs text-muted">+ {p.whatsIncluded.length - 5} more below</li>
                  )}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What's included — full detail */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <h2 className="text-xl font-extrabold tracking-tight text-fg sm:text-2xl">What&apos;s included</h2>
          </Reveal>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {p.whatsIncluded.map((w, i) => (
              <Reveal key={w.title} delay={i * 40}>
                <Card className="flex h-full gap-3 p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <div>
                    <h3 className="text-sm font-semibold text-fg">{w.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{w.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach + Deliverables — two columns on desktop to halve scroll */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Our approach" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.approach.map((s, i) => (
                <div key={s.title} className="rounded-xl border border-line bg-panel p-4">
                  <span className="font-mono text-xs font-bold text-brand-bright">0{i + 1}</span>
                  <h3 className="mt-1.5 text-sm font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="What you get" title="Deliverables" />
            <ul className="mt-5 grid gap-2">
              {p.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 rounded-lg border border-line bg-panel px-3.5 py-2.5 text-sm text-fg/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={p.faqs} title={`${p.title} — FAQs`} />

      {/* Related blog posts */}
      <RelatedBlogSection keywords={SERVICE_BLOG_KEYWORDS[slug]} />

      {/* Compact CTA */}
      <section className="py-8 sm:py-10">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-lg font-bold text-fg sm:text-xl">Ready to talk about {p.title.toLowerCase()}?</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                Book a call and we&apos;ll scope an engagement around your environment and goals.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/contact">
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={quoteHref} external variant="secondary">
                Request a quote
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
