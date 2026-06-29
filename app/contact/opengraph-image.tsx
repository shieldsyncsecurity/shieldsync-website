import { ogResponse, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ShieldSync Security — Contact";

export default function Image() {
  return ogResponse({
    title: "Talk to ShieldSync Security",
    subtitle: "Services, training, labs, or the internship — let's find your next step.",
    badges: ["WhatsApp", "Email", "Book a call"],
  });
}
