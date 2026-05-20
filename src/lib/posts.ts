import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type PostFrontmatter = {
    title: string;
    date: string;
    summary?: string;
    tags?: string[];
    draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
    slug: string;
};

export type Post = PostMeta & {
    content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function readPostFile(filename: string): Promise<Post> {
    const slug = filename.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    return { ...frontmatter, slug, content };
}

export async function getAllPosts(): Promise<PostMeta[]> {
    let filenames: string[];
    try {
        filenames = await fs.readdir(POSTS_DIR);
    } catch {
        return [];
    }

    const posts = await Promise.all(
        filenames
            .filter((f) => f.endsWith(".md"))
            .map(readPostFile),
    );

    return posts
        .filter((p) => !p.draft)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map(({ content: _content, ...meta }) => meta);
}

export async function getPost(slug: string): Promise<Post | null> {
    try {
        return await readPostFile(`${slug}.md`);
    } catch {
        return null;
    }
}

/*
 * Returns chronological neighbors of the post. `previous` is the older
 * post (one before this in time), `next` is the newer one. Either may
 * be null at the ends of the timeline.
 */
export async function getAdjacentPosts(slug: string): Promise<{
    previous: PostMeta | null;
    next: PostMeta | null;
}> {
    const posts = await getAllPosts();
    const idx = posts.findIndex((p) => p.slug === slug);
    if (idx === -1) return { previous: null, next: null };
    // posts is sorted newest-first: idx-1 is newer, idx+1 is older.
    return {
        next: idx > 0 ? posts[idx - 1] : null,
        previous: idx < posts.length - 1 ? posts[idx + 1] : null,
    };
}

export function formatPostDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
