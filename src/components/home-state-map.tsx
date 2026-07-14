"use client";

import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { ArrowRight, MapPinned } from "lucide-react";
import { feature } from "topojson-client";
import usAtlas from "us-atlas/states-10m.json";
import { getStateCatalogEntryBySlug } from "@/lib/catalog-data";
import { states } from "@/lib/seed-data";

type MapFeature = {
  properties: {
    name: string;
  };
};

const stateSlugByName = new Map(states.map((state) => [state.name, state.slug]));
const atlasTopology = usAtlas as unknown as { objects: { states: unknown } };
const stateFeatureCollection = feature(
  atlasTopology as never,
  atlasTopology.objects.states as never,
) as unknown as { features: MapFeature[] };

const contiguousFeatureCollection = {
  type: "FeatureCollection" as const,
  features: stateFeatureCollection.features.filter((entry) =>
    stateSlugByName.has(entry.properties.name),
  ),
};

const projection = geoAlbersUsa().fitSize([980, 540], contiguousFeatureCollection as never);
const pathBuilder = geoPath(projection);

const renderedStates = contiguousFeatureCollection.features
  .map((entry) => {
    const slug = stateSlugByName.get(entry.properties.name);
    const path = pathBuilder(entry as never);

    if (!slug || !path) {
      return null;
    }

    return {
      slug,
      name: entry.properties.name,
      path,
    };
  })
  .filter((entry): entry is { slug: string; name: string; path: string } => entry !== null);

export function HomeStateMap() {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState("utah");

  const selectedEntry = useMemo(
    () => getStateCatalogEntryBySlug(selectedSlug),
    [selectedSlug],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[1rem] border border-white/10 bg-[rgba(191,148,80,0.12)] text-[color:var(--accent)]">
            <MapPinned className="h-4.5 w-4.5" />
          </span>
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
              Click your state
            </p>
            <p className="mt-1 text-sm font-medium text-white/76">
              Every state routes into its own benefits and resource page.
            </p>
          </div>
        </div>

        {selectedEntry ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/74">
              {selectedEntry.stateName}
            </span>
            <span className="rounded-full border border-[rgba(191,148,80,0.22)] bg-[rgba(191,148,80,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(248,223,174,0.88)]">
              {selectedEntry.statusLabel}
            </span>
          </div>
        ) : null}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:p-4">
        <div className="rounded-[1.6rem] border border-white/8 bg-[radial-gradient(circle_at_50%_35%,rgba(191,148,80,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-3 py-3 sm:px-4">
          <svg viewBox="0 0 980 540" className="h-auto w-full">
            <g>
              {renderedStates.map((state) => {
                const isSelected = state.slug === selectedSlug;

                return (
                  <path
                    key={state.slug}
                    d={state.path}
                    role="link"
                    tabIndex={0}
                    aria-label={state.name}
                    onMouseEnter={() => setSelectedSlug(state.slug)}
                    onFocus={() => setSelectedSlug(state.slug)}
                    onClick={() =>
                      startTransition(() => {
                        router.push(`/states/${state.slug}`);
                      })
                    }
                    onKeyDown={(event: { key: string; preventDefault: () => void }) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        startTransition(() => {
                          router.push(`/states/${state.slug}`);
                        });
                      }
                    }}
                    style={{
                      fill: isSelected ? "#bf9450" : "#d7dde6",
                      stroke: "rgba(16,33,50,0.55)",
                      strokeWidth: isSelected ? 1.5 : 1,
                      vectorEffect: "non-scaling-stroke",
                      cursor: "pointer",
                      transition: "fill 160ms ease, stroke 160ms ease",
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Selected
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry?.stateCode}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Published
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry?.publishedBenefitCount}
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-white/10 bg-white/6 px-3 py-2.5 text-left backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Guides
            </p>
            <p className="mt-1.5 text-base font-semibold text-white">
              {selectedEntry?.resourceGuideCount}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row">
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
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-[1.2rem] bg-[color:var(--accent)] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--navy)] shadow-[0_18px_40px_rgba(191,148,80,0.24)] transition hover:translate-y-[-1px] [&&]:text-[color:var(--navy)] [&_svg]:text-[color:var(--navy)] md:min-w-[13rem]"
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
    </div>
  );
}
