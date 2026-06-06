// Region / currency helpers — client-safe (no next/headers here).

export type Currency = "USD" | "INR";
export type Money = { usd: number; inr: number };

export const COUNTRY_COOKIE = "ss-country";

/** Map an ISO country code → display currency. Extend as we add markets. */
export function currencyForCountry(country?: string | null): Currency {
  return (country || "").trim().toUpperCase() === "IN" ? "INR" : "USD";
}

export function formatMoney(m: Money, currency: Currency): string {
  if (m.usd === 0) return "Free";
  return currency === "INR" ? `₹${m.inr.toLocaleString("en-IN")}` : `$${m.usd}`;
}

// Live price tables — single source of truth for every surface.
// India priced for affordability; US/global priced in clean whole dollars
// (no FX/international-charge surprises for overseas learners).
export const FREE: Money = { usd: 0, inr: 0 };
export const AWS_PRICE: Record<string, Money> = {
  Beginner: { usd: 3, inr: 99 }, // 1st beginner lab is free (see FREE_SLUG)
  Intermediate: { usd: 5, inr: 249 },
  Advanced: { usd: 7, inr: 499 },
};
export const AWS_MONTHLY: Money = { usd: 25, inr: 2000 };
// SOC (SIEM/SOAR) is partner-priced — placeholders until finalised.
export const SOC_PRICE: Money = { usd: 3.49, inr: 299 };
export const SOC_MONTHLY: Money = { usd: 18, inr: 1500 };
