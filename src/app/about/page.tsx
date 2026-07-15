import { Metadata } from "next";
import Link from "next/link";
import { DatabaseStatCard } from "@/components/database-stat-card";
import { getDatabaseStats } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Veteran Benefits Hub approaches clarity, inclusion, and source-based verification for every published benefits fact.",
};

export default function AboutPage() {
  const stats = getDatabaseStats();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="space-y-12">
        <section className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            About
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
            A clearer way to understand veteran benefits.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            Veteran Benefits Hub exists to reduce confusion. The goal is not to replicate large, sprawling resource portals. The goal is to answer the question in front of the user, show the source, and make the answer easy to verify.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_16px_48px_rgba(16,33,50,0.08)]">
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
              Mission
            </h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
              Help U.S. military veterans, transitioning service members, and military spouses understand what state-level benefits they may be entitled to without making them dig through outdated or contradictory pages.
            </p>
          </article>
          <article className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_16px_48px_rgba(16,33,50,0.08)]">
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
              Founder story
            </h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
              Built from first-hand experience navigating the benefits system, the site is designed to stay practical: answer the next real question, show the official source, and keep the path forward obvious for veterans and their families.
            </p>
          </article>
        </section>

        <section className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Current databases
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
              The site is being built as a structured database, not just a content site
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <DatabaseStatCard key={stat.label} stat={stat} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/states"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-5 py-3 text-sm font-semibold text-white"
            >
              Browse state database
            </Link>
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/82 px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]"
            >
              Browse provider database
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-8 shadow-[0_16px_48px_rgba(16,33,50,0.08)]">
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
            Accuracy methodology
          </h2>
          <ul className="mt-5 space-y-4 text-base leading-8 text-[color:var(--muted)]">
            <li>Every published fact links to an official source.</li>
            <li>Every published fact shows when it was last verified.</li>
            <li>Records that are still under review remain unpublished until the answer, source, and verification date are complete.</li>
            <li>The admin review queue is designed to surface records that are more than six months old or never verified.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
