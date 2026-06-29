"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui";
import { Menu, Close, ChevronDown } from "@/components/icons";
import { NAV, LABS_MENU, SERVICES_MENU } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [labsOpen, setLabsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const labsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setLabsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (labsRef.current && !labsRef.current.contains(e.target as Node)) setLabsOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
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

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1536px] items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-7 lg:gap-9">
          <Logo variant="compact" height={30} />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              if (item.href === "/services") {
                return (
                  <div key={item.href} className="relative" ref={servicesRef}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive(item.href) || servicesOpen ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    {servicesOpen ? (
                      <div className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-line bg-panel p-2 shadow-2xl">
                        {SERVICES_MENU.map((m) => (
                          <Link
                            key={m.label}
                            href={m.href}
                            onClick={() => setServicesOpen(false)}
                            className="block rounded-lg px-3 py-2.5 transition hover:bg-surface"
                          >
                            <p className="text-sm font-semibold text-fg">{m.label}</p>
                            <p className="mt-0.5 text-xs text-muted">{m.desc}</p>
                          </Link>
                        ))}
                        <div className="my-1 h-px bg-line" />
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-fg"
                        >
                          <span>
                            See all <span className="font-semibold text-fg">services overview</span>
                          </span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              }
              if (item.href === "/labs") {
                return (
                  <div key={item.href} className="relative" ref={labsRef}>
                    <button
                      type="button"
                      onClick={() => setLabsOpen((v) => !v)}
                      aria-expanded={labsOpen}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive(item.href) || labsOpen ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${labsOpen ? "rotate-180" : ""}`} />
                    </button>

                    {labsOpen ? (
                      <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-line bg-panel p-2 shadow-2xl">
                        {LABS_MENU.map((m) => (
                          <Link
                            key={m.label}
                            href={m.href}
                            onClick={() => setLabsOpen(false)}
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
                        <div className="my-1 h-px bg-line" />
                        <Link
                          href="/start-here"
                          onClick={() => setLabsOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-fg"
                        >
                          <span>
                            New here? <span className="font-semibold text-fg">Start with the roadmap</span>
                          </span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: actions with separators */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/internship"
            className="hidden text-sm font-semibold text-muted transition hover:text-fg lg:inline-block"
          >
            Apply for internship
          </Link>
          <span className="hidden h-6 w-px bg-line-strong lg:block" aria-hidden="true" />
          <Button href="/labs" variant="secondary" className="px-4 py-2">
            Try a free lab
          </Button>
          <Button href="/contact" variant="primary" className="px-4 py-2">
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
              if (item.href === "/services") {
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-sm font-medium transition ${
                        isActive(item.href) ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <div className="ml-3 flex flex-col gap-1 border-l border-line pl-3">
                      {SERVICES_MENU.map((m) => (
                        <Link
                          key={m.href}
                          href={m.href}
                          className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-fg"
                        >
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              if (item.href === "/labs") {
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-sm font-medium transition ${
                        isActive(item.href) ? "bg-surface text-fg" : "text-muted hover:bg-surface hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <div className="ml-3 flex flex-col gap-1 border-l border-line pl-3">
                      <Link
                        href="/labs/soc"
                        className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-fg"
                      >
                        SOC Labs (SIEM + SOAR)
                      </Link>
                      <Link
                        href="/start-here"
                        className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-fg"
                      >
                        New here? Start with the roadmap
                      </Link>
                    </div>
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
            <Button href="/contact" variant="primary" className="mt-1">
              Book a call
            </Button>
            <Link
              href="/internship"
              className="rounded-lg px-3 py-3 text-sm font-semibold text-fg transition hover:bg-surface"
            >
              Apply for internship
            </Link>
            <Button href="/labs" variant="secondary" className="mt-1">
              Try a free lab
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
