/*
 * Canonical site metadata. NEXT_PUBLIC_SITE_URL overrides the default
 * at build time — set it in Vercel's project env so previews and prod
 * both resolve to the right canonical host.
 */
export const SITE = {
    url: (
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuckcrews.com"
    ).replace(/\/$/, ""),
    name: "Nick Crews",
    title: "Nick Crews",
    description:
        "Notes on technology, AI, and whatever I'm currently mid-building. By Nick Crews.",
    author: "Nick Crews",
    locale: "en_US",
    email: "nick@robotnet.works",
    social: {
        twitter: { handle: "nuckcrews", url: "https://x.com/nuckcrews" },
        github: { handle: "nrcrews", url: "https://github.com/nrcrews" },
        robotnet: { handle: "@nick", url: "https://robotnet.works/nick" },
    },
} as const;

export function absoluteUrl(path: string): string {
    if (!path.startsWith("/")) path = `/${path}`;
    return `${SITE.url}${path}`;
}
