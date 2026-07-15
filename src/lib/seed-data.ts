import {
  BenefitCategoryDefinition,
  BenefitCategorySlug,
  BenefitRecord,
  StateDefinition,
} from "@/lib/types";
import generatedStateBenefits from "@/lib/generated-state-benefits.json";

export const states: StateDefinition[] = [
  { slug: "alabama", code: "AL", name: "Alabama" },
  { slug: "alaska", code: "AK", name: "Alaska" },
  { slug: "arizona", code: "AZ", name: "Arizona" },
  { slug: "arkansas", code: "AR", name: "Arkansas" },
  { slug: "california", code: "CA", name: "California" },
  { slug: "colorado", code: "CO", name: "Colorado" },
  { slug: "connecticut", code: "CT", name: "Connecticut" },
  { slug: "delaware", code: "DE", name: "Delaware" },
  { slug: "florida", code: "FL", name: "Florida" },
  { slug: "georgia", code: "GA", name: "Georgia" },
  { slug: "hawaii", code: "HI", name: "Hawaii" },
  { slug: "idaho", code: "ID", name: "Idaho" },
  { slug: "illinois", code: "IL", name: "Illinois" },
  { slug: "indiana", code: "IN", name: "Indiana" },
  { slug: "iowa", code: "IA", name: "Iowa" },
  { slug: "kansas", code: "KS", name: "Kansas" },
  { slug: "kentucky", code: "KY", name: "Kentucky" },
  { slug: "louisiana", code: "LA", name: "Louisiana" },
  { slug: "maine", code: "ME", name: "Maine" },
  { slug: "maryland", code: "MD", name: "Maryland" },
  { slug: "massachusetts", code: "MA", name: "Massachusetts" },
  { slug: "michigan", code: "MI", name: "Michigan" },
  { slug: "minnesota", code: "MN", name: "Minnesota" },
  { slug: "mississippi", code: "MS", name: "Mississippi" },
  { slug: "missouri", code: "MO", name: "Missouri" },
  { slug: "montana", code: "MT", name: "Montana" },
  { slug: "nebraska", code: "NE", name: "Nebraska" },
  { slug: "nevada", code: "NV", name: "Nevada" },
  { slug: "new-hampshire", code: "NH", name: "New Hampshire" },
  { slug: "new-jersey", code: "NJ", name: "New Jersey" },
  { slug: "new-mexico", code: "NM", name: "New Mexico" },
  { slug: "new-york", code: "NY", name: "New York" },
  { slug: "north-carolina", code: "NC", name: "North Carolina" },
  { slug: "north-dakota", code: "ND", name: "North Dakota" },
  { slug: "ohio", code: "OH", name: "Ohio" },
  { slug: "oklahoma", code: "OK", name: "Oklahoma" },
  { slug: "oregon", code: "OR", name: "Oregon" },
  { slug: "pennsylvania", code: "PA", name: "Pennsylvania" },
  { slug: "rhode-island", code: "RI", name: "Rhode Island" },
  { slug: "south-carolina", code: "SC", name: "South Carolina" },
  { slug: "south-dakota", code: "SD", name: "South Dakota" },
  { slug: "tennessee", code: "TN", name: "Tennessee" },
  { slug: "texas", code: "TX", name: "Texas" },
  {
    slug: "utah",
    code: "UT",
    name: "Utah",
    hasDeepDive: true,
    neighboringStateSlugs: [
      "idaho",
      "wyoming",
      "colorado",
      "new-mexico",
      "arizona",
      "nevada",
    ],
    introMd:
      "Utah is the MVP deep-dive state. Published records here are meant to show the finished editorial standard: a direct answer, a source link, and an explicit verification date on every live fact.",
  },
  { slug: "vermont", code: "VT", name: "Vermont" },
  { slug: "virginia", code: "VA", name: "Virginia" },
  { slug: "washington", code: "WA", name: "Washington" },
  { slug: "west-virginia", code: "WV", name: "West Virginia" },
  { slug: "wisconsin", code: "WI", name: "Wisconsin" },
  { slug: "wyoming", code: "WY", name: "Wyoming" },
];

export const categories: BenefitCategoryDefinition[] = [
  {
    slug: "military-retirement-pay",
    label: "Military retirement pay",
    shortLabel: "Retirement pay",
    compareTitle: "Military retirement pay by state",
    compareDescription:
      "Compare how each state handles military retirement pay, with a direct answer, source link, and verification date for every live row.",
  },
  {
    slug: "property-tax-exemption",
    label: "Disabled veteran property tax exemption",
    shortLabel: "Property tax",
    compareTitle: "Disabled veteran property tax exemptions by state",
    compareDescription:
      "Compare state-level disabled veteran property tax relief, with clear status badges, source links, and verification dates.",
  },
];

const utahPublishedBenefits: BenefitRecord[] = [
  {
    id: "utah-military-retirement-pay",
    stateSlug: "utah",
    category: "military-retirement-pay",
    categoryGroup: "Taxes",
    question: "Does Utah tax military retirement pay?",
    summary:
      "Utah taxes military retirement pay, but eligible filers can claim a nonrefundable Military Retirement Credit.",
    detailMd:
      "Utah residents include military retirement pay in Utah taxable income. The state offers a Military Retirement Credit for taxable military retirement pay included in federal adjusted gross income. The credit is claimed on the Utah individual return schedule TC-40A using code AJ.",
    status: "partial",
    sourceLabel: "Utah military retirement credit",
    sourceUrl: "https://tax.utah.gov/individuals/retirees-seniors/",
    verifiedDate: "2026-07-13",
    published: true,
    featuredInComparison: true,
  },
  {
    id: "utah-disabled-veteran-property-tax",
    stateSlug: "utah",
    category: "property-tax-exemption",
    categoryGroup: "Housing",
    question: "What property tax exemption do disabled veterans get in Utah?",
    summary:
      "Veterans with at least a 10% service-connected disability can exempt up to $535,459 of taxable value, scaled by disability percentage and unemployability classification.",
    detailMd:
      "Utah's exemption applies to a residence and may also be used for tangible personal property such as motor vehicles. No exemption is allowed below 10% disability. The first application must include proof of military service and proof of disability, and it is filed with the county where the property is located.",
    status: "conditional",
    disabilityThreshold: "10%+ service-connected disability",
    sourceLabel: "Utah Pub 36 property tax relief",
    sourceUrl: "https://tax.utah.gov/forms-pubs/pub-36/",
    verifiedDate: "2026-07-13",
    published: true,
    featuredInComparison: true,
  },
  {
    id: "utah-active-duty-property-tax",
    stateSlug: "utah",
    category: "property-tax-exemption",
    categoryGroup: "Housing",
    question:
      "Does Utah offer a property tax exemption for active-duty or reserve service members?",
    summary:
      "Yes. Some active-duty and reserve members can exempt the full taxable value of a primary residence after qualifying service outside Utah.",
    detailMd:
      "The exemption applies to active or reserve members of the U.S. Armed Forces who were on active duty outside Utah for 200 days in a continuous 365-day period beginning in the prior year. Applications are due by September 1 of the year after the qualifying service period and must include military orders.",
    status: "conditional",
    sourceLabel: "Utah Pub 36 active or reserve duty exemption",
    sourceUrl: "https://tax.utah.gov/forms-pubs/pub-36/",
    verifiedDate: "2026-07-13",
    published: true,
    featuredInComparison: false,
  },
];

export const seedBenefitRecords = [
  ...(generatedStateBenefits as BenefitRecord[]).filter(
    (benefit) => benefit.stateSlug !== "utah",
  ),
  ...utahPublishedBenefits,
];

const stateMap = new Map(states.map((state) => [state.slug, state]));
const categoryMap = new Map(categories.map((category) => [category.slug, category]));

export function getStateBySlug(slug: string) {
  return stateMap.get(slug);
}

export function getCategoryBySlug(slug: string) {
  return categoryMap.get(slug as BenefitCategorySlug);
}

export function getAllStateSlugs() {
  return states.map((state) => state.slug);
}

export function getAllCategorySlugs() {
  return categories.map((category) => category.slug);
}

export function getNeighborStates(stateSlug: string) {
  const state = getStateBySlug(stateSlug);
  if (!state?.neighboringStateSlugs?.length) {
    return [];
  }

  return state.neighboringStateSlugs
    .map((slug) => getStateBySlug(slug))
    .filter((item): item is StateDefinition => Boolean(item));
}
