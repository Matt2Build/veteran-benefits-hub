import Link from "next/link";
import {
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
      className={`rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_16px_48px_rgba(16,33,50,0.08)] transition hover:border-[color:var(--accent)] ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--accent-soft)] text-[color:var(--navy)]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--foreground)]">
        {topic.title}
      </h3>
      <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
        {compact ? topic.summary : topic.description}
      </p>
      <span className="mt-5 inline-flex text-sm font-semibold text-[color:var(--navy)]">
        Open guide
      </span>
    </Link>
  );
}
