import { ImageResponse } from "next/og";

/* Shared 1200x630 Open Graph card generator — keeps every page's share image
   on-brand and consistent. Dark indigo card reads well in social feeds. */

export const OG_SIZE = { width: 1200, height: 630 };

export function ogResponse({
  title,
  subtitle,
  badges = ["Cloud Security", "AWS Labs", "SIEM / SOAR"],
}: {
  title: string;
  subtitle: string;
  badges?: string[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0b1020 0%, #141b3a 55%, #0b1020 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 88px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(129,140,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px", zIndex: 1 }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(99,102,241,0.16)",
              border: "1.5px solid rgba(129,140,248,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "20px", height: "22px", border: "2px solid #818cf8", borderRadius: "2px 2px 10px 10px" }} />
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            ShieldSync Security
          </span>
        </div>

        <div style={{ fontSize: "56px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, maxWidth: "940px", marginBottom: "26px", zIndex: 1 }}>
          {title}
        </div>

        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.62)", maxWidth: "760px", lineHeight: 1.5, zIndex: 1 }}>
          {subtitle}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "36px", zIndex: 1 }}>
          {badges.map((label) => (
            <div
              key={label}
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(129,140,248,0.35)",
                background: "rgba(99,102,241,0.12)",
                color: "#a5b4fc",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "44px",
            left: "88px",
            right: "88px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)" }}>shieldsyncsecurity.com</span>
          <span style={{ fontSize: "12px", color: "#818cf8", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            Empowering Cybersecurity Futures
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
