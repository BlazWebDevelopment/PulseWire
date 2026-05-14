import { searchArticles } from "@/data/articles";
import { ArticleCardVertical } from "@/components/ArticleCard";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search",
  description:
    `Search the ${SITE_NAME} archive for articles, projects, tokens, collections and authors.`,
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 font-mono">
        <Link href="/" className="transition-colors hover:text-gold-500">
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-700">Search</span>
      </nav>

      <div className="mb-10 border border-slate-200 bg-white p-8 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.2)] sm:p-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-500 font-mono">
          The Archive
        </span>
        <h1 className="mt-2 mb-6 font-display text-5xl font-bold leading-[1] tracking-[-0.04em] text-slate-950 lg:text-6xl">
          <em className="font-medium italic text-gold-500">Search</em> the archive
        </h1>
        <div className="max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {query && (
        <div className="mb-8">
          <p className="text-sm text-slate-600 font-mono">
            {results.length > 0 ? (
              <>
                Found <span className="font-semibold text-gold-500">{results.length}</span>{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-slate-950">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              <>
                No results found for{" "}
                <span className="font-semibold text-slate-950">&ldquo;{query}&rdquo;</span>.
                Try different keywords.
              </>
            )}
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCardVertical key={article.id} article={article} />
          ))}
        </div>
      )}

      {!query && (
        <div className="border border-slate-200 bg-white py-20 text-center shadow-[0_18px_44px_-36px_rgba(15,23,42,0.18)]">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-slate-300"
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
          <p className="text-xl font-bold uppercase tracking-wider text-slate-900">
            Enter a search term to find articles
          </p>
          <p className="mt-2 text-sm text-slate-500 font-mono">
            Search by title, author, topic, or keyword
          </p>
        </div>
      )}
    </div>
  );
}
