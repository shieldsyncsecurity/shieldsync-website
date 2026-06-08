import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "SOC Labs â€” SIEM & SOAR | ShieldSync Security";

export default function Image() {
  return ogResponse({
    title: "SOC Labs â€” SIEM & SOAR",
    subtitle: "Hands-on detection & automated response in managed environments. No setup.",
    badges: ["SIEM", "SOAR", "SOC"],
  });
}
