import { searchArticles } from "@/data/articles";
import { ArticleCardVertical } from "@/components/ArticleCard";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the News NFTs archive for articles, projects, tokens, collections and authors.",
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
      <nav className="flex items-center gap-2 text-[11px] text-slate-500 mb-6 uppercase tracking-widest font-mono">
        <Link href="/" className="hover:text-gold-400 transition-colors">
          Home
        </Link>
        <span className="text-ink-700">/</span>
        <span className="text-slate-200 font-medium">Search</span>
      </nav>

      <div className="mb-10">
        <span className="text-[10px] font-bold text-gold-400 uppercase tracking-[0.32em] font-mono">
          The Archive
        </span>
        <h1 className="font-display text-5xl lg:text-6xl font-bold text-parchment mb-6 mt-2 tracking-[-0.03em] leading-[1]">
          <em className="italic font-medium text-gold-400">Search</em> the archive
        </h1>
        <div className="max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {query && (
        <div className="mb-8">
          <p className="text-slate-400 font-mono text-sm">
            {results.length > 0 ? (
              <>
                Found <span className="font-semibold text-gold-400">{results.length}</span>{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-parchment">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              <>
                No results found for{" "}
                <span className="font-semibold text-parchment">&ldquo;{query}&rdquo;</span>.
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
            className="w-16 h-16 text-ink-700 mx-auto mb-4"
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
          <p className="text-xl font-bold text-slate-300 uppercase tracking-wider">
            Enter a search term to find articles
          </p>
          <p className="text-slate-500 mt-2 font-mono text-sm">
            Search by title, author, topic, or keyword
          </p>
        </div>
      )}
    </div>
  );
}
