import { BarChart3, Filter, ShieldCheck, Sparkles } from "lucide-react";
import PageContainer from "../layout/PageContainer";

const features = [
  {
    icon: ShieldCheck,
    title: "Cookie-based JWT Authentication",
    description: "Protected sessions use secure HttpOnly JWT cookies for enhanced security.",
  },
  {
    icon: Sparkles,
    title: "Fast Task Management",
    description: "Create, update and delete tasks instantly without refreshing the page.",
  },
  {
    icon: Filter,
    title: "Search & Smart Filters",
    description: "Quickly find tasks by title, status, due date and creation order.",
  },
  {
    icon: BarChart3,
    title: "Progress Dashboard",
    description: "Visual statistics help you monitor completed, pending and in-progress tasks.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <PageContainer>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
            FEATURES
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Practical tools for daily execution.
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Everything you need to organize your work efficiently with a modern
            and secure task management experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all duration-300 group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}