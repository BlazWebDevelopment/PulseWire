type BrandMarkProps = {
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
};

export function FinanceJoysIcon({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fj-stroke" x1="11" y1="31" x2="33" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="fj-panel" x1="8" y1="6" x2="35" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F4FDF8" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="40" height="40" rx="8" fill="url(#fj-panel)" />
      <rect
        x="2.5"
        y="2.5"
        width="39"
        height="39"
        rx="7.5"
        stroke="#CBD5E1"
      />

      <path
        d="M11 31L19 25L25 28L33 14"
        stroke="url(#fj-stroke)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="30.4"
        y="11.3"
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
        <FinanceJoysIcon className={compact ? "h-10 w-10" : "h-11 w-11"} />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-sans text-[1.35rem] font-black tracking-[-0.045em] text-slate-950 leading-none">
          Finance <span className="text-gold-500">Joys</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-slate-500 font-mono">
            Markets · Investing · Crypto
          </span>
        )}
      </span>
    </span>
  );
}
