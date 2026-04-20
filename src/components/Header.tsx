"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/articles";
import { SearchBar } from "./SearchBar";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ink-900 border border-ink-700 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] overflow-hidden">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-crimson/25 via-transparent to-indigo-500/20" />
        <svg className="relative w-5 h-5" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="hdr-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F43F5E" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="10"
            stroke="url(#hdr-g)"
            strokeWidth="2.2"
            strokeDasharray="40 10"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="3.4" fill="url(#hdr-g)" />
        </svg>
      </span>
      <span className="text-[1.35rem] font-black tracking-tight text-white leading-none">
        Pulse<span className="bg-gradient-to-r from-crimson to-rose-500 bg-clip-text text-transparent">Wire</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink-950/80 backdrop-blur-xl border-b border-ink-700/70 supports-[backdrop-filter]:bg-ink-950/70">
      {/* Top bar */}
      <div className="bg-ink-900/90 text-slate-400 border-b border-ink-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              <span className="text-slate-300">Live</span>
              <span className="text-slate-500">·</span>
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/pulsewire"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Follow us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-md hover:bg-ink-800"
              >
                {cat}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-md hover:bg-ink-800 flex items-center gap-1">
                More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 w-44 bg-ink-900 rounded-xl shadow-2xl shadow-black/50 border border-ink-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1.5">
                {categories.slice(8).map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-ink-800"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-ink-800"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-ink-800"
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

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-ink-700/60 bg-ink-900/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-ink-700/60 bg-ink-900/95">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-ink-800 rounded-md"
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
