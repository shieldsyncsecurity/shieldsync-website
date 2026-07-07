"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { Menu, Close, ChevronDown } from "@/components/icons";
import { NAV, BUSINESSES_MENU, LEARNERS_MENU } from "@/lib/site";

/* Model B nav (audience-first): two dropdown doors — Businesses + Learners —
 * plus Blog. The dropdown contents live in lib/site.ts (BUSINESSES_MENU /
 * LEARNERS_MENU). Keep menus SHORT — one row per offering category. */
const DROPDOWNS: Record<
  string,
  {
    menu: { label: string; desc: string; href: string; tag?: string }[];
    width: string;
    footer?: { href: string; lead: string; strong: string };
  }
> = {
  "/services": {
    menu: BUSINESSES_MENU,
    width: "w-72",
  },
  "/aws-security-labs": {
    menu: LEARNERS_MENU,
    width: "w-80",
    footer: { href: "/start-here", lead: "New to cloud security?", strong: "Start here" },
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenDropdown(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // A nav door lights up for its own route AND everything that lives behind it,
  // so "Learners" stays active across the whole learner funnel.
  const RELATED: Record<string, string[]> = {
    "/services": ["/services", "/training"],
    "/aws-security-labs": ["/aws-security-labs", "/labs", "/labs-wizard", "/aws-security-certification", "/internship", "/ai-security", "/start-here"],
  };
  const isActive = (href: string) => {
    const group = RELATED[href];
    if (group) return group.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?"));
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1536px] items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-7 lg:gap-9">
          <Logo variant="compact" height={30} />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const dd = DROPDOWNS[item.href];
              if (dd) {
                const isOpen = openDropdown === item.href;
                return (
                  <div key={item.href} className="relative" ref={isOpen ? dropdownRef : undefined}>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown((v) => (v === item.href ? null : item.href))}
                      aria-expanded={isOpen}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold transition ${
                        isActive(item.href) || isOpen ? "text-fg" : "text-slate-700 hover:text-fg"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen ? (
                      <div className={`absolute left-0 top-full z-50 mt-2 ${dd.width} overflow-hidden rounded-xl border border-line bg-panel p-2 shadow-2xl`}>
                        {dd.menu.map((m) => (
                          <Link
                            key={m.label}
                            href={m.href}
                            onClick={() => setOpenDropdown(null)}
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
                        {dd.footer ? (
                          <>
                            <div className="my-1 h-px bg-line" />
                            <Link
                              href={dd.footer.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-fg"
                            >
                              <span>
                                {dd.footer.lead} <span className="font-semibold text-fg">{dd.footer.strong}</span>
                              </span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-[15px] font-semibold transition ${
                    isActive(item.href) ? "text-fg" : "text-slate-700 hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: two actions. Start free lab = primary (widest, zero-friction
            funnel for learners AND business evaluators — it also keeps the labs
            USP one click away now that Labs lives inside the Learners door).
            Book a call = secondary (higher-intent B2B path). */}
        <div className="hidden items-center gap-3 md:flex">
          <Button href="/free-labs/aws-security" variant="primary" className="px-4 py-2">
            Start free lab
          </Button>
          <Button href="/contact" variant="secondary" className="px-4 py-2">
            Book a call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg transition hover:bg-surface md:hidden"
        >
          {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-ink md:hidden">
          <nav className="mx-auto flex w-full max-w-[1536px] flex-col gap-1 px-5 py-4 sm:px-6">
            {NAV.map((item) => {
              const dd = DROPDOWNS[item.href];
              if (dd) {
                const expanded = mobileGroup === item.href;
                return (
                  <div key={item.href}>
                    {/* Accordion: tap to expand — don't dump every link at once */}
                    <button
                      type="button"
                      onClick={() => setMobileGroup((v) => (v === item.href ? null : item.href))}
                      aria-expanded={expanded}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                        isActive(item.href) || expanded ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    {expanded ? (
                      <div className="ml-3 flex flex-col gap-1 border-l border-line pl-3">
                        {dd.menu.map((m) => (
                          <Link
                            key={m.href + m.label}
                            href={m.href}
                            className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-fg"
                          >
                            {m.label}
                          </Link>
                        ))}
                        {dd.footer ? (
                          <Link
                            href={dd.footer.href}
                            className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-fg"
                          >
                            {dd.footer.lead} {dd.footer.strong}
                          </Link>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive(item.href) ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="my-2 h-px bg-line" />
            <Button href="/free-labs/aws-security" variant="primary" className="mt-1">
              Start free lab
            </Button>
            <Button href="/contact" variant="secondary" className="mt-1">
              Book a call
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
