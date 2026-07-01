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
        disallow: ["/api/", "/_next/", "/dashboard/", "/admin/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
