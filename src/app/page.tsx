import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Database,
  MapPinned,
  ShieldCheck,
  TableProperties,
} from "lucide-react";
import { categories } from "@/lib/data";
import { DatabaseStatCard } from "@/components/database-stat-card";
import { ProviderCard } from "@/components/provider-card";
import { ResourceTopicCard } from "@/components/resource-topic-card";
import { StateSelector } from "@/components/state-selector";
import { getDatabaseStats } from "@/lib/catalog-data";
import {
  getFeaturedResourceTopics,
  getCoreResourceProviders,
} from "@/lib/resource-data";

export default function HomePage() {
  const coreProviders = getCoreResourceProviders().slice(0, 4);
  const featuredTopics = getFeaturedResourceTopics();
  const databaseStats = getDatabaseStats();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-stretch">
        <div className="space-y-8 py-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-white/75 px-4 py-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.08)]">
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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {databaseStats.map((stat) => (
              <DatabaseStatCard key={stat.label} stat={stat} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(16,33,50,0.18)] [&&]:text-white [&_svg]:text-white"
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

        <div className="overflow-hidden rounded-[2.5rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,243,232,0.94))] p-6 shadow-[0_34px_90px_rgba(16,33,50,0.12)] lg:p-7">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Start with a state
              </p>
              <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Pick a state and move directly into benefits, guides, and official providers.
              </h2>
              <p className="max-w-lg text-base leading-7 text-[color:var(--muted)]">
                Every state page starts with the same core help map, then layers in verified state facts as the policy database goes live.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-[color:rgba(184,144,69,0.08)] p-4">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-[color:var(--accent)]" />
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    Structured guide data across all major support lanes
                  </p>
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/80 p-4">
                <div className="flex items-center gap-3">
                  <MapPinned className="h-5 w-5 text-[color:var(--accent)]" />
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">
                    State pages tied to compare views, providers, and next-step guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[color:rgba(214,219,226,0.72)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,250,242,0.72))] p-5">
              <StateSelector />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.96))] p-6 shadow-[0_18px_56px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            State database
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            50 pages with one structure
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Every state page is built to hold verified facts, support lanes, compare links, and official providers in one usable place.
          </p>
          <Link
            href="/states"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Browse state database
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.96))] p-6 shadow-[0_18px_56px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Guide database
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Help paths organized by real needs
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Disability, health care, housing, education, employment, crisis support, family help, and later-life planning each have their own lane.
          </p>
          <Link
            href="/resources"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Browse guide database
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.96))] p-6 shadow-[0_18px_56px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Provider database
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Official channels surfaced first
          </h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            The provider directory keeps the main federal systems visible, so users can get to the right program instead of circling through generic advice.
          </p>
          <Link
            href="/providers"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Browse provider database
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
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
          {featuredTopics.map((topic) => (
            <ResourceTopicCard key={topic.slug} topic={topic} compact />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Databases
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Browse the official provider database behind the guides
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {coreProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} compact />
          ))}
        </div>
        <div>
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]"
          >
            Open the full provider database
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-white/82 p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
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
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-white/82 p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
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
        <article className="rounded-[2rem] border border-[color:var(--line)] bg-white/82 p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
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
