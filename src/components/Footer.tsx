"use client";

import Link from "next/link";
import { categories } from "@/data/articles";

export function Footer() {
  return (
    <footer className="relative bg-ink-950 text-slate-400 border-t border-ink-700/60">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-md bg-ink-900 border border-ink-700 overflow-hidden">
                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.20),transparent_55%)]" />
                <svg className="relative w-7 h-7" viewBox="0 0 32 32" fill="none">
                  <defs>
                    <linearGradient id="ft-blue" x1="0.1" y1="0" x2="0.9" y2="1">
                      <stop offset="0%" stopColor="#bfdbfe" />
                      <stop offset="55%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                    <linearGradient id="ft-gold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M16 4.6 L25.5 9.8 L25.5 22.2 L16 27.4 L6.5 22.2 L6.5 9.8 Z"
                    fill="none"
                    stroke="url(#ft-blue)"
                    strokeWidth="0.9"
                    opacity="0.55"
                  />
                  <path
                    d="M10.5 22.5 L10.5 9.5 L13 9.5 L21.5 19 L21.5 9.5 L24 9.5 L24 22.5 L21.5 22.5 L13 13 L13 22.5 Z"
                    fill="url(#ft-blue)"
                  />
                  <circle cx="24" cy="9" r="2.6" fill="none" stroke="#fbbf24" strokeWidth="0.35" opacity="0.5" />
                  <circle cx="24" cy="9" r="1.55" fill="url(#ft-gold)" />
                </svg>
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-sans text-2xl font-black tracking-[-0.035em] text-parchment leading-none">
                  News<span className="text-gold-400"> NFTs</span>
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.42em] text-slate-500 font-mono">
                  Crypto · DeFi · Markets
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              The on-chain newsroom. Daily coverage of Bitcoin, Ethereum, DeFi,
              NFTs, mining, and the wider crypto economy — for builders,
              traders, and collectors.
            </p>
            <a
              href="https://x.com/newsnfts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow @NewsNFTs
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-sans text-parchment font-semibold text-xs uppercase tracking-[0.24em] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-gold-400/70" />
              Desks
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-parchment font-semibold text-xs uppercase tracking-[0.24em] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-gold-400/70" />
              More Sections
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(4).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans text-parchment font-semibold text-xs uppercase tracking-[0.24em] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-gold-400/70" />
              The Daily Block
            </h3>
            <p className="text-sm mb-4 text-slate-400">
              Every chain, every drop, every flip — distilled into one morning
              brief.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="you@wallet.eth"
                className="px-4 py-2.5 bg-ink-900 border border-ink-700 rounded-sm text-sm text-parchment placeholder:text-slate-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gold-400 hover:bg-gold-300 text-white text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 uppercase tracking-[0.18em] font-mono">
            &copy; {new Date().getFullYear()} News NFTs · All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 uppercase tracking-[0.18em]">
            <span className="hover:text-gold-400 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-gold-400 cursor-pointer transition-colors">
              Terms
            </span>
            <span className="hover:text-gold-400 cursor-pointer transition-colors">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
