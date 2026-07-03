import { ClipboardCheck } from "lucide-react";

export default function EmptyState({
  title = "No tasks yet",
  description = "Create your first task and start tracking progress.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

      {/* Icon */}
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
        <ClipboardCheck className="h-8 w-8" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
        {description}
      </p>

    </div>
  );
}