import { Container, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BlogCarousel } from "@/components/blog-carousel";
import { ArrowRight } from "@/components/icons";
import { BLOG_POSTS } from "@/lib/site";

/* ----------------------------------------------------------------------------
   Shared "From the blog" / related-reads block. Every page used to hand-roll
   the same keyword-match-then-fill filtering + heading + carousel; this
   centralizes it so the filtering logic and section markup can't drift.
   Renders nothing when there are no posts (mirrors each page's previous
   `posts.length > 0 &&` guard).
---------------------------------------------------------------------------- */

export function RelatedBlogSection({
  keywords = [],
  eyebrow = "From the blog",
  title = "Related reads",
  count = 6,
  className = "border-b border-line py-8 sm:py-10",
}: {
  /** Blog category keywords to prioritize (case-insensitive substring match on post.category). */
  keywords?: string[];
  eyebrow?: string;
  title?: string;
  count?: number;
  /** Section wrapper classes — override if a page needs different padding/border. */
  className?: string;
}) {
  const matched = keywords.length
    ? BLOG_POSTS.filter((p) => keywords.some((k) => p.category.toLowerCase().includes(k.toLowerCase())))
    : [];
  const rest = BLOG_POSTS.filter((p) => !matched.includes(p));
  const posts = [...matched, ...rest].slice(0, count);

  if (posts.length === 0) return null;

  return (
    <section className={className}>
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow={eyebrow} title={title} />
            <Button href="/blog" variant="secondary" className="shrink-0 self-start">
              All posts <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        <div className="mt-6">
          <BlogCarousel posts={posts} />
        </div>
      </Container>
    </section>
  );
}
