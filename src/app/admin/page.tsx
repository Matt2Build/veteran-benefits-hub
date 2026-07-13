import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminWorkspace } from "@/components/admin-workspace";
import { getBenefitsForAdmin } from "@/lib/data";
import { getSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase";

export const metadata = {
  title: "Admin",
  description:
    "Single-editor admin workspace for reviewing, filtering, and editing state benefit records.",
};

export default async function AdminPage() {
  const demoMode = !hasSupabaseEnv();

  if (!demoMode) {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/sign-in");
    }
  }

  const rows = await getBenefitsForAdmin();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <section className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Admin
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
          Editorial workspace
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          Review the queue, edit details with markdown preview, control publication state, and mark rows as verified without mutating the verification date automatically on save.
        </p>
        <p className="text-sm text-[color:var(--muted)]">
          Need auth setup? Add the Supabase env vars from `.env.example`, then use the magic-link flow at{" "}
          <Link href="/admin/sign-in" className="font-semibold text-[color:var(--navy)] underline underline-offset-4">
            /admin/sign-in
          </Link>
          .
        </p>
      </section>

      <AdminWorkspace initialRows={rows} demoMode={demoMode} />
    </div>
  );
}
