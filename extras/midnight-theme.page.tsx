import type { Metadata } from "next";
import { PreviewLabsFlow } from "@/components/preview-labs-flow";

export const metadata: Metadata = {
  title: "Midnight & Lime — labs workflow (preview)",
  robots: { index: false, follow: false },
};

export default function Preview2Page() {
  return <PreviewLabsFlow />;
}
