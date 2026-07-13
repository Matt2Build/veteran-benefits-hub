import Link from "next/link";
import {
  ArrowRight,
  Database,
  Search,
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
      <section className="relative overflow-hidden rounded-[2.75rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,#0a1017_0%,#101825_44%,#172232_100%)] px-6 py-8 shadow-[0_38px_100px_rgba(8,14,22,0.34)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(191,148,80,0.20),transparent_26%),radial-gradient(circle_at_82%_30%,rgba(191,148,80,0.14),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[radial-gradient(circle_at_center,rgba(191,148,80,0.18),transparent_38%)] lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.03))]" />
        <div className="relative">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/72 shadow-[0_16px_34px_rgba(0,0,0,0.20)] backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-[color:var(--accent)]" />
              Veteran-built. Source-first. Plain English.
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.34em] text-[color:rgba(191,148,80,0.86)]">
              Veteran Benefits Hub
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Thank you for your service.
            </h1>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:rgba(245,247,250,0.94)] sm:text-4xl lg:text-5xl">
              How can we serve you?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/68">
              Start with the problem you need solved. Find the right resource lane first, then move into official providers, verified facts, and state-by-state comparisons without the usual clutter.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
                Disability claims
              </span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
                Health care
              </span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
                Housing
              </span>
              <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
                Family support
              </span>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[1rem] bg-[rgba(191,148,80,0.16)] text-[color:var(--accent)]">
                  <Search className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
                    Start here
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    Search for the kind of help you need
                  </p>
                </div>
              </div>
              <span className="hidden rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:rgba(191,148,80,0.92)] lg:inline-flex">
                One-stop resource entry
              </span>
            </div>

            <ResourceSelector />
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5 text-left shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[color:rgba(191,148,80,0.86)]">
                Verified facts
              </p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-white">
                Published answers keep the source and verification date visible.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5 text-left shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[color:rgba(191,148,80,0.86)]">
                Official channels
              </p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-white">
                Guides point back into VA and other real provider systems, not generic advice loops.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[rgba(191,148,80,0.28)] bg-[linear-gradient(180deg,rgba(191,148,80,0.16),rgba(191,148,80,0.08))] p-5 text-left shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[color:rgba(248,223,174,0.88)]">
                Streamlined path
              </p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-white">
                Resource-first guidance up front, then state-specific policy and comparison data underneath it.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {databaseStats.map((stat) => (
              <DatabaseStatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-[color:var(--navy)] shadow-[0_20px_50px_rgba(191,148,80,0.24)] [&&]:text-[color:var(--navy)] [&_svg]:text-[color:var(--navy)]"
            >
              Browse all resource guides
              <ArrowRight className="h-4 w-4" />
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/compare/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(0,0,0,0.14)] backdrop-blur-xl transition hover:border-[color:rgba(191,148,80,0.46)]"
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
