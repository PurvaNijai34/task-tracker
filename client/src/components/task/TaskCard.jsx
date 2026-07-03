import { CalendarDays, Clock3, Pencil, Trash2 } from "lucide-react";
import Button from "../common/Button";
import { TASK_STATUS } from "../../utils/constants";
import { formatDate } from "../../utils/helpers";

const statusStyles = {
  [TASK_STATUS.PENDING]:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  [TASK_STATUS.IN_PROGRESS]:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  [TASK_STATUS.COMPLETED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};

export default function TaskCard({ onDelete, onEdit, task }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
              statusStyles[task.status] || statusStyles[TASK_STATUS.PENDING]
            }`}
          >
            {task.status}
          </span>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-950 dark:text-white">
            {task.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {task.description || "No description provided."}
      </p>

      <div className="mt-5 space-y-2 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Due {formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          <span>Created {formatDate(task.createdAt, "Unknown")}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button className="flex-1" variant="secondary" onClick={() => onEdit(task)}>
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button className="flex-1" variant="danger" onClick={() => onDelete(task)}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </article>
  );
}
