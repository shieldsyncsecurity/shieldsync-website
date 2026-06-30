"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

/**
 * Top-notch YouTube embed using the "facade" pattern:
 *  - On initial paint we render only a clickable poster image + play button (~25 KB).
 *  - The full YouTube iframe (~1.4 MB) loads only when the user clicks play.
 *  - This keeps homepage LCP fast and the page weight small for first-load users
 *    who never watch the video — which is most of them.
 *
 * Pass an empty videoId to render the placeholder card (used while the real
 * video is in production). Swap it in one place when the video is ready.
 */
export function VideoEmbed({
  videoId,
  title,
  posterPath,
}: {
  videoId: string;
  title: string;
  /** Optional custom poster path (served from /public). YouTube's default
   * maxresdefault is used when omitted. A bespoke poster lifts click-through
   * meaningfully over YouTube's auto-generated thumbnail. */
  posterPath?: string;
}) {
  if (!videoId) {
    // Placeholder while the explainer is in production. Reserves the exact
    // 16:9 footprint so when the real embed drops in, no layout shift.
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-brand/[0.08] via-cyan/[0.04] to-transparent">
        <div className="cyber-grid absolute inset-0 opacity-30" />
        <div className="relative flex h-full flex-col items-center justify-center p-6 text-center sm:p-10">
          <span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
            Video dropping soon
          </span>
          <h3 className="mt-4 text-xl font-bold text-fg sm:text-2xl">
            The 90-second walkthrough is in production
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Meanwhile, you can launch the actual lab in your browser
            and skip the explainer entirely.
          </p>
        </div>
      </div>
    );
  }

  // Embed params:
  //   rel=0             — don't show unrelated suggested videos at end
  //   modestbranding=1  — minimise YouTube logo in the player chrome
  //   cc_load_policy=1  — captions on by default (a11y + helps muted viewers)
  //   hd=1              — request HD quality
  //   playsinline=1     — keep inline on iOS instead of forcing fullscreen
  //   autoplay=1        — start immediately on iframe load. Browser autoplay
  //                       policy allows this because LiteYouTubeEmbed only
  //                       loads the iframe after a user click on the facade,
  //                       so the iframe load itself counts as user-initiated.
  //                       Without this YouTube renders its own giant red
  //                       "click to play" overlay on top of our facade.
  const params = "rel=0&modestbranding=1&cc_load_policy=1&hd=1&playsinline=1&autoplay=1";

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: title,
    thumbnailUrl: posterPath
      ? `https://shieldsyncsecurity.com${posterPath}`
      : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate: "2026-06-30",
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-xl shadow-slate-900/10 ss-video-frame">
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        poster={posterPath ? undefined : "maxresdefault"}
        webp
        params={params}
        wrapperClass="yt-lite ss-yt-wrapper"
        playerClass="lty-playbtn ss-yt-playbtn"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
