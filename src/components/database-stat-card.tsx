import { DatabaseStat } from "@/lib/catalog-data";

export function DatabaseStatCard({ stat }: { stat: DatabaseStat }) {
  return (
    <article className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/82 p-5 shadow-[0_16px_38px_rgba(16,33,50,0.06)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {stat.label}
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {stat.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
        {stat.description}
      </p>
    </article>
  );
}
