import type { CSSProperties } from "react";

import styles from "./glyph.module.css";

/*
 * Slim port of the robotnet "lab" glyph system. Each SVG in /public is a
 * single-color shape; we render it as a CSS mask so the icon picks up
 * whatever color sits on the surrounding text. One source, any size,
 * any color — no duplicates per theme.
 *
 * Add a new icon by dropping the SVG in /public and adding a row below.
 */

export type GlyphType =
    | "logo"
    | "github"
    | "twitterX"
    | "rss"
    | "mail"
    | "chevronLeft"
    | "chevronRight";

const GLYPH_SRC: Record<GlyphType, string> = {
    logo: "/logo.svg",
    github: "/github.svg",
    twitterX: "/twitter-x.svg",
    rss: "/rss.svg",
    mail: "/mail.svg",
    chevronLeft: "/chevron-left.svg",
    chevronRight: "/chevron-right.svg",
};

export type GlyphSize = "xsmall" | "small" | "medium" | "large";

const GLYPH_SIZE: Record<GlyphSize, number> = {
    xsmall: 14,
    small: 18,
    medium: 24,
    large: 32,
};

export function Glyph({
    type,
    size = "small",
    label,
    className,
}: {
    type: GlyphType;
    size?: GlyphSize;
    /** Provide for icon-only buttons; omit when the glyph is decorative. */
    label?: string;
    className?: string;
}) {
    const pixels = GLYPH_SIZE[size];
    const style = {
        width: pixels,
        height: pixels,
        ["--glyph-url" as keyof CSSProperties]: `url(${GLYPH_SRC[type]})`,
    } as CSSProperties;

    return (
        <span
            className={`${styles.glyph} ${className ?? ""}`}
            style={style}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        />
    );
}
