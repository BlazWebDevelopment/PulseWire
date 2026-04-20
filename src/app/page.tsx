import {
  getFeaturedArticles,
  getTrendingArticles,
  getLatestArticles,
  getArticlesByCategory,
  getArticleImageUrl,
  categories,
} from "@/data/articles";
import {
  ArticleCardLarge,
  ArticleCardMedium,
  ArticleCardVertical,
  ArticleCardCompact,
} from "@/components/ArticleCard";
import { BreakingTicker } from "@/components/BreakingTicker";
import Link from "next/link";

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-crimson to-rose-600" />
        <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
      </div>
      {href ? (
        <Link
          href={href}
          className="text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          View all &rarr;
        </Link>
      ) : (
        <div className="h-px flex-1 bg-ink-700/70 ml-6" />
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = getFeaturedArticles();
  const trending = getTrendingArticles();
  const latest = getLatestArticles(20);

  const heroArticle = featured[0];
  const secondaryFeatured = featured.slice(1, 3);
  const sidebarTrending = trending.slice(0, 5);

  return (
    <>
      <BreakingTicker />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured */}
          <div className="lg:col-span-2">
            {heroArticle && <ArticleCardLarge article={heroArticle} />}
          </div>

          {/* Secondary featured */}
          <div className="flex flex-col gap-6">
            {secondaryFeatured.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="group block relative overflow-hidden rounded-2xl bg-ink-900 aspect-[16/10] flex-1 ring-1 ring-ink-700/70 shadow-xl shadow-black/40"
              >
                <img
                  src={getArticleImageUrl(article, 600, 375)}
                  alt={article.title}
                  className={`absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 ${article.imageUrl ? "object-top" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-crimson to-rose-600 text-white text-[10px] font-semibold rounded-full mb-2 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest + Trending Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Latest Articles */}
          <div className="lg:col-span-2">
            <SectionHeader title="Latest News" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {latest.slice(0, 8).map((article) => (
                <ArticleCardVertical key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div>
            <SectionHeader title="Trending" />
            <div className="divide-y divide-ink-700/70 rounded-xl bg-ink-900/40 px-4 ring-1 ring-ink-700/60">
              {sidebarTrending.map((article, index) => (
                <ArticleCardCompact key={article.id} article={article} index={index} />
              ))}
            </div>

            {/* X Follow Widget */}
            <div className="mt-8 rounded-2xl p-6 text-center bg-gradient-to-br from-ink-900 via-ink-850 to-ink-900 ring-1 ring-ink-700/70 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-crimson/15 blur-3xl" />
              <svg className="relative w-8 h-8 text-white mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="relative text-white font-semibold mb-1">Follow PulseWire</p>
              <p className="relative text-slate-400 text-sm mb-4">
                Get breaking news and updates
              </p>
              <a
                href="https://x.com/pulsewire"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-6 py-2.5 bg-white text-ink-950 text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors"
              >
                Follow @PulseWire
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categories.slice(0, 4).map((category) => {
        const catArticles = getArticlesByCategory(category);
        if (catArticles.length === 0) return null;
        return (
          <section key={category} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SectionHeader title={category} href={`/category/${category.toLowerCase()}`} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main article */}
              <div className="lg:col-span-7">
                <ArticleCardLarge article={catArticles[0]} />
              </div>
              {/* Side articles */}
              <div className="lg:col-span-5 divide-y divide-ink-700/70">
                {catArticles.slice(1, 5).map((article) => (
                  <ArticleCardMedium key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* More Latest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <SectionHeader title="More Stories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latest.slice(8, 20).map((article) => (
            <ArticleCardVertical key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
