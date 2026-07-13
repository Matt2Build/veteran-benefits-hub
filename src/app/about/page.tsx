import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Veteran Benefits Hub approaches clarity, inclusion, and source-based verification for every published benefits fact.",
};

export default function AboutPage() {
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
              Placeholder for the founder story. The site is positioned as veteran-built, grounded in hands-on experience, and focused on practical clarity over directory sprawl.
            </p>
          </article>
        </section>

        <section className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-8 shadow-[0_16px_48px_rgba(16,33,50,0.08)]">
          <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
            Accuracy methodology
          </h2>
          <ul className="mt-5 space-y-4 text-base leading-8 text-[color:var(--muted)]">
            <li>Every published fact links to an official source.</li>
            <li>Every published fact shows when it was last verified.</li>
            <li>Unverified or in-progress state records remain unpublished and are visibly marked as coming soon.</li>
            <li>The admin review queue is designed to surface records that are more than six months old or never verified.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
