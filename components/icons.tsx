import type { SVGProps } from "react";

/* Minimal, consistent line-icon set. 24x24 grid, currentColor stroke. */

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l7 3v5c0 4.5-3 8.4-7 9.5C8 19.4 5 15.5 5 11V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  );
}

export function Cloud(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.6A3.5 3.5 0 0117.5 18H7z" />
    </svg>
  );
}

export function Cap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 9l9-4 9 4-9 4-9-4z" />
      <path d="M7 11v4c0 1.1 2.2 2.5 5 2.5s5-1.4 5-2.5v-4" />
      <path d="M21 9v4" />
    </svg>
  );
}

export function Flask(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 3h6" />
      <path d="M10 3v6l-5 8.5A2 2 0 006.7 21h10.6a2 2 0 001.7-3.5L14 9V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function Radar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 12l6-3" />
      <path d="M19.1 6.5A8 8 0 1018 18.5" />
      <path d="M16 12a4 4 0 10-1.2 2.8" />
    </svg>
  );
}

export function Compliance(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 3h6l4 4v12a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 14l1.6 1.6L15 12" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
    </svg>
  );
}

export function Server(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01" />
      <path d="M7 16.5h.01" />
    </svg>
  );
}

export function Laptop(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 20h20" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5V18a2 2 0 01-2 2A15 15 0 014 6a2 2 0 011-2z" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12a8 8 0 01-11.8 7L4 20l1.1-4.1A8 8 0 1120 12z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.5-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-1.5c-.5 0-1 .4-1 1z" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.27l-5.91 3.09 1.13-6.57L2.45 9.14l6.6-.96L12 2.2z" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
