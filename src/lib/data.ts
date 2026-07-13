import { cache } from "react";
import {
  BenefitCategorySlug,
  BenefitRecord,
  ComparisonRow,
  DatabaseBenefitRow,
} from "@/lib/types";
import { hasSupabaseEnv, getSupabaseServerClient } from "@/lib/supabase";
export {
  categories,
  getAllCategorySlugs,
  getAllStateSlugs,
  getCategoryBySlug,
  getNeighborStates,
  getStateBySlug,
  states,
  seedBenefitRecords,
} from "@/lib/seed-data";
import {
  seedBenefitRecords,
  states,
} from "@/lib/seed-data";

function mapRowToBenefitRecord(row: DatabaseBenefitRow): BenefitRecord {
  return {
    id: row.id,
    stateSlug: row.state_slug,
    category: row.category,
    categoryGroup: row.category_group,
    question: row.question,
    summary: row.summary,
    detailMd: row.detail_md,
    status: row.status,
    disabilityThreshold: row.disability_threshold,
    sourceLabel: row.source_label,
    sourceUrl: row.source_url,
    verifiedDate: row.verified_date,
    published: row.published,
    featuredInComparison: row.featured_in_comparison,
  };
}

const getAllBenefits = cache(async (): Promise<BenefitRecord[]> => {
  if (!hasSupabaseEnv()) {
    return seedBenefitRecords;
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from("state_benefits")
      .select("*")
      .order("state_slug", { ascending: true })
      .order("category", { ascending: true })
      .order("id", { ascending: true });

    if (error || !data) {
      return seedBenefitRecords;
    }

    return data.map((row) => mapRowToBenefitRecord(row as DatabaseBenefitRow));
  } catch {
    return seedBenefitRecords;
  }
});

export async function getPublishedBenefitsByState(stateSlug: string) {
  const records = await getAllBenefits();
  return records.filter(
    (record) => record.stateSlug === stateSlug && record.published,
  );
}

export async function getBenefitsForAdmin() {
  return getAllBenefits();
}

export async function getComparisonRows(
  category: BenefitCategorySlug,
): Promise<ComparisonRow[]> {
  const records = await getAllBenefits();

  return states.map((state) => {
    const record = records.find(
      (item) =>
        item.stateSlug === state.slug &&
        item.category === category &&
        item.featuredInComparison,
    );

    if (!record) {
      return {
        stateSlug: state.slug,
        stateName: state.name,
        category,
        published: false,
        summary: "Benefits profile in review.",
      };
    }

    return {
      stateSlug: state.slug,
      stateName: state.name,
      category,
      published: record.published,
      summary: record.summary,
      status: record.status,
      verifiedDate: record.verifiedDate,
      sourceLabel: record.sourceLabel,
      sourceUrl: record.sourceUrl,
    };
  });
}
