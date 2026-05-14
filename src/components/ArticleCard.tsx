import Link from "next/link";
import { type Article, getArticleImageUrl } from "@/data/articles";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCardLarge({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="relative aspect-[16/10] overflow-hidden border border-slate-200 bg-white shadow-[0_20px_48px_-34px_rgba(15,23,42,0.28)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_26px_56px_-34px_rgba(37,99,235,0.18)]">
        <img
          src={getArticleImageUrl(article, 800, 500)}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.06),rgba(15,23,42,0.18)_45%,rgba(255,255,255,0.97)_100%)]" />
        <div className="absolute left-5 top-5">
          <span className="inline-flex border border-white/70 bg-white/88 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600 shadow-sm backdrop-blur font-mono">
            {article.category}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="max-w-2xl border border-white/80 bg-white/88 p-5 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.28)] backdrop-blur-md sm:p-6">
            <h2 className="mb-2 text-xl font-black leading-tight tracking-tight text-slate-950 transition-colors group-hover:text-gold-500 sm:text-2xl lg:text-3xl">
            {article.title}
          </h2>
            <p className="mb-3 line-clamp-2 text-sm text-slate-600 sm:text-base">
            {article.excerpt}
          </p>
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-slate-500">
            <span className="font-medium text-slate-700">{article.author}</span>
            <span className="text-slate-300">//</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="text-slate-300">//</span>
            <span>{article.readTime} min</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCardMedium({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="flex gap-4 border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.22)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold-200 group-hover:shadow-[0_20px_46px_-34px_rgba(37,99,235,0.16)]">
        <div className="h-28 w-28 shrink-0 overflow-hidden border border-slate-200 bg-slate-50 sm:h-28 sm:w-36">
          <img
            src={getArticleImageUrl(article, 300, 300)}
            alt={article.title}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-500 font-mono">
            {article.category}
          </span>
          <h3 className="mb-1.5 line-clamp-2 text-base font-bold leading-snug text-slate-950 transition-colors group-hover:text-gold-500">
            {article.title}
          </h3>
          <p className="mb-2 line-clamp-2 text-sm text-slate-600">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-500">
            <span>{article.author}</span>
            <span className="text-slate-300">//</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCardVertical({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="overflow-hidden border border-slate-200 bg-white p-3 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold-200 group-hover:shadow-[0_24px_48px_-34px_rgba(37,99,235,0.16)]">
        <div className="mb-4 aspect-[16/10] overflow-hidden border border-slate-200 bg-slate-50">
          <img
            src={getArticleImageUrl(article, 600, 375)}
            alt={article.title}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-500 font-mono">
          {article.category}
        </span>
        <h3 className="mt-1 mb-2 line-clamp-2 text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-gold-500">
          {article.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-slate-600">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-500">
          <span className="font-medium text-slate-700">{article.author}</span>
          <span className="text-slate-300">//</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span className="text-slate-300">//</span>
          <span>{article.readTime}m</span>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCardCompact({ article, index }: { article: Article; index: number }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="flex items-start gap-4 py-4 transition-colors">
        <span className="w-9 shrink-0 text-right font-mono text-3xl font-black leading-none text-slate-300 transition-colors group-hover:text-gold-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-500 font-mono">
            {article.category}
          </span>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-gold-500">
            {article.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-500">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="text-slate-300">//</span>
            <span>{article.readTime}m</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
