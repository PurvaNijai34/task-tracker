import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import TaskFilter from "../components/task/TaskFilter";
import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";
import TaskStats from "../components/task/TaskStats";
import useAuth from "../hooks/useAuth";
import useTasks from "../hooks/useTasks";
import { getTaskId } from "../utils/helpers";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    addTask,
    editTask,
    error,
    fetchTasks,
    filter,
    filteredTasks,
    isLoading,
    isSubmitting,
    removeTask,
    searchTerm,
    setFilter,
    setSearchTerm,
    setSortBy,
    sortBy,
    stats,
  } = useTasks();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const handleCreate = async (payload) => {
    await addTask(payload);
    setIsCreateOpen(false);
  };

  const handleEdit = async (payload) => {
    await editTask(getTaskId(editingTask), payload);
    setEditingTask(null);
  };

  const handleDelete = async () => {
    await removeTask(getTaskId(deletingTask));
    setDeletingTask(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <PageContainer>
        <section className="py-8 sm:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
                Welcome{user?.name ? `, ${user.name}` : ""}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Manage your tasks, review priorities, and keep progress moving without
                losing context.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={fetchTasks}>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4" />
                Create Task
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <TaskStats stats={stats} />
            <TaskFilter
              filter={filter}
              searchTerm={searchTerm}
              setFilter={setFilter}
              setSearchTerm={setSearchTerm}
              setSortBy={setSortBy}
              sortBy={sortBy}
            />

            {error ? (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            <TaskList
              isLoading={isLoading}
              tasks={filteredTasks}
              onDelete={setDeletingTask}
              onEdit={setEditingTask}
            />
          </div>
        </section>
      </PageContainer>

      <Modal
        isOpen={isCreateOpen}
        title="Create task"
        onClose={() => setIsCreateOpen(false)}
      >
        <TaskForm
          isSubmitting={isSubmitting}
          onCancel={() => setIsCreateOpen(false)}
          onSubmit={handleCreate}
        />
      </Modal>

      <Modal
        isOpen={Boolean(editingTask)}
        title="Edit task"
        onClose={() => setEditingTask(null)}
      >
        <TaskForm
          initialTask={editingTask}
          isSubmitting={isSubmitting}
          onCancel={() => setEditingTask(null)}
          onSubmit={handleEdit}
        />
      </Modal>

      <ConfirmDeleteModal
        isDeleting={isSubmitting}
        isOpen={Boolean(deletingTask)}
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDelete}
      />
    </main>
  );
}
