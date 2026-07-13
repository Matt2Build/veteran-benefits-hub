import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StateCatalogEntry } from "@/lib/catalog-data";

export function StateCatalogCard({ entry }: { entry: StateCatalogEntry }) {
  return (
    <Link
      href={`/states/${entry.stateSlug}`}
      className="group rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.94))] p-5 shadow-[0_18px_44px_rgba(16,33,50,0.08)] transition hover:-translate-y-0.5 hover:border-[color:rgba(184,144,69,0.45)] hover:shadow-[0_24px_56px_rgba(16,33,50,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-2xl font-semibold tracking-[0.18em] text-[color:var(--foreground)]">
          {entry.stateCode}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
            entry.statusTone === "live"
              ? "bg-emerald-100 text-emerald-900"
              : "bg-[color:rgba(184,144,69,0.12)] text-[color:var(--navy)]"
          }`}
        >
          {entry.statusLabel}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {entry.stateName}
      </h3>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-[1.1rem] border border-[color:var(--line)] bg-white/80 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Facts
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
            {entry.publishedBenefitCount}
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-[color:var(--line)] bg-white/80 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Guides
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
            {entry.resourceGuideCount}
          </p>
        </div>
        <div className="rounded-[1.1rem] border border-[color:var(--line)] bg-white/80 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Compare
          </p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
            {entry.compareCategoryCount}
          </p>
        </div>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]">
        Open state database
        <ArrowUpRight className="h-4 w-4 text-[color:var(--accent)]" />
      </span>
    </Link>
  );
}
