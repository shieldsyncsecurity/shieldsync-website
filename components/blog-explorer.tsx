"use client";

import type { SVGProps } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Close, Search, Cloud, Cap, Radar, Compliance } from "@/components/icons";
import type { BlogPostCard } from "@/lib/site";

const ALL = "All";

/* ---- category iconography ------------------------------------------------- *
 * Each topic gets a visual anchor so the rail reads as a designed filter panel,
 * not a text list. Two categories have no natural icon in the shared set, so we
 * draw them inline in the same 24x24 / currentColor style. */
type IconCmp = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

function AllIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ChipIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M9 4v3M12 4v3M15 4v3M9 17v3M12 17v3M15 17v3M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3" />
    </svg>
  );
}

const CATEGORY_ICON: Record<string, IconCmp> = {
  [ALL]: AllIcon,
  "Cloud Security": Cloud as IconCmp,
  "AI Security": ChipIcon,
  "Detection & Response": Radar as IconCmp,
  "Compliance": Compliance as IconCmp,
  "Career": Cap as IconCmp,
};

function catIcon(label: string): IconCmp {
  return CATEGORY_ICON[label] ?? (AllIcon as IconCmp);
}

/* Canonical topic taxonomy — a deliberate, scalable pillar order that holds as the
 * blog grows, instead of reshuffling by article count. New posts slot into one of
 * these five pillars; anything uncategorised is appended after them. Cloud is
 * intentionally provider-neutral ("Cloud Security", not "AWS") so Azure/GCP posts
 * fit the same pillar. */
const CANONICAL_ORDER = [
  "Cloud Security",
  "AI Security",
  "Detection & Response",
  "Compliance",
  "Career",
];
function categoryRank(label: string): number {
  const i = CANONICAL_ORDER.indexOf(label);
  return i === -1 ? CANONICAL_ORDER.length : i;
}

/* ---- reading-length + sort ------------------------------------------------ */
type LenKey = "all" | "quick" | "deep";
const LENGTHS: { key: LenKey; label: string; hint: string }[] = [
  { key: "all", label: "Any length", hint: "" },
  { key: "quick", label: "Quick reads", hint: "Under 10 min" },
  { key: "deep", label: "Deep dives", hint: "10 min +" },
];

type SortKey = "new" | "old" | "short";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "new", label: "Newest first" },
  { key: "old", label: "Oldest first" },
  { key: "short", label: "Shortest first" },
];

function readMins(post: BlogPostCard): number {
  const m = post.read?.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}
function inLength(mins: number, key: LenKey): boolean {
  if (key === "quick") return mins > 0 && mins < 10;
  if (key === "deep") return mins >= 10;
  return true;
}
function postTime(post: BlogPostCard): number {
  const t = new Date(post.date).getTime();
  return Number.isNaN(t) ? 0 : t;
}

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

/* Compact card — sized for a 3-up grid. */
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
            sizes="(min-width:1024px) 28vw, (min-width:640px) 45vw, 100vw"
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
  const [length, setLength] = useState<LenKey>("all");
  const [sort, setSort] = useState<SortKey>("new");
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
    // Fixed pillar order (see CANONICAL_ORDER); ties broken by article count.
    const sorted = [...counts.entries()].sort(
      (a, b) => categoryRank(a[0]) - categoryRank(b[0]) || b[1] - a[1],
    );
    return [{ label: ALL, count: posts.length }, ...sorted.map(([label, count]) => ({ label, count }))];
  }, [posts]);

  const lengthCounts = useMemo(() => {
    const c: Record<LenKey, number> = { all: posts.length, quick: 0, deep: 0 };
    for (const p of posts) {
      const m = readMins(p);
      if (inLength(m, "quick")) c.quick += 1;
      if (inLength(m, "deep")) c.deep += 1;
    }
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const out = posts.filter(
      (p) =>
        (active === ALL || p.category === active) &&
        inLength(readMins(p), length) &&
        matches(p, debouncedQuery),
    );
    out.sort((a, b) => {
      if (sort === "short") return readMins(a) - readMins(b);
      const diff = postTime(b) - postTime(a);
      return sort === "old" ? -diff : diff;
    });
    return out;
  }, [posts, active, length, debouncedQuery, sort]);

  const hasFilters = active !== ALL || length !== "all" || debouncedQuery.length > 0;

  function resetFilters() {
    setQuery("");
    setActive(ALL);
    setLength("all");
    inputRef.current?.focus();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[248px_minmax(0,1fr)]">
      {/* ---- Left filter panel, sticky on desktop ---- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        {/* Cap the sticky panel to the viewport and scroll INSIDE its border, so on
            short laptop screens the lower filters (Reading time, Clear all) stay
            reachable instead of being cut off below the fold with no way to scroll. */}
        <div className="rounded-2xl border border-line bg-panel/60 p-3.5 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto [scrollbar-width:thin]">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full rounded-lg border border-line bg-bg py-2.5 pl-10 pr-9 text-sm text-fg shadow-sm outline-none transition placeholder:text-muted focus:border-brand/50 focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition hover:bg-surface hover:text-fg"
              >
                <Close className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-line bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted sm:block">
                /
              </kbd>
            )}
          </div>

          {/* Topics */}
          <p className="mb-1.5 mt-5 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Topics</p>
          <ul className="space-y-0.5">
            {categories.map((c) => {
              const on = c.label === active;
              const Icon = catIcon(c.label);
              return (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => setActive(c.label)}
                    aria-pressed={on}
                    className={`group/cat flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition ${
                      on ? "bg-brand/10" : "hover:bg-surface"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition ${
                        on
                          ? "border-brand/40 bg-brand text-white"
                          : "border-line bg-bg text-muted group-hover/cat:text-fg"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className={`flex-1 truncate text-sm ${on ? "font-semibold text-brand-bright" : "font-medium text-fg/80 group-hover/cat:text-fg"}`}>
                      {c.label}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
                        on ? "bg-brand/15 text-brand-bright" : "bg-surface text-muted"
                      }`}
                    >
                      {c.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-xs font-semibold text-muted transition hover:border-line-strong hover:text-fg"
            >
              <Close className="h-3.5 w-3.5" /> Clear all filters
            </button>
          ) : null}
        </div>
      </aside>

      {/* ---- Right: results ---- */}
      <div className="min-w-0">
        {/* Results toolbar — Reading-time filter across the top of the blogs, Sort on
            the right; topic stays in the left rail as the primary taxonomy. */}
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Reading time</span>
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by reading time">
              {LENGTHS.map((l) => {
                const on = l.key === length;
                return (
                  <button
                    key={l.key}
                    type="button"
                    onClick={() => setLength(l.key)}
                    aria-pressed={on}
                    title={l.hint || undefined}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      on
                        ? "border-brand bg-brand/10 text-brand-bright"
                        : "border-line text-muted hover:border-line-strong hover:text-fg"
                    }`}
                  >
                    {l.label}
                    <span className={`text-[11px] tabular-nums ${on ? "text-brand-bright/80" : "text-muted"}`}>{lengthCounts[l.key]}</span>
                  </button>
                );
              })}
            </div>

            {/* sort — pushed to the right */}
            <label className="ml-auto flex items-center gap-2 text-sm text-muted">
              <span className="hidden sm:inline">Sort</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Sort articles"
                  className="appearance-none rounded-lg border border-line bg-panel py-1.5 pl-3 pr-8 text-sm font-medium text-fg outline-none transition hover:border-line-strong focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </label>
          </div>

          {/* count + active chips (topic + search; reading time shows its own active pill above) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3">
            <p className="text-sm text-muted">
              <span className="font-semibold text-fg">{filtered.length}</span> article{filtered.length === 1 ? "" : "s"}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {active !== ALL ? (
                <FilterChip label={active} onClear={() => setActive(ALL)} />
              ) : null}
              {debouncedQuery ? (
                <FilterChip label={`“${query.trim()}”`} onClear={() => { setQuery(""); inputRef.current?.focus(); }} />
              ) : null}
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i, 7) * 35}>
                <PostCard post={post} priority={i < 3} />
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

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 py-0.5 pl-2.5 pr-1 text-xs font-semibold text-brand-bright">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove ${label} filter`}
        className="grid h-4 w-4 place-items-center rounded-full text-brand-bright/70 transition hover:bg-brand/20 hover:text-brand-bright"
      >
        <Close className="h-3 w-3" />
      </button>
    </span>
  );
}
