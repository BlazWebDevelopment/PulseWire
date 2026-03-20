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
              <Link key={article.id} href={`/article/${article.slug}`} className="group block relative overflow-hidden rounded-2xl bg-slate-900 aspect-[16/10] flex-1">
                <img
                  src={getArticleImageUrl(article, 600, 375)}
                  alt={article.title}
                  className={`absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 ${article.imageUrl ? "object-top" : ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2.5 py-0.5 bg-crimson text-white text-[10px] font-semibold rounded-full mb-2 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-red-300 transition-colors leading-snug line-clamp-2">
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Latest News</h2>
              <div className="h-px flex-1 bg-slate-200 ml-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {latest.slice(0, 8).map((article) => (
                <ArticleCardVertical key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Trending</h2>
              <div className="h-px flex-1 bg-slate-200 ml-6" />
            </div>
            <div className="divide-y divide-slate-100">
              {sidebarTrending.map((article, index) => (
                <ArticleCardCompact key={article.id} article={article} index={index} />
              ))}
            </div>

            {/* X Follow Widget */}
            <div className="mt-8 bg-slate-950 rounded-2xl p-6 text-center">
              <svg className="w-8 h-8 text-white mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="text-white font-semibold mb-1">Follow PulseWire</p>
              <p className="text-slate-400 text-sm mb-4">
                Get breaking news and updates
              </p>
              <a
                href="https://x.com/pulsewire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors"
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">{category}</h2>
              <Link
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-semibold text-crimson hover:text-crimson-dark transition-colors"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main article */}
              <div className="lg:col-span-7">
                <ArticleCardLarge article={catArticles[0]} />
              </div>
              {/* Side articles */}
              <div className="lg:col-span-5 divide-y divide-slate-100">
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">More Stories</h2>
          <div className="h-px flex-1 bg-slate-200 ml-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latest.slice(8, 20).map((article) => (
            <ArticleCardVertical key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
