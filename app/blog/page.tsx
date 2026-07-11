import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { BlogExplorer } from "@/components/blog-explorer";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { BLOG_POST_CARDS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security Blog — Cloud Security, SOC & Cyber Career",
  description:
    "Hands-on tutorials, career guidance, and cloud / AWS security insight from the ShieldSync Security team.",
  alternates: { canonical: "/blog" },
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
        eyebrow="Security Blog"
        title={
          <>
            Hands-on <span className="text-gradient">cloud security</span> &amp; career insight.
          </>
        }
        description="Practical tutorials, career roadmaps, and AWS / SOC security writing from the team."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <BlogExplorer posts={BLOG_POST_CARDS} />
        </Container>
      </section>

      <CtaBand
        title="Want this hands-on, not just read?"
        subtitle="Jump into a real AWS security lab, or explore our training tracks."
      />
    </>
  );
}
