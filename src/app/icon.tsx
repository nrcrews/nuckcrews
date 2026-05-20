import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "linear-gradient(180deg, #6aa6d4 0%, #1a6db5 100%)",
                    color: "#ffffff",
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    /* Optical centering — n sits a hair high in most fonts. */
                    paddingBottom: 2,
                }}
            >
                n
            </div>
        ),
        size,
    );
}
