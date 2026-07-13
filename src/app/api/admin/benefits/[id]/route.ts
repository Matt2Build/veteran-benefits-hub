import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient, getSupabaseRouteClient, hasSupabaseEnv } from "@/lib/supabase";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const authClient = getSupabaseRouteClient(request);
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const { id } = await params;
  const adminClient = getSupabaseAdminClient();

  const payload = {
    status: body.status,
    summary: body.summary,
    detail_md: body.detailMd,
    disability_threshold: body.disabilityThreshold,
    source_label: body.sourceLabel,
    source_url: body.sourceUrl,
    verified_date: body.verifiedDate,
    published: body.published,
  };

  const { data, error } = await adminClient
    .from("state_benefits")
    .update(payload)
    .eq("id", id)
    .select("id, state_slug, category")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Update failed." },
      { status: 500 },
    );
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/states/${data.state_slug}`);
  revalidatePath(`/compare/${data.category}`);

  return NextResponse.json({ ok: true });
}
