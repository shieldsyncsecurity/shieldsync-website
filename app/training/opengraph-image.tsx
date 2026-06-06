import { ogResponse, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security — Cybersecurity Training";

export default function Image() {
  return ogResponse({
    title: "Cybersecurity Training",
    subtitle: "Internship, career tracks & corporate cohorts — hands-on and AWS-deep.",
    badges: ["Internship", "Career", "Labs"],
  });
}
