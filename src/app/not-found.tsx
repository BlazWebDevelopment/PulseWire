import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <p className="text-[10px] font-bold text-gold-400 uppercase tracking-[0.32em] font-mono mb-4">
        Block Not Found
      </p>
      <h1 className="font-display text-[7rem] sm:text-[10rem] font-bold text-parchment mb-4 tracking-[-0.04em] leading-[0.9]">
        404
      </h1>
      <div className="h-px w-16 bg-gold-400 mx-auto mb-6" />
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-parchment mb-3 tracking-[-0.02em]">
        <em className="italic font-medium text-gold-400">Page not found.</em>
      </h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        This token doesn&apos;t exist on-chain. The page may have been moved,
        delisted, or never minted in the first place.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-gold-400 hover:bg-gold-300 text-white text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
