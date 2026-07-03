import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageContainer from "../layout/PageContainer";

export default function CTA() {
  return (
    <section className="bg-white py-6 dark:bg-slate-950">
      <PageContainer>
        <div className="rounded-lg bg-brand-600 px-6 py-6 text-center text-white shadow-soft sm:px-">
          <h2 className="text-3xl font-bold sm:text-4xl">Bring your tasks into focus.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-brand-50 sm:text-base">
            Start with a clean dashboard, responsive controls, and state that updates as
            soon as your API calls succeed.
          </p>
          <Link
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            to="/register"
          >
            Register <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
