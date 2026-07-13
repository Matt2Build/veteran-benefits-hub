import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";

export function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    { href: "/states", label: "States" },
    { href: "/resources", label: "Resources" },
    { href: "/providers", label: "Providers" },
    { href: "/compare/military-retirement-pay", label: "Compare" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[color:rgba(214,219,226,0.72)] bg-[rgba(255,253,248,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-[1.6rem] bg-[color:var(--navy)] text-[color:var(--surface)] shadow-[0_18px_36px_rgba(16,33,50,0.18)]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Veteran-built
              </p>
              <p className="text-xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-2xl">
                Veteran Benefits Hub
              </p>
            </div>
          </Link>
          <details className="group md:hidden">
            <summary className="flex list-none items-center justify-between rounded-[1.5rem] border border-[color:var(--line)] bg-white/78 px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-[0_12px_32px_rgba(16,33,50,0.06)]">
              Menu
              <Menu className="h-5 w-5 text-[color:var(--muted)]" />
            </summary>
            <nav className="mt-2 grid grid-cols-2 gap-2 rounded-[1.5rem] border border-[color:var(--line)] bg-white/88 p-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.06)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-3 text-center transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
          <nav className="hidden rounded-[1.75rem] border border-[color:var(--line)] bg-white/70 p-2 text-sm font-medium text-[color:var(--muted)] shadow-[0_12px_32px_rgba(16,33,50,0.06)] md:flex md:w-auto md:items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-center transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
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
