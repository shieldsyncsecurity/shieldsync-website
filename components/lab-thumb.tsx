// Native, on-brand lab-card thumbnail — a tiny "terminal" that hints at what the
// lab does, per track. Replaces stock photos: crisp at any size, no real data,
// and it reads as "real hands-on work" (matches the live-workspace hero preview).
// The track/status badges (colored per track) overlay this, so it stays neutral-dark.

const THUMB: Record<string, string[]> = {
  Cloud: ["aws s3 ls — 2 public buckets", "put-public-access-block ✓", "default-encryption ✓", "✅ no public buckets"],
  SIEM: ["ingest: host + cloud logs", "rule: brute-force → fired", "severity: high · triaged", "✅ detection tuned"],
  SOAR: ["playbook ▸ enrich → contain", "isolate host ✓", "notify on-call ✓", "✅ case auto-resolved"],
};

export function LabThumb({ tag }: { tag: string }) {
  const lines = THUMB[tag] ?? THUMB.Cloud;
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1 bg-[#0f172a] px-4 pb-4 pt-10 font-mono text-[11px] leading-5">
      {lines.map((l, i) => (
        <div key={i} className={i === lines.length - 1 ? "font-bold text-emerald-400" : "text-slate-300"}>
          <span className="mr-1.5 select-none text-slate-600">$</span>
          {l}
        </div>
      ))}
    </div>
  );
}
