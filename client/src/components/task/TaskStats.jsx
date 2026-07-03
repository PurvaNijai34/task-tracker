import { CheckCircle2, CircleDot, ClipboardList, Timer } from "lucide-react";

export default function TaskStats({ stats }) {
  const cards = [
    { label: "Total", value: stats.total, icon: ClipboardList, color: "text-slate-700" },
    { label: "Pending", value: stats.pending, icon: CircleDot, color: "text-amber-600" },
    { label: "In Progress", value: stats.inProgress, icon: Timer, color: "text-blue-600" },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ color, icon: Icon, label, value }) => (
        <div
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          key={label}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}
