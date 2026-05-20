import { PostList } from "../components/post-list";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

export const metadata = {
    title: "Blog",
    description: "All posts.",
};

export default async function BlogIndexPage() {
    const posts = await getAllPosts();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Blog</h1>
                <p className={styles.lede}>
                    Everything I've published, newest first.
                </p>
            </header>
            <PostList posts={posts} />
        </div>
    );
}
