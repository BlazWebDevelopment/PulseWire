"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories } from "@/data/articles";
import { SearchBar } from "./SearchBar";
import { BrandMark } from "./BrandMark";

function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <BrandMark />
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="border-b border-slate-200/80 bg-slate-50">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-65" />
              <span className="relative h-2 w-2 rounded-full bg-gold-400" />
            </span>
            <span className="font-bold text-gold-500">Live Coverage</span>
            <span className="hidden text-slate-400 sm:inline">Latest headlines across crypto markets and digital assets</span>
          </span>
          <span>{topBarDate || "--"}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[84px] items-center justify-between gap-6 py-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1 border border-slate-200 bg-white p-1 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.18)]">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                {cat}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="inline-flex h-11 items-center justify-center border border-slate-200 bg-white px-4 text-slate-500 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.18)] transition-colors hover:border-gold-300 hover:text-gold-500"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="ml-2 hidden text-[11px] font-semibold uppercase tracking-[0.18em] sm:inline">
                Search
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center border border-slate-200 bg-white text-slate-500 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.18)] transition-colors hover:border-gold-300 hover:text-gold-500 lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />

      {searchOpen && (
        <div className="border-t border-slate-200/80 bg-white/90">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border border-slate-200 bg-slate-50 px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:border-gold-300 hover:bg-gold-100 hover:text-slate-950"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
