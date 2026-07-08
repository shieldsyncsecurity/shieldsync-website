"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { BlogPostCard } from "@/lib/site";

function excerpt(post: BlogPostCard, max = 120): string {
  const text = post.excerpt;
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function BlogCarousel({ posts }: { posts: BlogPostCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const visible = 3; // cards visible at once on desktop
  const total = posts.length;
  const canPrev = idx > 0;
  const canNext = idx < total - visible;

  function slide(dir: -1 | 1) {
    const next = Math.max(0, Math.min(idx + dir, total - visible));
    setIdx(next);
    const card = trackRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  return (
    <div>
      {/* Cards track — CSS scroll-snap handles mobile swipe; JS buttons handle desktop */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-14px)] rounded-2xl border border-line bg-panel p-6 flex flex-col transition hover:border-line-strong hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand-bright">
                {post.category}
              </span>
              <span className="ml-auto text-xs text-muted">{post.read}</span>
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug text-fg line-clamp-2 group-hover:text-brand-bright transition">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted line-clamp-3 flex-1">{excerpt(post)}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted">{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-bright opacity-0 transition group-hover:opacity-100">
                Read <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Prev / Next — hidden on mobile (swipe works there) */}
      {total > visible && (
        <div className="mt-5 hidden items-center gap-2 sm:flex">
          <button
            onClick={() => slide(-1)}
            disabled={!canPrev}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-muted transition hover:border-line-strong hover:text-fg disabled:opacity-30"
          >
            ←
          </button>
          <button
            onClick={() => slide(1)}
            disabled={!canNext}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-muted transition hover:border-line-strong hover:text-fg disabled:opacity-30"
          >
            →
          </button>
          <span className="ml-2 text-xs text-muted">{idx + 1}–{Math.min(idx + visible, total)} of {total}</span>
        </div>
      )}
    </div>
  );
}
