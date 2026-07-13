export type BenefitStatus = "full" | "partial" | "none" | "conditional";

export type BenefitCategorySlug =
  | "military-retirement-pay"
  | "property-tax-exemption";

export type BenefitCategoryGroup = "Taxes" | "Housing";

export interface StateDefinition {
  slug: string;
  code: string;
  name: string;
  hasDeepDive?: boolean;
  introMd?: string;
  neighboringStateSlugs?: string[];
}

export interface BenefitCategoryDefinition {
  slug: BenefitCategorySlug;
  label: string;
  shortLabel: string;
  compareTitle: string;
  compareDescription: string;
}

export interface BenefitRecord {
  id: string;
  stateSlug: string;
  category: BenefitCategorySlug;
  categoryGroup: BenefitCategoryGroup;
  question: string;
  summary: string;
  detailMd: string;
  status: BenefitStatus;
  disabilityThreshold?: string | null;
  sourceLabel?: string | null;
  sourceUrl?: string | null;
  verifiedDate?: string | null;
  published: boolean;
  featuredInComparison: boolean;
}

export interface DatabaseBenefitRow {
  id: string;
  state_slug: string;
  category: BenefitCategorySlug;
  category_group: BenefitCategoryGroup;
  question: string;
  summary: string;
  detail_md: string;
  status: BenefitStatus;
  disability_threshold: string | null;
  source_label: string | null;
  source_url: string | null;
  verified_date: string | null;
  published: boolean;
  featured_in_comparison: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ComparisonRow {
  stateSlug: string;
  stateName: string;
  category: BenefitCategorySlug;
  published: boolean;
  summary: string;
  status?: BenefitStatus;
  verifiedDate?: string | null;
  sourceLabel?: string | null;
  sourceUrl?: string | null;
}
