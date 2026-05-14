type BrandMarkProps = {
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
};

export function NewsNftsIcon({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nn-stroke" x1="8" y1="7" x2="35" y2="37" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="nn-panel" x1="8" y1="6" x2="35" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FBFF" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="40" height="40" rx="8" fill="url(#nn-panel)" />
      <rect
        x="2.5"
        y="2.5"
        width="39"
        height="39"
        rx="7.5"
        stroke="#CBD5E1"
      />

      <path
        d="M12.5 31.5V11.5H16L27.5 24.2V11.5H31.5V31.5H28L16.5 18.8V31.5H12.5Z"
        fill="url(#nn-stroke)"
      />
      <rect
        x="29.4"
        y="10.3"
        width="5"
        height="5"
        fill="#F59E0B"
        stroke="#FDE68A"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandMark({
  compact = false,
  showTagline = true,
  className = "",
}: BrandMarkProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="relative inline-flex items-center justify-center bg-white">
        <NewsNftsIcon className={compact ? "h-10 w-10" : "h-11 w-11"} />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-sans text-[1.35rem] font-black tracking-[-0.045em] text-slate-950 leading-none">
          News <span className="text-gold-500">NFTs</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-slate-500 font-mono">
            Bitcoin · Ethereum · DeFi
          </span>
        )}
      </span>
    </span>
  );
}
