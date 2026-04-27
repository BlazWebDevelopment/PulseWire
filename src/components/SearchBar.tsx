"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, topics, authors..."
          className="w-full pl-10 pr-4 py-2.5 bg-ink-900 border border-ink-700 rounded-sm text-sm text-parchment placeholder:text-slate-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 font-mono"
          autoFocus
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-gold-400 hover:bg-gold-300 text-ink-950 text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors shrink-0"
      >
        Search
      </button>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 text-slate-500 hover:text-gold-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
