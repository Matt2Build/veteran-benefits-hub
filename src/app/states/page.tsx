import { Metadata } from "next";
import Link from "next/link";
import { DatabaseStatCard } from "@/components/database-stat-card";
import { StateCatalogCard } from "@/components/state-catalog-card";
import { getDatabaseStats, getStateCatalogEntries } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: "States",
  description:
    "Browse all 50 state veteran benefits pages and jump into the state-specific comparison footprint.",
};

export default function StatesIndexPage() {
  const stats = getDatabaseStats();
  const stateEntries = getStateCatalogEntries();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DatabaseStatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            State database
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Browse the state catalog, not just a grid of abbreviations
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stateEntries.map((entry) => (
            <StateCatalogCard key={entry.stateSlug} entry={entry} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-6 shadow-[0_18px_50px_rgba(16,33,50,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Provider database
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
              Browse the official provider directory behind the guides
            </h2>
          </div>
          <Link
            href="/providers"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white"
          >
            Open provider database
          </Link>
        </div>
      </section>
    </div>
  );
}
