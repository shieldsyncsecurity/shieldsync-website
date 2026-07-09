import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";

// Without this, the root layout's site-wide `robots: index,follow` metadata
// stacks on top of Next's automatic noindex for notFound()-reached pages,
// producing two conflicting <meta name="robots"> tags in the rendered HTML.
// Google resolves conflicts to the most restrictive either way, but this makes
// the noindex intent explicit and unambiguous for every crawler.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-14 text-center">
      <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-brand-bright">Error 404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">This page got nuked.</h1>
      <p className="mt-5 max-w-md text-lg leading-8 text-muted">
        The page you&apos;re after doesn&apos;t exist or has moved. Let&apos;s get you back to something useful.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back home</Button>
        <Button href="/start-here" variant="secondary">
          Start here
        </Button>
      </div>
    </Container>
  );
}
