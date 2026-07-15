import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowRight, ExternalLink, MapPinned } from "lucide-react";
import { BenefitAccordionItem } from "@/components/benefit-accordion-item";
import { StateResourceListItem } from "@/components/state-resource-list-item";
import { StateSectionNav } from "@/components/state-section-nav";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format";
import {
  getAllStateSlugs,
  getBenefitsByState,
  getNeighborStates,
  getPublishedBenefitsByState,
  getStateBySlug,
} from "@/lib/data";
import {
  getCoreResourceProviders,
  getStateOfficialProviders,
  getStateResourceEntries,
} from "@/lib/resource-data";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) {
    return {};
  }

  return {
    title: `Does ${state.name} Tax Military Retirement Pay?`,
    description:
      state.slug === "utah"
        ? "Utah veteran benefits, including military retirement tax treatment and property tax relief, with source links and verification dates."
        : `${state.name} veteran benefits, including military retirement pay treatment and disabled veteran property tax relief, with source links and verification dates.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) {
    notFound();
  }

  const allBenefits = await getBenefitsByState(state.slug);
  const benefits = await getPublishedBenefitsByState(state.slug);
  const neighbors = getNeighborStates(state.slug);
  const coreProviders = getCoreResourceProviders();
  const stateOfficialProviders = getStateOfficialProviders(state.slug);
  const stateResourceEntries = getStateResourceEntries(state.slug);
  const publishedBenefitCount = allBenefits.filter((benefit) => benefit.published).length;
  const unpublishedBenefitCount = allBenefits.length - publishedBenefitCount;
  const hasCoverageGaps = unpublishedBenefitCount > 0;
  const providerCount = new Set(stateResourceEntries.flatMap((entry) => entry.providerIds)).size;
  const quickJumpLinks = [
    { id: "help-now", label: "Get help now" },
    { id: "verified-facts", label: "Verified facts" },
    { id: "coverage-map", label: "Coverage map" },
    { id: "compare-nearby", label: "Compare nearby" },
  ];

  const faqSchema = benefits.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: benefits.map((benefit) => ({
          "@type": "Question",
          name: benefit.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: benefit.summary,
          },
        })),
      }
    : null;

  const groupedBenefits = benefits.reduce<Record<string, typeof benefits>>(
    (groups, benefit) => {
      groups[benefit.categoryGroup] ??= [];
      groups[benefit.categoryGroup].push(benefit);
      return groups;
    },
    {},
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-6 lg:px-8 lg:gap-10 lg:py-14">
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            State page
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
            {state.name} veteran benefits
          </h1>
          <p className="max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
            {state.hasDeepDive
              ? "Published facts for Utah are live now and follow the intended editorial standard."
              : `${state.name} is in the 50-state footprint. This page combines live state-specific benefits with the national support lanes Veterans still need.`}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-[color:var(--line)] bg-white/82 px-4 py-2 text-sm font-medium text-[color:var(--navy)] shadow-[0_12px_30px_rgba(16,33,50,0.06)]">
              Published rows only go live after the answer, source, and verified date are attached.
            </span>
            <span className="inline-flex rounded-full border border-[color:rgba(184,144,69,0.28)] bg-[color:rgba(184,144,69,0.12)] px-4 py-2 text-sm font-medium text-[color:var(--navy)]">
              {publishedBenefitCount} verified facts live now
            </span>
          </div>
          <div className="grid max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Verified facts
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {publishedBenefitCount}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Live on page</p>
            </div>
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Tracked categories
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {allBenefits.length}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {hasCoverageGaps ? `${unpublishedBenefitCount} still in verification` : "All rows published"}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Guide lanes
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {stateResourceEntries.length}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Common needs covered</p>
            </div>
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Official channels
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {providerCount}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">State and VA providers</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {stateOfficialProviders.map((provider) => (
              <a
                key={provider.id}
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/86 px-4 py-3 text-sm font-semibold text-[color:var(--navy)] shadow-[0_12px_30px_rgba(16,33,50,0.06)] transition hover:border-[color:rgba(184,144,69,0.36)]"
              >
                {provider.name}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <aside className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-4 shadow-[0_24px_60px_rgba(16,33,50,0.10)] md:p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-[1.25rem] bg-[color:rgba(184,144,69,0.14)] text-[color:var(--navy)]">
              <MapPinned className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Resource map
              </p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-tight leading-tight text-[color:var(--foreground)]">
                The fastest way to start in {state.name}
              </h2>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/84 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Start here
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Pick the lane that matches the need, use the in-state directory first, then move into the federal provider path.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/84 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                What is live
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {hasCoverageGaps
                  ? `${publishedBenefitCount} published state facts are live now, and ${unpublishedBenefitCount} tracked rows are still in source review.`
                  : `${publishedBenefitCount} published state facts are live now, with source links and verification dates attached to each one.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#help-now"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(10,20,34,0.22)]"
              >
                <span className="text-white">Browse sections</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </a>
              <a
                href="#verified-facts"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/82 px-4 py-2 text-sm font-semibold text-[color:var(--navy)]"
              >
                View verified facts
              </a>
            </div>
          </div>
        </aside>
      </section>

      <StateSectionNav links={quickJumpLinks} />

      <section id="help-now" className="scroll-mt-28 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_20px_60px_rgba(16,33,50,0.08)] md:p-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Get help now
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
              Start with a section, not a maze of cards
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              Each lane below points into the official providers and state-specific support paths people usually need first.
            </p>
          </div>
          {state.introMd ? (
            <section className="rounded-[1.6rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,240,228,0.92))] p-5 shadow-[0_16px_42px_rgba(16,33,50,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Flagship deep dive
              </p>
              <div className="prose-markdown mt-4 text-[color:var(--muted)]">
                <ReactMarkdown>{state.introMd}</ReactMarkdown>
              </div>
            </section>
          ) : null}

          <div className="grid gap-4 xl:grid-cols-2">
            {stateResourceEntries.map((entry) => (
              <StateResourceListItem key={entry.id} entry={entry} />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/88 p-5 shadow-[0_16px_44px_rgba(16,33,50,0.08)]">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Official state channels
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                  Use the in-state doors first
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {stateOfficialProviders.map((provider) => (
                  <a
                    key={provider.id}
                    href={provider.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-4 transition hover:border-[color:rgba(184,144,69,0.38)]"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        {provider.typeLabel}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[color:var(--foreground)]">
                        {provider.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                        {provider.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/88 p-5 shadow-[0_16px_44px_rgba(16,33,50,0.08)]">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Core national channels
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                  Keep the federal paths visible
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {coreProviders.map((provider) => (
                  <a
                    key={provider.id}
                    href={provider.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start justify-between gap-3 rounded-[1.35rem] border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-4 transition hover:border-[color:rgba(184,144,69,0.38)]"
                  >
                    <div>
                      <p className="text-base font-semibold text-[color:var(--foreground)]">
                        {provider.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                        {provider.description}
                      </p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[color:var(--navy)]" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section id="verified-facts" className="scroll-mt-28 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Verified facts
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Verified state tax answers in one place
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            Published entries stay collapsed until needed, but every one still carries its source link and last verified date.
          </p>
        </div>
        {benefits.length ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {Object.entries(groupedBenefits).map(([group, records]) => (
              <section
                key={group}
                className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_18px_48px_rgba(16,33,50,0.06)]"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {group}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                    {group} answers
                  </h3>
                </div>
                <div className="mt-4 space-y-3">
                  {records.map((benefit) => (
                    <BenefitAccordionItem
                      key={benefit.id}
                      benefit={benefit}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="rounded-[2rem] border border-dashed border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-base leading-8 text-[color:var(--muted)]">
            This category does not yet have a published record for {state.name}. Use the official resource map and provider links above until a source-backed answer is added.
          </section>
        )}
      </section>

      <section id="coverage-map" className="scroll-mt-28 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Coverage map
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Everything currently tracked in {state.name}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            This is the tracked state-benefit set currently published on the site, shown together so users can compare the full state footprint without hunting through multiple pages.
          </p>
        </div>
        <section className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_18px_48px_rgba(16,33,50,0.06)]">
          <div className="grid gap-0 divide-y divide-[color:var(--line)]">
            {allBenefits.map((benefit) => (
              <article
                key={benefit.id}
                className="grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    {benefit.categoryGroup}
                  </p>
                  <h3 className="text-base font-semibold text-[color:var(--foreground)]">
                    {benefit.question}
                  </h3>
                  <p className="text-sm leading-6 text-[color:var(--muted)]">
                    {benefit.published
                      ? benefit.summary
                      : "Source-backed answer not yet published for this tracked category."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  {benefit.published ? (
                    <StatusBadge status={benefit.status} />
                  ) : (
                    <span className="inline-flex rounded-full bg-[color:var(--background)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)] ring-1 ring-[color:var(--line)] ring-inset">
                      Not yet published
                    </span>
                  )}
                  <p className="text-sm font-medium text-[color:var(--muted)]">
                    {benefit.published && benefit.verifiedDate
                      ? `Verified ${formatDate(benefit.verifiedDate)}`
                      : "Not yet published"}
                  </p>
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
              </article>
            ))}
          </div>
        </section>
      </section>

      <section id="compare-nearby" className="scroll-mt-28 space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Compare nearby
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Compare with neighboring states
          </h2>
        </div>
        {neighbors.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {neighbors.map((neighbor) => (
              <Link
                key={neighbor.slug}
                href={`/states/${neighbor.slug}`}
                className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[0_16px_48px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--accent)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {neighbor.code}
                </p>
                <p className="mt-3 text-xl font-semibold text-[color:var(--foreground)]">
                  {neighbor.name}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]">
                  View state page
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
