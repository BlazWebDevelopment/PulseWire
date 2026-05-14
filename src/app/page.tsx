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
import { NewsletterForm } from "@/components/NewsletterForm";
import Link from "next/link";
import { NEWSLETTER_NAME } from "@/lib/site";

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-6 border-b border-slate-200 pb-4">
      <div className="flex items-end gap-3">
        <span className="mb-1 h-8 w-1 bg-gradient-to-b from-cyan-400 via-gold-400 to-rose-400" />
        <h2 className="font-display text-[2rem] font-bold leading-[1] tracking-[-0.03em] text-slate-950 sm:text-[2.4rem]">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-gold-500 font-mono"
        >
          View all &rarr;
        </Link>
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

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="border border-slate-200 bg-white p-8 shadow-[0_24px_55px_-42px_rgba(15,23,42,0.28)] sm:p-10">
              <span className="inline-flex border border-slate-300 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-700 font-mono">
                News NFTs
              </span>
              <h1 className="mt-5 max-w-3xl font-display text-[3rem] font-bold leading-[0.96] tracking-[-0.045em] text-slate-950 sm:text-[4rem]">
                Daily reporting on Bitcoin, Ethereum, DeFi, NFTs, and crypto markets.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Coverage across digital assets, regulation, market structure, and the projects shaping the industry.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Markets", "Policy", "Protocols"].map((item) => (
                  <span
                    key={item}
                    className="border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid h-full gap-4 border border-slate-200 bg-white p-6 shadow-[0_24px_55px_-42px_rgba(15,23,42,0.28)]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-gold-500 font-mono">
                  Top stories
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-slate-950">
                  The latest coverage from the News NFTs desks.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ["Markets", "Price action, ETFs, flows and macro."],
                  ["Regulation", "Policy, enforcement and compliance."],
                  ["Networks", "Protocols, upgrades and ecosystem news."],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="text-lg font-black tracking-[-0.03em] text-slate-950">
                      {value}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {heroArticle && <ArticleCardLarge article={heroArticle} />}
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-6">
              {secondaryFeatured.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden border border-slate-200 bg-white shadow-[0_22px_48px_-38px_rgba(15,23,42,0.32)]"
                >
                  <img
                    src={getArticleImageUrl(article, 600, 375)}
                    alt={article.title}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(15,23,42,0.12)_38%,rgba(255,255,255,0.96)_100%)]" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex border border-white/80 bg-white/88 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600 shadow-sm backdrop-blur font-mono">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="border border-white/90 bg-white/88 p-4 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.3)] backdrop-blur">
                      <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-950 transition-colors group-hover:text-gold-500">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeader title="Latest News" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {latest.slice(0, 8).map((article) => (
                <ArticleCardVertical key={article.id} article={article} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <SectionHeader title="Trending" />
            <div className="divide-y divide-slate-200 border border-slate-200 bg-white px-5 shadow-[0_22px_48px_-38px_rgba(15,23,42,0.28)]">
              {sidebarTrending.map((article, index) => (
                <ArticleCardCompact key={article.id} article={article} index={index} />
              ))}
            </div>

            <div className="relative mt-8 overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_22px_48px_-38px_rgba(15,23,42,0.28)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
              <p className="relative mb-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">
                {NEWSLETTER_NAME}
              </p>
              <p className="relative mb-4 text-xs text-slate-500 font-mono">
                Morning brief | one email | 8am UTC
              </p>
              <div className="relative">
                <NewsletterForm variant="footer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {categories.slice(0, 4).map((category) => {
        const catArticles = getArticlesByCategory(category);
        if (catArticles.length === 0) return null;
        return (
          <section key={category} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <SectionHeader title={category} href={`/category/${category.toLowerCase()}`} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ArticleCardLarge article={catArticles[0]} />
              </div>
              <div className="grid gap-4 lg:col-span-5">
                {catArticles.slice(1, 5).map((article) => (
                  <ArticleCardMedium key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <SectionHeader title="More Stories" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {latest.slice(8, 20).map((article) => (
            <ArticleCardVertical key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
