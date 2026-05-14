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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
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
          placeholder="Search markets, protocols, authors..."
          className="w-full border border-slate-200 bg-white px-12 py-3.5 text-sm text-slate-900 shadow-[0_14px_32px_-28px_rgba(15,23,42,0.16)] outline-none placeholder:text-slate-400 focus:border-gold-300 focus:ring-4 focus:ring-gold-100 font-mono"
          autoFocus
        />
      </div>
      <button
        type="submit"
        className="shrink-0 bg-slate-950 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[0.22em] text-white transition-colors hover:bg-gold-500"
      >
        Search
      </button>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="self-end p-2.5 text-slate-500 transition-colors hover:text-gold-500 sm:self-auto"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
