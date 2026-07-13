import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-[color:var(--line)] bg-[color:var(--surface)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--navy)] text-[color:var(--surface)] shadow-[0_12px_28px_rgba(16,33,50,0.16)]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Veteran-built
              </p>
              <p className="text-lg font-semibold text-[color:var(--foreground)]">
                Veteran Benefits Hub
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-[color:var(--muted)]">
            <Link href="/compare/military-retirement-pay">Compare</Link>
            <Link href="/states/utah">Utah</Link>
            <Link href="/about">About</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[color:var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Veteran benefits, explained simply, state by state.</p>
          <p>Every published fact includes a source link and verification date.</p>
        </div>
      </footer>
    </>
  );
}
