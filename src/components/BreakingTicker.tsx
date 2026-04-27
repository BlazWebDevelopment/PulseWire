import Link from "next/link";
import { getTrendingArticles } from "@/data/articles";

export function BreakingTicker() {
  const trending = getTrendingArticles().slice(0, 5);

  return (
    <div className="relative overflow-hidden border-b border-ink-700/60 bg-ink-900 text-slate-200">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,191,36,0.05),transparent_30%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10 relative">
        <span className="shrink-0 inline-flex items-center gap-1.5 font-extrabold text-[10px] uppercase tracking-[0.3em] text-ink-950 px-3 py-1 rounded-sm bg-gold-400 mr-4 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-ink-950 animate-pulse" />
          Breaking
        </span>
        <div className="overflow-hidden relative flex-1">
          <div className="flex animate-[scroll_35s_linear_infinite] whitespace-nowrap gap-10">
            {[...trending, ...trending].map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="text-sm text-slate-300 hover:text-gold-400 transition-colors shrink-0 inline-flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-sm bg-gold-400" />
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
