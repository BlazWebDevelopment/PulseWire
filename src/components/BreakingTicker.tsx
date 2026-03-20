import Link from "next/link";
import { getTrendingArticles } from "@/data/articles";

export function BreakingTicker() {
  const trending = getTrendingArticles().slice(0, 5);

  return (
    <div className="bg-crimson text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10">
        <span className="shrink-0 font-bold text-xs uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mr-4">
          Trending
        </span>
        <div className="overflow-hidden relative flex-1">
          <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap gap-8">
            {[...trending, ...trending].map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="text-sm hover:text-red-200 transition-colors shrink-0"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
