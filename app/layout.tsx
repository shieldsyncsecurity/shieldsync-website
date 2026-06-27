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
    // og:image is auto-wired from app/opengraph-image.tsx by Next.js
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nameFull} — ${SITE.shortDesc}`,
    description: SITE.description,
    // twitter:image is auto-wired from app/opengraph-image.tsx by Next.js
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Global JSON-LD: Organization + WebSite — present on every page */}
        <SchemaOrg schema={[organizationSchema(), webSiteSchema()]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
