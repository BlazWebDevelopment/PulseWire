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
      <article className="relative overflow-hidden rounded-2xl bg-ink-900 aspect-[16/10] ring-1 ring-ink-700/70 shadow-xl shadow-black/40">
        <img
          src={getArticleImageUrl(article, 800, 500)}
          alt={article.title}
          className={`absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 ${article.imageUrl ? "object-top" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-crimson to-rose-600 text-white text-xs font-semibold rounded-full mb-3 uppercase tracking-wider shadow-lg shadow-crimson/30">
            {article.category}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-rose-300 transition-colors leading-tight">
            {article.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="font-medium text-slate-200">{article.author}</span>
            <span>&middot;</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCardMedium({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="flex gap-4 py-4">
        <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-28 rounded-xl overflow-hidden ring-1 ring-ink-700/70">
          <img
            src={getArticleImageUrl(article, 300, 300)}
            alt={article.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${article.imageUrl ? "object-top" : ""}`}
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            {article.category}
          </span>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{article.author}</span>
            <span>&middot;</span>
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
      <article>
        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 ring-1 ring-ink-700/70 bg-ink-900">
          <img
            src={getArticleImageUrl(article, 600, 375)}
            alt={article.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${article.imageUrl ? "object-top" : ""}`}
          />
        </div>
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
          {article.category}
        </span>
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2 mt-1 mb-2 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">{article.author}</span>
          <span>&middot;</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>&middot;</span>
          <span>{article.readTime} min</span>
        </div>
      </article>
    </Link>
  );
}

export function ArticleCardCompact({ article, index }: { article: Article; index: number }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="flex items-start gap-4 py-4">
        <span className="text-3xl font-black text-ink-700 group-hover:text-rose-500 transition-colors leading-none shrink-0 w-8 text-right">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            {article.category}
          </span>
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-rose-300 transition-colors line-clamp-2 mt-0.5 leading-snug">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>{formatDate(article.publishedAt)}</span>
            <span>&middot;</span>
            <span>{article.readTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
