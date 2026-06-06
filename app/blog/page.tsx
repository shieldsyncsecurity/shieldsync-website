import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PageHero, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowRight } from "@/components/icons";
import { BLOG_POSTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Cloud Security, SOC & Cyber Career",
  description:
    "Hands-on tutorials, career guidance, and cloud / AWS security insight from the ShieldSync Security team.",
};

const PAGE_URL = `${SITE.url}/blog`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Blog — ShieldSync Security",
    description: "Tutorials, career guidance, and cloud security insight.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Blog", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Blog", url: PAGE_URL },
  ]),
];

export default function BlogPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="Blog"
        title={
          <>
            Hands-on <span className="text-gradient">cloud security</span> &amp; career insight.
          </>
        }
        description="Practical tutorials, career roadmaps, and AWS / SOC security writing from the team."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 70}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col overflow-hidden p-0">
                    <div className="relative aspect-video overflow-hidden border-b border-line">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                        <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-brand-bright">
                          {post.category}
                        </span>
                        <span className="text-muted">{post.read}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-bold leading-snug text-fg group-hover:text-brand-bright">
                        {post.title}
                      </h2>
                      <p className="mt-3 flex-1 text-base leading-7 text-muted">{post.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm text-muted">{post.date}</span>
                        <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Want this hands-on, not just read?"
        subtitle="Jump into a real AWS security lab, or explore our training tracks."
      />
    </>
  );
}
