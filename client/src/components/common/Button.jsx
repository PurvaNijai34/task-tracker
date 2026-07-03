export default function Button({
  children,
  className = "",
  isLoading = false,
  type = "button",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus:ring-brand-500",
    secondary:
      "border border-slate-300 bg-white text-slate-800 hover:border-brand-500 hover:text-brand-600 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
    danger:
      "bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus:ring-rose-500",
    ghost:
      "text-slate-700 hover:bg-slate-100 focus:ring-slate-300 dark:text-slate-200 dark:hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
