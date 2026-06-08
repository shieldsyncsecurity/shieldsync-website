import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security â€” Hands-on AWS Security Labs + SOC";

export default function Image() {
  return ogResponse({
    title: "Hands-on AWS Security Labs + SOC",
    subtitle: "Real, managed cyber ranges. AWS cloud security is the flagship, plus SIEM & SOAR.",
    badges: ["AWS", "SIEM", "SOAR"],
  });
}
