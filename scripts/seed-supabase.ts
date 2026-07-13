import { createClient } from "@supabase/supabase-js";
import { seedBenefitRecords } from "../src/lib/seed-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
  );
}

const client = createClient(supabaseUrl, serviceRoleKey);

const rows = seedBenefitRecords.map((record) => ({
  id: record.id,
  state_slug: record.stateSlug,
  category: record.category,
  category_group: record.categoryGroup,
  question: record.question,
  summary: record.summary,
  detail_md: record.detailMd,
  status: record.status,
  disability_threshold: record.disabilityThreshold ?? null,
  source_label: record.sourceLabel ?? null,
  source_url: record.sourceUrl ?? null,
  verified_date: record.verifiedDate ?? null,
  published: record.published,
  featured_in_comparison: record.featuredInComparison,
}));

async function main() {
  const { error } = await client.from("state_benefits").upsert(rows, {
    onConflict: "id",
  });

  if (error) {
    throw error;
  }

  console.log(`Upserted ${rows.length} state benefit rows.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
