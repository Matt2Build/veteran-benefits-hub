import { Metadata } from "next";
import Link from "next/link";
import { states } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "States",
  description:
    "Browse all 50 state veteran benefits pages and jump into the state-specific comparison footprint.",
};

export default function StatesIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          States
        </p>
        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          Browse the 50-state veteran benefits footprint.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          Every state page should become useful long before every line item is fully built out. That means state pages should surface the federal help paths, compare links, and the state-specific benefits work that is already live.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/states/${state.slug}`}
            aria-label={state.name}
            title={state.name}
            className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-5 text-center text-[color:var(--foreground)] shadow-[0_14px_40px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--navy)]"
          >
            <span className="block text-2xl font-semibold tracking-[0.18em]">
              {state.code}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
