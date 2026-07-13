import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Home,
  LifeBuoy,
  ShieldPlus,
  Users,
  Wallet,
} from "lucide-react";
import { ResourceTopic } from "@/lib/resource-data";

const iconMap = {
  shield: ShieldPlus,
  heart: HeartPulse,
  graduation: GraduationCap,
  home: Home,
  briefcase: BriefcaseBusiness,
  lifebuoy: LifeBuoy,
  users: Users,
  wallet: Wallet,
} as const;

export function ResourceTopicCard({
  topic,
  compact = false,
}: {
  topic: ResourceTopic;
  compact?: boolean;
}) {
  const Icon = iconMap[topic.icon as keyof typeof iconMap] ?? ShieldPlus;

  return (
    <Link
      href={`/resources/${topic.slug}`}
      className={`group rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(251,248,239,0.94))] shadow-[0_22px_58px_rgba(16,33,50,0.08)] transition hover:-translate-y-0.5 hover:border-[color:rgba(184,144,69,0.5)] hover:shadow-[0_28px_68px_rgba(16,33,50,0.12)] ${
        compact ? "p-5" : "p-7"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-[1.25rem] bg-[color:rgba(184,144,69,0.14)] text-[color:var(--navy)]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          Guide
          <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--accent)]" />
        </span>
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
        {topic.heroLabel}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {topic.title}
      </h3>
      <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
        {compact ? topic.summary : topic.heroSummary}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {topic.quickChecks.slice(0, compact ? 1 : 2).map((check) => (
          <span
            key={check}
            className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1 text-xs font-medium text-[color:var(--muted)]"
          >
            {check}
          </span>
        ))}
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--navy)]">
        View guide and resources
        <ArrowUpRight className="h-4 w-4 text-[color:var(--accent)]" />
      </span>
    </Link>
  );
}
