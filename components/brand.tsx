import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * Brand lockup — the "Cipher S" reticle mark (favicon tile, indigo→blue on
 * dark navy) next to the wordmark. The tile is self-contained (own dark
 * background), so it reads on both the light header/footer and dark hero
 * sections without a separate light/dark swap.
 *
 * - variant="compact" (header/footer): mark tile + bold wordmark text, tuned
 *   for small sizes where the full lockup-with-tagline turns to mush.
 * - variant="full" (hero, larger contexts): same lockup, bigger.
 */
export function Logo({
  variant = "full",
  className = "",
  height = 34,
}: {
  variant?: "full" | "compact";
  className?: string;
  height?: number;
}) {
  if (variant === "compact") {
    return (
      <Link
        href="/"
        className={`group inline-flex items-center gap-2.5 ${className}`}
        aria-label={`${SITE.name} — home`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/shieldsync-favicon.svg"
          alt=""
          aria-hidden="true"
          style={{ height, width: height }}
          className="select-none rounded-[22%]"
          draggable={false}
        />
        <span className="text-xl font-extrabold tracking-tight text-fg">
          Shield<span className="text-brand">Sync</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${SITE.name} — home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/shieldsync-favicon.svg"
        alt=""
        aria-hidden="true"
        style={{ height, width: height }}
        className="select-none rounded-[22%]"
        draggable={false}
      />
      <span className="font-extrabold tracking-tight text-fg" style={{ fontSize: height * 0.62 }}>
        Shield<span className="text-brand">Sync</span>
      </span>
    </Link>
  );
}
