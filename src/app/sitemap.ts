import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";
import { SITE, absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: absoluteUrl("/blog"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: absoluteUrl("/projects"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];

    const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
        url: absoluteUrl(`/blog/${p.slug}`),
        lastModified: new Date(p.date),
        changeFrequency: "yearly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes];
}
