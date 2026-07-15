import { Metadata } from "next";
import { DatabaseStatCard } from "@/components/database-stat-card";
import { ProviderDirectoryGroups } from "@/components/provider-directory-group";
import { getDatabaseStats } from "@/lib/catalog-data";
import { getAllStateAgencyProviders } from "@/lib/resource-data";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Providers",
  description:
    "Browse the official provider directory: VA programs, crisis support, caregiver help, locations, representation, and other core Veteran support channels.",
};

export default function ProvidersPage() {
  const stats = getDatabaseStats();
  const stateAgencyProviders = getAllStateAgencyProviders();

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

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
            State agency directory
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Direct official state veterans agency sites
          </h2>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
            These are the official state-level veterans agency entry points surfaced through the site. Use them when you need the state’s own office, services, homes, cemetery information, or local contacts before dropping into federal VA systems.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stateAgencyProviders.map((provider) => (
            <a
              key={provider.id}
              href={provider.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.35rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.94))] px-4 py-4 shadow-[0_16px_40px_rgba(16,33,50,0.06)] transition hover:-translate-y-0.5 hover:border-[color:rgba(184,144,69,0.4)] hover:shadow-[0_22px_50px_rgba(16,33,50,0.1)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Official state veterans agency
              </p>
              <p className="mt-3 text-lg font-semibold tracking-tight text-[color:var(--foreground)]">
                {provider.name}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]">
                Open site
                <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <ProviderDirectoryGroups />
    </div>
  );
}
