import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import Input from "../common/Input";
import { TASK_STATUS, TASK_STATUS_OPTIONS } from "../../utils/constants";
import { toDateInputValue } from "../../utils/helpers";

export default function TaskForm({
  initialTask = null,
  isSubmitting = false,
  onCancel,
  onSubmit,
}) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: TASK_STATUS.PENDING,
      dueDate: "",
    },
  });

  useEffect(() => {
    reset({
      title: initialTask?.title || "",
      description: initialTask?.description || "",
      status: initialTask?.status || TASK_STATUS.PENDING,
      dueDate: toDateInputValue(initialTask?.dueDate),
    });
  }, [initialTask, reset]);

  const submitForm = async (values) => {
    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
    };

    if (values.dueDate) {
      payload.dueDate = values.dueDate;
    }

    await onSubmit(payload);

    if (!initialTask) {
      reset({
        title: "",
        description: "",
        status: TASK_STATUS.PENDING,
        dueDate: "",
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
      <Input
        error={errors.title?.message}
        label="Title"
        placeholder="Prepare weekly report"
        {...register("title", {
          required: "Title is required",
          minLength: { value: 3, message: "Title must be at least 3 characters" },
          maxLength: { value: 100, message: "Title cannot exceed 100 characters" },
        })}
      />

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Description
        </span>
        <textarea
          className={`min-h-28 w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-brand-500 dark:focus:ring-brand-950 ${
            errors.description
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:border-rose-500"
              : "border-slate-300 dark:border-slate-700"
          }`}
          placeholder="Add useful details"
          {...register("description", {
            maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
          })}
        />
        {errors.description ? (
          <span className="mt-1 block text-xs text-rose-600">
            {errors.description.message}
          </span>
        ) : null}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Status
          </span>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-brand-500 dark:focus:ring-brand-950"
            {...register("status")}
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <Input label="Due date" type="date" {...register("dueDate")} />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button isLoading={isSubmitting} type="submit">
          {initialTask ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
