import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getRelatedArticles,
  getArticleImageUrl,
  getTrendingArticles,
  getLatestArticles,
  articles,
} from "@/data/articles";
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
  const trending = getTrendingArticles()
    .filter((a) => a.id !== article.id)
    .slice(0, 5);
  const latest = getLatestArticles(20)
    .filter((a) => a.id !== article.id && !trending.some((t) => t.id === a.id))
    .slice(0, 4);

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] text-slate-500 mb-6 uppercase tracking-widest font-mono">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Home
        </Link>
        <span className="text-ink-700">/</span>
        <Link
          href={`/category/${article.category.toLowerCase()}`}
          className="hover:text-cyan-400 transition-colors"
        >
          {article.category}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main content */}
        <div className="lg:col-span-8">
          <header className="mb-8">
            <span className="inline-block px-2.5 py-1 bg-black/80 border border-cyan-400/60 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.22em] rounded-sm mb-4 font-mono">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              {article.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-6 border-b border-ink-700/70 font-mono uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-ink-900 ring-1 ring-ink-700 flex items-center justify-center text-cyan-400 font-bold text-sm font-mono">
                  {article.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-100 normal-case tracking-normal">{article.author}</p>
                  <p className="text-[10px] text-slate-500">{article.authorRole}</p>
                </div>
              </div>
              <span className="text-ink-700">//</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="text-ink-700">//</span>
              <span>{article.readTime} min read</span>
            </div>
          </header>

          {/* Hero image */}
          <div className={`rounded-sm overflow-hidden mb-8 ring-1 ring-ink-700/80 ${article.imageUrl ? "bg-ink-900" : "aspect-[16/9] bg-ink-900"}`}>
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
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.22em] mb-3 font-mono">
              // Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-ink-900 text-slate-300 text-xs rounded-sm ring-1 ring-ink-700 hover:bg-cyan-400 hover:text-black hover:ring-cyan-400 transition-colors font-mono"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-6 border-t border-ink-700/70">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.22em] mb-3 font-mono">
              // Share this article
            </h3>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://pulsewire.com/article/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
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
            {/* Trending Now */}
            <div>
              <h3 className="text-sm font-black text-white mb-4 pb-3 border-b border-ink-700/70 uppercase tracking-[0.18em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-sm bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-mono text-[11px]">//</span>
                Trending Now
              </h3>
              <ol className="divide-y divide-ink-700/70 rounded-sm bg-ink-900/50 ring-1 ring-ink-700/70">
                {trending.map((t, index) => (
                  <li key={t.id}>
                    <Link
                      href={`/article/${t.slug}`}
                      className="group flex items-start gap-3 p-4 hover:bg-ink-800/50 transition-colors"
                    >
                      <span className="text-2xl font-black text-ink-700 group-hover:text-cyan-400 font-mono leading-none tabular-nums shrink-0 w-7 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.18em] font-mono">
                          {t.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-3 mt-0.5 leading-snug">
                          {t.title}
                        </h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {/* Newsletter / Live wire card */}
            <div className="relative overflow-hidden bg-ink-900 ring-1 ring-ink-700/80 rounded-sm p-6">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-sm bg-cyan-400/10 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-sm bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.22em] font-mono">
                    The Wire
                  </span>
                </div>
                <p className="text-white font-bold text-base leading-snug mb-2">
                  Breaking news, straight to your inbox.
                </p>
                <p className="text-slate-400 text-xs mb-4 font-mono leading-relaxed">
                  A sharp daily brief on the stories that matter. No fluff.
                </p>
                <form className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    aria-label="Email address"
                    className="w-full px-3 py-2.5 bg-black/60 border border-ink-700 focus:border-cyan-400/70 focus:outline-none rounded-sm text-sm text-white placeholder:text-slate-600 font-mono"
                  />
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 bg-white hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Latest rail */}
            <div>
              <h3 className="text-sm font-black text-white mb-4 pb-3 border-b border-ink-700/70 uppercase tracking-[0.18em] flex items-center gap-2">
                <span className="w-4 h-px bg-cyan-400" />
                Latest
              </h3>
              <div className="space-y-4">
                {latest.map((l) => (
                  <Link
                    key={l.id}
                    href={`/article/${l.slug}`}
                    className="group flex gap-3 items-start"
                  >
                    <div className="w-20 h-16 rounded-sm overflow-hidden shrink-0 ring-1 ring-ink-700/80 group-hover:ring-cyan-400/40 transition-colors">
                      <img
                        src={getArticleImageUrl(l, 160, 120)}
                        alt={l.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${l.imageUrl ? "object-top" : ""}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.18em] font-mono">
                        {l.category}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                        {l.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Follow widget */}
            <div className="relative overflow-hidden bg-ink-900 ring-1 ring-ink-700/80 rounded-sm p-6 text-center">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-sm bg-cyan-400/10 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <svg className="relative w-7 h-7 text-white mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="relative font-bold text-white text-sm mb-3 uppercase tracking-widest">Follow us on X</p>
              <a
                href="https://x.com/pulsewire"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-5 py-2 bg-white hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
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
              <span className="w-1 h-7 rounded-sm bg-cyan-400" />
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                More in {article.category}
              </h2>
            </div>
            <Link
              href={`/category/${article.category.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400 hover:text-white transition-colors font-mono"
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
