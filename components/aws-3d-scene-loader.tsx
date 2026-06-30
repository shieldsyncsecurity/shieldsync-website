"use client";

import dynamic from "next/dynamic";

// `dynamic({ ssr: false })` is only valid inside Client Components in Next 16.
// This thin wrapper lets the server-rendered /aws-security-3d page mount the
// WebGL canvas without pulling three.js into its SSR bundle.
const Aws3dScene = dynamic(
  () => import("@/components/aws-3d-scene").then((m) => m.Aws3dScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0f1f] via-[#0f1429] to-[#06080f] sm:h-[620px]">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            Loading 3D scene…
          </div>
        </div>
      </div>
    ),
  }
);

export function Aws3dSceneLoader() {
  return <Aws3dScene />;
}
