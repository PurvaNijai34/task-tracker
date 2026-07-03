

import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../common/Button";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

export default function Navbar({ compact = false }) {
  const { isAuthenticated, logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to logout");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-slate-950 dark:text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow">
            <CheckSquare className="h-5 w-5" />
          </span>

          <span className="text-xl">Task Tracker</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Guest */}
          {!compact && !isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white sm:block"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 sm:block"
              >
                Register
              </NavLink>
            </>
          )}

          {/* Logged In */}
          {isAuthenticated && (
            <>
              {/* Dashboard Button */}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `hidden sm:flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>

              {/* Username */}
              <span className="hidden max-w-40 truncate text-sm text-slate-600 dark:text-slate-300 sm:block">
                {user?.name}
              </span>
            </>
          )}

          {/* Theme */}
          <button
            type="button"
            aria-label="Toggle Theme"
            onClick={toggleTheme}
            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {/* Logout */}
          {isAuthenticated && (
            <Button
              variant="secondary"
              className="px-3"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}