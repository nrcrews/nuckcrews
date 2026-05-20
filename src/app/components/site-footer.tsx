import { Glyph, type GlyphType } from "@/ui/glyph/glyph";
import { SITE } from "@/lib/site";

import styles from "./site-footer.module.css";

type SocialLink = {
    label: string;
    href: string;
    glyph: GlyphType;
    external?: boolean;
};

const LINKS: SocialLink[] = [
    { label: `Email ${SITE.email}`, href: `mailto:${SITE.email}`, glyph: "mail" },
    { label: "RSS feed", href: "/rss.xml", glyph: "rss" },
    { label: "X (@nuckcrews)", href: SITE.social.twitter.url, glyph: "twitterX", external: true },
    { label: "GitHub (nrcrews)", href: SITE.social.github.url, glyph: "github", external: true },
    { label: "RobotNet (@nick)", href: SITE.social.robotnet.url, glyph: "logo", external: true },
];

export function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <span className={styles.copy}>
                    <span className={styles.dot} aria-hidden />
                    &copy; {new Date().getFullYear()} Nick Crews · still
                    building
                </span>
                <nav className={styles.links} aria-label="Elsewhere">
                    {LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noreferrer" : undefined}
                            aria-label={link.label}
                            className={styles.link}
                        >
                            <Glyph type={link.glyph} size="xsmall" />
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
