import { getStateResourceEntries, resourceProviders, resourceTopics } from "@/lib/resource-data";
import { categories, seedBenefitRecords, states } from "@/lib/seed-data";

export interface DatabaseStat {
  label: string;
  value: string;
  description: string;
}

export interface StateCatalogEntry {
  stateSlug: string;
  stateCode: string;
  stateName: string;
  trackedBenefitCount: number;
  publishedBenefitCount: number;
  resourceGuideCount: number;
  compareCategoryCount: number;
  statusLabel: string;
  statusTone: "live" | "building";
  hasDeepDive: boolean;
}

export interface ProviderDirectoryGroup {
  id: string;
  title: string;
  description: string;
  providerIds: string[];
}

export const providerDirectoryGroups: ProviderDirectoryGroup[] = [
  {
    id: "core-benefits",
    title: "Core benefits",
    description:
      "The main federal programs Veterans usually need first when the question is about compensation, care, or education.",
    providerIds: ["va-disability", "va-health-care", "va-education", "va-vre"],
  },
  {
    id: "housing-family",
    title: "Housing and family support",
    description:
      "Programs that support home stability, caregiving, and the family systems around the Veteran.",
    providerIds: ["va-housing", "va-caregiver", "women-vets"],
  },
  {
    id: "later-life-and-navigation",
    title: "Navigation, crisis, and later-life support",
    description:
      "The providers Veterans use when they need representation, urgent support, or later-life planning.",
    providerIds: ["va-vso", "vcl", "va-pension", "va-burial", "va-locations"],
  },
];

export function getDatabaseStats(): DatabaseStat[] {
  const publishedBenefits = seedBenefitRecords.filter((record) => record.published);

  return [
    {
      label: "States tracked",
      value: String(states.length),
      description: "Every state already has a page in the footprint.",
    },
    {
      label: "Resource guides",
      value: String(resourceTopics.length),
      description: "Guide-first help lanes built around common Veteran needs.",
    },
    {
      label: "Official providers",
      value: String(resourceProviders.length),
      description: "National providers and directories linked from the site.",
    },
    {
      label: "Published state facts",
      value: String(publishedBenefits.length),
      description: "Live seeded benefit records with visible sources and dates.",
    },
  ];
}

export function getStateCatalogEntries(): StateCatalogEntry[] {
  return states.map((state) => {
    const trackedBenefitCount = seedBenefitRecords.filter(
      (record) => record.stateSlug === state.slug,
    ).length;
    const publishedBenefitCount = seedBenefitRecords.filter(
      (record) => record.stateSlug === state.slug && record.published,
    ).length;
    const resourceGuideCount = getStateResourceEntries(state.slug).length;
    const compareCategoryCount = categories.length;

    return {
      stateSlug: state.slug,
      stateCode: state.code,
      stateName: state.name,
      trackedBenefitCount,
      publishedBenefitCount,
      resourceGuideCount,
      compareCategoryCount,
      statusLabel: state.hasDeepDive
        ? "Flagship deep dive live"
        : publishedBenefitCount
          ? "Published facts live"
          : "Benefits database in progress",
      statusTone: publishedBenefitCount ? "live" : "building",
      hasDeepDive: Boolean(state.hasDeepDive),
    };
  });
}

export function getStateCatalogEntryBySlug(stateSlug: string) {
  return getStateCatalogEntries().find((entry) => entry.stateSlug === stateSlug);
}

export function getProviderDirectoryRecords() {
  return providerDirectoryGroups.map((group) => ({
    ...group,
    providers: group.providerIds
      .map((providerId) =>
        resourceProviders.find((provider) => provider.id === providerId),
      )
      .filter(Boolean),
  }));
}
