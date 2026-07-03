export default function Loader({ fullScreen = true, label = "Loading" }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-50 px-4 text-slate-700 dark:bg-slate-950 dark:text-slate-200 ${
        fullScreen ? "min-h-screen" : "py-10"
      }`}
    >
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
        <span className="text-sm font-medium">{label}...</span>
      </div>
    </div>
  );
}
