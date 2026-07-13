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
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <label htmlFor="resource-search" className="sr-only">
            Search for a resource
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--muted)]" />
          <input
            id="resource-search"
            type="text"
            value={query}
            placeholder="Search disability, health care, housing, caregiver support..."
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-16 w-full rounded-[1.5rem] border border-[color:var(--line)] bg-white/92 pl-12 pr-4 text-base font-medium text-[color:var(--foreground)] shadow-[0_18px_48px_rgba(16,33,50,0.10)] outline-none transition focus:border-[color:var(--accent)]"
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
          className="min-h-16 rounded-[1.5rem] border border-[color:var(--line)] bg-white/92 px-4 text-base font-medium text-[color:var(--foreground)] shadow-[0_18px_48px_rgba(16,33,50,0.10)] outline-none transition focus:border-[color:var(--accent)] lg:min-w-[19rem]"
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
          className="inline-flex min-h-16 items-center justify-center gap-2 rounded-[1.5rem] bg-[color:var(--navy)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_20px_48px_rgba(16,33,50,0.22)] transition hover:translate-y-[-1px] [&&]:text-white [&_svg]:text-white lg:min-w-[15rem]"
        >
          Open resource
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {hasMatches && selectedTopic ? (
        <div className="rounded-[1.75rem] border border-[color:rgba(214,219,226,0.75)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,250,242,0.76))] p-5 shadow-[0_18px_44px_rgba(16,33,50,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Selected resource lane
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                {selectedTopic.title}
              </h3>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
                {selectedTopic.heroSummary}
              </p>
            </div>
            <Link
              href={`/resources/${selectedTopic.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
            >
              View guide
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedTopic.quickChecks.slice(0, 3).map((check) => (
              <span
                key={check}
                className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-xs font-medium text-[color:var(--muted)]"
              >
                {check}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-[color:var(--line)] bg-white/70 p-5 text-sm leading-7 text-[color:var(--muted)]">
          No matching resource lane yet. Try terms like <span className="font-medium text-[color:var(--foreground)]">disability</span>, <span className="font-medium text-[color:var(--foreground)]">health care</span>, <span className="font-medium text-[color:var(--foreground)]">housing</span>, or <span className="font-medium text-[color:var(--foreground)]">caregiver</span>.
        </div>
      )}
    </div>
  );
}
