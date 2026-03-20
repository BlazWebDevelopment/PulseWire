import { searchArticles } from "@/data/articles";
import { ArticleCardVertical } from "@/components/ArticleCard";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - PulseWire",
  description: "Search PulseWire for articles, topics, and more.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? searchArticles(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-crimson transition-colors">
          Home
        </Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-900 font-medium">Search</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-6">Search</h1>
        <div className="max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {query && (
        <div className="mb-8">
          <p className="text-slate-600">
            {results.length > 0 ? (
              <>
                Found <span className="font-semibold text-slate-900">{results.length}</span>{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-slate-900">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              <>
                No results found for{" "}
                <span className="font-semibold text-slate-900">&ldquo;{query}&rdquo;</span>.
                Try different keywords.
              </>
            )}
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((article) => (
            <ArticleCardVertical key={article.id} article={article} />
          ))}
        </div>
      )}

      {!query && (
        <div className="text-center py-20">
          <svg
            className="w-16 h-16 text-slate-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-xl font-semibold text-slate-400">
            Enter a search term to find articles
          </p>
          <p className="text-slate-400 mt-2">
            Search by title, author, topic, or keyword
          </p>
        </div>
      )}
    </div>
  );
}
