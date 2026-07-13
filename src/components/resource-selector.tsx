"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search } from "lucide-react";
import { resourceTopics } from "@/lib/resource-data";

export function ResourceSelector() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(resourceTopics[0]?.slug ?? "");

  const matches = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return resourceTopics;
    }

    return resourceTopics.filter((topic) => {
      const haystack = [
        topic.title,
        topic.shortTitle,
        topic.description,
        topic.summary,
        ...topic.quickChecks,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(trimmed);
    });
  }, [query]);

  const selectedTopic =
    resourceTopics.find((topic) => topic.slug === selectedSlug) ?? matches[0] ?? resourceTopics[0];
  const hasMatches = matches.length > 0;
  const selectValue =
    hasMatches && matches.some((topic) => topic.slug === selectedSlug)
      ? selectedSlug
      : matches[0]?.slug ?? "";

  function goToSelectedTopic() {
    const destination = matches.find((topic) => topic.slug === selectedSlug) ?? matches[0] ?? selectedTopic;
    if (!destination) {
      return;
    }

    startTransition(() => {
      router.push(`/resources/${destination.slug}`);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row">
        <div className="relative flex-1">
          <label htmlFor="resource-search" className="sr-only">
            Search for a resource
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55" />
          <input
            id="resource-search"
            type="text"
            value={query}
            placeholder="Search disability, health care, housing, caregiver support..."
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-16 w-full rounded-[1.5rem] border border-white/12 bg-[rgba(255,255,255,0.06)] pl-12 pr-4 text-base font-medium text-white placeholder:text-white/42 shadow-[0_20px_50px_rgba(0,0,0,0.22)] outline-none backdrop-blur-xl transition focus:border-[color:var(--accent)]"
          />
        </div>
        <label className="sr-only" htmlFor="resource-select">
          Select a resource lane
        </label>
        <select
          id="resource-select"
          value={selectValue}
          onChange={(event) => setSelectedSlug(event.target.value)}
          disabled={!hasMatches}
          className="min-h-16 rounded-[1.5rem] border border-white/12 bg-[rgba(255,255,255,0.06)] px-4 text-base font-medium text-white shadow-[0_20px_50px_rgba(0,0,0,0.22)] outline-none backdrop-blur-xl transition focus:border-[color:var(--accent)] disabled:text-white/45 xl:min-w-[19rem]"
        >
          {hasMatches ? (
            matches.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.title}
              </option>
            ))
          ) : (
            <option value="">No matching resources</option>
          )}
        </select>
        <button
          type="button"
          onClick={goToSelectedTopic}
          disabled={!hasMatches}
          className="inline-flex min-h-16 items-center justify-center gap-2 rounded-[1.5rem] bg-[color:var(--accent)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--navy)] shadow-[0_22px_52px_rgba(191,148,80,0.28)] transition hover:translate-y-[-1px] disabled:opacity-45 [&&]:text-[color:var(--navy)] [&_svg]:text-[color:var(--navy)] xl:min-w-[15rem]"
        >
          Open resource
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {hasMatches && selectedTopic ? (
        <div className="rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Selected resource lane
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {selectedTopic.title}
              </h3>
              <p className="max-w-2xl text-base leading-7 text-white/72">
                {selectedTopic.heroSummary}
              </p>
            </div>
            <Link
              href={`/resources/${selectedTopic.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)]"
            >
              View guide
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedTopic.quickChecks.slice(0, 3).map((check) => (
              <span
                key={check}
                className="rounded-full border border-white/12 bg-white/7 px-3 py-1 text-xs font-medium text-white/70"
              >
                {check}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-white/14 bg-white/4 p-5 text-sm leading-7 text-white/65">
          No matching resource lane yet. Try terms like <span className="font-medium text-white">disability</span>, <span className="font-medium text-white">health care</span>, <span className="font-medium text-white">housing</span>, or <span className="font-medium text-white">caregiver</span>.
        </div>
      )}
    </div>
  );
}
