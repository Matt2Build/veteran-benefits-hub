import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowRight } from "lucide-react";
import { BenefitCard } from "@/components/benefit-card";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import {
  getAllStateSlugs,
  getNeighborStates,
  getPublishedBenefitsByState,
  getStateBySlug,
} from "@/lib/data";
import {
  getCoreResourceProviders,
  resourceTopics,
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

  const benefits = await getPublishedBenefitsByState(state.slug);
  const neighbors = getNeighborStates(state.slug);
  const coreProviders = getCoreResourceProviders().slice(0, 4);
  const featuredTopics = resourceTopics.slice(0, 4);

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

      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          State page
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {state.name} veteran benefits
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {state.hasDeepDive
            ? "Published facts for Utah are live now and follow the intended editorial standard."
            : "This state is part of the 50-state footprint. Published benefits will appear here as they are sourced and verified."}
        </p>
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
            Start here in {state.name}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            The help lanes Veterans most commonly need
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredTopics.map((topic) => (
            <ResourceTopicCard key={topic.slug} topic={topic} compact />
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
            <ProviderCard key={provider.id} provider={provider} />
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
