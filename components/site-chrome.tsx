"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LiveViewers } from "@/components/live-viewers";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";

// Routes that render fully standalone (their own chrome). None currently.
const BARE_PREFIXES: string[] = [];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (bare) return <>{children}</>;

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <LiveViewers />
      <WhatsAppFab />
      <CookieConsent />
      <Analytics />
    </>
  );
}
