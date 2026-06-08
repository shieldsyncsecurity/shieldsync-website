import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, Button, SectionHeading, Card, Pill, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Check, Shield, Cap, Globe, Flask } from "@/components/icons";
import { DOORS, WHY, LAB_TRACKS, SITE, SOCIAL_PROOF } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Per-track styling for the lab cards: thumbnail image, category badge, featured flag.
const LAB_STYLES: Record<string, { img: string; badge: string; featured?: boolean }> = {
  Cloud: { img: "/labs/aws.webp", featured: true, badge: "border-blue-400/50 bg-blue-600/80 text-white" },
  SIEM: { img: "/labs/siem.webp", badge: "border-emerald-400/50 bg-emerald-600/80 text-white" },
  SOAR: { img: "/labs/soar.webp", badge: "border-violet-400/50 bg-violet-600/80 text-white" },
};

const STATUS_STYLES: Record<string, string> = {
  Live: "border-emerald-400/50 bg-emerald-600/80 text-white",
  "In build": "border-amber-400/50 bg-amber-500/80 text-white",
  "Coming soon": "border-slate-300 bg-slate-700/70 text-white",
};

export default function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------- Brand hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <Reveal>
            <Eyebrow>Cybersecurity services &amp; training</Eyebrow>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">
              Secure the cloud. <span className="text-gradient">Build the talent</span> that defends it{" "}
              <span className="align-middle text-[0.55em] font-bold text-fg/55">—</span>{" "}
              with our realistic, scenario-based <span className="text-gradient">hands-on labs</span>.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              <span className="font-semibold text-fg">{SITE.nameFull}</span> helps businesses{" "}
              <span className="font-medium text-fg">harden their cloud</span> and helps individuals grow into{" "}
              <span className="font-medium text-fg">real security roles</span> — through hands-on services,
              training, and labs that run in <span className="font-medium text-fg">production-like environments</span>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={SITE.startUrl}>
                <Flask className="h-4 w-4" />
                Start free lab
              </Button>
              <Button href="/contact" variant="secondary">
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-fg">Your first lab is free</span> — no card, no setup.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-muted">
              <span className="inline-flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand" /> Global by design
              </span>
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand" /> Real environments
              </span>
              <span className="inline-flex items-center gap-2">
                <Cap className="h-4 w-4 text-brand" /> Practitioner-built
              </span>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <p className="text-base text-muted">
                <span className="font-semibold text-fg">{SOCIAL_PROOF.count}</span> {SOCIAL_PROOF.label}
              </p>
            </div>
          </Reveal>

          {/* Featured AWS lab image */}
          <Reveal delay={140}>
            <div className="rounded-3xl border border-line bg-panel p-3 shadow-xl shadow-slate-900/5">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src="/labs/aws.webp"
                  alt="AWS Security Labs"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                  ★ Flagship — AWS Security Labs
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-4">
                <p className="text-sm text-muted">Real, hands-on AWS cloud security — our flagship.</p>
                <Link href="/labs" className="shrink-0 text-sm font-semibold text-brand-bright">
                  Explore →
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------- Two-door fork */}
      <section className="border-b border-line py-14 sm:py-16">
        <Container>
          <Reveal className="mb-8 text-center">
            <h2 className="text-base font-semibold uppercase tracking-[0.2em] text-muted">
              Where would you like to start?
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {DOORS.map((door, i) => (
              <Reveal key={door.audience} delay={i * 90}>
                <Link href={door.href} className="group block h-full">
                  <Card className="flex h-full flex-col p-8 sm:p-10">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                        {door.audience}
                      </span>
                      {door.highlight ? <Pill tone="brand">{door.highlight}</Pill> : null}
                    </div>

                    <h3 className="mt-6 text-2xl font-bold tracking-tight text-fg sm:text-3xl">{door.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted">{door.desc}</p>

                    <ul className="mt-6 grid gap-2.5">
                      {door.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2.5 text-base text-fg/85">
                          <Check className="h-4 w-4 shrink-0 text-brand" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-brand-bright">
                      {door.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- How the labs work */}
      <section className="border-b border-line bg-surface/50 py-14 sm:py-16">
        <Container>
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              How the labs work
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
              Start your first lab in minutes
            </h2>
            <p className="mt-3 text-base text-muted">
              No setup, no AWS account of your own — and your <span className="font-semibold text-fg">first lab is free</span>.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { n: "1", t: "Pick a lab", d: "Choose an AWS security scenario — start with the free one." },
              { n: "2", t: "Launch in real AWS", d: "A real, isolated AWS console opens right in your browser. Nothing to install." },
              { n: "3", t: "Learn by doing", d: "Find the weakness, fix it, and verify it like a real defender." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-panel p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 font-bold text-brand-bright">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-fg">{s.t}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 text-center">
            <Button href={SITE.startUrl}>
              <Flask className="h-4 w-4" />
              Start free lab
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- Why */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why ShieldSync"
              title="Built global, taught hands-on, run by practitioners"
              description="The same people who secure real cloud environments build and teach the training — so what you learn matches how teams actually operate."
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

      {/* ---------------------------------------------------------------- Labs */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Hands-on labs"
              title="Real cyber ranges — led by AWS security"
              description="Managed, on-demand environments. AWS cloud security is our flagship; SIEM and SOAR round out a full SOC skill set. Azure, GCP and more are on the roadmap."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LAB_TRACKS.map((lab, i) => {
              const s = LAB_STYLES[lab.tag] ?? LAB_STYLES.Cloud;
              return (
                <Reveal key={lab.title} delay={i * 80}>
                  <Link href={lab.tag === "Cloud" ? "/labs" : "/labs/soc"} className="group block h-full">
                    <Card
                      hover={false}
                      className={`flex h-full flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                        s.featured ? "ring-2 ring-brand/40" : ""
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden border-b border-line">
                        <Image
                          src={s.img}
                          alt={`${lab.title} illustration`}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute left-3 top-3 inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${s.badge}`}
                        >
                          {lab.tag}
                        </span>
                        <span
                          className={`absolute right-3 top-3 inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${STATUS_STYLES[lab.status] ?? STATUS_STYLES.Live}`}
                        >
                          {lab.status}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        {s.featured ? (
                          <span className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
                            ★ Flagship lab
                          </span>
                        ) : null}
                        <h3 className="text-xl font-semibold text-fg">{lab.title}</h3>
                        <p className="mt-2 flex-1 text-base leading-7 text-muted">{lab.desc}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-brand-bright">
                          Explore
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-8">
              <Button href="/labs" variant="secondary">
                <Flask className="h-4 w-4" />
                Explore all labs
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ CTA band */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-cyan p-10 text-center text-white sm:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to secure your cloud — or your career?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-7 text-white/85">
                Book a call and we&apos;ll point you to the right next step, whether that&apos;s an
                assessment, a training cohort, or hands-on labs.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-bright shadow-sm transition hover:bg-white/90"
                >
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Explore labs
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
