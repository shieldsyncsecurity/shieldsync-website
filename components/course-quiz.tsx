"use client";

/* ----------------------------------------------------------------------------
   Inline checkpoint quiz for lesson pages. Exam-style: one scenario stem, one
   correct answer, three plausible mistakes. Clicking locks the question and
   reveals the explanation. A correct pick records progress (course-progress).
---------------------------------------------------------------------------- */

import { useState } from "react";
import { useCourseProgress } from "./course-progress";

export type QuizQuestion = {
  id: string; // progress id, e.g. "d1-q1"
  scenario: string;
  question: string;
  options: string[]; // exactly 4
  answer: number; // index of the correct option
  explanation: string;
};

export function CheckpointQuiz({ title, questions }: { title: string; questions: QuizQuestion[] }) {
  return (
    <section
      id="quiz"
      className="panel scroll-mt-24 rounded-2xl border-brand/40 p-5 sm:p-6"
      style={{ borderColor: "rgba(79,70,229,0.4)" }}
    >
      <h2 className="text-lg font-bold tracking-tight text-brand-bright sm:text-xl">{title}</h2>
      <p className="mt-1 text-[13.5px] text-muted">
        Exam-style: one scenario, one correct answer, three plausible mistakes. Click an option to lock in and see the
        explanation.
      </p>
      {questions.map((q, i) => (
        <QuizItem key={q.id} q={q} num={i + 1} />
      ))}
    </section>
  );
}

function QuizItem({ q, num }: { q: QuizQuestion; num: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const { setDone } = useCourseProgress();
  const locked = picked !== null;

  function choose(idx: number) {
    if (locked) return;
    setPicked(idx);
    if (idx === q.answer) setDone(q.id, true);
  }

  return (
    <div className="mt-4 border-t border-dashed border-line pt-4">
      <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
        Q{num} · Scenario: {q.scenario}
      </span>
      <p className="mt-1.5 font-semibold text-fg">{q.question}</p>
      <div className="mt-2 grid gap-2">
        {q.options.map((opt, idx) => {
          const isCorrect = locked && idx === q.answer;
          const isWrong = locked && idx === picked && idx !== q.answer;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => choose(idx)}
              disabled={locked}
              className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                isCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : isWrong
                    ? "border-red-300 bg-red-50 text-red-900"
                    : "border-line bg-ink text-fg hover:border-line-strong disabled:cursor-default"
              }`}
            >
              <span className="mt-0.5 font-mono text-[11px] font-semibold text-muted">
                {String.fromCharCode(65 + idx)}.
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {locked ? (
        <div className="mt-2 rounded-xl bg-ink-2 px-3.5 py-2.5 text-[13.5px] leading-6 text-slate-700">
          <b className="text-brand-bright">Correct: {String.fromCharCode(65 + q.answer)}.</b> {q.explanation}
        </div>
      ) : null}
    </div>
  );
}
