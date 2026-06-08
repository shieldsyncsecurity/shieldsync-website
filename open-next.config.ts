import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config: no R2 incremental cache (the marketing site has no ISR/
// revalidate pages), so there's nothing extra to provision in Cloudflare.
export default defineCloudflareConfig({});
