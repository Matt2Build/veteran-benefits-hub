import { Metadata } from "next";
import { DatabaseStatCard } from "@/components/database-stat-card";
import { ProviderDirectoryGroups } from "@/components/provider-directory-group";
import { getDatabaseStats } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: "Providers",
  description:
    "Browse the official provider directory: VA programs, crisis support, caregiver help, locations, representation, and other core Veteran support channels.",
};

export default function ProvidersPage() {
  const stats = getDatabaseStats();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Providers
        </p>
        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          The official provider database behind the site.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          This is the provider layer that powers the guides and state pages. It keeps the key federal programs, directories, and support lines visible in one place.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DatabaseStatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <ProviderDirectoryGroups />
    </div>
  );
}
