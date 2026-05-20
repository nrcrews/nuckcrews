# nuckcrews.com

My personal site and blog. Next.js 16, App Router, TypeScript.

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Add a blog post

Drop a markdown file in `content/posts/`. The filename becomes the slug.

```md
---
title: Some title
date: 2026-06-01
summary: One-line description.
tags: [ai, opinions]
---

Body. GFM markdown plus fenced code blocks.
```

Set `draft: true` to keep something out of the archive.

## Add a project

Edit `src/lib/projects.ts`. Tags are typed (`ai`, `agent`, `web`, `ios`,
`blockchain`, `blog`) so typos are compile errors.

## Deploy

Pushed to Vercel. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs on
previews if you want them to resolve to a custom domain.
