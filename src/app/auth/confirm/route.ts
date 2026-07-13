import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthCallbackClient, hasSupabaseEnv } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = requestUrl.searchParams.get("next") || "/admin";
  const response = NextResponse.redirect(new URL(next, requestUrl.origin));

  if (!hasSupabaseEnv()) {
    return response;
  }

  const supabase = getSupabaseAuthCallbackClient(request, response);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const code = requestUrl.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return response;
  }

  if (tokenHash && type) {
    await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as
        | "signup"
        | "invite"
        | "magiclink"
        | "recovery"
        | "email_change"
        | "email",
    });
  }

  return response;
}
