"use client";

import Link from "next/link";
import { categories } from "@/data/articles";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BrandMark } from "@/components/BrandMark";
import { NEWSLETTER_NAME, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,245,255,0.96))] text-slate-500">
      <div aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="border border-slate-200 bg-white p-8 shadow-[0_22px_48px_-38px_rgba(15,23,42,0.24)] lg:col-span-5">
            <Link href="/" className="mb-6 inline-flex">
              <BrandMark />
            </Link>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              {SITE_DESCRIPTION}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="border border-gold-200 bg-gold-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-600">
                Fast briefs
              </span>
              <span className="border border-cyan-200 bg-cyan-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Market context
              </span>
              <span className="border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Digital assets
              </span>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-8 shadow-[0_22px_48px_-38px_rgba(15,23,42,0.2)] lg:col-span-3">
            <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">
              <span className="h-px w-5 bg-gold-400" />
              Desks
            </h3>
            <ul className="space-y-3">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-sm text-slate-600 transition-colors hover:text-gold-500"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 bg-white p-8 shadow-[0_22px_48px_-38px_rgba(15,23,42,0.2)] lg:col-span-4">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">
                  <span className="h-px w-5 bg-gold-400" />
                  More
                </h3>
                <ul className="space-y-3">
              {categories.slice(4).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                        className="text-sm text-slate-600 transition-colors hover:text-gold-500"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
                  <li>
                    <Link href="/search" className="text-sm text-slate-600 transition-colors hover:text-gold-500">
                  Search
                </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">
                  <span className="h-px w-5 bg-cyan-400" />
                  {NEWSLETTER_NAME}
                </h3>
                <p className="mb-4 text-sm leading-6 text-slate-600">
                  A concise morning roundup of the biggest developments in crypto markets and digital assets.
                </p>
                <NewsletterForm variant="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-slate-500">
            &copy; {new Date().getFullYear()} {SITE_NAME} // All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-slate-500">
            <span className="cursor-pointer transition-colors hover:text-gold-500">
              Privacy
            </span>
            <span className="cursor-pointer transition-colors hover:text-gold-500">
              Terms
            </span>
            <span className="cursor-pointer transition-colors hover:text-gold-500">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
