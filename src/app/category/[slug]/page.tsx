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
      <nav className="flex items-center gap-2 text-[11px] text-slate-500 mb-6 uppercase tracking-widest font-mono">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Home
        </Link>
        <span className="text-ink-700">/</span>
        <span className="text-slate-200 font-medium">{categoryName}</span>
      </nav>

      {/* Category header */}
      <div className="mb-10">
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em] font-mono">
          // Category
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 mt-2 tracking-tight uppercase">
          {categoryName}
        </h1>
        <p className="text-base text-slate-400">
          Latest {categoryName.toLowerCase()} news, analysis, and in-depth reporting.
        </p>
        <div className="h-px w-20 bg-cyan-400 mt-4" />
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
              <span className="w-1 h-7 rounded-sm bg-cyan-400" />
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">
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
        <h2 className="text-sm font-black text-white mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-4 h-px bg-cyan-400" />
          Explore Other Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c !== categoryName)
            .map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="px-4 py-2 bg-ink-900 text-slate-300 text-xs font-bold uppercase tracking-widest rounded-sm ring-1 ring-ink-700 hover:bg-cyan-400 hover:ring-cyan-400 hover:text-black transition-colors font-mono"
              >
                {cat}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
