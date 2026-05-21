<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this is

Nick Crews' personal site and blog at nuckcrews.com. Next.js 16 App
Router, TypeScript, CSS Modules, pnpm. Statically generated; deployed
on Vercel.

## Commands

```bash
pnpm install     # one-time
pnpm dev         # local dev at http://localhost:3000
pnpm build       # production build (use this to verify edits compile)
pnpm lint        # eslint
```

There are no tests yet.

## Content sources

Both blog posts and projects are content authored in-repo. There is no
CMS or database.

- **Blog posts**: `content/posts/*.md`, parsed at request time by
  `src/lib/posts.ts` using `gray-matter`. Filename = slug. Frontmatter
  schema in `PostFrontmatter` (`title`, `date`, `summary`, `tags`,
  `draft`). Set `draft: true` to exclude from listings, RSS, and
  sitemap. `getAllPosts` sorts newest-first; `getAdjacentPosts` returns
  the chronological neighbors used by the prev/next nav on post pages.
- **Projects**: typed array in `src/lib/projects.ts`. Tags are a
  closed `ProjectTag` union so typos are compile errors. Order is
  manual, newest-first.

## Architecture

- `src/app/` — App Router routes. Pages are Server Components by
  default. CSS Modules co-located per route.
- `src/lib/site.ts` — canonical site config. `NEXT_PUBLIC_SITE_URL`
  overrides the prod default; consumed by sitemap, RSS, OG metadata,
  and the footer's social/contact links. Public email + social handles
  live here too.
- `src/ui/button/` — `LinkButton` + `Button` ports of the robotnet
  "lab" button. Variants: `brand` (cloudy-blue CTA), `secondary` (paper),
  `ghost` (transparent). Sizes: `sm` / `md` / `lg`. Internal hrefs
  auto-route through `next/link`.
- `src/ui/glyph/` — single-color SVGs in `/public` rendered as CSS
  masks so the icon picks up `currentColor`. To add an icon: drop the
  SVG in `/public`, add one row to `GLYPH_SRC` in `glyph.tsx`, and
  extend the `GlyphType` union.
- `src/app/components/` — site-wide chrome (header, footer, post list,
  prose renderer). The prose renderer uses `react-markdown` +
  `remark-gfm`.

## SEO is wired via App Router conventions

`app/rss.xml/route.ts`, `app/robots.ts`, `app/sitemap.ts`,
`app/opengraph-image.tsx`, and `app/icon.tsx` are all standard Next 16
file conventions. RSS is `force-static`. The post page exports
per-post `openGraph.type=article` metadata and inlines a `BlogPosting`
JSON-LD script. Don't bolt on `next-seo` or similar.

## Design system

A slimmed adaptation of the robotnet "lab" design system at
`../rbnx/RobotNetworks/robotnet-web/src/app/lab/` (external to this
repo, read-only reference). Late-2000s Aqua/Web-2.0 feel: paper
backgrounds, cloudy-blue palette, hairline borders, glassy gradients,
brand-gradient wordmark.

Tokens live in `src/app/globals.css` at `:root` (not scoped to
`[data-lab]` like the original). Three fonts loaded in
`layout.tsx`: Geist (display), Inter (body), JetBrains Mono.

## Voice + design conventions

These are settled site conventions. Don't relitigate.

- **Voice**: clever-but-restrained. One understated beat per paragraph
  max. No em dashes in user-facing copy (use periods, parens, or
  restructured sentences). Code comments may use em dashes.
- **No mono-uppercase "eyebrow" tags above page titles.** The lab uses
  them; this site doesn't.
- **Use `LinkButton` for nav-like UI**, not plain `<a>`. Header nav,
  back links, CTAs are all buttons.
- **Chevron glyphs for back-nav**, not arrow characters (`← All
  posts` is wrong; use `<Glyph type="chevronLeft" />` as the
  `leadingIcon`). External-link rows still use `↗`.
- **Projects use a flat tag-based list**, not category groups. Adding
  a new tag means extending the `ProjectTag` union.
