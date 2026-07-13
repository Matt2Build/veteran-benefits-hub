import Link from "next/link";
import { Metadata } from "next";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare benefits",
  description:
    "Browse the MVP comparison categories for military retirement pay and disabled veteran property tax exemptions.",
};

export default function CompareIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Compare
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Start with the core comparison tables.
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/compare/${category.slug}`}
              className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[0_18px_60px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--accent)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Comparison table
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
                {category.label}
              </h2>
              <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
                {category.compareDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
