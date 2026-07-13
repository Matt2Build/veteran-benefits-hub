import Link from "next/link";
import { ArrowRight, ShieldCheck, TableProperties } from "lucide-react";
import { categories } from "@/lib/data";
import { StateSelector } from "@/components/state-selector";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.08)]">
            <ShieldCheck className="h-4 w-4 text-[color:var(--accent)]" />
            Veteran-built. Source-first. Plain English.
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Veteran Benefits Hub
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-6xl">
              Veteran benefits, explained simply, state by state.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Built by a veteran who has navigated this system firsthand. Every published fact answers a specific question, links to the underlying source, and shows when it was last verified.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/compare/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-[0_12px_32px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--accent)]"
              >
                <TableProperties className="h-4 w-4 text-[color:var(--accent)]" />
                {category.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,240,228,0.92))] p-6 shadow-[0_32px_80px_rgba(16,33,50,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Start with a state
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Pick a state, then compare tax and housing relief.
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Utah is the flagship live example. The rest of the 50-state footprint is scaffolded so comparison coverage can expand without changing the data model.
          </p>
          <div className="mt-6">
            <StateSelector />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            What matters
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Specific answers
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            The site is designed around the exact questions veterans ask: taxes, property relief, and what eligibility thresholds change the answer.
          </p>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Why trust it
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Provenance is visible
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Verified dates and source links are treated like primary UI, not fine print. That editorial discipline is part of the product.
          </p>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Next step
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Start with Utah
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            The deep-dive pattern is live on Utah now, with comparison routes and admin structure ready for additional states.
          </p>
          <Link
            href="/states/utah"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Visit Utah
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>
    </div>
  );
}
