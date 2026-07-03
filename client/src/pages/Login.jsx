import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/layout/Navbar";

export default function Login() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar compact />
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Welcome back
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
              Login to your workspace
            </h1>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
