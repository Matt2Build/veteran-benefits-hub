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
  const compareCategory = categories.find(
    (category) => category.slug === entry.compareCategorySlugs[0],
  );

  if (!topic) {
    return null;
  }

  return (
    <article className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/86 p-4 shadow-[0_14px_36px_rgba(16,33,50,0.05)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {topic.shortTitle}
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-[color:var(--foreground)]">
            {entry.title}
          </h3>
        </div>
        {compareCategory ? (
          <span className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--background)] px-3 py-1 text-xs font-semibold text-[color:var(--navy)]">
            Compare {compareCategory.shortLabel}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
        {entry.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {providers.map((provider) => (
          <a
            key={provider.id}
            href={provider.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[color:var(--line)] bg-[color:var(--background)] px-3 py-1 text-xs font-medium text-[color:var(--muted)]"
          >
            {provider.name}
          </a>
        ))}
      </div>

      <details className="mt-4 rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3">
        <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)]">
          Quick checks
        </summary>
        <ul className="mt-3 space-y-2">
          {entry.quickChecks.map((check) => (
            <li
              key={check}
              className="text-sm leading-6 text-[color:var(--muted)]"
            >
              {check}
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/resources/${entry.topicSlug}`}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(10,20,34,0.18)] transition hover:bg-[#0f2337] hover:text-white"
        >
          Open guide
          <ArrowRight className="h-4 w-4 text-white" />
        </Link>
        {compareCategory ? (
          <Link
            href={`/compare/${compareCategory.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/82 px-4 py-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Open comparison
          </Link>
        ) : null}
      </div>
    </article>
  );
}
