import Link from "next/link";
import { ArrowUpRight, TableProperties } from "lucide-react";
import {
  StateResourceEntry,
  getProvidersByIds,
  getResourceTopicBySlug,
} from "@/lib/resource-data";
import { categories } from "@/lib/seed-data";

export function StateResourceCard({ entry }: { entry: StateResourceEntry }) {
  const topic = getResourceTopicBySlug(entry.topicSlug);
  const providers = getProvidersByIds(entry.providerIds);
  const compareCategory = categories.find(
    (category) => category.slug === entry.compareCategorySlugs[0],
  );

  if (!topic) {
    return null;
  }

  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.94))] p-4 shadow-[0_22px_58px_rgba(16,33,50,0.08)] md:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
        {topic.shortTitle}
      </p>
      <h3 className="mt-2 text-[1.65rem] font-semibold tracking-tight leading-tight text-[color:var(--foreground)]">
        {entry.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
        {entry.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {providers.map((provider) => (
          <a
            key={provider.id}
            href={provider.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-xs font-medium text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--foreground)]"
          >
            {provider.name}
          </a>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {entry.quickChecks.map((check) => (
          <li
            key={check}
            className="text-sm leading-6 text-[color:var(--muted)]"
          >
            {check}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-3 md:mt-auto md:pt-5">
        <Link
          href={`/resources/${entry.topicSlug}`}
          className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(184,144,69,0.24)] bg-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(10,20,34,0.24)] transition hover:-translate-y-0.5 hover:bg-[#0f2337] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] [&_svg]:text-white"
        >
          <span className="text-white">Open guide</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {compareCategory ? (
          <Link
            href={`/compare/${compareCategory.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Compare {compareCategory.shortLabel}
            <TableProperties className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
