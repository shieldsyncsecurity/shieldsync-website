import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Learn cloud security â€” a hands-on roadmap | ShieldSync Security";

export default function Image() {
  return ogResponse({
    title: "Learn Cloud Security â€” a hands-on roadmap",
    subtitle: "Zero to job-ready, one real lab at a time. Your first lab is free.",
    badges: ["Beginner", "Intermediate", "Advanced"],
  });
}
