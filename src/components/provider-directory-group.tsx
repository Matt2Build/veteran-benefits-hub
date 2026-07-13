import { ProviderCard } from "@/components/provider-card";
import { getProviderDirectoryRecords } from "@/lib/catalog-data";

export function ProviderDirectoryGroups() {
  const groups = getProviderDirectoryRecords();

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.id} className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Provider database
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
              {group.title}
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
              {group.description}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {group.providers.map((provider) =>
              provider ? (
                <ProviderCard key={provider.id} provider={provider} compact />
              ) : null,
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
