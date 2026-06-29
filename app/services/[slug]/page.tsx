import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Card, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Check, Cloud, Shield, Flask, Compliance, Cap, Radar, Code, Lock } from "@/components/icons";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE, CONTACT } from "@/lib/site";

const ICONS = { cloud: Cloud, shield: Shield, flask: Flask, compliance: Compliance, cap: Cap, radar: Radar, code: Code, lock: Lock } as const;
const WA_BASE = CONTACT.whatsappHref.split("?")[0];

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = SERVICE_PAGES.find((x) => x.slug === slug);
  if (!p) return { title: "Service" };
  return {
    title: `${p.title} — Cybersecurity Services`,
    description: p.metaDescription,
    alternates: { canonical: `/services/${slug}` },
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
    webPageSchema({ url: PAGE_URL, name: `${p.title} — ShieldSync Security`, description: p.metaDescription, dateModified: "2026-06-29", breadcrumb: crumbs }),
    breadcrumbSchema(PAGE_URL, crumbs),
    faqSchema(p.faqs),
  ];
  const quoteHref = `${WA_BASE}?text=${encodeURIComponent(`Hi ShieldSync — I'd like to talk about ${p.title}.`)}`;

  return (
    <>
      <SchemaOrg schema={schema} />

      {/* Hero — two-column: title + CTAs left, icon + key points right */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-10 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                Cybersecurity services
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">
                {p.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-muted">{p.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
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
              <div className="rounded-2xl border border-line bg-panel/80 p-6 sm:p-8 backdrop-blur-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">What&apos;s included</p>
                <ul className="mt-3 grid gap-2.5">
                  {p.whatsIncluded.slice(0, 5).map((w) => (
                    <li key={w.title} className="flex items-start gap-2.5 text-base text-fg/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span className="font-medium">{w.title}</span>
                    </li>
                  ))}
                  {p.whatsIncluded.length > 5 && (
                    <li className="pl-6.5 text-sm text-muted">+ {p.whatsIncluded.length - 5} more below</li>
                  )}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container>
          <Reveal>
            <p className="max-w-3xl text-lg leading-8 text-muted">{p.intro}</p>
          </Reveal>
        </Container>
      </section>

      {/* What's included — full detail */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">What&apos;s included</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {p.whatsIncluded.map((w, i) => (
              <Reveal key={w.title} delay={i * 50}>
                <Card className="flex h-full gap-4 p-6">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <h3 className="text-base font-semibold text-fg">{w.title}</h3>
                    <p className="mt-1 text-base leading-7 text-muted">{w.desc}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Our approach" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.approach.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-line bg-panel p-6">
                  <span className="font-mono text-sm font-bold text-brand-bright">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-fg">{s.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <SectionHeading eyebrow="What you get" title="Deliverables" />
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid gap-3.5">
              {p.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-xl border border-line bg-panel px-4 py-3.5 text-base text-fg/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={p.faqs} title={`${p.title} — FAQs`} />

      {/* Compact CTA */}
      <section className="py-10 sm:py-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-surface/60 p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <h2 className="text-xl font-bold text-fg sm:text-2xl">Ready to talk about {p.title.toLowerCase()}?</h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
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
