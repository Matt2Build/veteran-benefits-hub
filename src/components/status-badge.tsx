import { statusClasses, statusLabel } from "@/lib/format";
import { BenefitStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: BenefitStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ring-inset ${statusClasses(
        status,
      )}`}
    >
      {statusLabel(status)}
    </span>
  );
}
