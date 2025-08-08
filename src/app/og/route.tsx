import { ImageResponse } from "next/og";
import data from "@/content/site-data";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#7c5cff,#2de2e6)",
          color: "white",
          fontSize: 64,
          fontWeight: 800,
        }}
      >
        {data.name} — {data.title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

