"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Database, MapPinned } from "lucide-react";
import { getStateCatalogEntryBySlug } from "@/lib/catalog-data";
import { states } from "@/lib/seed-data";

export function StateSelector() {
  const router = useRouter();
  const [value, setValue] = useState(states[0]?.slug ?? "alabama");
  const selectedEntry = getStateCatalogEntryBySlug(value);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="state-selector">
          Choose a state
        </label>
        <select
          id="state-selector"
          className="min-h-14 flex-1 rounded-[1.25rem] border border-[color:var(--line)] bg-white/90 px-4 text-base font-medium text-[color:var(--foreground)] shadow-[0_16px_40px_rgba(16,33,50,0.08)] outline-none transition focus:border-[color:var(--accent)]"
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
          className="inline-flex min-h-14 items-center justify-center rounded-[1.25rem] bg-[color:var(--navy)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_rgba(16,33,50,0.22)] transition hover:translate-y-[-1px] sm:min-w-[12rem]"
          onClick={() => router.push(`/states/${value}`)}
        >
          View state page
        </button>
      </div>

      {selectedEntry ? (
        <article className="rounded-[1.5rem] border border-[color:rgba(214,219,226,0.75)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,250,242,0.78))] p-4 shadow-[0_16px_38px_rgba(16,33,50,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Selected state
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                {selectedEntry.stateName}
              </h3>
              <p className="text-sm leading-6 text-[color:var(--muted)]">
                {selectedEntry.statusLabel}
              </p>
            </div>
            <span className="rounded-[1rem] border border-[color:var(--line)] bg-white/90 px-3 py-2 text-lg font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">
              {selectedEntry.stateCode}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white/82 px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Facts
              </p>
              <p className="mt-2 text-xl font-semibold text-[color:var(--foreground)]">
                {selectedEntry.publishedBenefitCount}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white/82 px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Guides
              </p>
              <p className="mt-2 text-xl font-semibold text-[color:var(--foreground)]">
                {selectedEntry.resourceGuideCount}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[color:var(--line)] bg-white/82 px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Compare
              </p>
              <p className="mt-2 text-xl font-semibold text-[color:var(--foreground)]">
                {selectedEntry.compareCategoryCount}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/states/${selectedEntry.stateSlug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
            >
              Open the {selectedEntry.stateName} database
              <ArrowUpRight className="h-4 w-4 text-[color:var(--accent)]" />
            </Link>
            <span className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)]">
              <Database className="h-4 w-4 text-[color:var(--accent)]" />
              Guides, compare links, and state facts in one place
            </span>
          </div>
        </article>
      ) : null}

      <div className="rounded-[1.5rem] border border-[color:rgba(214,219,226,0.75)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,250,242,0.72))] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              All 50 states
            </p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              Compare benefits and support paths cleanly.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)]">
            <MapPinned className="h-3.5 w-3.5 text-[color:var(--accent)]" />
            50-state footprint
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(3.15rem,1fr))] gap-2.5">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/states/${state.slug}`}
              aria-label={state.name}
              title={state.name}
              className={`flex h-14 items-center justify-center rounded-[1rem] border bg-white/90 text-center text-base font-semibold uppercase tracking-[0.14em] transition ${
                state.slug === value
                  ? "border-[color:rgba(184,144,69,0.55)] bg-[color:rgba(184,144,69,0.12)] text-[color:var(--foreground)]"
                  : "border-[color:var(--line)] text-[color:var(--muted)] hover:border-[color:rgba(184,144,69,0.5)] hover:bg-white hover:text-[color:var(--foreground)]"
              }`}
            >
              {state.code}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
