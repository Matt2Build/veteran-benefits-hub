"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Filter, Save } from "lucide-react";
import { categories, states } from "@/lib/data";
import { formatDate, isOlderThanSixMonths, statusLabel } from "@/lib/format";
import { BenefitRecord, BenefitStatus } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

const statusOptions: BenefitStatus[] = ["full", "partial", "conditional", "none"];

export function AdminWorkspace({
  initialRows,
  demoMode,
}: {
  initialRows: BenefitRecord[];
  demoMode: boolean;
}) {
  const [rows, setRows] = useState(initialRows);
  const [selectedId, setSelectedId] = useState(initialRows[0]?.id ?? "");
  const [stateFilter, setStateFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [reviewQueueOnly, setReviewQueueOnly] = useState(false);

  const selectedRow = rows.find((row) => row.id === selectedId) ?? rows[0];

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (stateFilter !== "all" && row.stateSlug !== stateFilter) {
        return false;
      }

      if (categoryFilter !== "all" && row.category !== categoryFilter) {
        return false;
      }

      if (publishedFilter === "published" && !row.published) {
        return false;
      }

      if (publishedFilter === "draft" && row.published) {
        return false;
      }

      if (reviewQueueOnly && !isOlderThanSixMonths(row.verifiedDate)) {
        return false;
      }

      return true;
    });
  }, [categoryFilter, publishedFilter, reviewQueueOnly, rows, stateFilter]);

  function updateSelectedRow(patch: Partial<BenefitRecord>) {
    if (!selectedRow) {
      return;
    }

    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === selectedRow.id ? { ...row, ...patch } : row,
      ),
    );
  }

  if (!selectedRow) {
    return null;
  }

  return (
    <div className="space-y-6">
      {demoMode ? (
        <div className="rounded-[1.75rem] border border-[color:var(--accent)] bg-[color:var(--accent-soft)] p-5 text-sm leading-7 text-[color:var(--navy)]">
          Supabase is not configured yet, so this admin area is running in local demo mode. Filters, editing, markdown preview, and the explicit “Mark verified today” action work in the browser, but changes are not persisted.
        </div>
      ) : null}

      <div className="grid gap-4 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_16px_48px_rgba(16,33,50,0.08)] xl:grid-cols-[1.1fr_1.4fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              State benefits rows
            </h2>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset transition ${
                reviewQueueOnly
                  ? "bg-[color:var(--navy)] text-white ring-[color:var(--navy)]"
                  : "bg-[color:var(--background)] text-[color:var(--muted)] ring-[color:var(--line)]"
              }`}
              onClick={() => setReviewQueueOnly((current) => !current)}
            >
              <Filter className="h-4 w-4" />
              Verified 6+ months ago
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <select
              value={stateFilter}
              onChange={(event) => setStateFilter(event.target.value)}
              className="h-11 rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 text-sm outline-none focus:border-[color:var(--accent)]"
            >
              <option value="all">All states</option>
              {states.map((state) => (
                <option key={state.slug} value={state.slug}>
                  {state.name}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-11 rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 text-sm outline-none focus:border-[color:var(--accent)]"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={publishedFilter}
              onChange={(event) => setPublishedFilter(event.target.value)}
              className="h-11 rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 text-sm outline-none focus:border-[color:var(--accent)]"
            >
              <option value="all">All rows</option>
              <option value="published">Published</option>
              <option value="draft">Unpublished</option>
            </select>
          </div>

          <div className="max-h-[40rem] overflow-auto rounded-[1.5rem] border border-[color:var(--line)]">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[color:var(--navy)] text-white">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em]">
                    State
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em]">
                    Category
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em]">
                    Published
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`cursor-pointer border-t border-[color:var(--line)] transition ${
                      row.id === selectedRow.id
                        ? "bg-[color:var(--accent-soft)]"
                        : "bg-[color:var(--surface)] hover:bg-[color:var(--background)]"
                    }`}
                    onClick={() => setSelectedId(row.id)}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-[color:var(--foreground)]">
                      {states.find((state) => state.slug === row.stateSlug)?.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-[color:var(--muted)]">
                      {categories.find((category) => category.slug === row.category)?.shortLabel}
                    </td>
                    <td className="px-4 py-4 text-sm text-[color:var(--muted)]">
                      {row.published ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-5 rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--background)] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Editing row
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {selectedRow.question}
              </h2>
            </div>
            <StatusBadge status={selectedRow.status} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-[color:var(--foreground)]">
                Status
              </span>
              <select
                value={selectedRow.status}
                onChange={(event) =>
                  updateSelectedRow({
                    status: event.target.value as BenefitStatus,
                  })
                }
                className="h-11 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 outline-none focus:border-[color:var(--accent)]"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-[color:var(--foreground)]">
                Disability threshold
              </span>
              <input
                value={selectedRow.disabilityThreshold ?? ""}
                onChange={(event) =>
                  updateSelectedRow({
                    disabilityThreshold: event.target.value || null,
                  })
                }
                className="h-11 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 outline-none focus:border-[color:var(--accent)]"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm">
            <span className="font-semibold text-[color:var(--foreground)]">
              Summary
            </span>
            <textarea
              value={selectedRow.summary}
              onChange={(event) => updateSelectedRow({ summary: event.target.value })}
              rows={3}
              className="w-full rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 outline-none focus:border-[color:var(--accent)]"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-semibold text-[color:var(--foreground)]">
              Detail markdown
            </span>
            <textarea
              value={selectedRow.detailMd}
              onChange={(event) => updateSelectedRow({ detailMd: event.target.value })}
              rows={8}
              className="w-full rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 font-mono text-sm outline-none focus:border-[color:var(--accent)]"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-[color:var(--foreground)]">
                Source label
              </span>
              <input
                value={selectedRow.sourceLabel ?? ""}
                onChange={(event) =>
                  updateSelectedRow({ sourceLabel: event.target.value || null })
                }
                className="h-11 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 outline-none focus:border-[color:var(--accent)]"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-[color:var(--foreground)]">
                Source URL
              </span>
              <input
                value={selectedRow.sourceUrl ?? ""}
                onChange={(event) =>
                  updateSelectedRow({ sourceUrl: event.target.value || null })
                }
                className="h-11 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 outline-none focus:border-[color:var(--accent)]"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)]">
              <input
                type="checkbox"
                checked={selectedRow.published}
                onChange={(event) =>
                  updateSelectedRow({ published: event.target.checked })
                }
              />
              Published
            </label>
            <button
              type="button"
              className="rounded-full border border-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-[color:var(--navy)]"
              onClick={() => updateSelectedRow({ verifiedDate: "2026-07-13" })}
            >
              Mark verified today
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => updateSelectedRow({})}
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          </div>

          <p className="text-sm font-semibold text-[color:var(--foreground)]">
            Verified {formatDate(selectedRow.verifiedDate)}
          </p>

          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Markdown preview
            </p>
            <div className="prose-markdown mt-4 text-[color:var(--muted)]">
              <ReactMarkdown>{selectedRow.detailMd}</ReactMarkdown>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
