import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getRelatedArticles,
  getArticleImageUrl,
  getTrendingArticles,
  articles,
} from "@/data/articles";
import { ArticleCardVertical } from "@/components/ArticleCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import type { Metadata } from "next";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found · PrimeTime Global News" };
  return {
    title: `${article.title} · PrimeTime Global News`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} · PrimeTime Global News`,
      description: article.excerpt,
      type: "article",
      siteName: "PrimeTime Global News",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} · PrimeTime Global News`,
      description: article.excerpt,
      site: "@primetimeglobalnews",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const mostRead = getTrendingArticles()
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  const shareUrl = `https://primetimeglobalnews.com/article/${article.slug}`;
  const shareIntentX = `https://x.com/intent/tweet?text=${encodeURIComponent(
    article.title,
  )}&url=${encodeURIComponent(shareUrl)}`;

  const showHero = Boolean(article.imageUrl) && !article.hideHero;

  return (
    <>
      <ReadingProgress />

      <article>
        {/* ───── HERO ───── */}
        <header className="relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] text-slate-500 mb-8 uppercase tracking-[0.22em] font-mono">
              <Link href="/" className="hover:text-gold-400 transition-colors">
                Home
              </Link>
              <span className="text-ink-700">/</span>
              <Link
                href={`/category/${article.category.toLowerCase()}`}
                className="hover:text-gold-400 transition-colors"
              >
                {article.category}
              </Link>
            </nav>

            {/* Kicker */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold-400" />
              <Link
                href={`/category/${article.category.toLowerCase()}`}
                className="text-[10px] font-bold text-gold-400 uppercase tracking-[0.32em] font-mono hover:text-gold-300 transition-colors"
              >
                {article.category} Desk
              </Link>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-parchment leading-[1.05] tracking-[-0.025em] mb-5">
              {article.title}
            </h1>

            {/* Dek */}
            <p className="font-display text-lg sm:text-xl text-slate-300 leading-[1.5] mb-8 tracking-[-0.01em] font-normal">
              {article.excerpt}
            </p>

            {/* Byline row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-ink-700/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-ink-950 font-black text-[13px] tracking-tight ring-2 ring-ink-900">
                  {article.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-parchment">
                    {article.author}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono mt-0.5">
                    {article.authorRole}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 uppercase tracking-[0.2em] font-mono">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="w-px h-3 bg-ink-700" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Optional full-bleed hero image */}
          {showHero && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <figure className="relative overflow-hidden rounded-sm ring-1 ring-ink-700/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] bg-ink-900">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full max-h-[620px] object-contain mx-auto block"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none"
                />
              </figure>
            </div>
          )}
        </header>

        {/* ───── READING COLUMN ───── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 relative">
          {/* Floating share rail — desktop only, outside the reading column */}
          <div className="hidden xl:flex absolute -left-20 top-0 flex-col items-center gap-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 [writing-mode:vertical-rl] rotate-180 mb-2">
              Share
            </span>
            <a
              href={shareIntentX}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-ink-900 ring-1 ring-ink-700 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:ring-gold-400/60 transition-all"
              aria-label="Share on X"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-ink-900 ring-1 ring-ink-700 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:ring-gold-400/60 transition-all"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <button
              className="w-9 h-9 rounded-full bg-ink-900 ring-1 ring-ink-700 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:ring-gold-400/60 transition-all"
              aria-label="Copy link"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Article body with drop cap */}
          <div
            className="article-content max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-ink-700/60">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.28em] mb-4 font-mono">
              Filed under
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-ink-900 text-slate-300 text-xs rounded-sm ring-1 ring-ink-700 hover:bg-gold-400 hover:text-ink-950 hover:ring-gold-400 transition-colors font-mono"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author byline card */}
          <div className="mt-8 p-6 rounded-sm bg-ink-900/70 ring-1 ring-ink-700/80 flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
            />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-ink-950 font-black text-base tracking-tight shrink-0">
              {article.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-xl font-bold text-parchment leading-tight tracking-[-0.015em]">
                {article.author}
              </p>
              <p className="text-[11px] text-slate-500 uppercase tracking-[0.22em] font-mono mt-1">
                {article.authorRole}
              </p>
            </div>
            <a
              href={shareIntentX}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400 hover:bg-gold-300 text-ink-950 text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </a>
          </div>
        </div>

        {/* ───── END-OF-ARTICLE BREAK ───── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-ink-700/70" />
            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-slate-500">
              End of article
            </span>
            <span className="h-px flex-1 bg-ink-700/70" />
          </div>
        </div>
      </article>

      {/* ───── MORE IN CATEGORY ───── */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-ink-700/70">
            <div className="flex items-end gap-3">
              <span className="w-1 h-9 rounded-sm bg-gold-400 mb-2" />
              <h2 className="font-display text-[2rem] sm:text-[2.4rem] font-bold text-parchment tracking-[-0.025em] leading-[1]">
                More in{" "}
                <em className="italic font-medium text-gold-400">
                  {article.category}
                </em>
              </h2>
            </div>
            <Link
              href={`/category/${article.category.toLowerCase()}`}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400 hover:text-gold-300 transition-colors font-mono pb-2"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((relArticle) => (
              <ArticleCardVertical key={relArticle.id} article={relArticle} />
            ))}
          </div>
        </section>
      )}

      {/* ───── MOST READ (compact horizontal strip) ───── */}
      {mostRead.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="font-display text-[1.5rem] font-bold text-parchment tracking-[-0.02em] leading-none">
              Most Read
            </h2>
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-gold-400">
              / This week
            </span>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-ink-700/60">
            {mostRead.map((m, index) => (
              <li
                key={m.id}
                className="border-b border-ink-700/60 lg:border-r lg:last:border-r-0 lg:[&:nth-child(2)]:border-r sm:[&:nth-child(2n)]:lg:border-r"
              >
                <Link
                  href={`/article/${m.slug}`}
                  className="group flex items-start gap-4 p-5 h-full hover:bg-ink-900/40 transition-colors"
                >
                  <span className="font-display text-[2.25rem] font-bold text-ink-700 group-hover:text-gold-400 leading-none tabular-nums shrink-0 transition-colors">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-[0.24em] font-mono">
                      {m.category}
                    </span>
                    <h3 className="font-sans text-[0.95rem] font-semibold text-slate-100 group-hover:text-parchment transition-colors line-clamp-3 mt-1 leading-[1.4] tracking-[-0.005em]">
                      {m.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono mt-2 inline-block">
                      {formatDateShort(m.publishedAt)} · {m.readTime} min
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───── NIGHTLY BRIEF (full-width band) ───── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-ink-900 to-ink-850 ring-1 ring-ink-700/70 p-8 sm:p-12">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gold-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
          />
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-gold-400" />
                </span>
                <span className="text-[10px] font-bold text-gold-400 uppercase tracking-[0.28em] font-mono">
                  The Nightly Brief
                </span>
              </div>
              <p className="font-display text-[1.75rem] sm:text-[2rem] font-bold text-parchment leading-[1.15] tracking-[-0.02em] mb-3">
                The stories that matter,{" "}
                <em className="italic font-medium text-gold-400">
                  every evening.
                </em>
              </p>
              <p className="text-slate-400 text-[15px] leading-relaxed max-w-lg">
                Our editors&apos; sharpest take on the day. One email. Sent at
                7pm. No fluff.
              </p>
            </div>
            <form className="md:col-span-2 flex flex-col gap-2">
              <input
                type="email"
                placeholder="you@domain.com"
                aria-label="Email address"
                className="w-full px-4 py-3 bg-ink-950/70 border border-ink-700 focus:border-gold-400/70 focus:outline-none rounded-sm text-sm text-parchment placeholder:text-slate-600 font-mono"
              />
              <button
                type="button"
                className="w-full px-4 py-3 bg-gold-400 hover:bg-gold-300 text-ink-950 text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
