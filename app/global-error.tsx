"use client";

/* Root error boundary — catches render errors anywhere, including the root layout
   itself (which app/error.tsx cannot). Because it REPLACES the layout when it renders,
   it must supply its own <html>/<body> and can't rely on globals.css or the font vars,
   so styles are inline. Mirrors the tone of app/not-found.tsx. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafbff",
          color: "#1c2033",
          fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#4f46e5",
            margin: 0,
          }}
        >
          Error 500
        </p>
        <h1 style={{ marginTop: "1rem", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Something broke on our end.
        </h1>
        <p style={{ marginTop: "1rem", maxWidth: 460, fontSize: "1.05rem", lineHeight: 1.7, color: "#5a6076" }}>
          An unexpected error stopped this page from loading. Try again, or head back to something that works.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.7rem 1.4rem",
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              border: "1px solid #d7d9e6",
              color: "#1c2033",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.7rem 1.4rem",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Back home
          </a>
        </div>
      </body>
    </html>
  );
}
