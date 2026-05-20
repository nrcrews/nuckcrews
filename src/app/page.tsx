import Image from "next/image";

import { PostList } from "./components/post-list";
import { LinkButton } from "@/ui/button/button";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

const RECENT_COUNT = 5;

export default async function HomePage() {
    const posts = await getAllPosts();
    const recent = posts.slice(0, RECENT_COUNT);
    const latest = posts[0];
    const hasMore = posts.length > RECENT_COUNT;

    return (
        <div className={styles.page}>
            <section className={styles.intro}>
                <Image
                    src="/me.png"
                    alt="Nick Crews"
                    width={112}
                    height={112}
                    priority
                    className={styles.avatar}
                />
                <h1 className={styles.title}>
                    <span>Hi, I'm</span>
                    <span className={styles.titleEm}>Nick Crews.</span>
                </h1>
                <p className={styles.lede}>
                    I build things, then write about them. Mostly technology,
                    AI, and opinions I'm still working out. Posted here in
                    case any of it's useful.
                </p>
                <div className={styles.ctas}>
                    {latest ? (
                        <LinkButton
                            href={`/blog/${latest.slug}`}
                            variant="brand"
                            size="lg"
                        >
                            Read the latest
                        </LinkButton>
                    ) : null}
                    <LinkButton href="/projects" variant="ghost" size="lg">
                        See what I'm building
                    </LinkButton>
                </div>
            </section>

            <section className={styles.feed} aria-label="Recent posts">
                <PostList posts={recent} />
                {hasMore ? (
                    <div className={styles.feedFooter}>
                        <LinkButton href="/blog" variant="secondary">
                            All posts →
                        </LinkButton>
                    </div>
                ) : null}
            </section>
        </div>
    );
}
