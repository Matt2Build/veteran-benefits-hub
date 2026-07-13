"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { states } from "@/lib/seed-data";

export function StateSelector() {
  const router = useRouter();
  const [value, setValue] = useState(states[0]?.slug ?? "alabama");

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="state-selector">
          Choose a state
        </label>
        <select
          id="state-selector"
          className="min-h-14 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-base font-medium text-[color:var(--foreground)] shadow-[0_16px_40px_rgba(16,33,50,0.08)] outline-none transition focus:border-[color:var(--accent)]"
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value;
            setValue(nextValue);
            startTransition(() => {
              router.push(`/states/${nextValue}`);
            });
          }}
        >
          {states.map((state) => (
            <option key={state.slug} value={state.slug}>
              {state.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[color:var(--navy)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_rgba(16,33,50,0.22)] transition hover:translate-y-[-1px]"
          onClick={() => router.push(`/states/${value}`)}
        >
          View state page
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/states/${state.slug}`}
            aria-label={state.name}
            title={state.name}
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-3 text-center text-sm font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--navy)] hover:text-[color:var(--foreground)]"
          >
            <span className="block text-base uppercase tracking-[0.18em]">
              {state.code}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
