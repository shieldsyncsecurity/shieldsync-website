import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security — Cloud Security Services";

export default function Image() {
  return ogResponse({
    title: "Cloud Security Services",
    subtitle: "AWS assessments, compliance readiness, corporate training & labs-as-a-service.",
    badges: ["AWS", "Compliance", "Training"],
  });
}
