import { ExternalLink } from "lucide-react";
import { ResourceProvider } from "@/lib/resource-data";

export function ProviderCard({
  provider,
  compact = false,
}: {
  provider: ResourceProvider;
  compact?: boolean;
}) {
  return (
    <article className={`group overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.96))] shadow-[0_24px_60px_rgba(16,33,50,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(16,33,50,0.12)] ${
      compact ? "p-5" : "p-7"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            {provider.typeLabel}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {provider.audience}
          </p>
        </div>
        <span className="rounded-full border border-[color:rgba(184,144,69,0.28)] bg-[color:rgba(184,144,69,0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)]">
          Official
        </span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {provider.name}
      </h3>
      <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
        {provider.description}
      </p>
      <ul className="mt-5 space-y-2">
        {provider.highlights.map((highlight) => (
          <li
            key={highlight}
            className="text-sm leading-6 text-[color:var(--muted)]"
          >
            {highlight}
          </li>
        ))}
      </ul>
      <a
        href={provider.href}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold text-[color:var(--navy)] transition group-hover:border-[color:rgba(184,144,69,0.4)]"
      >
        {provider.ctaLabel}
        <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}
