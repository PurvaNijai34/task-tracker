import { forwardRef } from "react";

const Input = forwardRef(
  ({ className = "", error, label, ...props }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {label}
          </span>
        )}

        <input
          ref={ref}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-brand-500 dark:focus:ring-brand-950 ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:border-rose-500"
              : "border-slate-300 dark:border-slate-700"
          } ${className}`}
          {...props}
        />

        {error && (
          <span className="mt-1 block text-xs text-rose-600">
            {error}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;