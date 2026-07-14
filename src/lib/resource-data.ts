import { categories, getStateBySlug, states } from "@/lib/seed-data";
import { BenefitCategorySlug } from "@/lib/types";

export interface ResourceProvider {
  id: string;
  name: string;
  description: string;
  href: string;
  ctaLabel: string;
  audience: string;
  typeLabel: string;
  highlights: string[];
}

export interface ResourceTopic {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  icon: string;
  providerIds: string[];
  bullets: string[];
  quickChecks: string[];
  heroLabel: string;
  heroSummary: string;
  compareCategorySlugs: BenefitCategorySlug[];
}

export interface StateResourceEntry {
  id: string;
  stateSlug: string;
  topicSlug: string;
  title: string;
  summary: string;
  quickChecks: string[];
  providerIds: string[];
  compareCategorySlugs: BenefitCategorySlug[];
}

const nationalResourceProviders: ResourceProvider[] = [
  {
    id: "va-disability",
    name: "VA disability compensation",
    description:
      "The primary official path for service-connected disability claims, evidence, ratings, and appeals.",
    href: "https://www.va.gov/disability/how-to-file-claim/",
    ctaLabel: "Open disability compensation",
    audience: "Veterans with service-connected conditions",
    typeLabel: "Official VA benefit program",
    highlights: [
      "New, supplemental, and increase claims",
      "Claim status and supporting evidence",
      "Ratings and monthly compensation",
    ],
  },
  {
    id: "va-health-care",
    name: "VA health care",
    description:
      "The main enrollment and care-access entry point for Veterans seeking VA medical coverage.",
    href: "https://www.va.gov/health-care/how-to-apply/",
    ctaLabel: "Open VA health care",
    audience: "Veterans seeking VA medical care",
    typeLabel: "Official VA care program",
    highlights: [
      "Apply for coverage",
      "Review eligibility basics",
      "Understand how care access works",
    ],
  },
  {
    id: "va-education",
    name: "GI Bill and education benefits",
    description:
      "The official education starting point for GI Bill, school funding, and training support.",
    href: "https://www.va.gov/education/how-to-apply/",
    ctaLabel: "Open education benefits",
    audience: "Veterans, service members, and dependents",
    typeLabel: "Official VA education program",
    highlights: [
      "GI Bill applications",
      "School and training benefits",
      "Dependent and survivor education options",
    ],
  },
  {
    id: "va-vre",
    name: "Veteran Readiness and Employment",
    description:
      "Employment planning, training, accommodations, and long-range career support tied to disability.",
    href: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
    ctaLabel: "Open VR&E",
    audience: "Veterans whose disabilities affect work",
    typeLabel: "Official VA employment program",
    highlights: [
      "Career planning and training",
      "Education aligned to work goals",
      "Employment barriers tied to disability",
    ],
  },
  {
    id: "va-housing",
    name: "VA housing assistance",
    description:
      "The official housing lane for home loans, adaptive housing, and homelessness-related help.",
    href: "https://www.va.gov/housing-assistance/",
    ctaLabel: "Open housing assistance",
    audience: "Veterans buying homes or facing housing instability",
    typeLabel: "Official VA housing program",
    highlights: [
      "VA-backed home loans",
      "Adaptive housing and grant programs",
      "Housing instability and homelessness support",
    ],
  },
  {
    id: "va-caregiver",
    name: "VA caregiver support",
    description:
      "The primary caregiver support path for families supporting a Veteran with significant needs.",
    href: "https://www.va.gov/family-and-caregiver-benefits/health-and-disability/comprehensive-assistance-for-family-caregivers/",
    ctaLabel: "Open caregiver support",
    audience: "Family caregivers and military spouses",
    typeLabel: "Official VA family support program",
    highlights: [
      "Caregiver program details",
      "Eligibility and application steps",
      "Family support around medical needs",
    ],
  },
  {
    id: "va-pension",
    name: "VA pension benefits",
    description:
      "The official income-based benefit path for qualifying wartime Veterans and some survivors.",
    href: "https://www.va.gov/pension/",
    ctaLabel: "Open pension benefits",
    audience: "Wartime Veterans and some survivors",
    typeLabel: "Official VA income support program",
    highlights: [
      "Pension eligibility",
      "Income and net worth rules",
      "Survivor and later-life support paths",
    ],
  },
  {
    id: "va-burial",
    name: "Burial and memorial benefits",
    description:
      "The official source for burial allowances, memorial items, and planning ahead.",
    href: "https://www.va.gov/burials-memorials/",
    ctaLabel: "Open burial and memorial benefits",
    audience:
      "Veterans and family members planning ahead or handling time-of-need",
    typeLabel: "Official VA memorial program",
    highlights: [
      "Burial allowances",
      "Memorial items and cemetery support",
      "Planning ahead for later-life needs",
    ],
  },
  {
    id: "va-vso",
    name: "VA-accredited representatives and VSOs",
    description:
      "The official directory for accredited claims help, representation, and appeal support.",
    href: "https://www.va.gov/get-help-from-accredited-representative/find-rep/",
    ctaLabel: "Find accredited help",
    audience: "Veterans who want help filing, reviewing, or appealing",
    typeLabel: "Official VA directory",
    highlights: [
      "Find an accredited representative",
      "Use help before filing or appealing",
      "Avoid relying on unvetted claims assistance",
    ],
  },
  {
    id: "va-locations",
    name: "VA locations",
    description:
      "The official location finder for hospitals, clinics, Vet Centers, regional offices, and cemeteries.",
    href: "https://www.va.gov/find-locations/",
    ctaLabel: "Find VA locations",
    audience: "Anyone trying to find in-person VA services",
    typeLabel: "Official VA directory",
    highlights: [
      "Hospitals and clinics",
      "Regional offices and Vet Centers",
      "In-person help close to home",
    ],
  },
  {
    id: "vcl",
    name: "Veterans Crisis Line",
    description:
      "The immediate 24/7 crisis support entry point for Veterans, service members, and families.",
    href: "https://www.veteranscrisisline.net/",
    ctaLabel: "Open crisis support",
    audience: "Veterans, service members, families, and friends in crisis",
    typeLabel: "Immediate support line",
    highlights: [
      "24/7 phone, chat, and text help",
      "Works even if you are not enrolled in VA care",
      "Fastest path when mental health support cannot wait",
    ],
  },
  {
    id: "women-vets",
    name: "Women Veterans Call Center",
    description:
      "A dedicated entry point for navigating benefits, care, and women Veterans services.",
    href: "https://www.womenshealth.va.gov/wvcc.asp",
    ctaLabel: "Open Women Veterans support",
    audience: "Women Veterans and families",
    typeLabel: "Dedicated support line",
    highlights: [
      "Women Veterans benefits navigation",
      "Care and access questions",
      "A human starting point when the system feels unclear",
    ],
  },
];

function buildStateBenefitsDirectoryProvider(stateSlug: string) {
  const state = getStateBySlug(stateSlug);
  if (!state) {
    return null;
  }

  const statePath = state.name.replaceAll(" ", "-");

  return {
    id: `${state.slug}-benefits-directory`,
    name: `${state.name} military and veterans benefits`,
    description:
      `Official ${state.name} benefits directory covering statewide tax, education, employment, housing, and service-member support programs.`,
    href: `https://myarmybenefits.us.army.mil/Benefit-Library/State/Territory-Benefits/${statePath}`,
    ctaLabel: `Open ${state.name} benefits directory`,
    audience: `Veterans and families in ${state.name}`,
    typeLabel: "Official state benefits directory",
    highlights: [
      "State-specific benefit programs",
      "Official links grouped by category",
      "A fast way to confirm what exists in-state",
    ],
  } satisfies ResourceProvider;
}

function buildStateResourceLocatorProvider(stateSlug: string) {
  const state = getStateBySlug(stateSlug);
  if (!state) {
    return null;
  }

  const statePath = state.name.replaceAll(" ", "-");

  return {
    id: `${state.slug}-resource-locator`,
    name: `${state.name} military resource locator`,
    description:
      `Official ${state.name} resource locator that points Veterans and families toward local offices, support programs, and nearby assistance channels.`,
    href: `https://myarmybenefits.us.army.mil/Benefit-Library/Resource-Locator/${statePath}`,
    ctaLabel: `Open ${state.name} resource locator`,
    audience: `Anyone trying to find in-state help in ${state.name}`,
    typeLabel: "Official in-state resource finder",
    highlights: [
      "Local offices and support contacts",
      "In-state program and agency links",
      "Useful when the next step needs to be local, not generic",
    ],
  } satisfies ResourceProvider;
}

const stateResourceProviders = states.flatMap((state) => {
  const benefitsDirectory = buildStateBenefitsDirectoryProvider(state.slug);
  const resourceLocator = buildStateResourceLocatorProvider(state.slug);

  return [benefitsDirectory, resourceLocator].filter(
    (provider): provider is ResourceProvider => Boolean(provider),
  );
});

export const resourceProviders: ResourceProvider[] = [
  ...nationalResourceProviders,
  ...stateResourceProviders,
];

export const resourceTopics: ResourceTopic[] = [
  {
    slug: "disability-claims",
    title: "Disability claims and ratings",
    shortTitle: "Disability",
    description:
      "Service-connected disability claims, ratings, evidence, appeals, and compensation questions.",
    summary:
      "File a claim, understand eligibility, track your rating, and get accredited help before you miss a step.",
    icon: "shield",
    providerIds: ["va-disability", "va-vso"],
    bullets: [
      "Start a new claim or supplemental claim.",
      "Understand rating decisions and what drives compensation.",
      "Find an accredited VSO before filing or appealing.",
    ],
    quickChecks: [
      "Do you need to file, increase, or appeal?",
      "Do you already have medical evidence or service records?",
      "Would accredited help speed this up?",
    ],
    heroLabel: "Compensation, evidence, and appeals",
    heroSummary:
      "This is the lane for Veterans trying to turn service-connected conditions into a claim that is complete, defensible, and easier to move through the system.",
    compareCategorySlugs: ["property-tax-exemption"],
  },
  {
    slug: "health-care",
    title: "Health care, clinics, and ongoing treatment",
    shortTitle: "Health care",
    description:
      "Enrollment, eligibility, VA facilities, mental health access, and how to get care started fast.",
    summary:
      "Figure out whether you qualify, apply for coverage, and find the nearest VA facility or Vet Center.",
    icon: "heart",
    providerIds: ["va-health-care", "va-locations"],
    bullets: [
      "Apply for VA health care.",
      "Check eligibility basics and where to get care.",
      "Find the right clinic, regional office, or Vet Center near you.",
    ],
    quickChecks: [
      "Do you need enrollment or just a facility?",
      "Are you looking for general care or mental health access?",
      "Do you need a nearby in-person office today?",
    ],
    heroLabel: "Enrollment, locations, and care access",
    heroSummary:
      "Veterans usually need three things here: whether they qualify, how to get enrolled, and where the nearest real care access point is.",
    compareCategorySlugs: [],
  },
  {
    slug: "education-training",
    title: "Education, GI Bill, and training",
    shortTitle: "Education",
    description:
      "GI Bill, other education benefits, school planning, and training paths that lead to a job.",
    summary:
      "Use GI Bill and related education benefits to pay for school, certifications, apprenticeships, or job training.",
    icon: "graduation",
    providerIds: ["va-education", "va-vre"],
    bullets: [
      "Apply for GI Bill and related education benefits.",
      "Compare education and training paths.",
      "Use VR&E if disability affects your work or school plan.",
    ],
    quickChecks: [
      "Do you need school funding or career-aligned training?",
      "Would VR&E fit better than a standard GI Bill path?",
      "Are you trying to translate education into employment quickly?",
    ],
    heroLabel: "School funding and job-aligned training",
    heroSummary:
      "This guide is for Veterans trying to turn benefits into credentials, training, and a faster route into stable work.",
    compareCategorySlugs: [],
  },
  {
    slug: "housing-homelessness",
    title: "Housing, home loans, and homelessness support",
    shortTitle: "Housing",
    description:
      "Home buying, housing grants, rental stability, and urgent support if housing is at risk.",
    summary:
      "Find the right starting point for VA-backed home loans, disability housing grants, or homelessness prevention.",
    icon: "home",
    providerIds: ["va-housing", "va-locations", "vcl"],
    bullets: [
      "Explore VA-backed home loans and housing grants.",
      "Get help fast if you’re homeless or at risk.",
      "Find the office or program closest to you.",
    ],
    quickChecks: [
      "Are you trying to buy, stay housed, or get urgent support?",
      "Does disability affect what housing benefits fit?",
      "Do you need a nearby office instead of another article?",
    ],
    heroLabel: "Home buying, stability, and urgent housing support",
    heroSummary:
      "Housing questions split fast: buying a home, adapting one, or dealing with instability. This guide keeps those paths separate and visible.",
    compareCategorySlugs: ["property-tax-exemption"],
  },
  {
    slug: "jobs-and-employment",
    title: "Jobs, careers, and VR&E",
    shortTitle: "Employment",
    description:
      "Career transitions, job training, accommodations, resume help, and employment-focused VA programs.",
    summary:
      "This lane is for Veterans trying to translate service into work, especially when disability affects the path.",
    icon: "briefcase",
    providerIds: ["va-vre", "va-education"],
    bullets: [
      "Check whether VR&E fits your work plan.",
      "Use education benefits alongside employment planning.",
      "Identify the fastest path from transition to income.",
    ],
    quickChecks: [
      "Is the goal immediate work, retraining, or a longer reset?",
      "Does a disability create a work barrier or accommodation issue?",
      "Would education and employment planning need to happen together?",
    ],
    heroLabel: "Transition, training, and employment planning",
    heroSummary:
      "This lane is less about a single benefit and more about getting from service or instability to income, training, and a sustainable career path.",
    compareCategorySlugs: [],
  },
  {
    slug: "mental-health-and-crisis",
    title: "Mental health and crisis support",
    shortTitle: "Mental health",
    description:
      "Immediate help, ongoing support, and the main entry points when mental health needs cannot wait.",
    summary:
      "This section keeps the fastest support options up front, then points Veterans toward longer-term care access.",
    icon: "lifebuoy",
    providerIds: ["vcl", "va-health-care", "va-locations"],
    bullets: [
      "Use the Veterans Crisis Line anytime, even if you’re not enrolled.",
      "Connect crisis support to ongoing care afterward.",
      "Find VA or Vet Center access near you.",
    ],
    quickChecks: [
      "Do you need immediate crisis help or ongoing care access?",
      "Do you need support even without VA enrollment?",
      "Is a nearby Vet Center or clinic the fastest next step?",
    ],
    heroLabel: "Immediate help first, then ongoing care",
    heroSummary:
      "The priority here is simple: make the fastest help impossible to miss, then make the next care step easier to find.",
    compareCategorySlugs: [],
  },
  {
    slug: "family-caregiver-and-spouse",
    title: "Family, caregiver, and spouse support",
    shortTitle: "Family support",
    description:
      "Caregiver programs, spouse-relevant benefit paths, and support services around the Veteran.",
    summary:
      "Family support often determines whether the rest of the system works. This lane keeps those entry points visible.",
    icon: "users",
    providerIds: ["va-caregiver", "women-vets", "va-vso"],
    bullets: [
      "Review caregiver eligibility and application steps.",
      "Find women Veterans support if that’s the right entry point.",
      "Use accredited help when the family benefit path gets confusing.",
    ],
    quickChecks: [
      "Is a spouse or caregiver trying to navigate the system too?",
      "Does the Veteran’s care plan depend on family support?",
      "Would a human help line be more useful than another document?",
    ],
    heroLabel: "Support around the Veteran, not just on the Veteran",
    heroSummary:
      "Family support is often what makes the rest of the benefits system function. This guide keeps caregiver and spouse entry points visible instead of buried.",
    compareCategorySlugs: [],
  },
  {
    slug: "pension-survivors-and-later-life",
    title: "Pension, survivors, and later-life benefits",
    shortTitle: "Pension and survivors",
    description:
      "Pension, survivors pension, income-based support, and planning for later-life needs.",
    summary:
      "Not every Veteran benefit is tied to disability. This lane surfaces pension and family support that often gets missed.",
    icon: "wallet",
    providerIds: ["va-pension", "va-burial"],
    bullets: [
      "Check pension eligibility for wartime service.",
      "Review survivor-related support paths.",
      "Keep end-of-life and memorial planning visible instead of buried.",
    ],
    quickChecks: [
      "Is the main question about income support, survivors, or planning ahead?",
      "Does later-life support matter more than disability compensation here?",
      "Would memorial or burial planning save time later?",
    ],
    heroLabel: "Income support and later-life planning",
    heroSummary:
      "This guide exists because pension and survivor support are easy to miss if everything is framed only around disability claims.",
    compareCategorySlugs: ["military-retirement-pay"],
  },
];

const topicMap = new Map(resourceTopics.map((topic) => [topic.slug, topic]));
const providerMap = new Map(
  resourceProviders.map((provider) => [provider.id, provider]),
);

const topicProviderBuilderMap: Record<string, (stateSlug: string) => string[]> = {
  "disability-claims": (stateSlug) => [
    `${stateSlug}-resource-locator`,
    `${stateSlug}-benefits-directory`,
    "va-disability",
    "va-vso",
  ],
  "health-care": (stateSlug) => [
    `${stateSlug}-resource-locator`,
    `${stateSlug}-benefits-directory`,
    "va-health-care",
    "va-locations",
  ],
  "education-training": (stateSlug) => [
    `${stateSlug}-benefits-directory`,
    `${stateSlug}-resource-locator`,
    "va-education",
    "va-vre",
  ],
  "housing-homelessness": (stateSlug) => [
    `${stateSlug}-resource-locator`,
    `${stateSlug}-benefits-directory`,
    "va-housing",
    "va-locations",
  ],
  "jobs-and-employment": (stateSlug) => [
    `${stateSlug}-benefits-directory`,
    `${stateSlug}-resource-locator`,
    "va-vre",
    "va-education",
  ],
  "mental-health-and-crisis": (stateSlug) => [
    `${stateSlug}-resource-locator`,
    "vcl",
    "va-health-care",
    "va-locations",
  ],
  "family-caregiver-and-spouse": (stateSlug) => [
    `${stateSlug}-benefits-directory`,
    `${stateSlug}-resource-locator`,
    "va-caregiver",
    "women-vets",
  ],
  "pension-survivors-and-later-life": (stateSlug) => [
    `${stateSlug}-benefits-directory`,
    `${stateSlug}-resource-locator`,
    "va-pension",
    "va-burial",
  ],
};

export function getResourceTopicBySlug(slug: string) {
  return topicMap.get(slug);
}

export function getAllResourceTopicSlugs() {
  return resourceTopics.map((topic) => topic.slug);
}

export function getProvidersByIds(providerIds: string[]) {
  return providerIds
    .map((providerId) => providerMap.get(providerId))
    .filter((provider): provider is ResourceProvider => Boolean(provider));
}

export function getProvidersForTopic(slug: string) {
  const topic = getResourceTopicBySlug(slug);
  if (!topic) {
    return [];
  }

  return getProvidersByIds(topic.providerIds);
}

export function getCoreResourceProviders() {
  return getProvidersByIds([
    "va-disability",
    "va-health-care",
    "va-vso",
    "vcl",
  ]);
}

export function getStateOfficialProviders(stateSlug: string) {
  return getProvidersByIds([
    `${stateSlug}-benefits-directory`,
    `${stateSlug}-resource-locator`,
    "va-locations",
  ]);
}

export function getFeaturedResourceTopics() {
  return resourceTopics.slice(0, 4);
}

export function getStateResourceEntries(stateSlug: string): StateResourceEntry[] {
  const state = getStateBySlug(stateSlug);
  if (!state) {
    return [];
  }

  return resourceTopics.map((topic) => {
    const compareCategorySlugs = topic.compareCategorySlugs;
    const compareLabels = compareCategorySlugs
      .map((slug) => categories.find((category) => category.slug === slug)?.label)
      .filter((label): label is string => Boolean(label));

    const compareSuffix = compareLabels.length
      ? ` In ${state.name}, also check ${compareLabels.join(" and ")}.`
      : "";
    const providerIds =
      topicProviderBuilderMap[topic.slug]?.(state.slug) ?? topic.providerIds;

    return {
      id: `${state.slug}-${topic.slug}`,
      stateSlug: state.slug,
      topicSlug: topic.slug,
      title: `${topic.title} in ${state.name}`,
      summary:
        `${topic.summary} Start with ${state.name}'s official benefits directory and resource locator, then move into the federal provider path that matches the need.${compareSuffix}`,
      quickChecks: topic.quickChecks.slice(0, 3),
      providerIds,
      compareCategorySlugs,
    };
  });
}

export function getFeaturedStatesForResources(limit = 6) {
  return states.slice(0, limit);
}
