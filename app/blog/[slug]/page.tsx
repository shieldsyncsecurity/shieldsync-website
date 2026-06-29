import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, blogPostingSchema } from "@/lib/schema";
import Image from "next/image";
import { BLOG_POSTS, SITE } from "@/lib/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${slug}` } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const datePublished = new Date(`${post.date} 12:00 GMT`).toISOString().slice(0, 10);
  const schema = [
    blogPostingSchema({ url, title: post.title, description: post.excerpt, image: post.image, datePublished }),
    webPageSchema({
      url,
      name: post.title,
      description: post.excerpt,
      dateModified: "2026-06-04",
      breadcrumb: [
        { name: "Home", url: SITE.url },
        { name: "Blog", url: `${SITE.url}/blog` },
        { name: post.title, url },
      ],
    }),
    breadcrumbSchema(url, [
      { name: "Home", url: SITE.url },
      { name: "Blog", url: `${SITE.url}/blog` },
      { name: post.title, url },
    ]),
  ];

  return (
    <>
      <SchemaOrg schema={schema} />

      <article className="border-b border-line">
        <Container className="py-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-bright">
            ← Back to blog
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
            <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-brand-bright">
              {post.category}
            </span>
            <span className="text-muted">{post.date}</span>
            <span className="text-muted">· {post.read}</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{post.excerpt}</p>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-line">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width:768px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-10">
            {post.body.map((b, i) => {
              if (b.t === "h2")
                return (
                  <h2 key={i} className="mt-10 text-2xl font-bold tracking-tight text-fg">
                    {b.text}
                  </h2>
                );
              if (b.t === "p")
                return (
                  <p key={i} className="mt-5 text-base leading-8 text-muted">
                    {b.text}
                  </p>
                );
              if (b.t === "ul")
                return (
                  <ul key={i} className="mt-4 space-y-2.5">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-base leading-7 text-muted">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              if (b.t === "code")
                return (
                  <pre
                    key={i}
                    className="mt-5 overflow-x-auto rounded-xl border border-line bg-surface p-5 font-mono text-sm leading-6 text-fg"
                  >
                    <code>{b.code}</code>
                  </pre>
                );
              return (
                <p
                  key={i}
                  className="mt-6 rounded-xl border border-brand/20 bg-brand/5 px-5 py-4 text-base leading-7 text-fg"
                >
                  {b.text}
                </p>
              );
            })}
          </div>
          </div>
        </Container>
      </article>

      <CtaBand
        title="Learn it by doing"
        subtitle="Pick your track and launch a hands-on lab in a real, isolated environment."
        primary={{ label: "AWS Security Labs", href: "/labs-wizard?track=aws" }}
        secondary={{ label: "SOC Labs (SIEM + SOAR)", href: "/labs/soc" }}
      />
    </>
  );
}
