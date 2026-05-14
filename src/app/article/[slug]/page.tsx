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
import { NewsletterForm } from "@/components/NewsletterForm";
import { ArticleShareRail } from "@/components/ArticleShareRail";
import type { Metadata } from "next";
import { NEWSLETTER_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

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
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
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

  const shareUrl = `${SITE_URL}/article/${article.slug}`;

  const showHero = !article.hideHero;

  return (
    <>
      <ReadingProgress />

      <article>
        <header className="relative">
          <div className="mx-auto max-w-3xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
            <nav className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500 font-mono">
              <Link href="/" className="transition-colors hover:text-gold-500">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <Link
                href={`/category/${article.category.toLowerCase()}`}
                className="transition-colors hover:text-gold-500"
              >
                {article.category}
              </Link>
            </nav>

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-cyan-400 to-gold-400" />
              <Link
                href={`/category/${article.category.toLowerCase()}`}
                className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-500 transition-colors hover:text-gold-600 font-mono"
              >
                {article.category} Desk
              </Link>
            </div>

            <h1 className="mb-5 font-display text-[2.25rem] font-bold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[2.85rem] lg:text-[3.35rem]">
              {article.title}
            </h1>

            <p className="mb-8 font-display text-lg font-normal leading-[1.5] tracking-[-0.01em] text-slate-600 sm:text-xl">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-gold-500 to-rose-500 text-white text-[13px] font-black tracking-tight shadow-[0_12px_28px_-16px_rgba(37,99,235,0.55)]">
                  {article.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-slate-950">
                    {article.author}
                  </span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                    {article.authorRole}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="h-3 w-px bg-slate-300" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>

          {showHero && (
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <figure className="relative overflow-hidden border border-slate-200 bg-white shadow-[0_24px_55px_-40px_rgba(15,23,42,0.26)]">
                <img
                  src={getArticleImageUrl(article, 1600, 1000)}
                  alt={article.title}
                  className="mx-auto block max-h-[620px] w-full object-contain"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/95 to-transparent"
                />
              </figure>
            </div>
          )}
        </header>

        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">
          <ArticleShareRail shareUrl={shareUrl} title={article.title} />

          <div
            className="article-content max-w-none border border-slate-200 bg-white px-6 py-8 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.2)] sm:px-10 sm:py-10"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-10 border-t border-slate-200 pt-8">
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 font-mono">
              Filed under
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-gold-300 hover:bg-gold-100 hover:text-slate-950 font-mono"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mt-8 flex flex-col items-start gap-5 overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-gold-500 to-rose-500 text-base font-black tracking-tight text-white">
              {article.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-xl font-bold leading-tight tracking-[-0.015em] text-slate-950">
                {article.author}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500 font-mono">
                {article.authorRole}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-6 pb-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-slate-500 font-mono">
              End of article
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
            <div className="flex items-end gap-3">
              <span className="mb-2 h-9 w-1 bg-gradient-to-b from-cyan-400 to-gold-400" />
              <h2 className="font-display text-[2rem] font-bold leading-[1] tracking-[-0.025em] text-slate-950 sm:text-[2.4rem]">
                More in{" "}
                <em className="font-medium italic text-gold-500">
                  {article.category}
                </em>
              </h2>
            </div>
            <Link
              href={`/category/${article.category.toLowerCase()}`}
              className="pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold-500 font-mono"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relArticle) => (
              <ArticleCardVertical key={relArticle.id} article={relArticle} />
            ))}
          </div>
        </section>
      )}

      {mostRead.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-baseline gap-3">
            <h2 className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.02em] text-slate-950">
              Most Read
            </h2>
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold-500 font-mono">
              / This week
            </span>
          </div>
          <ol className="grid grid-cols-1 gap-0 overflow-hidden border border-slate-200 bg-white shadow-[0_18px_44px_-36px_rgba(15,23,42,0.18)] sm:grid-cols-2 lg:grid-cols-4">
            {mostRead.map((m, index) => (
              <li
                key={m.id}
                className="border-b border-slate-200 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <Link
                  href={`/article/${m.slug}`}
                  className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-slate-50"
                >
                  <span className="shrink-0 font-display text-[2.25rem] font-bold leading-none tabular-nums text-slate-300 transition-colors group-hover:text-gold-400">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-500 font-mono">
                      {m.category}
                    </span>
                    <h3 className="mt-1 line-clamp-3 font-sans text-[0.95rem] font-semibold leading-[1.4] tracking-[-0.005em] text-slate-900 transition-colors group-hover:text-gold-500">
                      {m.title}
                    </h3>
                    <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
                      {formatDateShort(m.publishedAt)} · {m.readTime} min
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-slate-200 bg-white p-8 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.2)] sm:p-12">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-gold-400" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-500 font-mono">
                  {NEWSLETTER_NAME}
                </span>
              </div>
              <p className="mb-3 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-slate-950 sm:text-[2rem]">
                The essential morning read,{" "}
                <em className="font-medium italic text-gold-500">
                  every morning.
                </em>
              </p>
              <p className="max-w-lg text-[15px] leading-relaxed text-slate-600">
                The biggest headlines in markets, regulation, and digital assets. One email, delivered at 8am UTC.
              </p>
            </div>
            <NewsletterForm variant="article" />
          </div>
        </div>
      </section>
    </>
  );
}
