"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { ChevronDown } from "@/components/icons";

/* Self-contained Model B header mock — AUDIENCE-FIRST nav. Deliberately NOT
 * wired to the global SiteHeader; this is a standalone preview so the live
 * site is untouched while the structure is evaluated. Dropdown items link to
 * the real pages so the flow can be clicked through end-to-end. */

type Group = { label: string; href: string; desc: string; tag?: string };

const FOR_BUSINESS: Group[] = [
  { label: "Cloud & Infrastructure Security", href: "/services/cloud-infrastructure-security", desc: "AWS, Azure, GCP & on-prem, hardened to real attack paths" },
  { label: "SOC & Managed Detection", href: "/services/soc-managed-detection", desc: "Monitoring, hunting & incident response" },
  { label: "Application Security & DevSecOps", href: "/services/application-security-devsecops", desc: "Secure the SDLC, from code to pipeline" },
  { label: "AI/LLM Security & Zero Trust", href: "/services/advanced-emerging-security", desc: "AI/LLM testing, Zero Trust & attack-surface management" },
  { label: "Governance, Risk & Compliance", href: "/services/governance-risk-compliance", desc: "SOC 2, ISO 27001, GDPR & DPDP readiness" },
  { label: "Corporate Training", href: "/training", desc: "Team training tailored to your stack" },
];

const FOR_LEARNERS: Group[] = [
  { label: "AWS Security Labs", href: "/labs-wizard?track=aws", desc: "Real isolated AWS — pick a lab or go monthly", tag: "Flagship" },
  { label: "SOC Labs", href: "/labs/soc", desc: "Blue-team detection & response — SIEM & SOAR", tag: "Coming soon" },
  { label: "AWS Security Specialty (SCS-C02)", href: "/aws-security-certification", desc: "Every exam domain mapped to a hands-on lab" },
  { label: "Internship", href: "/internship", desc: "8 weeks, mentored, job-ready" },
  { label: "Start here roadmap", href: "/start-here", desc: "New to cloud security? Begin here" },
];

function Dropdown({
  label,
  items,
  open,
  setOpen,
  innerRef,
}: {
  label: string;
  items: Group[];
  open: boolean;
  setOpen: (v: boolean) => void;
  innerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative" ref={innerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          open ? "text-fg" : "text-muted hover:text-fg"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-line bg-panel p-2 shadow-2xl">
          {items.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 transition hover:bg-surface"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                {m.label}
                {m.tag ? (
                  <span className="rounded border border-brand/30 bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-bright">
                    {m.tag}
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-xs text-muted">{m.desc}</p>
            </Link>
          ))}
        </div>
      ) : null}
  </div>
  );
}

export function NavPreviewB() {
  const [biz, setBiz] = useState(false);
  const [learn, setLearn] = useState(false);
  const bizRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (bizRef.current && !bizRef.current.contains(e.target as Node)) setBiz(false);
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) setLearn(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <header className="rounded-2xl border border-line bg-ink/80 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-5">
        <div className="flex items-center gap-7">
          <Logo variant="compact" height={28} />
          <nav className="hidden items-center gap-1 md:flex">
            <Dropdown label="For Business" items={FOR_BUSINESS} open={biz} setOpen={setBiz} innerRef={bizRef} />
            <Dropdown label="For Learners" items={FOR_LEARNERS} open={learn} setOpen={setLearn} innerRef={learnRef} />
            <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-fg">
              Pricing
            </Link>
            <Link href="/blog" className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-fg">
              Blog
            </Link>
          </nav>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button href="/free-lab" variant="primary" className="px-4 py-2">
            Start free lab
          </Button>
          <Button href="/contact" variant="secondary" className="px-4 py-2">
            Book a call
          </Button>
        </div>
      </div>
    </header>
  );
}
