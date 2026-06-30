import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { NavPreviewB } from "@/components/nav-preview-b";

export const metadata: Metadata = {
  title: "Nav Model B preview — audience-first",
  // Internal preview only — not indexed, not linked from anywhere, direct-URL
  // only (same pattern as /aws-security-3d). For finalising the nav model later.
  robots: { index: false, follow: false },
};

export default function NavPreviewBPage() {
  return (
    <main className="bg-ink py-10 text-fg">
      <Container>
        <div className="mb-6">
          <span className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
            Internal preview · not live
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
            Nav Model B — audience-first
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            This is a standalone mock of the alternative navigation. The live site still runs Model A.
            The dropdowns and links here are fully clickable so you can feel the flow. Decide later;
            nothing here affects production.
          </p>
        </div>

        {/* The mock header, shown on a faux page surface */}
        <div className="rounded-3xl border border-line bg-surface/40 p-4 sm:p-6">
          <NavPreviewB />
          <div className="mt-6 rounded-2xl border border-dashed border-line/70 p-6 text-center">
            <p className="text-sm text-muted">↑ Hover/click the two dropdowns above</p>
            <p className="mt-1 text-xs text-muted">Page body would render here</p>
          </div>
        </div>

        {/* Side-by-side comparison of the two models */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">Model A — live now (product-first)</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre rounded-lg bg-surface/60 p-3 text-xs leading-6 text-fg/90">
{`Services ▾   Labs ▾   Certifications ▾
Internship   Pricing   Blog
                    [Start free lab] [Book a call]`}
            </pre>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              <li>• Matches search intent — people want the product</li>
              <li>• Familiar; fastest to ship (done)</li>
              <li>• Six top-level items — slightly busier bar</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-brand/40 bg-panel p-5 ring-1 ring-brand/30">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">Model B — this preview (audience-first)</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre rounded-lg bg-surface/60 p-3 text-xs leading-6 text-fg/90">
{`For Business ▾   For Learners ▾
Pricing   Blog
                    [Start free lab] [Book a call]`}
            </pre>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              <li>• Two doors — visitor self-selects in one click</li>
              <li>• Cleaner bar (4 items), scales as you add products</li>
              <li>• Slightly corporate; one extra click to any leaf</li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted">
          Decision later. When you pick, the switch is a data-only change in <code className="rounded bg-panel px-1.5 py-0.5 font-mono">lib/site.ts</code> + the header component.
        </p>
      </Container>
    </main>
  );
}
