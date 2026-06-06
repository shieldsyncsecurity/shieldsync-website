import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * Brand lockup. The monochrome SVG logo is white artwork on transparent.
 *
 * - variant="compact" (header): crisp icon mark + bold wordmark text. Reads
 *   clearly at small sizes, where the full lockup-with-tagline turns to mush.
 * - variant="full" (footer/hero): the complete logo including the tagline.
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
          src="/logo-mark-dark.svg"
          alt=""
          aria-hidden="true"
          style={{ height }}
          className="w-auto select-none"
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
      className={`inline-flex items-center ${className}`}
      aria-label={`${SITE.name} — home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt={SITE.name}
        style={{ height }}
        className="w-auto select-none opacity-95 transition-opacity hover:opacity-100"
        draggable={false}
      />
    </Link>
  );
}
