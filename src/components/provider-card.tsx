import { ExternalLink } from "lucide-react";
import { ResourceProvider } from "@/lib/resource-data";

export function ProviderCard({ provider }: { provider: ResourceProvider }) {
  return (
    <article className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_16px_48px_rgba(16,33,50,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
        {provider.audience}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {provider.name}
      </h3>
      <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
        {provider.description}
      </p>
      <a
        href={provider.href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)] underline underline-offset-4"
      >
        {provider.ctaLabel}
        <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}
