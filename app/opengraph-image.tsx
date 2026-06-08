import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security â€” Secure the cloud. Build the talent that defends it.";

export default function Image() {
  return ogResponse({
    title: "Secure the cloud. Build the talent that defends it.",
    subtitle: "Global cybersecurity services, hands-on training & real cloud labs.",
    badges: ["Cloud Security", "AWS Labs", "SIEM / SOAR", "Internship"],
  });
}
