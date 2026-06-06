"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Consent-gated Google Analytics 4. Loads ONLY when:
 *   - NEXT_PUBLIC_GA_ID is set, AND
 *   - the visitor accepted cookies (CookieConsent broadcasts "ss-consent-change").
 * No env / no consent → renders nothing. Safe by default.
 *
 * Add your Meta Pixel / Google Ads tag here later, gated the same way.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setConsented(localStorage.getItem("ss-consent") === "accepted");
      } catch {
        /* ignore */
      }
    };
    read();
    window.addEventListener("ss-consent-change", read);
    return () => window.removeEventListener("ss-consent-change", read);
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
