import { CheckSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm sm:flex-row sm:px-6 lg:px-8">
        
      
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <CheckSquare className="h-5 w-5 text-brand-600" />
          <span>Task Tracker</span>
        </div>

       
        <p className="text-center text-slate-600 dark:text-slate-400">
          © {currentYear} Task Tracker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}