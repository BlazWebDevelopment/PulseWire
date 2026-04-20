"use client";

import Link from "next/link";
import { categories } from "@/data/articles";

export function Footer() {
  return (
    <footer className="relative bg-ink-950 text-slate-400 border-t border-ink-700/60">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-crimson/60 to-transparent"
      />
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ink-900 border border-ink-700 overflow-hidden">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-crimson/25 via-transparent to-indigo-500/20" />
                <svg className="relative w-5 h-5" viewBox="0 0 32 32" fill="none">
                  <defs>
                    <linearGradient id="ftr-g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#B91C1C" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="16"
                    cy="16"
                    r="10"
                    stroke="url(#ftr-g)"
                    strokeWidth="2.2"
                    strokeDasharray="40 10"
                    strokeLinecap="round"
                  />
                  <circle cx="16" cy="16" r="3.4" fill="url(#ftr-g)" />
                </svg>
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                Pulse<span className="bg-gradient-to-r from-crimson to-rose-500 bg-clip-text text-transparent">Wire</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Delivering breaking news, investigative journalism, and in-depth
              analysis from around the globe. Trusted by millions for accurate,
              timely reporting.
            </p>
            <a
              href="https://x.com/pulsewire"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow @PulseWire
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              More
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm mb-4 text-slate-400">
              Get the latest headlines delivered straight to your inbox every
              morning.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 bg-ink-900 border border-ink-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/60"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-crimson to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-crimson/20"
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
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} PulseWire. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
