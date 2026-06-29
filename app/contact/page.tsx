import type { Metadata } from "next";
import { Container, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { BlogCarousel } from "@/components/blog-carousel";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Mail, WhatsApp, Phone, Pin } from "@/components/icons";
import { ContactForm } from "@/components/contact-form";
import { CONTACT, SITE, BLOG_POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact ShieldSync Security",
  description:
    "Talk to ShieldSync Security about cloud security services, corporate training, hands-on labs, or the internship. WhatsApp, email, phone, or the form.",
  alternates: { canonical: "/contact" },
};

const PAGE_URL = `${SITE.url}/contact`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Contact — ShieldSync Security",
    description: "Get in touch about services, training, labs, or the internship.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Contact", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Contact", url: PAGE_URL },
  ]),
];

export default function ContactPage() {
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
        eyebrow="Contact"
        title={
          <>
            Let&apos;s find your <span className="text-gradient">next step</span>.
          </>
        }
        description="Whether you're a business securing the cloud or an individual building a career, tell us what you need — we reply fast."
      />

      <section className="py-6 sm:py-8">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels */}
          <Reveal>
            <div className="space-y-4">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm transition hover:border-line-strong">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-muted">Email</span>
                  <span className="text-base font-semibold text-fg">{CONTACT.email}</span>
                </span>
              </a>

              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm transition hover:border-line-strong">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <WhatsApp className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-muted">WhatsApp</span>
                  <span className="text-base font-semibold text-fg">Chat with us</span>
                </span>
              </a>

              <a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm transition hover:border-line-strong">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-muted">Phone</span>
                  <span className="text-base font-semibold text-fg">{CONTACT.phoneDisplay}</span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <Pin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-muted">Based in</span>
                  <span className="text-base font-semibold text-fg">{CONTACT.addressLine}</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Form — composes a WhatsApp message, no backend needed */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-panel p-7 shadow-sm sm:p-8">
              <ContactForm />
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
    </>
  );
}
