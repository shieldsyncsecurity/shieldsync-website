import type { Metadata } from "next";
import { Container, Card, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Check, Cloud, Radar, Server, Laptop, Shield, Cap, Compliance } from "@/components/icons";
import { CONTACT, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cybersecurity Training Services — Infrastructure, Endpoint, Cloud & SOC",
  description:
    "Practitioner-led, à la carte cybersecurity training across four domains — infrastructure, endpoint, cloud, and SOC. Tailored to your stack, delivered remote or on-site. Request a quote.",
  alternates: { canonical: "/training" },
};

const PAGE_URL = `${SITE.url}/training`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Cybersecurity Training Services — ShieldSync Security",
    description:
      "À la carte, practitioner-led cybersecurity training across infrastructure, endpoint, cloud, and SOC — tailored to your team and stack.",
    dateModified: "2026-06-28",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Training", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Training", url: PAGE_URL },
  ]),
];

// Per-vertical "Request a quote" → a prefilled WhatsApp message (the site's
// primary contact channel; the contact form composes the same WhatsApp deep-link).
const WA_BASE = CONTACT.whatsappHref.split("?")[0];
const quoteHref = (vertical: string) =>
  `${WA_BASE}?text=${encodeURIComponent(
    `Hi ShieldSync — I'd like a training quote for ${vertical}.\nTeam size: ___\nFormat (remote / on-site): ___\nTimeline: ___`
  )}`;

const VERTICALS = [
  {
    icon: Server,
    name: "Infrastructure Security",
    tagline: "Harden the networks, servers, and identity your business runs on.",
    topics: [
      "Network segmentation, firewalls & zero-trust access",
      "Server & OS hardening (Linux / Windows), secure baselines",
      "Identity, privileged access & secrets management",
      "Vulnerability management & secure architecture reviews",
    ],
  },
  {
    icon: Laptop,
    name: "Endpoint Security",
    tagline: "Stop threats on laptops, servers, and mobile before they spread.",
    topics: [
      "EDR / XDR deployment, tuning & response playbooks",
      "Endpoint hardening, application control & device management",
      "Ransomware defense & rapid containment",
      "Endpoint threat hunting & forensics fundamentals",
    ],
  },
  {
    icon: Cloud,
    name: "Cloud Security",
    tagline: "Secure AWS, Azure & GCP — our deepest specialism.",
    topics: [
      "IAM least-privilege, SCPs & multi-account guardrails",
      "Posture management (CSPM), encryption & key management",
      "Workload, container & serverless security",
      "Cloud incident response & secure landing zones",
    ],
  },
  {
    icon: Radar,
    name: "SOC — SIEM & SOAR",
    tagline: "Build detection, response, and automation that actually fires.",
    topics: [
      "Detection engineering & use-case development",
      "SIEM (Splunk / Sentinel / Wazuh) tuning & dashboards",
      "SOAR playbooks & response automation",
      "Threat intel, triage workflows & incident handling",
    ],
  },
];

const DELIVERY = [
  { icon: Shield, title: "Tailored to your stack", desc: "Built around your real environment, tools, and risks — not generic slides." },
  { icon: Cap, title: "Live, practitioner-led", desc: "Delivered by engineers who do the work, remote or on-site for your team." },
  { icon: Radar, title: "Hands-on & scenario-based", desc: "Your team practices on realistic scenarios, not theory alone." },
  { icon: Compliance, title: "Role-based & outcome-driven", desc: "Scoped for engineers, ops, or leadership, with measurable takeaways." },
];

export default function TrainingPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="Cybersecurity training"
        title={
          <>
            Train your team across the <span className="text-gradient">domains that matter</span>.
          </>
        }
        description="Practitioner-led, à la carte cybersecurity training across infrastructure, endpoint, cloud, and SOC. Pick the tracks your team needs — tailored to your stack, delivered remote or on-site — and request a quote."
      />

      {/* Top CTA row */}
      <section className="border-b border-line py-6">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/contact" variant="secondary">
              Book a call
            </Button>
          </div>
        </Container>
      </section>

      {/* Verticals — à la carte */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Choose your tracks"
              title="À la carte training, by domain"
              description="Mix and match the domains your team needs. Each track is scoped to your environment and skill level — and quoted on its own."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {VERTICALS.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.name} delay={i * 80}>
                  <Card className="flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-fg">{v.name}</h3>
                        <p className="mt-1 text-base leading-7 text-muted">{v.tagline}</p>
                      </div>
                    </div>

                    <ul className="mt-6 grid flex-1 gap-2.5">
                      {v.topics.map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-base text-fg/85">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                          {t}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={quoteHref(v.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-bright transition hover:gap-3"
                    >
                      Request a quote
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-8 text-base text-muted">
              Need more than one domain, or a combined program?{" "}
              <a href="/contact" className="font-semibold text-brand-bright">Tell us your goals</a> and we&apos;ll scope a tailored bundle.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* How we deliver */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How we deliver" title="Training built around your team, not a syllabus" />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY.map((d, i) => {
              const Icon = d.icon;
              return (
                <Reveal key={d.title} delay={i * 70}>
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-fg">{d.title}</h3>
                    <p className="mt-2 text-base leading-7 text-muted">{d.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Tell us what your team needs"
        subtitle="Share your goals, stack, and team size — we'll scope a tailored program and send a quote."
        primary={{ label: "Request a quote", href: "/contact" }}
      />
    </>
  );
}
