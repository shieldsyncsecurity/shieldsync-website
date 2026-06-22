// Faithful, on-brand recreation of the LIVE lab workspace + auto-grader — mirrors
// the real LabPanel on labs.shieldsyncsecurity.com (live status, time-box, open-
// console, and the "Check my work" grader scored against the real AWS account).
// Pure presentational: NO real account data, NO identity — safe for the public
// marketing site, crisp at any size, and it stays in sync with the real product
// by using the same design tokens. Used as the flagship hero visual.

const CRITERIA: { label: string; done: boolean }[] = [
  { label: "No public buckets", done: true },
  { label: "Encryption required", done: true },
  { label: "TLS-only requests", done: true },
  { label: "Least-privilege IAM", done: false },
];

export function LabWorkspacePreview() {
  const passed = CRITERIA.filter((c) => c.done).length;
  return (
    <div className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
      {/* live status + time box (mirrors LabPanel "active" header) */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-base font-extrabold text-fg">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
          Lab is live
        </span>
        <span className="font-mono text-sm font-bold text-brand-bright">⏱ 27:14</span>
      </div>

      {/* open AWS console (1-click federated access) */}
      <div className="mt-4 rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-center text-base font-semibold text-white">
        Open AWS console ↗
      </div>

      {/* the differentiator: graded against the live account, not a checklist */}
      <div className="mt-5 border-t border-line pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">Check my work</span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
            {passed}/{CRITERIA.length} PASS
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {CRITERIA.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5 text-sm">
              <span
                aria-hidden
                className={`grid h-4 w-4 flex-none place-items-center rounded-full text-[10px] font-bold leading-none text-white ${
                  c.done ? "bg-emerald-500" : "border-2 border-line-strong"
                }`}
              >
                {c.done ? "✓" : ""}
              </span>
              <span className={`text-fg/85 ${c.done ? "text-fg/55 line-through" : ""}`}>{c.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          Verified against your live AWS account — catches half-fixes, no false greens.
        </p>
      </div>
    </div>
  );
}
