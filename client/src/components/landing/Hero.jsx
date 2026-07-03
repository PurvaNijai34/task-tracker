import { ArrowRight, CheckCircle2, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "../layout/PageContainer";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-white py-20 dark:bg-slate-950 sm:py-24">
      <PageContainer>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">

          {/* Left Content */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-600">
              MERN Task Tracker
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">
              Organize your work. <br />
              Stay productive every day.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Manage your daily tasks with a clean, modern workspace. Create,
              update, organize, and track progress effortlessly with a secure
              MERN-powered application.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-100"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-brand-600" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Dashboard
                  </span>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Live
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {["Pending", "In Progress", "Completed"].map((status, index) => (
                  <div
                    key={status}
                    className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {status}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                      {index + 2}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Complete project documentation",
                  "Review pending tasks",
                  "Update dashboard progress",
                ].map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-600" />

                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {task}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  );
}