import { Metadata } from "next";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import {
  getCoreResourceProviders,
  resourceTopics,
} from "@/lib/resource-data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse the core veteran benefit and support lanes: disability, health care, education, housing, employment, family support, crisis help, and more.",
};

export default function ResourcesPage() {
  const coreProviders = getCoreResourceProviders();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Resources
        </p>
        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          The core benefit and support lanes Veterans actually need.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          The goal is not to bury people in directories. The goal is to make the main help paths visible fast: what benefit lane they need, where to start, and which official provider actually handles it.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {resourceTopics.map((topic) => (
          <ResourceTopicCard key={topic.slug} topic={topic} compact />
        ))}
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Official starting points
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            National providers Veterans use again and again
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {coreProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>
    </div>
  );
}
