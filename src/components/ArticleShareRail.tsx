"use client";

import { useState } from "react";

type ArticleShareRailProps = {
  shareUrl: string;
  title: string;
};

export function ArticleShareRail({ shareUrl, title }: ArticleShareRailProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="hidden xl:flex absolute -left-20 top-0 z-30 flex-col items-center gap-3 pointer-events-auto">
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 [writing-mode:vertical-rl] rotate-180 mb-2">
        Share
      </span>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-ink-900 ring-1 ring-ink-700 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:ring-gold-400/60 transition-all"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="relative w-9 h-9 rounded-full bg-ink-900 ring-1 ring-ink-700 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:ring-gold-400/60 transition-all"
        aria-label="Copy article link"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {copied && (
          <span className="absolute left-11 rounded-sm bg-ink-900 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-gold-400 ring-1 ring-gold-400/40">
            Copied
          </span>
        )}
      </button>
    </div>
  );
}
