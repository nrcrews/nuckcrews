import Link from "next/link";
import { notFound } from "next/navigation";

import { Prose } from "../../components/prose";
import { LinkButton } from "@/ui/button/button";
import { Glyph } from "@/ui/glyph/glyph";
import {
    formatPostDate,
    getAdjacentPosts,
    getAllPosts,
    getPost,
    type PostMeta,
} from "@/lib/posts";
import { SITE, absoluteUrl } from "@/lib/site";
import styles from "./page.module.css";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};
    const url = `/blog/${post.slug}`;
    return {
        title: post.title,
        description: post.summary,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title: post.title,
            description: post.summary,
            publishedTime: post.date,
            authors: [SITE.author],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary,
        },
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    const { previous, next } = await getAdjacentPosts(slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Person", name: SITE.author, url: SITE.url },
        url: absoluteUrl(`/blog/${post.slug}`),
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        keywords: post.tags?.join(", "),
    };

    return (
        <article className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <header className={styles.header}>
                <div className={styles.back}>
                    <LinkButton
                        href="/blog"
                        variant="ghost"
                        size="lg"
                        leadingIcon={<Glyph type="chevronLeft" size="small" />}
                    >
                        All posts
                    </LinkButton>
                </div>
                <time className={styles.date} dateTime={post.date}>
                    {formatPostDate(post.date)}
                </time>
                <h1 className={styles.title}>{post.title}</h1>
                {post.summary ? (
                    <p className={styles.lede}>{post.summary}</p>
                ) : null}
            </header>

            <Prose>{post.content}</Prose>

            <footer className={styles.footer}>
                {previous || next ? (
                    <nav className={styles.adjacent} aria-label="More posts">
                        <AdjacentLink post={previous} direction="previous" />
                        <AdjacentLink post={next} direction="next" />
                    </nav>
                ) : null}

                <p className={styles.contact}>
                    Questions, corrections, or just want to say hi?{" "}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
            </footer>
        </article>
    );
}

function AdjacentLink({
    post,
    direction,
}: {
    post: PostMeta | null;
    direction: "previous" | "next";
}) {
    const isPrev = direction === "previous";
    const label = isPrev ? "Previous" : "Next";

    if (!post) {
        return <span className={`${styles.adj} ${styles.adjEmpty}`} aria-hidden />;
    }

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`${styles.adj} ${isPrev ? styles.adjPrev : styles.adjNext}`}
        >
            <span className={styles.adjDir}>
                {isPrev ? <Glyph type="chevronLeft" size="xsmall" /> : null}
                {label}
                {!isPrev ? <Glyph type="chevronRight" size="xsmall" /> : null}
            </span>
            <span className={styles.adjTitle}>{post.title}</span>
        </Link>
    );
}
