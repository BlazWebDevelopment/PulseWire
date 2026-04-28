"use client";

import { useState, type FormEvent } from "react";

type Props = {
  /** `footer` = compact field + button; `article` = full-width band style */
  variant?: "footer" | "article";
};

export function NewsletterForm({ variant = "footer" }: Props) {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  if (subscribed) {
    return (
      <p
        role="status"
        className={
          variant === "article"
            ? "text-sm text-gold-400 font-mono text-center sm:text-left"
            : "text-sm text-gold-400 font-mono"
        }
      >
        You&apos;re subscribed. Thanks — we&apos;ll keep you posted.
      </p>
    );
  }

  if (variant === "article") {
    return (
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 flex flex-col gap-2"
      >
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@wallet.eth"
          aria-label="Email address"
          className="w-full px-4 py-3 bg-ink-950/70 border border-ink-700 focus:border-gold-400/70 focus:outline-none rounded-sm text-sm text-parchment placeholder:text-slate-600 font-mono"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-gold-400 hover:bg-gold-300 text-white text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@wallet.eth"
        aria-label="Email address"
        className="px-4 py-2.5 bg-ink-900 border border-ink-700 rounded-sm text-sm text-parchment placeholder:text-slate-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 font-mono"
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-gold-400 hover:bg-gold-300 text-white text-xs font-extrabold uppercase tracking-[0.22em] rounded-sm transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
