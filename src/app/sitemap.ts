import { MetadataRoute } from "next";
import { getAllCategorySlugs, getAllStateSlugs } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/compare", "/admin", "/admin/sign-in"];
  const stateRoutes = getAllStateSlugs().map((slug) => `/states/${slug}`);
  const compareRoutes = getAllCategorySlugs().map(
    (category) => `/compare/${category}`,
  );

  return [...staticRoutes, ...stateRoutes, ...compareRoutes].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: "2026-07-13",
    changeFrequency: route.startsWith("/states/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/states/utah") ? 0.9 : 0.7,
  }));
}
