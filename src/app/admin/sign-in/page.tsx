import { redirect } from "next/navigation";
import { AdminSignIn } from "@/components/admin-sign-in";
import { getSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase";

export const metadata = {
  title: "Admin sign in",
  description: "Magic-link sign in for the Veteran Benefits Hub admin area.",
};

export default async function AdminSignInPage() {
  if (!hasSupabaseEnv()) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-8 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Admin setup
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Supabase auth is not configured yet.
          </h1>
          <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
            Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, then reload this page to enable magic-link sign-in for the admin area.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-8 shadow-[0_18px_60px_rgba(16,33,50,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Admin sign in
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[color:var(--foreground)]">
          Secure access for the editor.
        </h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          Use a Supabase magic link so the editor can get into the admin without needing a complex dashboard or password reset flow.
        </p>
        <div className="mt-6">
          <AdminSignIn />
        </div>
      </div>
    </div>
  );
}
