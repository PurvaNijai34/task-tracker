import EmptyState from "../common/EmptyState";
import Skeleton from "../common/Skeleton";
import TaskCard from "./TaskCard";

export default function TaskList({ isLoading, onDelete, onEdit, tasks }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            key={index}
          >
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-4 h-6 w-3/4" />
            <Skeleton className="mt-4 h-20 w-full" />
            <Skeleton className="mt-5 h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!tasks.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} onDelete={onDelete} onEdit={onEdit} task={task} />
      ))}
    </div>
  );
}
