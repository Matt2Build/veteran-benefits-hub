import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/lib/format";
import { BenefitRecord } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export function BenefitCard({ benefit }: { benefit: BenefitRecord }) {
  return (
    <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_20px_60px_rgba(16,33,50,0.08)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {benefit.categoryGroup}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {benefit.question}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
            {benefit.summary}
          </p>
        </div>
        <StatusBadge status={benefit.status} />
      </div>

      {benefit.disabilityThreshold ? (
        <p className="mt-4 inline-flex rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-sm font-medium text-[color:var(--navy)]">
          Threshold: {benefit.disabilityThreshold}
        </p>
      ) : null}

      <details className="mt-6 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--background)] p-5">
        <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)]">
          Expand details
        </summary>
        <div className="prose-markdown mt-4 text-[color:var(--muted)]">
          <ReactMarkdown>{benefit.detailMd}</ReactMarkdown>
        </div>
      </details>

      <div className="mt-6 flex flex-col gap-3 border-t border-[color:var(--line)] pt-5 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold text-[color:var(--foreground)]">
          Verified {formatDate(benefit.verifiedDate)}
        </p>
        {benefit.sourceLabel && benefit.sourceUrl ? (
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
    </article>
  );
}
