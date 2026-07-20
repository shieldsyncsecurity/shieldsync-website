"use client";

/* ----------------------------------------------------------------------------
   Lesson table of contents with scroll-spy. Desktop: sticky left rail.
   Mobile / fold: horizontal chip strip. Both render from the same items and
   highlight the section currently in view. Completed sections get a check.
---------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { useCourseProgress } from "./course-progress";

export type TocItem = { id: string; label: string; progressId?: string };

export function LessonToc({ items }: { items: TocItem[] }) {
  const active = useScrollSpy(items.map((i) => i.id));
  const { progress } = useCourseProgress();
  return (
    <nav aria-label="In this lesson" className="text-[13px]">
      <h4 className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted">
        In this lesson
      </h4>
      {items.map((it) => {
        const done = it.progressId ? !!progress.done?.[it.progressId] : false;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`block border-l-2 px-2.5 py-1.5 leading-5 transition ${
              active === it.id
                ? "rounded-r-lg border-brand bg-brand/5 font-semibold text-fg"
                : "border-line text-muted hover:text-fg"
            } ${done ? "text-brand-bright" : ""}`}
          >
            {it.label}
            {done ? " ✓" : ""}
          </a>
        );
      })}
    </nav>
  );
}

export function LessonChipNav({ items }: { items: TocItem[] }) {
  const active = useScrollSpy(items.map((i) => i.id));
  return (
    <nav
      aria-label="In this lesson"
      className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-2 lg:hidden"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={`flex-none whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            active === it.id
              ? "border-brand/40 bg-brand/10 font-semibold text-brand-bright"
              : "border-line bg-panel text-muted"
          }`}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY + 110;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);
  return active;
}
