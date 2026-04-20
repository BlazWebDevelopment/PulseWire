import Link from "next/link";
import { getTrendingArticles } from "@/data/articles";

export function BreakingTicker() {
  const trending = getTrendingArticles().slice(0, 5);

  return (
    <div className="relative overflow-hidden border-b border-ink-700/60 bg-gradient-to-r from-ink-900 via-ink-850 to-ink-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10">
        <span className="shrink-0 inline-flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-widest text-white px-3 py-1 rounded-full bg-gradient-to-r from-crimson to-rose-600 mr-4 shadow-lg shadow-crimson/30">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Live
        </span>
        <div className="overflow-hidden relative flex-1">
          <div className="flex animate-[scroll_35s_linear_infinite] whitespace-nowrap gap-10">
            {[...trending, ...trending].map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="text-sm text-slate-300 hover:text-white transition-colors shrink-0 inline-flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-rose-500" />
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
