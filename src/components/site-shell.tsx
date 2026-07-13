import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[color:rgba(214,219,226,0.72)] bg-[rgba(255,253,248,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-[1.6rem] bg-[color:var(--navy)] text-[color:var(--surface)] shadow-[0_18px_36px_rgba(16,33,50,0.18)]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Veteran-built
              </p>
              <p className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
                Veteran Benefits Hub
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 p-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.06)]">
            <Link href="/states" className="rounded-full px-4 py-2 transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]">States</Link>
            <Link href="/resources" className="rounded-full px-4 py-2 transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]">Resources</Link>
            <Link href="/providers" className="rounded-full px-4 py-2 transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]">Providers</Link>
            <Link href="/compare/military-retirement-pay" className="rounded-full px-4 py-2 transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]">Compare</Link>
            <Link href="/about" className="rounded-full px-4 py-2 transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]">About</Link>
            <Link href="/admin" className="rounded-full px-4 py-2 transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[color:rgba(214,219,226,0.72)] bg-[rgba(255,253,248,0.82)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[color:var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Veteran benefits, explained simply, state by state.</p>
          <p>Every published fact includes a source link and verification date.</p>
        </div>
      </footer>
    </>
  );
}
