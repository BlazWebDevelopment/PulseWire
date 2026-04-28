"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/data/articles";
import { SearchBar } from "./SearchBar";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-md bg-ink-900 border border-ink-700 overflow-hidden transition-colors group-hover:border-gold-400/70 shadow-[0_1px_0_rgba(59,130,246,0.10)_inset]">
        <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.20),transparent_55%)]" />
        <svg className="relative w-7 h-7" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="hdr-blue" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="55%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <linearGradient id="hdr-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path
            d="M16 4.6 L25.5 9.8 L25.5 22.2 L16 27.4 L6.5 22.2 L6.5 9.8 Z"
            fill="none"
            stroke="url(#hdr-blue)"
            strokeWidth="0.9"
            opacity="0.55"
          />
          <path
            d="M10.5 22.5 L10.5 9.5 L13 9.5 L21.5 19 L21.5 9.5 L24 9.5 L24 22.5 L21.5 22.5 L13 13 L13 22.5 Z"
            fill="url(#hdr-blue)"
          />
          <circle cx="24" cy="9" r="2.6" fill="none" stroke="#fbbf24" strokeWidth="0.35" opacity="0.5" />
          <circle cx="24" cy="9" r="1.55" fill="url(#hdr-gold)" />
        </svg>
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[1.35rem] font-black tracking-[-0.035em] text-parchment leading-none">
          News<span className="text-gold-400"> NFTs</span>
        </span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.42em] text-slate-500 font-mono">
          Crypto · DeFi · Markets
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [topBarDate, setTopBarDate] = useState("");

  useEffect(() => {
    setTopBarDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-ink-950/85 backdrop-blur-xl border-b border-ink-700/80 supports-[backdrop-filter]:bg-ink-950/70">
      {/* Top bar */}
      <div className="bg-ink-900/90 text-slate-400 border-b border-ink-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-9 text-xs font-mono">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-gold-400" />
            </span>
            <span className="text-gold-400 uppercase tracking-[0.25em] font-bold">
              Live
            </span>
            <span className="text-ink-700">·</span>
            <span className="uppercase tracking-[0.18em] text-slate-500">
              {topBarDate || "\u2014"}
            </span>
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px]">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:text-parchment transition-colors rounded-sm hover:bg-ink-800"
              >
                {cat}
              </Link>
            ))}
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

      {/* Brand hairline under header */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

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
