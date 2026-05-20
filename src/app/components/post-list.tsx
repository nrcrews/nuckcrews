import Link from "next/link";

import { formatPostDate, type PostMeta } from "@/lib/posts";

import styles from "./post-list.module.css";

export function PostList({ posts }: { posts: PostMeta[] }) {
    if (posts.length === 0) {
        return (
            <p className={styles.empty}>
                No posts yet. More soon.
            </p>
        );
    }

    return (
        <ol className={styles.list}>
            {posts.map((post) => (
                <li key={post.slug} className={styles.item}>
                    <Link href={`/blog/${post.slug}`} className={styles.link}>
                        <time className={styles.date} dateTime={post.date}>
                            {formatPostDate(post.date)}
                        </time>
                        <span className={styles.title}>{post.title}</span>
                        {post.summary ? (
                            <span className={styles.summary}>{post.summary}</span>
                        ) : null}
                    </Link>
                </li>
            ))}
        </ol>
    );
}
