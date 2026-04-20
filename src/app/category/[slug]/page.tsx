import { notFound } from "next/navigation";
import { getArticlesByCategory, categories } from "@/data/articles";
import {
  ArticleCardLarge,
  ArticleCardVertical,
  ArticleCardMedium,
} from "@/components/ArticleCard";
import Link from "next/link";
import type { Metadata } from "next";

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
  if (!categoryName) return { title: "Category Not Found - PulseWire" };
  return {
    title: `${categoryName} News - PulseWire`,
    description: `Latest ${categoryName} news, analysis, and in-depth reporting from PulseWire.`,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-rose-400 transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-200 font-medium">{categoryName}</span>
      </nav>

      {/* Category header */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
          {categoryName}
        </h1>
        <p className="text-lg text-slate-400">
          Latest {categoryName.toLowerCase()} news, analysis, and in-depth reporting.
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-crimson to-rose-500 mt-4 rounded-full" />
      </div>

      {/* Hero + top articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-7">
          <ArticleCardLarge article={heroArticle} />
        </div>
        <div className="lg:col-span-5 divide-y divide-ink-700/70">
          {topArticles.map((article) => (
            <ArticleCardMedium key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* More articles */}
      {moreArticles.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-crimson to-rose-600" />
              <h2 className="text-2xl font-black text-white tracking-tight">
                More {categoryName} Stories
              </h2>
            </div>
            <div className="h-px flex-1 bg-ink-700/70 ml-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreArticles.map((article) => (
              <ArticleCardVertical key={article.id} article={article} />
            ))}
          </div>
        </>
      )}

      {/* Other categories */}
      <section className="mt-16 pt-10 border-t border-ink-700/70">
        <h2 className="text-lg font-bold text-white mb-4">
          Explore Other Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c !== categoryName)
            .map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="px-4 py-2 bg-ink-800 text-slate-300 text-sm font-medium rounded-full ring-1 ring-ink-700 hover:bg-crimson hover:ring-crimson hover:text-white transition-colors"
              >
                {cat}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
