import { ImageResponse } from "next/og";

export const alt = "Nile Software Solutions — We Build Software for Businesses Ready to Grow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(80% 90% at 85% 10%, rgba(66,133,255,0.35), rgba(8,11,16,0) 60%), #080B10",
          color: "#F5F7FA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#0D121B", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: "linear-gradient(90deg,#4285FF,#36D6C5)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>NILE</div>
            <div style={{ fontSize: 20, color: "#9BA6B5" }}>Nile Software Solutions</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 950 }}>
            We Build Software for Businesses Ready to Grow.
          </div>
          <div style={{ fontSize: 26, color: "#9BA6B5", maxWidth: 900 }}>
            Business systems · AI-powered applications · Web platforms & marketplaces
          </div>
        </div>
      </div>
    ),
    size,
  );
}
