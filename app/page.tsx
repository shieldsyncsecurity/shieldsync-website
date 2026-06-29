import type { Metadata } from "next";
import Link from "next/link";
import { Container, Button, SectionHeading, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { LabWorkspacePreview } from "@/components/lab-workspace-preview";
import { ArrowRight, Check, Shield, Cloud, Compliance, Radar, Cap, Flask, Code, Lock } from "@/components/icons";
import { SERVICES, WHY, SOCIAL_PROOF, SITE, BLOG_POSTS } from "@/lib/site";
import { BlogCarousel } from "@/components/blog-carousel";

export const metadata: Metadata = {
  title: "AWS Cloud Security Services & Hands-on Labs | ShieldSync",
  description:
    "Practitioner-led AWS cloud security — assessments, compliance, and detection — plus hands-on AWS security labs in real, isolated AWS accounts. First lab free.",
  keywords: [
    "AWS security",
    "AWS cloud security",
    "AWS security labs",
    "AWS security services",
    "cloud security training",
    "AWS IAM",
    "AWS compliance",
    "cybersecurity services",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "AWS Cloud Security Services & Hands-on Labs | ShieldSync",
    description:
      "AWS security services + hands-on AWS labs in real, isolated AWS accounts. IAM, S3, encryption, GuardDuty, VPC. First lab free.",
    url: SITE.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Cloud Security Services & Hands-on Labs | ShieldSync",
    description: "AWS security services + hands-on AWS labs in real, isolated AWS accounts.",
  },
};

const SERVICE_ICONS = { cloud: Cloud, shield: Shield, flask: Flask, compliance: Compliance, cap: Cap, radar: Radar, code: Code, lock: Lock } as const;

const FRAMEWORKS = ["SOC 2", "ISO 27001", "GDPR", "PCI DSS", "DPDP", "NIST CSF"];

const TRAINING_VERTICALS = ["Infrastructure", "Endpoint", "Cloud", "SOC — SIEM & SOAR"];

export default function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------- Brand hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-10 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Cloud &amp; cybersecurity services
            </span>

            <h1 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Secure your cloud — <span className="text-gradient">and the team that runs it</span>.
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Practitioner-led cloud security for businesses: AWS-deep <span className="font-medium text-fg">assessments</span>,{" "}
              <span className="font-medium text-fg">compliance readiness</span>, and{" "}
              <span className="font-medium text-fg">detection &amp; response</span> — plus hands-on training that
              upskills your team on your actual stack.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/services" variant="secondary">
                Explore services
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <p className="text-base text-muted">
                <span className="font-semibold text-fg">{SOCIAL_PROOF.count}</span> {SOCIAL_PROOF.label}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {FRAMEWORKS.map((f) => (
                <span key={f} className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-muted">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right: hands-on AWS labs preview — a real product mock that links into
              the guided lab picker (wizard). Showcases the hands-on depth behind the
              services without a wall of text. */}
          <Reveal delay={140}>
            <div className="rounded-3xl border border-line bg-panel p-3 shadow-xl shadow-slate-900/5">
              <Link
                href={SITE.startUrl}
                aria-label="Open the guided lab picker"
                className="group relative block overflow-hidden rounded-2xl border border-line bg-surface px-4 pb-4 pt-11 transition hover:border-line-strong hover:shadow-md"
              >
                <span className="absolute left-3 top-3 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                  ★ AWS Security Labs
                </span>
                <span className="absolute right-3 top-3 rounded-md border border-line bg-panel px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  Preview
                </span>
                <div className="pointer-events-none select-none">
                  <LabWorkspacePreview />
                </div>
                <span className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-brand-bright opacity-80 transition group-hover:opacity-100">
                  Start a hands-on lab →
                </span>
              </Link>
              <Link
                href="/labs"
                className="group flex items-center justify-between gap-3 rounded-b-2xl px-3 py-4 transition hover:bg-surface"
              >
                <span className="text-sm text-muted">Real, hands-on AWS cloud security in your browser.</span>
                <span className="shrink-0 text-sm font-semibold text-brand-bright transition group-hover:translate-x-0.5">
                  Explore →
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Services */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Security services, end to end"
              description="From cloud and application security to 24/7 detection and team training — practitioner-led work mapped to the attack paths that actually matter to your business."
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 70}>
                  <Card className={`flex h-full flex-col p-6 ${s.featured ? "ring-2 ring-brand/40" : ""}`}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-fg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{s.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className="mt-8">
              <Button href="/services" variant="secondary">
                Explore all services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- Why */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why ShieldSync"
              title="Practitioner-led, cloud-deep, audit-ready"
              description="The people who secure real cloud environments do the work and teach the training — so what you get matches how attackers and defenders actually operate."
            />
          </Reveal>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div>
                  <span className="font-mono text-sm text-brand">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-fg">{w.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- Team training */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                Team training
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                Upskill your team across the domains that matter
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                À la carte, practitioner-led training — pick the domains your team needs, tailored to your stack and
                delivered remote or on-site.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {TRAINING_VERTICALS.map((v) => (
                  <span key={v} className="rounded-full border border-line bg-panel px-4 py-1.5 text-sm font-semibold text-fg">
                    {v}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/training">
                  Explore training
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Card hover={false} className="p-7 sm:p-8">
                <h3 className="text-base font-bold uppercase tracking-wide text-muted">Built around your team</h3>
                <ul className="mt-5 grid gap-3.5">
                  {[
                    "Tailored to your environment and risks",
                    "Live, practitioner-led — remote or on-site",
                    "Hands-on and scenario-based",
                    "Role-based for engineers, ops, or leadership",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3 text-base text-fg/90">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------- AWS SCS-C02 cert callout */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <Link
              href="/aws-security-certification"
              className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-gradient-to-br from-brand/[0.08] to-transparent p-6 transition hover:border-brand sm:flex-row sm:items-center sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <Cloud className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
                    AWS Certification prep
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-fg sm:text-2xl">
                    AWS Security Specialty (SCS-C02) — every domain mapped to a hands-on lab
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                    Skip the walkthroughs. Practise IAM, S3, KMS, VPC, GuardDuty, and CloudTrail in real, isolated AWS accounts. First lab free.
                  </p>
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-white transition group-hover:brightness-110">
                Explore SCS-C02 prep
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Blog posts */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                eyebrow="From the blog"
                title="Insights on cloud security"
              />
              <Button href="/blog" variant="secondary" className="shrink-0 self-start">
                All posts <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
          <div className="mt-6">
            <BlogCarousel posts={BLOG_POSTS.slice(0, 6)} />
          </div>
        </Container>
      </section>

      {/* ----------------------------------- Hands-on labs (secondary B2C nod) */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-surface/60 p-7 sm:flex-row sm:items-center sm:p-9">
              <div>
                <h2 className="text-xl font-bold text-fg sm:text-2xl">Prefer to learn by doing?</h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
                  Individuals can practice cloud security in real, isolated AWS accounts with our hands-on labs —
                  your first lab is free.
                </p>
              </div>
              <Button href="/labs" variant="secondary">
                Explore the labs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
