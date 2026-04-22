import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em] font-mono mb-4">
        // Error 0x404
      </p>
      <h1 className="text-8xl font-black text-white mb-4 tracking-tight font-mono">
        404
      </h1>
      <div className="h-px w-16 bg-cyan-400 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">Page Not Found</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-white hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
