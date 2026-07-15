export function StateSectionNav({
  links,
}: {
  links: { id: string; label: string }[];
}) {
  return (
    <nav className="sticky top-20 z-20 overflow-x-auto rounded-full border border-[color:var(--line)] bg-white/88 px-3 py-3 shadow-[0_16px_42px_rgba(16,33,50,0.08)] backdrop-blur-xl">
      <ul className="flex min-w-max items-center gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="inline-flex rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[color:var(--navy)] transition hover:border-[color:var(--line)] hover:bg-[color:var(--background)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
