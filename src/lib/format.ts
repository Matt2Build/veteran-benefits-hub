import { BenefitStatus } from "@/lib/types";

export function formatDate(value?: string | null) {
  if (!value) {
    return "Not yet verified";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function statusLabel(status: BenefitStatus) {
  switch (status) {
    case "full":
      return "Full exemption";
    case "partial":
      return "Partial";
    case "none":
      return "None";
    case "conditional":
      return "Conditional";
  }
}

export function statusClasses(status: BenefitStatus) {
  switch (status) {
    case "full":
      return "bg-emerald-100 text-emerald-900 ring-emerald-300";
    case "partial":
      return "bg-amber-100 text-amber-900 ring-amber-300";
    case "none":
      return "bg-slate-200 text-slate-800 ring-slate-300";
    case "conditional":
      return "bg-sky-100 text-sky-900 ring-sky-300";
  }
}

export function isOlderThanSixMonths(value?: string | null) {
  if (!value) {
    return true;
  }

  const then = new Date(`${value}T00:00:00`);
  const now = new Date("2026-07-13T00:00:00");
  const days = (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24);
  return days > 183;
}
