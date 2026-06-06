import { ogResponse, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "SOC Labs — SIEM & SOAR | ShieldSync Security";

export default function Image() {
  return ogResponse({
    title: "SOC Labs — SIEM & SOAR",
    subtitle: "Hands-on detection & automated response in managed environments. No setup.",
    badges: ["SIEM", "SOAR", "SOC"],
  });
}
