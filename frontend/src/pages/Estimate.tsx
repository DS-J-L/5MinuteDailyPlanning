import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TimeEstimateInput from "../components/TimeEstimateInput";
import TotalTimeDisplay from "../components/TotalTimeDisplay";
import { getTodayKey } from "../lib/date";
import { createDailyPlan } from "../services/api";
import { clearDraftTasks, getDraftTasks, saveDraftTasks } from "../services/workflowStorage";
import type { DraftTask } from "../types/planner";

export default function EstimatePage() {
  const date = getTodayKey();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<DraftTask[]>([]);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const draftTasks = getDraftTasks(date);
    setTasks(draftTasks);
  }, [date]);

  function updateTaskMinutes(index: number, minutes: number) {
    setTasks((current) => {
      const next = current.map((task, taskIndex) =>
        taskIndex === index ? { ...task, estimated_minutes: Number.isFinite(minutes) && minutes > 0 ? minutes : 0 } : task,
      );
      saveDraftTasks(date, next);
      return next;
    });
  }

  async function handleSavePlan() {
    if (tasks.length !== 3) {
      setError("You need exactly three selected tasks before saving a plan.");
      navigate("/pick-big3");
      return;
    }

    if (tasks.some((task) => task.estimated_minutes <= 0)) {
      setError("Every task needs a valid estimated time.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      await createDailyPlan(date, tasks);
      clearDraftTasks(date);
      navigate("/today");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save plan.");
    } finally {
      setIsSaving(false);
    }
  }

  const totalMinutes = tasks.reduce((sum, task) => sum + task.estimated_minutes, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <TimeEstimateInput key={task.source_id} task={task} onChange={(minutes) => updateTaskMinutes(index, minutes)} />
          ))}
          {tasks.length === 0 ? (
            <div className="glass-panel rounded-[28px] border border-dashed border-ink/15 p-6 text-center text-sm text-ink/60">
              No Big 3 draft found for today. Go back and choose three tasks first.
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <TotalTimeDisplay totalMinutes={totalMinutes} />
          <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
            <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Before you save</p>
            <p className="mt-2 text-sm text-ink/70">
              The MVP saves one daily plan per date. Saving again replaces the existing Big 3 for the current day.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/pick-big3" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/80">
          Back
        </Link>
        <button
          type="button"
          onClick={() => void handleSavePlan()}
          disabled={isSaving}
          className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save plan"}
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
