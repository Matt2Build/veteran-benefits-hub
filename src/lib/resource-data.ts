import { categories, getStateBySlug, seedBenefitRecords, states } from "@/lib/seed-data";
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
    id: "va-gi-bill-compare",
    name: "GI Bill Comparison Tool",
    description:
      "The direct VA tool for comparing GI Bill benefits by school or employer and reviewing approved training options.",
    href: "https://www.va.gov/education/gi-bill-comparison-tool/schools-and-employers",
    ctaLabel: "Open GI Bill Comparison Tool",
    audience: "Veterans, service members, and families comparing schools or training providers",
    typeLabel: "Official VA school comparison tool",
    highlights: [
      "Compare education benefits by school",
      "Review participating schools and employers",
      "Use before committing time or money to a program",
    ],
  },
  {
    id: "va-education-counseling",
    name: "Educational and career counseling (Chapter 36)",
    description:
      "The direct VA counseling path for education planning, career guidance, and making better use of your earned education benefits.",
    href: "https://www.va.gov/careers-employment/education-and-career-counseling/",
    ctaLabel: "Open Chapter 36 counseling",
    audience: "Veterans, service members, and eligible dependents planning education or career moves",
    typeLabel: "Official VA education counseling program",
    highlights: [
      "Free educational and career guidance",
      "Helps map benefits into a school or job plan",
      "Useful when the next step is unclear, not just when applying",
    ],
  },
  {
    id: "va-gibill-contact",
    name: "GI Bill hotline and support",
    description:
      "The official VA contact path for GI Bill questions, application issues, and education-benefit support.",
    href: "https://www.benefits.va.gov/gibill/contact_us.asp",
    ctaLabel: "Open GI Bill support",
    audience: "Veterans, students, dependents, and school staff with education-benefit questions",
    typeLabel: "Official VA education support",
    highlights: [
      "888-GIBILL-1 for GI Bill support",
      "Ask VA online support path",
      "Useful for application, payment, and benefit questions",
    ],
  },
  {
    id: "state-approving-agencies",
    name: "State Approving Agencies directory",
    description:
      "The directory used by VA’s education pages for state approving agencies that oversee school and training program approval for GI Bill eligibility.",
    href: "https://nasaa-vetseducation.com/nasaa-contacts/",
    ctaLabel: "Open State Approving Agencies directory",
    audience: "Veterans, schools, and training providers checking program approval paths",
    typeLabel: "State approving agency directory",
    highlights: [
      "State-by-state education approval contacts",
      "Use when program approval or school eligibility is the issue",
      "Linked directly from VA education resources",
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
    id: "va-home-loans",
    name: "VA-backed home loans",
    description:
      "The direct VA home-loan path for buying, building, improving, or refinancing a home.",
    href: "https://www.va.gov/housing-assistance/home-loans/",
    ctaLabel: "Open VA home loans",
    audience: "Veterans, service members, and survivors using a home loan benefit",
    typeLabel: "Official VA home loan program",
    highlights: [
      "Buy, build, improve, or refinance a home",
      "VA-backed loan options and eligibility basics",
      "A better first stop than generic mortgage articles",
    ],
  },
  {
    id: "va-adapted-housing",
    name: "Disability housing grants",
    description:
      "The direct VA housing-grants path for adapting, building, or changing a home to meet disability-related needs.",
    href: "https://www.va.gov/housing-assistance/disability-housing-grants/",
    ctaLabel: "Open disability housing grants",
    audience: "Veterans and service members with certain service-connected disabilities",
    typeLabel: "Official VA adapted housing grants",
    highlights: [
      "Specially Adapted Housing and related grants",
      "Use grants to buy or modify a home for accessibility",
      "Official eligibility and application path",
    ],
  },
  {
    id: "va-homeless-call",
    name: "National Call Center for Homeless Veterans",
    description:
      "The direct 24/7 VA hotline for Veterans who are homeless or at risk of homelessness.",
    href: "https://www.va.gov/homeless/nationalcallcenter.asp",
    ctaLabel: "Open homeless Veteran support",
    audience: "Veterans who need urgent housing stabilization or homelessness help",
    typeLabel: "Official VA homelessness support line",
    highlights: [
      "24/7 phone access at 877-424-3838",
      "Confidential help for homeless and at-risk Veterans",
      "Connects callers to nearby VA housing support",
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

const stateVeteransAgencyUrls: Record<string, string> = {
  alabama: "https://va.alabama.gov/",
  alaska: "https://veterans.alaska.gov/",
  arizona: "https://dvs.az.gov/",
  arkansas: "https://www.veterans.arkansas.gov/",
  california: "https://www.calvet.ca.gov/",
  colorado: "https://www.colorado.gov/",
  connecticut: "https://portal.ct.gov/",
  delaware: "https://veteransaffairs.delaware.gov/",
  florida: "https://www.floridavets.org/",
  georgia: "https://veterans.georgia.gov/",
  hawaii: "https://dod.hawaii.gov/",
  idaho: "https://www.veterans.idaho.gov/",
  illinois: "https://veterans.illinois.gov/",
  indiana: "https://www.in.gov/",
  iowa: "https://va.iowa.gov/",
  kansas: "https://kcva.ks.gov/",
  kentucky: "https://veterans.ky.gov/",
  louisiana: "https://www.vetaffairs.la.gov/",
  maine: "https://www.maine.gov/",
  maryland: "https://veterans.maryland.gov/",
  massachusetts: "https://www.mass.gov/",
  michigan: "https://www.michigan.gov/",
  minnesota: "https://mn.gov/",
  mississippi: "https://www.msva.ms.gov/",
  missouri: "https://mvc.dps.mo.gov/",
  montana: "https://dma.mt.gov/",
  nebraska: "https://veterans.nebraska.gov/",
  nevada: "https://veterans.nv.gov/",
  "new-hampshire": "https://www.dmavs.nh.gov/",
  "new-jersey": "https://www.nj.gov/",
  "new-mexico": "https://www.nmdvs.org/",
  "new-york": "https://veterans.ny.gov/",
  "north-carolina": "https://www.milvets.nc.gov/",
  "north-dakota": "https://www.nd.gov/",
  ohio: "https://dvs.ohio.gov/",
  oklahoma: "https://oklahoma.gov/",
  oregon: "https://www.oregon.gov/",
  pennsylvania: "https://www.dmva.pa.gov/",
  "rhode-island": "https://www.vets.ri.gov/",
  "south-carolina": "https://scdva.sc.gov/",
  "south-dakota": "https://vetaffairs.sd.gov/",
  tennessee: "https://www.tn.gov/",
  texas: "https://www.tvc.texas.gov/",
  utah: "https://veterans.utah.gov/",
  vermont: "https://veterans.vermont.gov/",
  virginia: "https://www.dvs.virginia.gov/",
  washington: "https://www.dva.wa.gov/",
  "west-virginia": "https://veterans.wv.gov/",
  wisconsin: "https://dva.wi.gov/",
  wyoming: "https://www.wyomilitary.wyo.gov/",
};

function buildStateVeteransAgencyProvider(stateSlug: string) {
  const state = getStateBySlug(stateSlug);
  const href = stateVeteransAgencyUrls[stateSlug];
  if (!state || !href) {
    return null;
  }

  return {
    id: `${state.slug}-state-veterans-agency`,
    name: `${state.name} state veterans agency`,
    description:
      `Official ${state.name} veterans agency website with state benefit information, service offices, local contacts, and in-state support programs where available.`,
    href,
    ctaLabel: `Open ${state.name} veterans agency`,
    audience: `Veterans and families in ${state.name}`,
    typeLabel: "Official state veterans agency",
    highlights: [
      "State programs and support pages",
      "County or local service-office information where available",
      "A direct official state entry point before moving into federal VA systems",
    ],
  } satisfies ResourceProvider;
}

const stateResourceProviders = states
  .map((state) => buildStateVeteransAgencyProvider(state.slug))
  .filter((provider): provider is ResourceProvider => Boolean(provider));

function buildStatePropertyTaxHousingProvider(stateSlug: string) {
  const state = getStateBySlug(stateSlug);
  const benefit = seedBenefitRecords.find(
    (record) =>
      record.stateSlug === stateSlug &&
      record.category === "property-tax-exemption" &&
      record.published &&
      record.sourceLabel &&
      record.sourceUrl &&
      record.featuredInComparison,
  );

  if (!state || !benefit?.sourceLabel || !benefit.sourceUrl) {
    return null;
  }

  return {
    id: `${state.slug}-property-tax-relief-source`,
    name: `${state.name} property tax relief for disabled veterans`,
    description: benefit.summary,
    href: benefit.sourceUrl,
    ctaLabel: `Open ${state.name} property tax relief source`,
    audience: `Veteran homeowners and families in ${state.name}`,
    typeLabel: "Official state housing-related tax relief",
    highlights: [
      benefit.disabilityThreshold
        ? `Eligibility threshold: ${benefit.disabilityThreshold}`
        : "Review the current eligibility rules on the official source.",
      `Verified ${benefit.verifiedDate ?? "recently"}`,
      benefit.sourceLabel,
    ],
  } satisfies ResourceProvider;
}

const stateHousingProviders = states
  .map((state) => buildStatePropertyTaxHousingProvider(state.slug))
  .filter((provider): provider is ResourceProvider => Boolean(provider));

export const resourceProviders: ResourceProvider[] = [
  ...nationalResourceProviders,
  ...stateResourceProviders,
  ...stateHousingProviders,
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
    providerIds: [
      "va-education",
      "va-gi-bill-compare",
      "va-education-counseling",
      "state-approving-agencies",
      "va-vre",
      "va-gibill-contact",
    ],
    bullets: [
      "Apply for GI Bill and related education benefits.",
      "Compare approved schools and training options before enrolling.",
      "Use counseling or VR&E when the education path needs a job plan behind it.",
    ],
    quickChecks: [
      "Do you need school funding or career-aligned training?",
      "Do you need to compare approved schools before enrolling?",
      "Would VR&E fit better than a standard GI Bill path?",
      "Do you need counseling, approval, or direct GI Bill support right now?",
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
    providerIds: [
      "va-home-loans",
      "va-adapted-housing",
      "va-homeless-call",
      "va-housing",
    ],
    bullets: [
      "Use the direct VA home-loan path when the need is buying or refinancing.",
      "Use disability housing grants when accessibility or adaptation is the issue.",
      "Use the homeless Veteran hotline immediately when housing is unstable.",
    ],
    quickChecks: [
      "Are you trying to buy, stay housed, or get urgent support?",
      "Does disability affect what housing benefits fit?",
      "Do you need a grant, a loan path, or immediate housing stabilization?",
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
    `${stateSlug}-state-veterans-agency`,
    "va-disability",
    "va-vso",
  ],
  "health-care": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
    "va-health-care",
    "va-locations",
  ],
  "education-training": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
    "va-education",
    "va-gi-bill-compare",
    "state-approving-agencies",
    "va-vre",
  ],
  "housing-homelessness": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
    `${stateSlug}-property-tax-relief-source`,
    "va-home-loans",
    "va-adapted-housing",
    "va-homeless-call",
  ],
  "jobs-and-employment": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
    "va-vre",
    "va-education",
  ],
  "mental-health-and-crisis": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
    "vcl",
    "va-health-care",
    "va-locations",
  ],
  "family-caregiver-and-spouse": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
    "va-caregiver",
    "women-vets",
  ],
  "pension-survivors-and-later-life": (stateSlug) => [
    `${stateSlug}-state-veterans-agency`,
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
    `${stateSlug}-state-veterans-agency`,
    "va-locations",
  ]);
}

export function getAllStateAgencyProviders() {
  return states
    .map((state) => providerMap.get(`${state.slug}-state-veterans-agency`))
    .filter((provider): provider is ResourceProvider => Boolean(provider));
}

export function getStateAgencyProvider(stateSlug: string) {
  return providerMap.get(`${stateSlug}-state-veterans-agency`);
}

export function getFeaturedResourceTopics() {
  return resourceTopics.slice(0, 4);
}

export function getStateResourceEntry(stateSlug: string, topicSlug: string) {
  return getStateResourceEntries(stateSlug).find((entry) => entry.topicSlug === topicSlug);
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
        `${topic.summary} Start with ${state.name}'s official veterans agency site, then move into the federal provider path that matches the need.${compareSuffix}`,
      quickChecks: topic.quickChecks.slice(0, 3),
      providerIds,
      compareCategorySlugs,
    };
  });
}

export function getFeaturedStatesForResources(limit = 6) {
  return states.slice(0, limit);
}
