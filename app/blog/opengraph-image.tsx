import { ogResponse, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security — Blog";

export default function Image() {
  return ogResponse({
    title: "ShieldSync Security Blog",
    subtitle: "Hands-on cloud security tutorials and cybersecurity career guidance.",
    badges: ["Cloud / AWS", "Career", "SOC"],
  });
}
