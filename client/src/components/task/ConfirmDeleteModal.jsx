import Button from "../common/Button";
import Modal from "../common/Modal";

export default function ConfirmDeleteModal({
  isDeleting,
  isOpen,
  onClose,
  onConfirm,
  task,
}) {
  return (
    <Modal isOpen={isOpen} title="Delete task" onClose={onClose}>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-slate-950 dark:text-white">
          {task?.title || "this task"}
        </span>
        ? This action cannot be undone.
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button isLoading={isDeleting} variant="danger" onClick={onConfirm}>
          Delete Task
        </Button>
      </div>
    </Modal>
  );
}
