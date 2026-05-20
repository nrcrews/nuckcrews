import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const alt = SITE.title;
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
                    background:
                        "linear-gradient(180deg, #ffffff 0%, #eef5fb 60%, #d2e8f6 100%)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#1a6db5",
                    }}
                >
                    <div
                        style={{
                            width: 56,
                            height: 4,
                            borderRadius: 2,
                            background:
                                "linear-gradient(to right, #94c3e3 0%, #1a6db5 100%)",
                        }}
                    />
                    Personal site
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <div
                        style={{
                            fontSize: 110,
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 1,
                            color: "#0a0a0a",
                        }}
                    >
                        Nick Crews
                    </div>
                    <div
                        style={{
                            fontSize: 34,
                            color: "#1a1f2e",
                            maxWidth: 900,
                            lineHeight: 1.3,
                        }}
                    >
                        Writing about technology, AI, and things I&apos;m building.
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 22,
                        color: "#3a4356",
                    }}
                >
                    <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
                    <span style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
                        est. 2026
                    </span>
                </div>
            </div>
        ),
        { ...size },
    );
}
