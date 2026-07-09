import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Required for `output: export` (static Amplify build). Harmless on Cloudflare.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only disallow build assets. The old list advertised sensitive-looking
        // paths (/api /admin /dashboard) that do NOT exist on this static
        // marketing site — pointless noise a scan flagged; those surfaces live
        // on the labs/enterprise subdomains and are protected server-side there.
        disallow: ["/_next/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
