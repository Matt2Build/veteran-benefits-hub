import Link from "next/link";
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  TableProperties,
} from "lucide-react";
import { categories } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import { StateSelector } from "@/components/state-selector";
import {
  getCoreResourceProviders,
  resourceTopics,
} from "@/lib/resource-data";

export default function HomePage() {
  const coreProviders = getCoreResourceProviders();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.08)]">
            <ShieldCheck className="h-4 w-4 text-[color:var(--accent)]" />
            Veteran-built. Source-first. Plain English.
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Veteran Benefits Hub
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-6xl">
              A one-stop veteran benefits and resource hub, built to be usable.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Built by a veteran who has navigated this system firsthand. The mission is bigger than tax tables: benefits, health care, education, housing, caregiver help, mental health support, and the official providers Veterans actually need.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(16,33,50,0.18)]"
            >
              <Compass className="h-4 w-4" />
              Browse resource hub
            </Link>
            <Link
              href="/states"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-[0_12px_32px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--accent)]"
            >
              <TableProperties className="h-4 w-4 text-[color:var(--accent)]" />
              Browse all states
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/compare/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-[0_12px_32px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--accent)]"
              >
                <TableProperties className="h-4 w-4 text-[color:var(--accent)]" />
                {category.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,240,228,0.92))] p-6 shadow-[0_32px_80px_rgba(16,33,50,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Start with a state
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Pick a state, then move into benefits, support, and official providers.
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Every state page should help with something right away, even while the state-specific benefits data is still being expanded.
          </p>
          <div className="mt-6">
            <StateSelector />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Resource lanes
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Make the help paths obvious
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resourceTopics.map((topic) => (
            <ResourceTopicCard key={topic.slug} topic={topic} compact />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Official providers
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            The providers most Veterans end up needing
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {coreProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            What matters
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Specific answers
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Veterans should be able to answer concrete questions fast, not reverse engineer the system from scattered PDFs and old blog posts.
          </p>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Why trust it
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            Provenance stays visible
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Verified dates and source links remain part of the brand. The directory layer should add clarity, not dilute trust.
          </p>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Build direction
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
            State-by-state plus provider-by-provider
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            The site should become useful in two ways at once: state-specific policy comparisons and clear provider guides for the national systems Veterans use everywhere.
          </p>
          <Link
            href="/resources"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Open the resource hub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </section>
    </div>
  );
}
