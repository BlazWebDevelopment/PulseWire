import { notFound } from "next/navigation";
import { getArticlesByCategory, categories } from "@/data/articles";
import {
  ArticleCardLarge,
  ArticleCardVertical,
  ArticleCardMedium,
} from "@/components/ArticleCard";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = categories.find((c) => c.toLowerCase() === slug);
  if (!categoryName) return { title: "Desk Not Found" };
  return {
    title: `${categoryName} Desk`,
    description: `Latest ${categoryName} news, market data, and on-chain analysis from the ${SITE_NAME} newsroom.`,
    openGraph: {
      title: `${categoryName} Desk · ${SITE_NAME}`,
      description: `Latest ${categoryName} news, market data, and on-chain analysis from the ${SITE_NAME} newsroom.`,
      siteName: SITE_NAME,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = categories.find((c) => c.toLowerCase() === slug);

  if (!categoryName) notFound();

  const categoryArticles = getArticlesByCategory(categoryName);

  if (categoryArticles.length === 0) notFound();

  const heroArticle = categoryArticles[0];
  const topArticles = categoryArticles.slice(1, 5);
  const moreArticles = categoryArticles.slice(5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 font-mono">
        <Link href="/" className="transition-colors hover:text-gold-500">
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-700">{categoryName}</span>
      </nav>

      <div className="mb-10 border border-slate-200 bg-white p-8 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.2)] sm:p-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-500 font-mono">
          The {categoryName} Desk
        </span>
        <h1 className="mt-3 mb-3 font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
          {categoryName}
          <span className="text-gold-500">.</span>
        </h1>
        <p className="max-w-2xl font-display text-base font-normal text-slate-600 lg:text-lg">
          Latest {categoryName.toLowerCase()} news, market data, and on-chain analysis.
        </p>
        <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold-400 to-cyan-400" />
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ArticleCardLarge article={heroArticle} />
        </div>
        <div className="grid gap-4 lg:col-span-5">
          {topArticles.map((article) => (
            <ArticleCardMedium key={article.id} article={article} />
          ))}
        </div>
      </div>

      {moreArticles.length > 0 && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1 bg-gradient-to-b from-cyan-400 to-gold-400" />
              <h2 className="font-display text-[2rem] font-bold leading-[1] tracking-[-0.025em] text-slate-950 sm:text-[2.4rem]">
                More <em className="font-medium italic text-gold-500">{categoryName}</em> stories
              </h2>
            </div>
            <div className="ml-6 h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {moreArticles.map((article) => (
              <ArticleCardVertical key={article.id} article={article} />
            ))}
          </div>
        </>
      )}

      <section className="mt-16 border border-slate-200 bg-white p-8 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.18)]">
        <h2 className="mb-4 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">
          <span className="h-px w-4 bg-gold-400" />
          Explore Other Desks
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c !== categoryName)
            .map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-600 transition-colors hover:border-gold-300 hover:bg-gold-100 hover:text-slate-950 font-mono"
              >
                {cat}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
