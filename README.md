# Veteran Benefits Hub

Veteran Benefits Hub is a Next.js MVP for a public benefits comparison site aimed at U.S. military veterans, transitioning service members, and military spouses.

## What is included

- Home page with a state selector, Utah spotlight, and direct links to the two comparison tables
- Comparison routes for:
  - `military-retirement-pay`
  - `property-tax-exemption`
- Static state pages for all 50 states
- A Utah deep-dive page with published, sourced, and dated sample benefits
- Metadata, sitemap, robots, FAQPage JSON-LD, and ISR (`revalidate = 3600`)
- Admin workspace UI with review-queue filters, markdown preview, publish toggle, and explicit “Mark verified today” action
- Supabase-ready auth shell for `/admin` and `/admin/sign-in`

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` if you want to configure:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ENABLE_SUPABASE`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

The site is intentionally static-first by default. Unless `NEXT_PUBLIC_ENABLE_SUPABASE=true`, `/admin` runs in transparent demo mode and the public site serves the repo-backed seed data.

## Data model

The MVP uses a simple typed `BenefitRecord` structure with enough room to expand later:

- `stateSlug`
- `category`
- `categoryGroup`
- `question`
- `summary`
- `detailMd`
- `status`
- `disabilityThreshold`
- `sourceLabel`
- `sourceUrl`
- `verifiedDate`
- `published`
- `featuredInComparison`

That keeps the current seed-data implementation straightforward while mapping cleanly to a future Supabase `state_benefits` table.

## Supabase notes

Supabase is optional and currently disabled by default while the product is still being built out in git/Vercel. The integration code remains in place so it can be turned back on later without another architecture pass.

When enabled, the current build includes:

- page-level auth gating for `/admin`
- magic-link sign-in UI at `/admin/sign-in`
- a database-backed `state_benefits` workflow

To re-enable it later:

1. Set `NEXT_PUBLIC_ENABLE_SUPABASE=true`.
2. Add the Supabase env vars to Vercel and local `.env.local`.
3. Keep `verifiedDate` manual and separate from standard save actions.

## Phase 2

Documented here only, not built:

- “About you” wizard:
  - status: transitioning / veteran / retired / spouse
  - disability rating
  - state
- Additional categories:
  - mental health resources
  - retreats
  - career and employment
  - medical navigation across VA, TRICARE, and private care
- Vetted nonprofit directory with inclusion criteria
- Additional deep-dive state pages beyond Utah, with Texas next
