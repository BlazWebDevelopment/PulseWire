"use client";

import Link from "next/link";
import { categories } from "@/data/articles";

export function Footer() {
  return (
    <footer className="relative bg-black text-slate-400 border-t border-ink-700/60">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-sm bg-black border border-ink-700 overflow-hidden">
                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),transparent_50%)]" />
                <svg className="relative w-6 h-6" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="8" width="2" height="16" fill="#e4e4e7" />
                  <path
                    d="M10 16 L13 16 L15 9 L18 24 L21 11 L23 16 L27 16"
                    stroke="#22d3ee"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
              </span>
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                Pulse<span className="text-cyan-400">Wire</span>
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
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow @PulseWire
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-cyan-400/70" />
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-cyan-400/70" />
              More
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/search" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-cyan-400/70" />
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
                placeholder="your@email.com"
                className="px-4 py-2.5 bg-ink-900 border border-ink-700 rounded-sm text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-white hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
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
          <p className="text-xs text-slate-500 uppercase tracking-wider font-mono">
            &copy; {new Date().getFullYear()} PulseWire // All systems nominal.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 uppercase tracking-wider">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">
              Terms
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
