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
            ? "text-sm text-gold-600 font-mono text-center sm:text-left"
            : "text-sm text-gold-600 font-mono"
        }
      >
        You&apos;re subscribed. Thanks - the next brief is on the way.
      </p>
    );
  }

  if (variant === "article") {
    return (
      <form
        onSubmit={handleSubmit}
        className="md:col-span-2 flex flex-col gap-3"
      >
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@wallet.eth"
          aria-label="Email address"
          className="w-full border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_14px_32px_-28px_rgba(15,23,42,0.16)] outline-none placeholder:text-slate-400 focus:border-gold-300 focus:ring-4 focus:ring-gold-100 font-mono"
        />
        <button
          type="submit"
          className="w-full bg-slate-950 px-4 py-3.5 text-xs font-extrabold uppercase tracking-[0.22em] text-white transition-colors hover:bg-gold-500"
        >
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@wallet.eth"
        aria-label="Email address"
        className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-gold-300 focus:ring-4 focus:ring-gold-100 font-mono"
      />
      <button
        type="submit"
        className="bg-slate-950 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-white transition-colors hover:bg-gold-500"
      >
        Subscribe
      </button>
    </form>
  );
}
