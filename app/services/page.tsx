import type { Metadata } from "next";
import Link from "next/link";
import { Container, Card, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand, FaqSection, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { BlogCarousel } from "@/components/blog-carousel";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Cloud, Shield, Flask, Compliance, Cap, Radar, Check, Code, Lock } from "@/components/icons";
import { SERVICES, FAQS, SITE, BLOG_POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cloud Security Services — Assessments, Compliance, Training",
  description:
    "Practitioner-led cloud security for businesses: AWS security assessments, compliance readiness (SOC 2 / ISO 27001 / GDPR), corporate training, and labs-as-a-service.",
  alternates: { canonical: "/services" },
};

const PAGE_URL = `${SITE.url}/services`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Cloud Security Services — ShieldSync Security",
    description: "AWS security assessments, compliance readiness, corporate training, and labs-as-a-service.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Services", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Services", url: PAGE_URL },
  ]),
  faqSchema(FAQS.services),
];

const ICONS = { cloud: Cloud, shield: Shield, flask: Flask, compliance: Compliance, cap: Cap, radar: Radar, code: Code, lock: Lock } as const;
const FRAMEWORKS = ["SOC 2", "ISO 27001", "GDPR", "PCI DSS", "DPDP Act", "NIST CSF"];

export default function ServicesPage() {
  const KW: string[] = [];
  const matched = KW.length
    ? BLOG_POSTS.filter((p) => KW.some((k) => p.category.toLowerCase().includes(k.toLowerCase())))
    : [];
  const rest = BLOG_POSTS.filter((p) => !matched.includes(p));
  const posts = [...matched, ...rest].slice(0, 6);

  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="For businesses"
        title={
          <>
            Security work that maps to <span className="text-gradient">real attack paths</span>.
          </>
        }
        description="Practitioner-led engagements focused on your AWS cloud, your compliance goals, and your team — not checkbox reports."
      />

      {/* Services grid */}
      <section className="border-b border-line py-6 sm:py-8">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 70}>
                  <Link
                    href={s.href}
                    className="group block h-full rounded-2xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                  >
                    <Card className={`flex h-full flex-col p-7 transition group-hover:border-line-strong ${s.featured ? "ring-2 ring-brand/40" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="text-lg font-semibold text-fg">{s.title}</h3>
                      </div>
                      {s.featured ? (
                        <span className="mt-3 w-fit text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
                          ★ Flagship service
                        </span>
                      ) : null}
                      <p className="mt-4 text-base leading-7 text-muted">{s.desc}</p>
                      <ul className="mt-5 grid gap-2.5">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2.5 text-base text-fg/85">
                            <Check className="h-4 w-4 shrink-0 text-brand" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition group-hover:translate-x-0.5">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-8 text-base text-muted">
              Need penetration testing? We offer it on request through trusted partners. Our core is cloud
              security and detection &amp; response.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Compliance frameworks */}
      <section className="border-b border-line py-6 sm:py-8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compliance"
              title="Fluent across the frameworks your customers ask about"
              description="We map security work to audits cleanly — with control mapping and evidence, not jargon."
              align="center"
            />
          </Reveal>
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {FRAMEWORKS.map((f) => (
                <span key={f} className="rounded-full border border-line bg-panel px-5 py-2 text-base font-semibold text-fg shadow-sm">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {posts.length > 0 && (
        <section className="border-b border-line py-8 sm:py-10">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="From the blog" title="Related reads" />
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

      <FaqSection faqs={FAQS.services} title="Services — frequently asked questions" />

      <CtaBand
        title="Let's secure your cloud"
        subtitle="Book a call and we'll scope an assessment or engagement around your environment and goals."
      />
    </>
  );
}
