"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPinned } from "lucide-react";
import { getStateCatalogEntryBySlug } from "@/lib/catalog-data";
import { states } from "@/lib/seed-data";

const homeMapLayout = [
  { slug: "washington", row: 1, col: 1 },
  { slug: "idaho", row: 1, col: 2 },
  { slug: "montana", row: 1, col: 3 },
  { slug: "north-dakota", row: 1, col: 5 },
  { slug: "minnesota", row: 1, col: 6 },
  { slug: "wisconsin", row: 1, col: 7 },
  { slug: "michigan", row: 1, col: 8 },
  { slug: "new-york", row: 1, col: 9 },
  { slug: "vermont", row: 1, col: 10 },
  { slug: "new-hampshire", row: 1, col: 11 },
  { slug: "maine", row: 1, col: 12 },

  { slug: "oregon", row: 2, col: 1 },
  { slug: "nevada", row: 2, col: 2 },
  { slug: "wyoming", row: 2, col: 3 },
  { slug: "south-dakota", row: 2, col: 5 },
  { slug: "iowa", row: 2, col: 6 },
  { slug: "illinois", row: 2, col: 7 },
  { slug: "indiana", row: 2, col: 8 },
  { slug: "ohio", row: 2, col: 9 },
  { slug: "pennsylvania", row: 2, col: 10 },
  { slug: "new-jersey", row: 2, col: 11 },
  { slug: "massachusetts", row: 2, col: 12 },

  { slug: "california", row: 3, col: 1 },
  { slug: "utah", row: 3, col: 2 },
  { slug: "colorado", row: 3, col: 3 },
  { slug: "nebraska", row: 3, col: 5 },
  { slug: "missouri", row: 3, col: 6 },
  { slug: "kentucky", row: 3, col: 7 },
  { slug: "west-virginia", row: 3, col: 8 },
  { slug: "virginia", row: 3, col: 9 },
  { slug: "maryland", row: 3, col: 10 },
  { slug: "connecticut", row: 3, col: 11 },
  { slug: "rhode-island", row: 3, col: 12 },

  { slug: "arizona", row: 4, col: 1 },
  { slug: "new-mexico", row: 4, col: 2 },
  { slug: "kansas", row: 4, col: 4 },
  { slug: "arkansas", row: 4, col: 5 },
  { slug: "tennessee", row: 4, col: 6 },
  { slug: "north-carolina", row: 4, col: 7 },
  { slug: "south-carolina", row: 4, col: 8 },
  { slug: "delaware", row: 4, col: 10 },

  { slug: "texas", row: 5, col: 2 },
  { slug: "oklahoma", row: 5, col: 4 },
  { slug: "louisiana", row: 5, col: 5 },
  { slug: "mississippi", row: 5, col: 6 },
  { slug: "alabama", row: 5, col: 7 },
  { slug: "georgia", row: 5, col: 8 },
  { slug: "florida", row: 5, col: 10 },

  { slug: "alaska", row: 6, col: 1 },
  { slug: "hawaii", row: 6, col: 2 },
];

export function HomeStateMap() {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState("utah");

  const selectedEntry = useMemo(
    () => getStateCatalogEntryBySlug(selectedSlug),
    [selectedSlug],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="text-left xl:min-w-[11rem]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
            Or choose from list
          </p>
          <p className="mt-1 text-sm text-white/68">
            Click the map or open a state directly.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="homepage-state-select">
            Choose a state
          </label>
          <select
            id="homepage-state-select"
            className="min-h-[3.25rem] flex-1 rounded-[1.2rem] border border-white/12 bg-[rgba(255,255,255,0.06)] px-4 text-base font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] outline-none backdrop-blur-xl transition focus:border-[color:var(--accent)]"
            value={selectedSlug}
            onChange={(event) => setSelectedSlug(event.target.value)}
          >
            {states.map((state) => (
              <option key={state.slug} value={state.slug} className="text-slate-900">
                {state.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[1.2rem] bg-[color:var(--accent)] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--navy)] shadow-[0_18px_40px_rgba(191,148,80,0.24)] transition hover:translate-y-[-1px] [&&]:text-[color:var(--navy)] [&_svg]:text-[color:var(--navy)] sm:min-w-[13rem]"
            onClick={() =>
              startTransition(() => {
                router.push(`/states/${selectedSlug}`);
              })
            }
          >
            Open state page
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-[0.9rem] bg-[rgba(191,148,80,0.14)] text-[color:var(--accent)]">
              <MapPinned className="h-4.5 w-4.5" />
            </span>
            <div className="text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
                Click your state
              </p>
              <p className="mt-1 text-sm font-medium text-white/76">
                All 50 state pages are live in the footprint.
              </p>
            </div>
          </div>
          {selectedEntry ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/74">
                {selectedEntry.stateCode}
              </span>
              <span className="rounded-full border border-[rgba(191,148,80,0.22)] bg-[rgba(191,148,80,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(248,223,174,0.88)]">
                {selectedEntry.statusLabel}
              </span>
            </div>
          ) : null}
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="mx-auto grid min-w-[39rem] grid-cols-12 gap-1.5 sm:min-w-[42rem]">
            {homeMapLayout.map((cell) => {
              const state = states.find((entry) => entry.slug === cell.slug);
              if (!state) {
                return null;
              }

              const isSelected = state.slug === selectedSlug;

              return (
                <Link
                  key={state.slug}
                  href={`/states/${state.slug}`}
                  title={state.name}
                  aria-label={state.name}
                  onMouseEnter={() => setSelectedSlug(state.slug)}
                  className={`flex h-11 items-center justify-center rounded-[0.9rem] border text-xs font-semibold uppercase tracking-[0.16em] shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition sm:h-12 sm:text-sm ${
                    isSelected
                      ? "border-[rgba(191,148,80,0.46)] bg-[rgba(191,148,80,0.14)] text-white"
                      : "border-white/10 bg-white/6 text-white/70 hover:border-[rgba(191,148,80,0.38)] hover:bg-white/10 hover:text-white"
                  }`}
                  style={{
                    gridColumn: String(cell.col),
                    gridRow: String(cell.row),
                  }}
                >
                  {state.code}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {selectedEntry ? (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Selected
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry.stateName}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Tracked
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry.trackedBenefitCount}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Published
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry.publishedBenefitCount}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Guides
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry.resourceGuideCount}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
