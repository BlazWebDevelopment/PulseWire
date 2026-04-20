import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getRelatedArticles, getArticleImageUrl, articles } from "@/data/articles";
import { ArticleCardVertical } from "@/components/ArticleCard";
import type { Metadata } from "next";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
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
  if (!article) return { title: "Article Not Found - PulseWire" };
  return {
    title: `${article.title} - PulseWire`,
    description: article.excerpt,
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

  const related = getRelatedArticles(article, 4);

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-rose-400 transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link
          href={`/category/${article.category.toLowerCase()}`}
          className="hover:text-rose-400 transition-colors"
        >
          {article.category}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main content */}
        <div className="lg:col-span-8">
          <header className="mb-8">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-crimson to-rose-600 text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-4 shadow-lg shadow-crimson/30">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              {article.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pb-6 border-b border-ink-700/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ink-700 to-ink-800 ring-1 ring-ink-700 flex items-center justify-center text-slate-200 font-bold text-sm">
                  {article.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-100">{article.author}</p>
                  <p className="text-xs text-slate-500">{article.authorRole}</p>
                </div>
              </div>
              <span className="text-ink-700">|</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="text-ink-700">|</span>
              <span>{article.readTime} min read</span>
            </div>
          </header>

          {/* Hero image */}
          <div className={`rounded-2xl overflow-hidden mb-8 ring-1 ring-ink-700/70 ${article.imageUrl ? "bg-ink-900" : "aspect-[16/9] bg-ink-900"}`}>
            <img
              src={getArticleImageUrl(article, 1200, 675)}
              alt={article.title}
              className={`w-full ${article.imageUrl ? "max-h-[560px] object-contain mx-auto block" : "h-full object-cover"}`}
            />
          </div>

          {/* Article body */}
          <div
            className="article-content text-lg leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-ink-700/70">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-ink-800 text-slate-300 text-sm rounded-full ring-1 ring-ink-700 hover:bg-crimson hover:text-white hover:ring-crimson transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-ink-700/70">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Share this article
            </h3>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://pulsewire.com/article/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-ink-950 text-sm font-semibold rounded-full hover:bg-slate-200 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Related articles */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-ink-700/70">
                Related Stories
              </h3>
              <div className="space-y-6">
                {related.map((relArticle) => (
                  <Link
                    key={relArticle.id}
                    href={`/article/${relArticle.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2 ring-1 ring-ink-700/70">
                      <img
                        src={getArticleImageUrl(relArticle, 400, 250)}
                        alt={relArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                      {relArticle.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2 mt-0.5 leading-snug">
                      {relArticle.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* Follow widget */}
            <div className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-850 to-ink-900 ring-1 ring-ink-700/70 rounded-2xl p-6 text-center">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-crimson/15 blur-3xl" />
              <svg className="relative w-7 h-7 text-white mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="relative font-semibold text-white text-sm mb-3">Follow us on X</p>
              <a
                href="https://x.com/pulsewire"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-5 py-2 bg-white text-ink-950 text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors"
              >
                @PulseWire
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* More from category */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-ink-700/70">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-crimson to-rose-600" />
              <h2 className="text-2xl font-black text-white tracking-tight">
                More in {article.category}
              </h2>
            </div>
            <Link
              href={`/category/${article.category.toLowerCase()}`}
              className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((relArticle) => (
              <ArticleCardVertical key={relArticle.id} article={relArticle} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
