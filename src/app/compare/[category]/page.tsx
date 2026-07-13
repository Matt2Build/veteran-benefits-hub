import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonExplorer } from "@/components/comparison-explorer";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getComparisonRows,
} from "@/lib/data";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return {};
  }

  return {
    title: category.compareTitle,
    description: category.compareDescription,
  };
}

export default async function CompareCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  const rows = await getComparisonRows(category.slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Comparison table
        </p>
        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {category.compareTitle}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {category.compareDescription}
        </p>
      </section>

      <ComparisonExplorer rows={rows} categoryLabel={category.label} />
    </div>
  );
}
