import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/lib/format";
import { BenefitRecord } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

export function BenefitAccordionItem({
  benefit,
  groupLabel,
}: {
  benefit: BenefitRecord;
  groupLabel?: string;
}) {
  return (
    <details className="group rounded-[1.25rem] border border-[color:var(--line)] bg-white/90 p-3.5 shadow-[0_12px_30px_rgba(16,33,50,0.05)]">
      <summary className="list-none cursor-pointer">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            {groupLabel ? (
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {groupLabel}
              </p>
            ) : null}
            <h3 className="text-base font-semibold tracking-tight text-[color:var(--foreground)] sm:text-lg">
              {benefit.question}
            </h3>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              {benefit.summary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            {benefit.disabilityThreshold ? (
              <span className="inline-flex rounded-full border border-[color:rgba(184,144,69,0.26)] bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--navy)]">
                {benefit.disabilityThreshold}
              </span>
            ) : null}
            <StatusBadge status={benefit.status} />
          </div>
        </div>
      </summary>

      <div className="mt-3 border-t border-[color:var(--line)] pt-3">
        <div className="prose-markdown text-[color:var(--muted)]">
          <ReactMarkdown>{benefit.detailMd}</ReactMarkdown>
        </div>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
      </div>
    </details>
  );
}
