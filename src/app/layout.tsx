import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";

import { SITE } from "@/lib/site";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import "./globals.css";

const geist = Geist({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
    variable: "--font-geist-sans",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600"],
    variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: {
        default: SITE.title,
        template: `%s · ${SITE.name}`,
    },
    description: SITE.description,
    authors: [{ name: SITE.author }],
    creator: SITE.author,
    openGraph: {
        type: "website",
        url: SITE.url,
        siteName: SITE.name,
        title: SITE.title,
        description: SITE.description,
        locale: SITE.locale,
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.description,
        creator: `@${SITE.social.twitter.handle}`,
    },
    alternates: {
        canonical: "/",
        types: {
            "application/rss+xml": [
                { url: "/rss.xml", title: `${SITE.name} RSS feed` },
            ],
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <body>
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter />
            </body>
        </html>
    );
}
