import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { BenefitRecord } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export function TrackedBenefitCard({ benefit }: { benefit: BenefitRecord }) {
  return (
    <article className="rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.94))] p-5 shadow-[0_18px_48px_rgba(16,33,50,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {benefit.categoryGroup}
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--foreground)] md:text-xl">
            {benefit.question}
          </h3>
        </div>
        {benefit.published ? (
          <StatusBadge status={benefit.status} />
        ) : (
          <span className="inline-flex rounded-full bg-[color:var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)] ring-1 ring-[color:var(--line)] ring-inset">
            In research
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
        {benefit.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/compare/${benefit.category}`}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/82 px-4 py-2 text-sm font-semibold text-[color:var(--navy)]"
        >
          Open comparison
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {benefit.published && benefit.sourceLabel && benefit.sourceUrl ? (
          <a
            href={benefit.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)] underline underline-offset-4"
          >
            {benefit.sourceLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <p className="mt-5 text-sm font-medium text-[color:var(--muted)]">
        {benefit.published && benefit.verifiedDate
          ? `Verified ${formatDate(benefit.verifiedDate)}`
          : "Source-backed answer not yet published"}
      </p>
    </article>
  );
}
