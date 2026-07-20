"use client";

/* ----------------------------------------------------------------------------
   Client-side progress tracking for the free courses. Stored per-browser in
   localStorage (key ss-ccaf-progress) - no accounts, no server. All storage
   access is try/catch-wrapped and effect-gated (SSR-safe), matching the
   cookie-consent pattern.
---------------------------------------------------------------------------- */

import { useCallback, useEffect, useState } from "react";

const KEY = "ss-ccaf-progress";
const EVT = "ss-ccaf-progress-change";

type Progress = {
  done?: Record<string, 1>;
  exam?: { score: number; correct: number; total: number };
};

function read(): Progress {
  try {
    return (JSON.parse(localStorage.getItem(KEY) || "{}") as Progress) || {};
  } catch {
    return {};
  }
}

function write(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {}
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<Progress>({});
  useEffect(() => {
    setProgress(read());
    const onChange = () => setProgress(read());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  const setDone = useCallback((id: string, val: boolean) => {
    const p = read();
    p.done = p.done || {};
    if (val) p.done[id] = 1;
    else delete p.done[id];
    write(p);
  }, []);
  const setExam = useCallback((exam: NonNullable<Progress["exam"]>) => {
    const p = read();
    p.exam = exam;
    write(p);
  }, []);
  return { progress, setDone, setExam };
}

/* ---- Mark-section-complete button (lesson pages) --------------------------- */

export function MarkCompleteButton({ id }: { id: string }) {
  const { progress, setDone } = useCourseProgress();
  const done = !!progress.done?.[id];
  return (
    <button
      type="button"
      onClick={() => setDone(id, !done)}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
        done
          ? "border-transparent bg-gradient-to-r from-brand to-cyan text-white"
          : "border-brand/45 bg-panel text-brand-bright hover:bg-brand/5"
      }`}
    >
      {done ? "Completed ✓" : "Mark section complete"}
    </button>
  );
}

/* ---- Lesson progress ring (hub page) ---------------------------------------- */

export function LessonProgressRing({ ids }: { ids: string[] }) {
  const { progress } = useCourseProgress();
  const doneCount = ids.filter((id) => progress.done?.[id]).length;
  const pct = ids.length ? Math.round((doneCount / ids.length) * 100) : 0;
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-full"
      style={{ background: `conic-gradient(#4f46e5 ${pct}%, rgba(15,23,42,0.06) 0)` }}
      aria-label={`Lesson progress: ${pct}%`}
    >
      <i className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-panel text-[10px] font-extrabold not-italic text-brand-bright">
        {pct}%
      </i>
    </span>
  );
}

/* ---- Hub status chips (resume + last exam score) ----------------------------- */

export function CourseStatusChips({ lessonHref }: { lessonHref: string }) {
  const { progress } = useCourseProgress();
  const started = Object.keys(progress.done || {}).length > 0;
  const exam = progress.exam;
  if (!started && !exam) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2.5">
      {started ? (
        <a
          href={lessonHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-panel px-4 py-2 text-sm font-semibold text-fg shadow-sm transition hover:border-line-strong hover:bg-surface"
        >
          Resume where you left off
        </a>
      ) : null}
      {exam ? (
        <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
          Last readiness score: <b className="px-1 text-fg">{exam.score}/1000</b>
          {exam.score >= 720 ? " (pass)" : " (below 720)"}
        </span>
      ) : null}
    </div>
  );
}
