import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { SchemaOrg } from "@/components/schema-org";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

// v4 enterprise theme — display serif for headings (paired with Inter for body)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nameFull} — ${SITE.shortDesc}`,
    template: `%s | ${SITE.nameFull}`,
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  keywords: [
    "cybersecurity",
    "cloud security",
    "AWS security",
    "cybersecurity training",
    "security labs",
    "SIEM",
    "SOAR",
    "cybersecurity internship",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.nameFull,
    title: `${SITE.nameFull} — ${SITE.shortDesc}`,
    description: SITE.description,
    url: SITE.url,
    // og:image comes from the static `opengraph-image.png` file convention:
    // app/opengraph-image.png is the site-wide default, and each section folder
    // (app/about, app/blog, app/services, …) has its own, cascading to children.
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nameFull} — ${SITE.shortDesc}`,
    description: SITE.description,
    // twitter:image falls back to og:image (per-segment opengraph-image.png).
    // Add site handle when you have one: site: "@shieldsyncsec"
  },
  robots: {
    index: true,
    follow: true,
    // Allow Google to use large image previews and full snippet text in results —
    // same settings cybr.com uses (max-image-preview:large, max-snippet:-1, max-video-preview:-1)
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        {/* Region detection before first paint. Three tiers:
            1. Cached IP result from a previous visit (localStorage, 7d TTL) —
               instant, correct even for VPN/travel/wrong-timezone edge cases.
            2. Timezone fallback for the first-ever visit — near-perfect for
               the common case (India TZ), no network wait.
            3. Async IP fetch to labs.shieldsyncsecurity.com/api/geo (Cloudflare
               Workers -> cf-ipcountry). Corrects the TZ guess for edge cases,
               fires a "ss:region" event, and caches the result so tier 1 hits
               on every subsequent visit.
            data-region="in" makes globals.css show INR (.price-inr) and hide
            USD (.price-usd). Anything else = USD. A manual toggle sets
            data-region-userset="1" so the IP fetch can't overwrite the choice. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement,raw=localStorage.getItem('ss_region');if(raw){var p=JSON.parse(raw);if(p&&p.r&&Date.now()-(p.t||0)<6048e5){d.setAttribute('data-region',p.r);return}}var tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';if(/Kolkata|Calcutta/i.test(tz))d.setAttribute('data-region','in');fetch('https://labs.shieldsyncsecurity.com/api/geo').then(function(r){return r.json()}).then(function(x){var r=x&&x.country==='IN'?'in':'us';try{localStorage.setItem('ss_region',JSON.stringify({r:r,t:Date.now()}))}catch(e){}if(d.getAttribute('data-region-userset')==='1')return;if(r!==d.getAttribute('data-region')){d.setAttribute('data-region',r);window.dispatchEvent(new CustomEvent('ss:region',{detail:{region:r}}))}}).catch(function(){})}catch(e){}})();",
          }}
        />
        {/* Global JSON-LD: Organization + WebSite — present on every page */}
        <SchemaOrg schema={[organizationSchema(), webSiteSchema()]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
