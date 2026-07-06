import { Container, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, WhatsApp } from "@/components/icons";
import { CONTACT } from "@/lib/site";

/* Brand-gradient call-to-action band (reused across pages).
 * Default secondary = WhatsApp. Pass `secondary` to override (e.g. SOC labs
 * link), or `secondary: null` to hide it entirely. */
type Cta = { label: string; href: string; external?: boolean };
export function CtaBand({
  title,
  subtitle,
  primary = { label: "Book a call", href: "/contact" },
  primaryCaption,
  secondary,
  compact = false,
}: {
  title: string;
  subtitle: string;
  primary?: Cta;
  /** Optional small caption rendered under the primary button (e.g. honest CTA subtext). */
  primaryCaption?: string;
  secondary?: Cta | null;
  /** Tighter version — smaller padding/type, for use as an inline mid-page CTA rather than the full closing band. */
  compact?: boolean;
}) {
  const showWhatsAppDefault = secondary === undefined;
  return (
    <section className={compact ? "py-8 sm:py-10" : "py-10 sm:py-14"}>
      <Container>
        <Reveal>
          <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-cyan text-center text-white ${
              compact ? "p-6 sm:p-8" : "p-8 sm:p-12"
            }`}
          >
            <h2 className={`mx-auto max-w-2xl font-extrabold tracking-tight ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
              {title}
            </h2>
            <p className={`mx-auto text-white/85 ${compact ? "mt-2 max-w-lg text-sm leading-6" : "mt-3 max-w-xl text-base leading-7"}`}>
              {subtitle}
            </p>
            <div className={`flex flex-col items-center justify-center gap-3 sm:flex-row ${compact ? "mt-5" : "mt-6"}`}>
              <div className="flex flex-col items-center gap-1.5">
                <Button href={primary.href} external={primary.external} variant={compact ? "onGradientCompact" : "onGradient"}>
                  {primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {primaryCaption ? <p className="text-xs text-white/75">{primaryCaption}</p> : null}
              </div>
              {secondary ? (
                <Button href={secondary.href} external={secondary.external} variant={compact ? "onGradientOutlineCompact" : "onGradientOutline"}>
                  {secondary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : showWhatsAppDefault ? (
                <Button
                  href={CONTACT.whatsappHref}
                  external
                  newTab
                  variant={compact ? "onGradientOutlineCompact" : "onGradientOutline"}
                >
                  <WhatsApp className="h-4 w-4" />
                  WhatsApp
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* Accordion FAQ section (pairs with faqSchema for rich results). */
export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="border-t border-line py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title={title} />
          </Reveal>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-fg">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Simple page hero used on inner pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="aurora absolute inset-0 -z-10" />
      <div className="cyber-grid absolute inset-0 -z-10" />
      <Container className={compact ? "py-4 sm:py-6" : "py-5 sm:py-8"}>
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            {eyebrow}
          </span>
          <h1 className={`${compact ? "mt-2" : "mt-2"} text-2xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-3xl lg:text-4xl`}>
            {title}
          </h1>
          <p className={`${compact ? "mt-2" : "mt-2"} text-base leading-7 text-muted`}>{description}</p>
        </Reveal>
      </Container>
    </section>
  );
}
