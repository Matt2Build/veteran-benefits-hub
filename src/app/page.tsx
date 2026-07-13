import Link from "next/link";
import {
  ArrowRight,
  Database,
  ShieldCheck,
  TableProperties,
} from "lucide-react";
import { categories } from "@/lib/data";
import { DatabaseStatCard } from "@/components/database-stat-card";
import { ProviderCard } from "@/components/provider-card";
import { ResourceSelector } from "@/components/resource-selector";
import { ResourceTopicCard } from "@/components/resource-topic-card";
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
      <section className="relative overflow-hidden rounded-[2.75rem] border border-[color:var(--line)] bg-[radial-gradient(circle_at_top,rgba(184,144,69,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,240,228,0.94))] p-6 shadow-[0_34px_90px_rgba(16,33,50,0.12)] sm:p-8 lg:p-10">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_center,rgba(18,37,58,0.10),transparent_68%)]" />
        <div className="relative space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-white/78 px-4 py-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.08)]">
            <ShieldCheck className="h-4 w-4 text-[color:var(--accent)]" />
            Veteran-built. Source-first. Plain English.
          </div>
          <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Veteran Benefits Hub
              </p>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
                Thank you for your service.
              </h1>
              <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-[color:var(--navy)] sm:text-4xl">
                How can we serve you?
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Start with the problem you need solved. Disability, health care, housing, education, employment, crisis support, family help, and official providers should be reachable in one step.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[1.75rem] border border-[color:rgba(214,219,226,0.82)] bg-white/78 p-5 shadow-[0_18px_42px_rgba(16,33,50,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Verified facts
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
                  Every published row keeps the source and the verification date visible.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-[color:rgba(214,219,226,0.82)] bg-white/78 p-5 shadow-[0_18px_42px_rgba(16,33,50,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Official channels
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">
                  Guides route users back into VA and other official provider lanes instead of dead ends.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-[color:rgba(214,219,226,0.82)] bg-[linear-gradient(180deg,rgba(18,37,58,0.96),rgba(25,45,66,0.92))] p-5 text-white shadow-[0_22px_54px_rgba(16,33,50,0.18)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                  One-stop path
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-white">
                  Resource-first guidance up front, then state-specific policy and comparison data underneath it.
                </p>
              </div>
            </div>
          </div>

          <ResourceSelector />

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
              Browse all resource guides
              <ArrowRight className="h-4 w-4" />
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
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--navy)]">
            <Database className="h-3.5 w-3.5 text-[color:var(--accent)]" />
            Structure before scale
          </div>
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
