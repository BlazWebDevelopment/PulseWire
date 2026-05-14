import Link from "next/link";
import { getTrendingArticles } from "@/data/articles";

export function BreakingTicker() {
  const trending = getTrendingArticles().slice(0, 5);

  return (
    <div className="relative overflow-hidden border-b border-slate-200/80 bg-white/70 text-slate-700">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.06),transparent_35%,rgba(34,211,238,0.06))]" />
      <div className="relative mx-auto flex h-11 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <span className="mr-4 inline-flex shrink-0 items-center gap-1.5 bg-slate-950 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-[0.3em] text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
          Latest
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-[scroll_35s_linear_infinite] whitespace-nowrap gap-10">
            {[...trending, ...trending].map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/article/${article.slug}`}
                className="inline-flex shrink-0 items-center gap-3 text-sm text-slate-600 transition-colors hover:text-gold-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
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
