import { MetadataRoute } from "next";
import { getAllCategorySlugs, getAllStateSlugs } from "@/lib/data";
import { getAllResourceTopicSlugs } from "@/lib/resource-data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/compare",
    "/resources",
    "/providers",
    "/states",
    "/admin",
    "/admin/sign-in",
  ];
  const stateRoutes = getAllStateSlugs().map((slug) => `/states/${slug}`);
  const compareRoutes = getAllCategorySlugs().map(
    (category) => `/compare/${category}`,
  );
  const resourceRoutes = getAllResourceTopicSlugs().map(
    (slug) => `/resources/${slug}`,
  );

  return [...staticRoutes, ...stateRoutes, ...compareRoutes, ...resourceRoutes].map(
    (route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: "2026-07-13",
      changeFrequency:
        route.startsWith("/states/") || route.startsWith("/resources/")
          ? "weekly"
          : "monthly",
      priority:
        route === ""
          ? 1
          : route.startsWith("/states/utah")
            ? 0.9
            : route === "/providers"
              ? 0.8
              : 0.7,
    }),
  );
}
