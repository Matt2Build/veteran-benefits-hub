import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import {
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

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Resource guide
        </p>
        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {topic.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {topic.description}
        </p>
      </section>

      <section className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,240,228,0.92))] p-8 shadow-[0_20px_70px_rgba(16,33,50,0.10)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          What this guide is for
        </p>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-[color:var(--foreground)]">
          {topic.summary}
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {topic.bullets.map((bullet) => (
            <li
              key={bullet}
              className="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-7 text-[color:var(--muted)]"
            >
              {bullet}
            </li>
          ))}
        </ul>
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
