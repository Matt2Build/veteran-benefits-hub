import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import {
  getFeaturedStatesForResources,
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
  const featuredStates = getFeaturedStatesForResources(8);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-stretch">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Resources
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
            The core benefit and support lanes Veterans actually need.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            The goal is not to bury people in directories. The goal is to make the main help paths visible fast: what lane they need, which provider handles it, and where state-specific answers start to matter.
          </p>
        </div>
        <div className="rounded-[2.25rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-6 shadow-[0_30px_80px_rgba(16,33,50,0.10)]">
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-[1.25rem] bg-[color:rgba(184,144,69,0.14)] text-[color:var(--navy)]">
              <MapPinned className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Browse by state
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Every guide should still connect back to a real state page.
              </h2>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {featuredStates.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="rounded-[1rem] border border-[color:var(--line)] bg-white/82 px-3 py-4 text-center text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:rgba(184,144,69,0.45)]"
              >
                {state.code}
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
            <ProviderCard key={provider.id} provider={provider} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
