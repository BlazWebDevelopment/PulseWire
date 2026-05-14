import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl border border-slate-200 bg-white px-6 py-16 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.2)] sm:px-10">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-500 font-mono">
        Page Not Found
      </p>
      <h1 className="mb-4 font-display text-[7rem] font-bold leading-[0.9] tracking-[-0.06em] text-slate-950 sm:text-[10rem]">
        404
      </h1>
      <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-cyan-400 to-gold-400" />
      <h2 className="mb-3 font-display text-3xl font-bold tracking-[-0.02em] text-slate-950 sm:text-4xl">
        <em className="font-medium italic text-gold-500">Page not found.</em>
      </h2>
      <p className="mx-auto mb-8 max-w-md text-slate-600">
        This page may have moved, expired, or never been published in the first place.
      </p>
      <Link
        href="/"
        className="inline-block bg-slate-950 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-white transition-colors hover:bg-gold-500"
      >
        Back to Homepage
      </Link>
      </div>
    </div>
  );
}
