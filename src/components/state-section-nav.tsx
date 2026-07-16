export function StateSectionNav({
  links,
}: {
  links: { id: string; label: string }[];
}) {
  return (
    <nav className="sticky top-20 z-20 overflow-x-auto rounded-[1.25rem] border border-[color:var(--line)] bg-white/95 px-2.5 py-2.5 shadow-[0_16px_42px_rgba(16,33,50,0.08)] backdrop-blur-xl">
      <ul className="flex min-w-max items-center gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="inline-flex rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-3.5 py-2 text-sm font-semibold text-[color:var(--navy)] transition hover:border-[color:rgba(184,144,69,0.42)] hover:bg-[color:var(--background)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
