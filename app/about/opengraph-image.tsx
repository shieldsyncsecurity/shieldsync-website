import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security â€” About";

export default function Image() {
  return ogResponse({
    title: "About ShieldSync Security",
    subtitle: "A global cybersecurity company, built hands-on by practitioners.",
    badges: ["Practitioner-built", "Global", "Hands-on"],
  });
}
