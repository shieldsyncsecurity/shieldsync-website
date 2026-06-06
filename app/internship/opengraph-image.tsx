import { ogResponse, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Cybersecurity Internship — ShieldSync Security | ₹9,999 · 8 weeks · Certificate included";

export default function Image() {
  return ogResponse({
    title: "Cybersecurity Internship — ₹9,999",
    subtitle: "8 weeks, hands-on AWS projects, 1:1 mentorship, and a completion certificate.",
    badges: ["AWS Projects", "Mentorship", "Certificate"],
  });
}
