import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-8xl font-black bg-gradient-to-b from-ink-700 to-ink-900 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-gradient-to-r from-crimson to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-crimson/20"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
