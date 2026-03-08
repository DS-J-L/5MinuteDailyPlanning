import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatMinutes, getTodayKey } from "../lib/date";
import { getToday } from "../services/api";
import type { TodayData } from "../types/planner";

export default function HomePage() {
  const date = getTodayKey();
  const [todayData, setTodayData] = useState<TodayData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setError("");
        const data = await getToday(date);
        setTodayData(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load today's plan.");
      }
    }

    void loadData();
  }, [date]);

  const totalMinutes = todayData?.daily_plan?.tasks.reduce((sum, task) => sum + task.estimated_minutes, 0) ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
      <section className="glass-panel rounded-[36px] border border-white/70 p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.3em] text-pine/70">Today at a glance</p>
        <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink">Clear your head, choose your Big 3, and close the day with a short review.</h2>
        <p className="mt-4 max-w-lg text-base text-ink/70">
          This app keeps the routine intentionally small: brain dump, select three priorities, estimate time, execute, and reflect.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/brain-dump"
            className="rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent/90"
          >
            Start planning
          </Link>
          <Link
            to="/today"
            className="rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:bg-white/80"
          >
            Open today plan
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Daily status</p>
          <p className="mt-3 text-3xl font-semibold text-pine">{todayData?.daily_plan ? "Plan ready" : "No plan yet"}</p>
          <p className="mt-2 text-sm text-ink/70">
            {todayData?.daily_plan ? `${todayData.daily_plan.tasks.length} priorities locked in.` : "Start with a two-minute brain dump."}
          </p>
        </div>

        <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Estimated total</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{formatMinutes(totalMinutes)}</p>
          <p className="mt-2 text-sm text-ink/70">Calculated from today's saved Big 3 plan.</p>
        </div>

        <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Today&apos;s Big 3</p>
          <div className="mt-4 space-y-3">
            {todayData?.daily_plan?.tasks.length ? (
              todayData.daily_plan.tasks.map((task) => (
                <div key={task.id} className="rounded-2xl bg-white/80 px-4 py-3">
                  <p className="font-medium text-ink">{task.content}</p>
                  <p className="mt-1 text-sm text-ink/60">{formatMinutes(task.estimated_minutes)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/60">No tasks saved for today yet.</p>
            )}
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        </div>
      </section>
    </div>
  );
}
