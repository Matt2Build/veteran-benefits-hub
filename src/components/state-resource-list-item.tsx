import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  StateResourceEntry,
  getProvidersByIds,
  getResourceTopicBySlug,
} from "@/lib/resource-data";
import { categories } from "@/lib/seed-data";

export function StateResourceListItem({
  entry,
}: {
  entry: StateResourceEntry;
}) {
  const topic = getResourceTopicBySlug(entry.topicSlug);
  const providers = getProvidersByIds(entry.providerIds).slice(0, 3);
  const quickChecks = entry.quickChecks.slice(0, 2);
  const compareCategory = categories.find(
    (category) => category.slug === entry.compareCategorySlugs[0],
  );

  if (!topic) {
    return null;
  }

  return (
    <article className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/92 p-4 shadow-[0_12px_30px_rgba(16,33,50,0.05)]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {topic.shortTitle}
          </p>
          {compareCategory ? (
            <span className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--background)] px-3 py-1 text-xs font-semibold text-[color:var(--navy)]">
              Compare {compareCategory.shortLabel}
            </span>
          ) : null}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--foreground)]">
            {entry.title}
          </h3>
          <p className="text-sm leading-6 text-[color:var(--muted)]">
            {entry.summary}
          </p>
        </div>

        {providers.length ? (
          <div className="flex flex-wrap gap-2">
            {providers.map((provider) => (
              <a
                key={provider.id}
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[color:var(--line)] bg-[color:var(--background)] px-3 py-1 text-xs font-semibold text-[color:var(--navy)]"
              >
                {provider.name}
              </a>
            ))}
          </div>
        ) : null}

        {quickChecks.length ? (
          <ul className="grid gap-2 text-sm leading-6 text-[color:var(--muted)]">
            {quickChecks.map((check) => (
              <li key={check} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--line)] pt-3">
          <Link
            href={`/resources/${entry.topicSlug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(10,20,34,0.18)] transition hover:bg-[#0f2337]"
          >
            <span className="text-white">Open guide</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </Link>
          {compareCategory ? (
            <Link
              href={`/compare/${compareCategory.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)] underline underline-offset-4"
            >
              Open comparison
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
