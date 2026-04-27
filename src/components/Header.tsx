"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/articles";
import { SearchBar } from "./SearchBar";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-md bg-ink-900 border border-ink-700 overflow-hidden transition-colors group-hover:border-gold-400/60 shadow-[0_1px_0_rgba(251,191,36,0.06)_inset]">
        <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,191,36,0.14),transparent_55%)]" />
        <svg className="relative w-7 h-7" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="hdr-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path
            d="M8 7 L13 7 A6 6 0 0 1 13 19 L12 19 L12 25 L8 25 Z M12 11 L12 15 A2 2 0 0 1 12 11 Z"
            fill="url(#hdr-gold)"
            fillRule="evenodd"
          />
          <rect x="17.5" y="19.5" width="9" height="1.4" fill="url(#hdr-gold)" opacity="0.85" />
          <rect x="17.5" y="22" width="6" height="1.2" fill="url(#hdr-gold)" opacity="0.55" />
          <circle cx="24.5" cy="8.5" r="1.8" fill="#ef4444" />
        </svg>
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[1.35rem] font-black tracking-[-0.035em] text-parchment leading-none">
          PrimeTime<span className="text-gold-400">.</span>
        </span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-slate-500 font-mono">
          Global News
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink-950/85 backdrop-blur-xl border-b border-ink-700/80 supports-[backdrop-filter]:bg-ink-950/70">
      {/* Top bar */}
      <div className="bg-ink-900/90 text-slate-400 border-b border-ink-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-red-500" />
              </span>
              <span className="text-red-400 uppercase tracking-[0.25em] font-bold">
                On Air
              </span>
              <span className="text-ink-700">·</span>
              <span className="uppercase tracking-[0.18em] text-slate-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/primetimeglobalnews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 uppercase tracking-[0.18em]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Follow</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px]">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-parchment transition-colors rounded-sm hover:bg-ink-800"
              >
                {cat}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-parchment transition-colors rounded-sm hover:bg-ink-800 flex items-center gap-1">
                More
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 w-44 bg-ink-900 rounded-sm shadow-2xl shadow-black/60 border border-ink-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
                {categories.slice(8).map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase()}`}
                    className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-parchment hover:bg-ink-800"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-400 hover:text-gold-400 transition-colors rounded-sm hover:bg-ink-800"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-gold-400 transition-colors rounded-sm hover:bg-ink-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* gold hairline under header */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-ink-700/60 bg-ink-900/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-ink-700/60 bg-ink-900/95">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-parchment hover:bg-ink-800 rounded-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
