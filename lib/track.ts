/* Consent-gated analytics event helper.
 *
 * `gtag` only exists once GA4 has loaded — and GA4 loads ONLY when
 * NEXT_PUBLIC_GA_ID is set AND the visitor accepted cookies (see
 * components/analytics.tsx). So with no GA id / no consent this is a safe no-op:
 * events simply aren't recorded. Import and call from any client component:
 *   trackEvent("start_free_lab", { location: "hero" })
 *
 * (Meta Pixel / Google Ads conversions can be forwarded from here later, gated
 * the same way, once those accounts + the measurement id are wired in Amplify.) */
type Gtag = (command: string, ...args: unknown[]) => void;

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params ?? {});
}
