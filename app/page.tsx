import type { Metadata } from "next";
import { Container, Button, SectionHeading, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections";
import { ArrowRight, Check, Shield, Cloud, Compliance, Radar, Cap, Flask, Code, Lock } from "@/components/icons";
import { SERVICES, WHY, SOCIAL_PROOF } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SERVICE_ICONS = { cloud: Cloud, shield: Shield, flask: Flask, compliance: Compliance, cap: Cap, radar: Radar, code: Code, lock: Lock } as const;

const FRAMEWORKS = ["SOC 2", "ISO 27001", "GDPR", "PCI DSS", "DPDP", "NIST CSF"];

// Enterprise engagement journey — replaces the old live-lab preview in the hero.
const JOURNEY = [
  { icon: Cloud, t: "Assess", d: "Find the real attack paths in your AWS — IAM, data exposure, logging, and detection gaps." },
  { icon: Shield, t: "Harden", d: "Fix-first remediation, mapped to the frameworks your customers audit you against." },
  { icon: Radar, t: "Detect & respond", d: "Stand up detection and response across your cloud — SIEM and SOAR." },
  { icon: Cap, t: "Upskill", d: "Train your team on your actual stack, so what you fixed stays fixed." },
];

const TRAINING_VERTICALS = ["Infrastructure", "Endpoint", "Cloud", "SOC — SIEM & SOAR"];

export default function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------- Brand hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Cloud &amp; cybersecurity services
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">
              Secure your cloud — <span className="text-gradient">and the team that runs it</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Practitioner-led cloud security for businesses: AWS-deep <span className="font-medium text-fg">assessments</span>,{" "}
              <span className="font-medium text-fg">compliance readiness</span>, and{" "}
              <span className="font-medium text-fg">detection &amp; response</span> — plus hands-on training that
              upskills your team on your actual stack. Built and delivered by working security engineers, not a report mill.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          {/* Right: how-we-secure-you engagement journey (enterprise, not a lab demo) */}
          <Reveal delay={140}>
            <div className="rounded-3xl border border-line bg-panel p-6 shadow-xl shadow-slate-900/5 sm:p-7">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-brand-bright">How we secure you</span>
              <ol className="mt-5 space-y-4">
                {JOURNEY.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.t} className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">0{i + 1}</span>
                          <h3 className="text-base font-bold text-fg">{s.t}</h3>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted">{s.d}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Services */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Security services, end to end"
              description="From cloud and application security to 24/7 detection and team training — practitioner-led work mapped to the attack paths that actually matter to your business."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICES.slice(0, 4).map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 70}>
                  <Card className={`flex h-full flex-col p-7 ${s.featured ? "ring-2 ring-brand/40" : ""}`}>
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
      <section className="border-b border-line py-14 sm:py-20">
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
      <section className="border-b border-line py-14 sm:py-20">
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

      {/* ----------------------------------- Hands-on labs (secondary B2C nod) */}
      <section className="border-b border-line py-14 sm:py-16">
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

      <CtaBand
        title="Let's secure your cloud"
        subtitle="Book a call and we'll scope an assessment or engagement around your environment and goals."
      />
    </>
  );
}
