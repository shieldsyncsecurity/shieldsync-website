import Link from "next/link";
import type { ReactNode } from "react";

/* Layout container ------------------------------------------------------------ */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1536px] px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/* Buttons --------------------------------------------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onGradient" | "onGradientOutline" | "onGradientCompact" | "onGradientOutlineCompact";
  className?: string;
  external?: boolean;
  newTab?: boolean;
};

const BUTTON_BASE = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-2";

const BUTTON_VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "px-5 py-3 text-base glow-brand bg-gradient-to-r from-brand to-cyan text-white hover:brightness-110 active:brightness-95",
  secondary: "px-5 py-3 text-base border border-line bg-panel text-fg shadow-sm hover:border-line-strong hover:bg-surface",
  ghost: "px-5 py-3 text-base text-muted hover:text-fg",
  // For use on a brand-gradient background (e.g. CtaBand) — a solid white pill
  // and a transparent/white-bordered outline, instead of the default variants
  // (which assume a plain page background). "Compact" pairs are identical but
  // smaller, for CtaBand's `compact` mode.
  onGradient: "px-6 py-3 text-base bg-white text-brand-bright shadow-sm hover:bg-white/90",
  onGradientOutline: "px-6 py-3 text-base border border-white/50 text-white hover:bg-white/10",
  onGradientCompact: "px-5 py-2.5 text-sm bg-white text-brand-bright shadow-sm hover:bg-white/90",
  onGradientOutlineCompact: "px-5 py-2.5 text-sm border border-white/50 text-white hover:bg-white/10",
};

export function Button({ href, children, variant = "primary", className = "", external, newTab }: ButtonProps) {
  const cls = `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* Eyebrow + Section heading --------------------------------------------------- */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center items-center" : "max-w-2xl items-start text-left";
  return (
    <div className={`flex flex-col gap-2 ${alignment} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">{title}</h2>
      {description ? <p className="text-base leading-7 text-muted">{description}</p> : null}
    </div>
  );
}

/* Surface card ---------------------------------------------------------------- */

export function Card({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`panel rounded-2xl ${hover ? "transition duration-300 hover:-translate-y-0.5 hover:shadow-lg" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* Pill / tag ------------------------------------------------------------------ */

export function Pill({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "brand";
  className?: string;
}) {
  const tones = {
    muted: "border-line bg-surface text-muted",
    brand: "border-brand/30 bg-brand/10 text-brand-bright",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
