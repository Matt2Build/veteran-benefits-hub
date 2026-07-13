export interface ResourceProvider {
  id: string;
  name: string;
  description: string;
  href: string;
  ctaLabel: string;
  audience: string;
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
}

export const resourceProviders: ResourceProvider[] = [
  {
    id: "va-disability",
    name: "VA disability compensation",
    description: "Start, manage, or strengthen a service-connected disability claim.",
    href: "https://www.va.gov/disability/how-to-file-claim/",
    ctaLabel: "File or manage a claim",
    audience: "Veterans with service-connected conditions",
  },
  {
    id: "va-health-care",
    name: "VA health care",
    description: "Apply for coverage, check eligibility, and learn how care access works.",
    href: "https://www.va.gov/health-care/how-to-apply/",
    ctaLabel: "Apply for health care",
    audience: "Veterans seeking VA medical care",
  },
  {
    id: "va-education",
    name: "GI Bill and education benefits",
    description: "Use GI Bill and other VA education programs for school or training.",
    href: "https://www.va.gov/education/how-to-apply/",
    ctaLabel: "Apply for education benefits",
    audience: "Veterans, service members, and dependents",
  },
  {
    id: "va-vre",
    name: "Veteran Readiness and Employment",
    description: "Career support, training, accommodations, and employment planning.",
    href: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
    ctaLabel: "Explore VR&E",
    audience: "Veterans with service-connected disabilities affecting work",
  },
  {
    id: "va-housing",
    name: "VA housing assistance",
    description: "Home loans, housing grants, and help for Veterans at risk of homelessness.",
    href: "https://www.va.gov/housing-assistance/",
    ctaLabel: "Find housing support",
    audience: "Veterans buying homes or facing housing instability",
  },
  {
    id: "va-caregiver",
    name: "VA caregiver support",
    description: "Support programs and application pathways for family caregivers.",
    href: "https://www.va.gov/family-and-caregiver-benefits/health-and-disability/comprehensive-assistance-for-family-caregivers/",
    ctaLabel: "Review caregiver support",
    audience: "Family caregivers and military spouses",
  },
  {
    id: "va-pension",
    name: "VA pension benefits",
    description: "Income-based pension support for qualifying wartime Veterans.",
    href: "https://www.va.gov/pension/",
    ctaLabel: "Check pension options",
    audience: "Wartime Veterans and some survivors",
  },
  {
    id: "va-burial",
    name: "Burial and memorial benefits",
    description: "Burial allowances, memorial items, and cemetery planning resources.",
    href: "https://www.va.gov/burials-memorials/",
    ctaLabel: "Plan burial or memorial benefits",
    audience: "Veterans and family members planning ahead or handling time-of-need",
  },
  {
    id: "va-vso",
    name: "VA-accredited representatives and VSOs",
    description: "Find a qualified representative to help with claims and appeals.",
    href: "https://www.va.gov/get-help-from-accredited-representative/find-rep/",
    ctaLabel: "Find a representative",
    audience: "Veterans who want claims help",
  },
  {
    id: "va-locations",
    name: "VA locations",
    description: "Locate VA hospitals, clinics, regional offices, cemeteries, and Vet Centers.",
    href: "https://www.va.gov/find-locations/",
    ctaLabel: "Find a nearby VA location",
    audience: "Anyone trying to find in-person VA services",
  },
  {
    id: "vcl",
    name: "Veterans Crisis Line",
    description: "Immediate 24/7 crisis support by phone, chat, or text.",
    href: "https://www.veteranscrisisline.net/",
    ctaLabel: "Get crisis support now",
    audience: "Veterans, service members, families, and friends in crisis",
  },
  {
    id: "women-vets",
    name: "Women Veterans Call Center",
    description: "Dedicated help navigating benefits, care, and women Veterans resources.",
    href: "https://www.womenshealth.va.gov/wvcc.asp",
    ctaLabel: "Contact the Women Veterans Call Center",
    audience: "Women Veterans and families",
  },
];

export const resourceTopics: ResourceTopic[] = [
  {
    slug: "disability-claims",
    title: "Disability claims and ratings",
    shortTitle: "Disability",
    description:
      "Service-connected disability claims, ratings, evidence, appeals, and monthly compensation questions.",
    summary:
      "File a claim, understand eligibility, track your rating, and find accredited help before you miss a step.",
    icon: "shield",
    providerIds: ["va-disability", "va-vso"],
    bullets: [
      "Start a new claim or supplemental claim.",
      "Understand rating decisions and what drives compensation.",
      "Find an accredited VSO before filing or appealing.",
    ],
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
  },
  {
    slug: "family-caregiver-and-spouse",
    title: "Family, caregiver, and spouse support",
    shortTitle: "Family support",
    description:
      "Caregiver programs, spouse-relevant benefits paths, and support services around the Veteran.",
    summary:
      "Family support often determines whether the rest of the system works. This lane keeps those entry points visible.",
    icon: "users",
    providerIds: ["va-caregiver", "women-vets", "va-vso"],
    bullets: [
      "Review caregiver eligibility and application steps.",
      "Find women Veterans support if that’s the right entry point.",
      "Use accredited help when the family benefit path gets confusing.",
    ],
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
  },
];

const topicMap = new Map(resourceTopics.map((topic) => [topic.slug, topic]));
const providerMap = new Map(
  resourceProviders.map((provider) => [provider.id, provider]),
);

export function getResourceTopicBySlug(slug: string) {
  return topicMap.get(slug);
}

export function getAllResourceTopicSlugs() {
  return resourceTopics.map((topic) => topic.slug);
}

export function getProvidersForTopic(slug: string) {
  const topic = getResourceTopicBySlug(slug);
  if (!topic) {
    return [];
  }

  return topic.providerIds
    .map((providerId) => providerMap.get(providerId))
    .filter((provider): provider is ResourceProvider => Boolean(provider));
}

export function getCoreResourceProviders() {
  return ["va-disability", "va-health-care", "va-education", "va-vso", "vcl"]
    .map((providerId) => providerMap.get(providerId))
    .filter((provider): provider is ResourceProvider => Boolean(provider));
}
