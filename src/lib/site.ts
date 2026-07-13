export const siteConfig = {
  name: "Veteran Benefits Hub",
  description:
    "Veteran benefits, explained simply, state by state. Every published fact includes a source link and last-verified date.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://veteran-benefits-hub.vercel.app",
} as const;
