import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Cybersecurity Internship â€” ShieldSync Security | â‚¹9,999 Â· 8 weeks Â· Certificate included";

export default function Image() {
  return ogResponse({
    title: "Cybersecurity Internship â€” â‚¹9,999",
    subtitle: "8 weeks, hands-on AWS projects, 1:1 mentorship, and a completion certificate.",
    badges: ["AWS Projects", "Mentorship", "Certificate"],
  });
}
