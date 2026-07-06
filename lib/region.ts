// Region / currency helpers — client-safe (no next/headers here).

export type Currency = "USD" | "INR";
export type Money = { usd: number; inr: number };

// Region/currency is decided ONCE by the pre-paint script in app/layout.tsx
// (<html data-region> + the "ss:region" event + the ss_region localStorage
// cache). Components must read that — never re-detect country here.

export function formatMoney(m: Money, currency: Currency): string {
  if (m.usd === 0) return "Free";
  return currency === "INR" ? `₹${m.inr.toLocaleString("en-IN")}` : `$${m.usd}`;
}

// Live price tables — single source of truth for every surface.
// India priced for affordability; US/global priced in clean whole dollars
// (no FX/international-charge surprises for overseas learners).
export const FREE: Money = { usd: 0, inr: 0 };
export const AWS_PRICE: Record<string, Money> = {
  Beginner: { usd: 4, inr: 199 }, // 1st beginner lab is free (see FREE_SLUG)
  Intermediate: { usd: 5, inr: 249 },
  Advanced: { usd: 7, inr: 499 },
};
export const AWS_MONTHLY: Money = { usd: 25, inr: 2000 };

// Optional per-lab price override (e.g. a launch promo). Empty = pure level
// pricing. (Held the temporary IAM ₹99 during Paytm review; reverted 2026-07-04.)
export const AWS_LAB_PRICE_OVERRIDE: Record<string, Money> = {};
/** Per-lab price: the temporary override if set, else the per-level price. */
export function awsLabPrice(slug: string, level: string): Money {
  return AWS_LAB_PRICE_OVERRIDE[slug] ?? AWS_PRICE[level] ?? FREE;
}
// SOC (SIEM/SOAR) is partner-priced — placeholders until finalised.
export const SOC_PRICE: Money = { usd: 3.49, inr: 299 };
export const SOC_MONTHLY: Money = { usd: 18, inr: 1500 };
