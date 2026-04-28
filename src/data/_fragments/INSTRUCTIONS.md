# Article expansion brief

You are expanding the article content for one category in a Next.js news site so it reads like a professional newsroom (think Bloomberg / FT / The Block / Coindesk).

## Source

`src/data/articles.ts` contains an `articles: Article[]` array of 140 entries split into 7 contiguous category blocks. Each block is preceded by a comment banner like:

```
// ═══════════════════════════════════════════════════════════════════
//                            <CATEGORY>  (X-Y)
// ═══════════════════════════════════════════════════════════════════
```

Find the block matching **your assigned category** and the 20 article object literals inside it.

## What to change vs. keep

For every article in your block:

- **KEEP IDENTICAL** (do NOT touch): `id`, `slug`, `title`, `excerpt`, `category`, `author`, `authorRole`, `publishedAt`, `readTime`, `imageId`, `featured`, `trending`, `tags`, `hideHero` (if present).
- **EXPAND**: the `content` field. The current value is 2 short paragraphs. Replace it with **5 to 7 substantive HTML paragraphs**, ~600–850 words total per article.
- **DIVERSIFY**: the keywords inside `imageUrl: img("<keywords>", <id>)`. Pick a UNIQUE keyword combination for each of your 20 articles, drawn from your assigned keyword pool (see your launch prompt). No two articles in your block may share keywords. The `<id>` is the existing `imageId` — leave it untouched.

## Content quality bar

Each rewritten `content` must read like a real news desk piece:

1. **Lede (¶1):** restate the news event with crisp, specific framing. Lead with the most important fact or development.
2. **Context (¶2):** background — what made this possible, what came before, why now.
3. **Key data / mechanics (¶3):** specific numbers, dollar figures, percentages, technical mechanics, named participants. Be confident and concrete; invent plausible-sounding analyst names, fund names, basis points, etc. only if they fit the story factually established by the existing title/excerpt.
4. **Analyst / market reaction (¶4):** how the buy-side, on-chain analysts, regulators, or other relevant constituencies are reading the development. Quotes are fine but keep them realistic and brief.
5. **Broader implications (¶5):** what the development means for the wider category, why it matters beyond the immediate event.
6. **What to watch / outlook (¶6 or ¶6–7):** the next milestone, decision, or data point that will confirm or invalidate the trajectory. Close on a forward-looking note.

Stylistic rules:

- Wrap every paragraph in its own `<p>...</p>` tag. Concatenate them into a single string with no whitespace between tags.
- Maintain factual consistency with the title, excerpt, and tags — you are expanding a story that has already been reported, not writing a new one.
- Avoid sensationalism. Adopt a measured, expert tone. No emoji, no all-caps, no marketing language.
- No editorialising in news pieces (Crypto, DeFi, NFTs, Markets, Mining, Regulation). The Opinion category is the only place where a clearly argued first-person editorial voice is appropriate.
- Keep paragraphs varied in length (60–150 words each). Shorter graphs for emphasis; longer ones for technical detail.
- Do not introduce HTML other than `<p>` tags. No `<h2>`, no `<ul>`, no `<strong>`, no `<a>`. Plain paragraphs only.
- Escape any apostrophes naturally; do not double-quote inside backtick template literals.
- The content uses backtick template literals (`` ` ``). Inside the content string you should NOT use backticks. Use straight quotes (`"`) or em-dashes if you need them.

## Image keywords

Article images are generated automatically by `getArticleImageUrl()` (crypto-themed images hosted on the internet via Unsplash Source), using the story’s existing `imageId` + `slug`.

- If you add `imageUrl`, it should be a **direct image URL** (`https://...jpg` / `png` / etc.) and should be **crypto-themed**.
- Otherwise, omit `imageUrl` entirely and let the helper generate the hero/thumb art.

## Output

Write your finished 20 article object literals to your assigned fragment file path (also given in the launch prompt). The file must contain:

- Exactly 20 article object literals.
- Each separated by `,\n`.
- A trailing comma after the last object.
- No surrounding `[` `]` brackets.
- No `export`, no `import`, no comment banners, no helper definitions.
- No category banner comments.
- If present, `imageUrl` must be a direct image URL string; otherwise omit it.

Example shape (showing 2 of 20 — your file should have 20):

```ts
  {
    id: 1,
    slug: "spot-bitcoin-etfs-approved-after-decade-long-fight",
    title: "Spot Bitcoin ETFs Approved After a Decade-Long Fight",
    excerpt: "...unchanged...",
    content: `<p>...lede...</p><p>...context...</p><p>...data...</p><p>...reactions...</p><p>...implications...</p><p>...outlook...</p>`,
    category: "Crypto",
    author: "Maya Reyes",
    authorRole: "Senior Markets Correspondent",
    publishedAt: "2024-01-11T16:30:00Z",
    readTime: 5,
    imageId: 5001,
    imageUrl: "https://example.com/crypto-themed-image.jpg",
    featured: true,
    trending: true,
    tags: ["bitcoin", "etf", "sec", "approval", "institutions"],
  },
  {
    id: 2,
    slug: "...",
    ...
  },
```

## Verification before finishing

Before declaring done, sanity-check your fragment:

- 20 object literals, in the same `id` order as the source file.
- Every `id`, `slug`, `title`, `excerpt`, `category`, `author`, `authorRole`, `publishedAt`, `readTime`, `imageId`, `featured`, `trending`, `tags` field value is byte-identical to the source.
- Each `content` has at least 5 `<p>` tags, no nested HTML other than `<p>`, no stray backticks inside the template literal.
- Every `imageUrl` keyword string is unique within your fragment.
- File ends with `,` after the 20th object.

When done, return only a one-line confirmation (e.g., `wrote 20 articles to <path>`). Do not paste the content back.
