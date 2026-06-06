import { Container } from "@/components/ui";

export type LegalSection = { h: string; p: string[] };

export function LegalDoc({ updated, sections }: { updated: string; sections: LegalSection[] }) {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-12 sm:py-16">
        <p className="text-sm text-muted">Last updated: {updated}</p>
        {sections.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="text-xl font-bold text-fg">{s.h}</h2>
            {s.p.map((para, i) => (
              <p key={i} className="mt-3 text-base leading-7 text-muted">
                {para}
              </p>
            ))}
          </section>
        ))}
        <p className="mt-12 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
          This document is a starting template and not legal advice. Please review it with qualified legal
          counsel before relying on it.
        </p>
      </div>
    </Container>
  );
}
