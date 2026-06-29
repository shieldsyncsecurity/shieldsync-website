import type { Metadata } from "next";
import { Container, Card, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Cap } from "@/components/icons";
import { ABOUT, SITE, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ShieldSync Security",
  description:
    "ShieldSync Security is a global cybersecurity company — practitioner-led cloud security services and hands-on training. Our mission, values, and team.",
  alternates: { canonical: "/about" },
};

const PAGE_URL = `${SITE.url}/about`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "About — ShieldSync Security",
    description: "Mission, values, and team behind ShieldSync Security.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "About us", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "About us", url: PAGE_URL },
  ]),
];

export default function AboutPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="About us"
        title={
          <>
            A global cybersecurity company, <span className="text-gradient">built hands-on</span>.
          </>
        }
        description={ABOUT.mission}
      />

      {/* Values */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What we believe" title="Principles that shape the work" />
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {ABOUT.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <Card className="h-full p-7">
                  <span className="font-mono text-sm text-brand">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-fg">{v.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{v.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title="Practitioners who do the work and the teaching"
              description="A small, senior team of working cloud and security engineers. We let the labs and the results speak — so you get hands-on depth, not personalities."
            />
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {ABOUT.team.map((m, i) => (
              <Reveal key={m.role} delay={i * 80}>
                <Card className="flex h-full items-start gap-5 p-7">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                    <Cap className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-fg">{m.name}</h3>
                    <p className="text-sm font-semibold text-brand-bright">{m.role}</p>
                    <p className="mt-2 text-base leading-7 text-muted">{m.bio}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Company facts */}
      <section className="border-b border-line py-8 sm:py-12">
        <Container>
          <div className="grid gap-6 rounded-2xl border border-line bg-surface p-8 sm:grid-cols-3 sm:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">Registered</p>
              <p className="mt-1 text-base font-semibold text-fg">{SITE.legalName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">Based in</p>
              <p className="mt-1 text-base font-semibold text-fg">{CONTACT.addressLine}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">Reach</p>
              <p className="mt-1 text-base font-semibold text-fg">Global · remote-first</p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Work with us"
        subtitle="Whether you're a business or an individual, there's a door for you — let's find the right next step."
      />
    </>
  );
}
