"use client";

import { FormEvent, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    setMessage(
      error
        ? error.message
        : "Check your email for the secure sign-in link to the admin area.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-[color:var(--foreground)]">
          Email address
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="editor@example.com"
          className="h-12 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 outline-none focus:border-[color:var(--accent)]"
        />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center rounded-2xl bg-[color:var(--navy)] px-5 text-sm font-semibold uppercase tracking-[0.18em] text-white"
      >
        Send magic link
      </button>
      {message ? (
        <p className="text-sm text-[color:var(--muted)]">{message}</p>
      ) : null}
    </form>
  );
}
