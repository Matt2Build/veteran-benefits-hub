import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function hasSupabaseEnv() {
  return Boolean(
    env("NEXT_PUBLIC_SUPABASE_URL") &&
      env("NEXT_PUBLIC_SUPABASE_ANON_KEY") &&
      env("SUPABASE_SERVICE_ROLE_KEY"),
  );
}

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // No-op in server components.
        },
      },
    },
  );
}

export function getSupabaseRouteClient(request: NextRequest) {
  return createServerClient(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Route handlers that only validate session do not need to write cookies.
        },
      },
    },
  );
}

export function getSupabaseAdminClient() {
  return createClient(env("NEXT_PUBLIC_SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));
}

export function getSupabaseAuthCallbackClient(
  request: NextRequest,
  response: NextResponse,
) {
  return createServerClient(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const cookie of cookiesToSet) {
            response.cookies.set(cookie.name, cookie.value, cookie.options);
          }
        },
      },
    },
  );
}
