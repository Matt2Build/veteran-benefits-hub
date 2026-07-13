"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpDown, ExternalLink, Search } from "lucide-react";
import { formatDate } from "@/lib/format";
import { ComparisonRow } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

type SortField = "state" | "status" | "verified";
type StatusFilter =
  | "all"
  | "full"
  | "partial"
  | "none"
  | "conditional"
  | "coming-soon";

const sortOrder: Record<string, number> = {
  full: 0,
  partial: 1,
  conditional: 2,
  none: 3,
  "coming-soon": 4,
};

export function ComparisonExplorer({
  rows,
  categoryLabel,
}: {
  rows: ComparisonRow[];
  categoryLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("state");
  const deferredQuery = useDeferredValue(query);

  const filteredRows = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return rows
      .filter((row) => {
        if (
          normalizedQuery &&
          !row.stateName.toLowerCase().includes(normalizedQuery)
        ) {
          return false;
        }

        if (statusFilter === "all") {
          return true;
        }

        if (!row.published) {
          return statusFilter === "coming-soon";
        }

        return row.status === statusFilter;
      })
      .sort((left, right) => {
        if (sortField === "state") {
          return left.stateName.localeCompare(right.stateName);
        }

        if (sortField === "status") {
          const leftKey = left.published ? left.status ?? "conditional" : "coming-soon";
          const rightKey = right.published
            ? right.status ?? "conditional"
            : "coming-soon";
          return sortOrder[leftKey] - sortOrder[rightKey];
        }

        const leftDate = left.verifiedDate ? new Date(left.verifiedDate).getTime() : 0;
        const rightDate = right.verifiedDate
          ? new Date(right.verifiedDate).getTime()
          : 0;
        return rightDate - leftDate;
      });
  }, [deferredQuery, rows, sortField, statusFilter]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_20px_60px_rgba(16,33,50,0.08)] lg:grid-cols-[1.5fr_1fr_1fr]">
        <label className="relative">
          <span className="sr-only">Search by state</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by state"
            className="h-12 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] pl-11 pr-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
          />
        </label>
        <label>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Filter status
          </span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="h-12 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
          >
            <option value="all">All statuses</option>
            <option value="full">Full exemption</option>
            <option value="partial">Partial</option>
            <option value="conditional">Conditional</option>
            <option value="none">None</option>
            <option value="coming-soon">Coming soon</option>
          </select>
        </label>
        <label>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Sort by
          </span>
          <select
            value={sortField}
            onChange={(event) => setSortField(event.target.value as SortField)}
            className="h-12 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 text-sm outline-none transition focus:border-[color:var(--accent)]"
          >
            <option value="state">State</option>
            <option value="status">Status</option>
            <option value="verified">Verified date</option>
          </select>
        </label>
      </div>

      <div className="hidden overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_24px_70px_rgba(16,33,50,0.08)] lg:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[color:var(--navy)] text-white">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">State</th>
              <th className="px-6 py-4 text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-sm font-semibold">Summary</th>
              <th className="px-6 py-4 text-sm font-semibold">
                <span className="inline-flex items-center gap-2">
                  Verified
                  <ArrowUpDown className="h-4 w-4" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={`${row.stateSlug}-${row.category}`}
                className="border-t border-[color:var(--line)] align-top"
              >
                <td className="px-6 py-5">
                  <Link
                    href={`/states/${row.stateSlug}`}
                    className="font-semibold text-[color:var(--foreground)]"
                  >
                    {row.stateName}
                  </Link>
                </td>
                <td className="px-6 py-5">
                  {row.published && row.status ? (
                    <StatusBadge status={row.status} />
                  ) : (
                    <span className="inline-flex rounded-full bg-[color:var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)] ring-1 ring-[color:var(--line)] ring-inset">
                      Coming soon
                    </span>
                  )}
                </td>
                <td className="px-6 py-5 text-sm leading-7 text-[color:var(--muted)]">
                  {row.summary}
                </td>
                <td className="px-6 py-5">
                  {row.published ? (
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-[color:var(--foreground)]">
                        Verified {formatDate(row.verifiedDate)}
                      </p>
                      {row.sourceUrl && row.sourceLabel ? (
                        <a
                          href={row.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 font-medium text-[color:var(--navy)] underline underline-offset-4"
                        >
                          {row.sourceLabel}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <span className="text-sm text-[color:var(--muted)]">
                      Not published
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {filteredRows.map((row) => (
          <article
            key={`${row.stateSlug}-${row.category}`}
            className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_16px_48px_rgba(16,33,50,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/states/${row.stateSlug}`}
                  className="text-lg font-semibold text-[color:var(--foreground)]"
                >
                  {row.stateName}
                </Link>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {categoryLabel}
                </p>
              </div>
              {row.published && row.status ? (
                <StatusBadge status={row.status} />
              ) : (
                <span className="inline-flex rounded-full bg-[color:var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)] ring-1 ring-[color:var(--line)] ring-inset">
                  Coming soon
                </span>
              )}
            </div>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              {row.summary}
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <p className="font-semibold text-[color:var(--foreground)]">
                {row.published
                  ? `Verified ${formatDate(row.verifiedDate)}`
                  : "Not yet published"}
              </p>
              {row.published && row.sourceLabel && row.sourceUrl ? (
                <a
                  href={row.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[color:var(--navy)] underline underline-offset-4"
                >
                  {row.sourceLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <p className="text-sm text-[color:var(--muted)]">
        Published rows include a live source and verification date. Unpublished states stay visible so the 50-state footprint is clear while editorial review continues.
      </p>
    </section>
  );
}
