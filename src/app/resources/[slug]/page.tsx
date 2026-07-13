import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import { notFound } from "next/navigation";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import {
  getFeaturedStatesForResources,
  getAllResourceTopicSlugs,
  getProvidersForTopic,
  getResourceTopicBySlug,
  resourceTopics,
} from "@/lib/resource-data";

export function generateStaticParams() {
  return getAllResourceTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getResourceTopicBySlug(slug);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} guide`,
    description: topic.description,
  };
}

export default async function ResourceGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getResourceTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const providers = getProvidersForTopic(slug);
  const relatedTopics = resourceTopics.filter((item) => item.slug !== topic.slug).slice(0, 4);
  const featuredStates = getFeaturedStatesForResources(6);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Resource guide
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {topic.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            {topic.description}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {topic.quickChecks.map((check) => (
              <div
                key={check}
                className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/78 px-4 py-4 text-sm leading-7 text-[color:var(--muted)] shadow-[0_12px_28px_rgba(16,33,50,0.05)]"
              >
                {check}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2.25rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-6 shadow-[0_30px_80px_rgba(16,33,50,0.10)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Start here
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {topic.heroLabel}
          </h2>
          <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
            {topic.heroSummary}
          </p>
          <div className="mt-6 space-y-3">
            {providers.slice(0, 2).map((provider) => (
              <a
                key={provider.id}
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-4 transition hover:border-[color:rgba(184,144,69,0.45)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {provider.typeLabel}
                </p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
                  {provider.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  {provider.ctaLabel}
                </p>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Official providers
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Start with the official channels
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Use it by state
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Bring this guide back to the state pages that matter to you
          </h2>
        </div>
        <div className="rounded-[2.25rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-6 shadow-[0_28px_70px_rgba(16,33,50,0.08)]">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {featuredStates.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="rounded-[1.35rem] border border-[color:var(--line)] bg-white/82 px-4 py-5 transition hover:border-[color:rgba(184,144,69,0.45)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  {state.code}
                </p>
                <p className="mt-3 text-lg font-semibold text-[color:var(--foreground)]">
                  {state.name}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]">
                  Open state page
                  <MapPinned className="h-4 w-4 text-[color:var(--accent)]" />
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/states"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Browse all state pages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Keep moving
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Related guides Veterans usually need next
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedTopics.map((relatedTopic) => (
            <ResourceTopicCard key={relatedTopic.slug} topic={relatedTopic} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
