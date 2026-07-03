"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Close, Search } from "@/components/icons";
import type { BlogPost } from "@/lib/site";

const ALL = "All";

/* Small debounce hook — keeps typing snappy while filtering only settles
 * ~120ms after the user stops. Pure client-side; no network involved. */
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

function matches(post: BlogPost, query: string): boolean {
  if (!query) return true;
  const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
  return haystack.includes(query);
}

function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 border-transparent hover:border-brand/40">
        <div className="relative aspect-video overflow-hidden border-b border-line">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
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
          <h2 className="mt-4 text-xl font-bold leading-snug text-fg group-hover:text-brand-bright line-clamp-2">
            {post.title}
          </h2>
          <p className="mt-3 flex-1 text-base leading-7 text-muted line-clamp-3">{post.excerpt}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-muted">{post.date}</span>
            <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="grid overflow-hidden p-0 border-transparent hover:border-brand/40 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden border-b border-line md:aspect-auto md:border-b-0 md:border-r">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-9">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-brand-bright">
              Latest
            </span>
            <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-brand-bright">
              {post.category}
            </span>
            <span className="text-muted">{post.read}</span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-fg group-hover:text-brand-bright sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted line-clamp-3">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-bright">
            <span>{post.date}</span>
            <span className="text-muted">·</span>
            <span className="inline-flex items-center gap-1">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 120).trim().toLowerCase();
  const [active, setActive] = useState(ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses the search box, unless the user is already typing somewhere.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable;
      if (isTyping) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    return [{ label: ALL, count: posts.length }, ...sorted.map(([label, count]) => ({ label, count }))];
  }, [posts]);

  const isFiltering = active !== ALL || debouncedQuery !== "";

  const featured = !isFiltering ? posts[0] : null;
  const gridSource = featured ? posts.slice(1) : posts;

  const filtered = useMemo(
    () =>
      gridSource.filter((p) => (active === ALL || p.category === active) && matches(p, debouncedQuery)),
    [gridSource, active, debouncedQuery],
  );

  function resetFilters() {
    setQuery("");
    setActive(ALL);
    inputRef.current?.focus();
  }

  return (
    <>
      {/* Search box */}
      <div className="relative mb-6 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="w-full rounded-xl border border-line bg-panel py-3 pl-11 pr-11 text-base text-fg shadow-sm outline-none transition placeholder:text-muted focus:border-brand/50 focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted transition hover:bg-surface hover:text-fg"
          >
            <Close className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mb-5 flex flex-wrap gap-2">
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
                  ? "border-brand bg-brand text-white shadow-sm"
                  : "border-line bg-panel text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {c.label}
              <span className={`text-xs ${on ? "text-white/80" : "text-muted"}`}>{c.count}</span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mb-6 text-sm text-muted">
        {filtered.length + (featured ? 1 : 0)} article{filtered.length + (featured ? 1 : 0) === 1 ? "" : "s"}
      </p>

      {/* Featured post — only when nothing is filtered */}
      {featured && (
        <Reveal className="mb-8">
          <FeaturedCard post={featured} />
        </Reveal>
      )}

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <Reveal key={post.slug} delay={i * 40}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && !featured && (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line py-16 text-center">
          <p className="text-base text-muted">
            No articles match {query ? <>&ldquo;{query}&rdquo;</> : "your filters"} — try clearing filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-2 text-sm font-semibold text-fg transition hover:border-line-strong hover:bg-surface"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
