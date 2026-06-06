"use client";

import { useEffect, useState } from "react";

/**
 * Lightweight social-proof / FOMO badge: "X people viewing now".
 * Starts at a fixed value (so SSR and first client paint match — no hydration
 * mismatch), then drifts organically within [MIN, MAX] on a randomized cadence.
 */
const START = 24;
const MIN = 14;
const MAX = 36;

export function LiveViewers() {
  const [count, setCount] = useState(START);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const wait = 3500 + Math.random() * 4000; // 3.5s – 7.5s
      timer = setTimeout(() => {
        setCount((c) => {
          const delta = Math.floor(Math.random() * 7) - 3; // -3 .. +3
          let next = c + delta;
          if (next < MIN) next = MIN + Math.floor(Math.random() * 4);
          if (next > MAX) next = MAX - Math.floor(Math.random() * 4);
          return next;
        });
        schedule();
      }, wait);
    };

    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/90 px-4 py-2.5 text-sm shadow-xl backdrop-blur">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-fg">
          <strong className="font-semibold">{count}</strong>{" "}
          <span className="text-muted">people viewing now</span>
        </span>
      </div>
    </div>
  );
}
