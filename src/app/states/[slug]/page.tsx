import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Database, MapPinned } from "lucide-react";
import { BenefitCard } from "@/components/benefit-card";
import { ProviderCard } from "@/components/provider-card";
import { StateResourceCard } from "@/components/state-resource-card";
import { TrackedBenefitCard } from "@/components/tracked-benefit-card";
import {
  getAllStateSlugs,
  getBenefitsByState,
  getNeighborStates,
  getPublishedBenefitsByState,
  getStateBySlug,
} from "@/lib/data";
import {
  getCoreResourceProviders,
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
    title: state.slug === "utah"
      ? "Does Utah Tax Military Retirement Pay?"
      : `${state.name} veteran benefits`,
    description:
      state.slug === "utah"
        ? "Utah veteran benefits, including military retirement tax treatment and property tax relief, with source links and verification dates."
        : `${state.name} veteran benefits coverage is being built. Published facts will include source links and verification dates.`,
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
  const stateResourceEntries = getStateResourceEntries(state.slug);
  const publishedBenefitCount = allBenefits.filter((benefit) => benefit.published).length;
  const providerCount = new Set(stateResourceEntries.flatMap((entry) => entry.providerIds)).size;

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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            State page
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {state.name} veteran benefits
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            {state.hasDeepDive
              ? "Published facts for Utah are live now and follow the intended editorial standard."
              : `${state.name} is in the 50-state footprint. This page combines live state-specific benefits with the national support lanes Veterans still need.`}
          </p>
          <div className="grid max-w-3xl gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Tracked benefits
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {allBenefits.length}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Published facts
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {publishedBenefitCount}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Guide lanes
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {stateResourceEntries.length}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Providers linked
              </p>
              <p className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                {providerCount}
              </p>
            </div>
          </div>
        </div>
        <aside className="rounded-[2.25rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-6 shadow-[0_30px_80px_rgba(16,33,50,0.10)]">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-[1.25rem] bg-[color:rgba(184,144,69,0.14)] text-[color:var(--navy)]">
              <MapPinned className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Resource map
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                The support lanes Veterans in {state.name} usually need first
              </h2>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {stateResourceEntries.slice(0, 3).map((entry) => (
              <li
                key={entry.id}
                className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 text-sm leading-7 text-[color:var(--muted)]"
              >
                <span className="font-semibold text-[color:var(--foreground)]">
                  {entry.title}:
                </span>{" "}
                {entry.summary}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {state.introMd ? (
        <section className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,240,228,0.92))] p-8 shadow-[0_20px_70px_rgba(16,33,50,0.10)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Flagship deep dive
          </p>
          <div className="prose-markdown mt-4 text-[color:var(--muted)]">
            <ReactMarkdown>{state.introMd}</ReactMarkdown>
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            State coverage
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Benefits currently tracked in {state.name}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
            Every state now shows the same core tracked-benefits inventory so users can see what is already published and what is still in verification.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allBenefits.map((benefit) => (
            <TrackedBenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
        <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(184,144,69,0.08)] p-5">
          <div className="flex items-start gap-3">
            <Database className="mt-0.5 h-5 w-5 text-[color:var(--accent)]" />
            <p className="text-sm leading-7 text-[color:var(--foreground)]">
              Published rows always keep the answer, source, and verified date visible. Unpublished rows stay on the page so the statewide coverage footprint is transparent instead of hidden.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Start here in {state.name}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            The complete resource map for {state.name}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stateResourceEntries.map((entry) => (
            <StateResourceCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {benefits.length ? (
        Object.entries(groupedBenefits).map(([group, records]) => (
          <section key={group} className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                {group}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
                {group} benefits
              </h2>
            </div>
            <div className="grid gap-6">
              {records.map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="rounded-[2rem] border border-dashed border-[color:var(--line)] bg-[color:var(--surface)] p-8 text-base leading-8 text-[color:var(--muted)]">
          No published state-specific benefits yet. This page still stays useful by surfacing the federal help paths, provider guides, and comparison structure while the state policy detail is being built out.
        </section>
      )}

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Official providers
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Core national providers that still matter in {state.name}
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {coreProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} compact />
          ))}
        </div>
      </section>

      {neighbors.length ? (
        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Compare nearby
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
              Compare with neighboring states
            </h2>
          </div>
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
        </section>
      ) : null}
    </div>
  );
}
