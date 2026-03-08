import { NavLink, Outlet } from "react-router-dom";

import { formatLongDate, getTodayKey } from "../lib/date";

const links = [
  { to: "/", label: "Home" },
  { to: "/history", label: "History" }
];

export default function Layout() {
  const today = getTodayKey();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 text-ink sm:px-6 lg:px-8">
      <div className="grain-overlay" />
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="glass-panel mb-6 rounded-[32px] border border-white/60 px-6 py-5 shadow-panel">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-pine/70">5-minute daily planning</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Build a focused day in five minutes.</h1>
              <p className="mt-2 text-sm text-ink/70">{formatLongDate(today)}</p>
            </div>
            <nav className="flex gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive ? "bg-pine text-white" : "bg-white/70 text-ink hover:bg-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
