"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Close, Search } from "@/components/icons";
import type { BlogPostCard } from "@/lib/site";

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

function matches(post: BlogPostCard, query: string): boolean {
  if (!query) return true;
  const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
  return haystack.includes(query);
}

/* Compact card — sized for a 4-up grid. Denser padding + a 2-line title so more
 * posts fit per screen (owner: less wasted space, 4 per row). */
function PostCard({ post, priority = false }: { post: BlogPostCard; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 border-transparent transition hover:border-brand/40 hover:shadow-md">
        <div className="relative aspect-video overflow-hidden border-b border-line">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority={priority}
            sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
            <span className="rounded-md border border-brand/30 bg-brand/10 px-1.5 py-0.5 text-brand-bright">
              {post.category}
            </span>
            <span className="text-muted">{post.read}</span>
          </div>
          <h2 className="mt-2.5 text-[15px] font-bold leading-snug text-fg transition group-hover:text-brand-bright line-clamp-2">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-[13px] leading-6 text-muted line-clamp-2">{post.excerpt}</p>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="text-xs text-muted">{post.date}</span>
            <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function BlogExplorer({ posts }: { posts: BlogPostCard[] }) {
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

  const filtered = useMemo(
    () => posts.filter((p) => (active === ALL || p.category === active) && matches(p, debouncedQuery)),
    [posts, active, debouncedQuery],
  );

  function resetFilters() {
    setQuery("");
    setActive(ALL);
    inputRef.current?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
      {/* ---- Left filter rail (search + categories), sticky on desktop ---- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            aria-label="Search articles"
            className="w-full rounded-lg border border-line bg-panel py-2.5 pl-10 pr-9 text-sm text-fg shadow-sm outline-none transition placeholder:text-muted focus:border-brand/50 focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition hover:bg-surface hover:text-fg"
            >
              <Close className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="mb-1 mt-6 px-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Categories</p>
        <ul className="space-y-0.5">
          {categories.map((c) => {
            const on = c.label === active;
            return (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => setActive(c.label)}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm transition ${
                    on
                      ? "bg-brand/10 font-semibold text-brand-bright"
                      : "font-medium text-muted hover:bg-surface hover:text-fg"
                  }`}
                >
                  <span className="truncate">{c.label}</span>
                  <span className={`shrink-0 text-xs ${on ? "text-brand-bright" : "text-muted"}`}>{c.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ---- Right: results grid, 4-up on wide screens ---- */}
      <div className="min-w-0">
        <p className="mb-4 text-sm text-muted">
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
          {active !== ALL ? <> in <span className="font-semibold text-fg">{active}</span></> : null}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i, 7) * 35}>
                <PostCard post={post} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line py-16 text-center">
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
      </div>
    </div>
  );
}
