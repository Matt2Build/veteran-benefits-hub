import Link from "next/link";
import { ArrowRight, Database, ShieldCheck, TableProperties } from "lucide-react";
import { HomeStateMap } from "@/components/home-state-map";
import { categories } from "@/lib/data";
import { getDatabaseStats } from "@/lib/catalog-data";

export default function HomePage() {
  const databaseStats = getDatabaseStats();
  const primaryStats = databaseStats.slice(0, 4);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(135deg,#0a1017_0%,#101825_46%,#172232_100%)] px-6 py-5 shadow-[0_38px_100px_rgba(8,14,22,0.34)] sm:px-8 lg:px-10 lg:py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(191,148,80,0.20),transparent_26%),radial-gradient(circle_at_82%_30%,rgba(191,148,80,0.14),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[24rem] bg-[radial-gradient(circle_at_center,rgba(191,148,80,0.16),transparent_42%)]" />

        <div className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/72 shadow-[0_16px_34px_rgba(0,0,0,0.20)] backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-[color:var(--accent)]" />
              Veteran-built. Source-first. Plain English.
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[4.2rem] lg:leading-[0.95]">
              Thank you for your service.
            </h1>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[color:rgba(245,247,250,0.94)] sm:text-4xl lg:text-[2.9rem] lg:leading-[1.02]">
              How can we serve you?
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-white/68 sm:text-lg">
              Pick your state to move straight into benefits, official providers, and the state-specific help paths that matter most.
            </p>
          </div>

          <div className="mx-auto mt-5 max-w-6xl rounded-[2.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-5 lg:p-5">
            <HomeStateMap />
          </div>

          <div className="mx-auto mt-4 grid max-w-6xl gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {primaryStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3 text-left shadow-[0_14px_32px_rgba(0,0,0,0.14)] backdrop-blur-xl"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:rgba(191,148,80,0.82)]">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <p className="text-xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="pb-0.5 text-[11px] leading-5 text-white/58">
                    {stat.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-3 flex max-w-6xl flex-wrap justify-center gap-2">
            <Link
              href="/states"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-[color:var(--navy)] shadow-[0_20px_50px_rgba(191,148,80,0.24)] [&&]:text-[color:var(--navy)] [&_svg]:text-[color:var(--navy)]"
            >
              Browse all states
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(0,0,0,0.14)] backdrop-blur-xl transition hover:border-[color:rgba(191,148,80,0.46)]"
            >
              <Database className="h-4 w-4 text-[color:var(--accent)]" />
              Resource guides
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/compare/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(0,0,0,0.14)] backdrop-blur-xl transition hover:border-[color:rgba(191,148,80,0.46)]"
              >
                <TableProperties className="h-4 w-4 text-[color:var(--accent)]" />
                {category.shortLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <article className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/82 px-4 py-3 shadow-[0_14px_32px_rgba(16,33,50,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Verified facts
          </p>
          <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)] sm:text-base">
            Published rows keep the answer, source, and verification date visible.
          </p>
        </article>
        <article className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/82 px-4 py-3 shadow-[0_14px_32px_rgba(16,33,50,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Official channels
          </p>
          <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)] sm:text-base">
            Guides route people back into real provider systems, not generic advice loops.
          </p>
        </article>
        <article className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/82 px-4 py-3 shadow-[0_14px_32px_rgba(16,33,50,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Streamlined path
          </p>
          <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)] sm:text-base">
            State selection first, then benefits, providers, and comparisons underneath it.
          </p>
        </article>
      </section>
    </div>
  );
}
