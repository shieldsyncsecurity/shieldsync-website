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
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  newTab?: boolean;
};

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold transition duration-200 focus-visible:outline-2";

const BUTTON_VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "glow-brand bg-gradient-to-r from-brand to-cyan text-white hover:brightness-110 active:brightness-95",
  secondary: "border border-line bg-panel text-fg shadow-sm hover:border-line-strong hover:bg-surface",
  ghost: "text-muted hover:text-fg",
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
