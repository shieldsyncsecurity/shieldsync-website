"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@/components/icons";
import type { BlogPost } from "@/lib/site";

const ALL = "All";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    return [{ label: ALL, count: posts.length }, ...sorted.map(([label, count]) => ({ label, count }))];
  }, [posts]);

  const [active, setActive] = useState(ALL);
  const filtered = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2">
        {categories.map((c) => {
          const on = c.label === active;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setActive(c.label)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                on
                  ? "border-brand bg-brand/10 text-brand-bright"
                  : "border-line bg-panel text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {c.label}
              <span className={`text-xs ${on ? "text-brand-bright" : "text-muted"}`}>{c.count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <Reveal key={post.slug} delay={i * 50}>
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

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-base text-muted">No posts in this category yet.</p>
      )}
    </>
  );
}
