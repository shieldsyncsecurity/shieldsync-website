import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Check, Cloud, Shield, Radar, Lock, Compliance, Code } from "@/components/icons";
import { SITE } from "@/lib/site";
// The 3D scene is mounted via a small client-side loader so the three.js
// bundle (~210KB gz) stays out of every other page's payload — only visitors
// to THIS route pay the cost, and only after WebGL is available client-side.
import { Aws3dSceneLoader } from "@/components/aws-3d-scene-loader";

export const metadata: Metadata = {
  title: "AWS Security Domains, in 3D — ShieldSync Experiments",
  description:
    "An interactive 3D scene of the six AWS Security Specialty (SCS-C03) domains orbiting an isolated AWS account. Drag, zoom, and hover to explore.",
  alternates: { canonical: "/aws-security-3d" },
  // Experimental playground page — not in the main nav, not in the sitemap,
  // not for search indexing. A direct-link novelty for visitors who land here.
  robots: { index: false, follow: false },
};

type Domain = {
  label: string;
  weight: string;
  blurb: string;
  /** Which 3D node this maps to (for the legend) */
  matches: string;
};

const DOMAINS: Domain[] = [
  { label: "Threat Detection & Incident Response", weight: "14%", blurb: "GuardDuty, Security Hub, Detective, CloudTrail; isolating a compromised instance; capturing forensic evidence before teardown.", matches: "GuardDuty" },
  { label: "Security Logging & Monitoring",         weight: "18%", blurb: "CloudTrail mgmt vs data events, log file validation, CloudWatch metric filters → alarms, VPC flow logs, Athena queries.",       matches: "CloudTrail" },
  { label: "Infrastructure Security",               weight: "20%", blurb: "VPC endpoint policies, security groups vs NACLs, WAF, Shield, Network Firewall, hardened EC2 baselines.",                      matches: "VPC" },
  { label: "Identity & Access Management",          weight: "16%", blurb: "Trust policies, ExternalId, condition keys, ABAC via Identity Center, SCPs, permissions boundaries.",                          matches: "IAM" },
  { label: "Data Protection",                       weight: "18%", blurb: "KMS key policy vs IAM policy vs grants; SSE-KMS bucket keys; Secrets Manager rotation; Macie; Object Lock.",                    matches: "S3 + KMS" },
  { label: "Management & Security Governance",      weight: "14%", blurb: "AWS Organizations, OUs, SCPs as deny-guardrails, Control Tower, Config conformance packs, multi-account strategy.",            matches: "Org + SCP" },
];

const FACTS = [
  { icon: Cloud,     k: "65 questions, 170 min", v: "Format of the SCS-C03 exam." },
  { icon: Shield,    k: "750 / 1000 to pass",     v: "Scaled score on the real thing." },
  { icon: Radar,     k: "40–80 hours of console", v: "Typical prep time for first-attempt pass." },
  { icon: Lock,      k: "6 domains",              v: "Each visualised as one orbiting node above." },
  { icon: Compliance,k: "Every 3 years",          v: "Re-cert on the current version." },
  { icon: Code,      k: "1 free lab",             v: "Our S3 misconfig lab — no card needed." },
];

export default function Aws3dPage() {
  return (
    <main className="bg-ink text-fg">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line/40">
        <Container className="py-8 sm:py-12">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
                Experimental
              </span>
              <span className="rounded-full border border-line bg-panel px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                WebGL · React Three Fiber
              </span>
            </div>
            <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-4xl lg:text-5xl">
              The six SCS-C03 domains, <span className="text-gradient">in orbit</span> around your isolated AWS account.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Drag to rotate. Scroll to zoom. Hover a node to focus a domain. The whole scene runs in your browser — no plugin, no install, no data sent anywhere.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The actual scene */}
      <section className="border-b border-line/40 bg-black/40 py-6 sm:py-10">
        <Container>
          <Aws3dSceneLoader />
          <p className="mt-3 text-center text-xs text-muted">
            Built with <code className="rounded bg-panel px-1.5 py-0.5 font-mono">three.js</code> + <code className="rounded bg-panel px-1.5 py-0.5 font-mono">react-three-fiber</code>.
            Respects <code className="rounded bg-panel px-1.5 py-0.5 font-mono">prefers-reduced-motion</code>.
          </p>
        </Container>
      </section>

      {/* Legend — what each orbiting node maps to in the SCS-C03 blueprint */}
      <section className="border-b border-line/40 py-8 sm:py-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Legend"
              title="Each node is one exam domain"
              description="The scene above isn't decorative — every orbit corresponds to one of the six official SCS-C03 domains, sized by their relative exam weight."
            />
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAINS.map((d, i) => (
              <Reveal key={d.label} delay={i * 40}>
                <div className="h-full rounded-xl border border-line bg-panel p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-bright">
                      {d.matches}
                    </span>
                    <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand-bright">
                      {d.weight}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-semibold text-fg">{d.label}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{d.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Fast facts row */}
      <section className="border-b border-line/40 py-8 sm:py-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="SCS-C03 at a glance"
              title="If the orbit caught your eye"
              description="The exam is structured around exactly what you saw above — and so are our labs."
            />
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.k} className="flex items-start gap-3 rounded-xl border border-line bg-panel p-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand-bright">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-fg">{f.k}</p>
                    <p className="mt-0.5 text-sm leading-6 text-muted">{f.v}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Final CTA — funnel the curious into the actual free lab */}
      <section className="py-8 sm:py-12">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/[0.12] via-brand/[0.04] to-transparent p-7 sm:p-10">
            <div className="aurora absolute inset-0 -z-10 opacity-60" />
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                  See the real thing — in a real AWS account
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
                  The orbit is a metaphor. The free lab is the actual console.
                  IAM, S3, KMS, in 30 minutes, with no credit card.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button href={`${SITE.labsUrl}/labs/s3-misconfiguration-audit?intent=launch`} external>
                  Launch the free lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/aws-security-certification" variant="secondary">
                  See all 6 domains
                </Button>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {[
                "Real isolated AWS account",
                "Auto-graded against live state",
                "Auto-wiped — no bill",
              ].map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-brand" /> {p}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs text-muted">
              Want this in production?{" "}
              <Link href="/contact" className="font-semibold text-brand-bright hover:underline">
                Tell us
              </Link>
              {" "}— if a few visitors react, we'll promote it from /aws-security-3d into the main hero.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
