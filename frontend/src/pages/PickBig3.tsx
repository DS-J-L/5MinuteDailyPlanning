import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Big3Selector from "../components/Big3Selector";
import { getTodayKey } from "../lib/date";
import { getBrainDump } from "../services/api";
import { getDraftTasks, saveDraftTasks } from "../services/workflowStorage";
import type { BrainDumpEntry, DraftTask } from "../types/planner";

export default function PickBig3Page() {
  const date = getTodayKey();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<BrainDumpEntry[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<DraftTask[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEntries() {
      try {
        setError("");
        const data = await getBrainDump(date);
        setEntries(data);
        const savedDraft = getDraftTasks(date);
        setSelectedTasks(savedDraft);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load tasks.");
      }
    }

    void loadEntries();
  }, [date]);

  function handleToggle(task: BrainDumpEntry) {
    setSelectedTasks((current) => {
      const exists = current.some((selectedTask) => selectedTask.source_id === task.id);
      let next: DraftTask[];

      if (exists) {
        next = current.filter((selectedTask) => selectedTask.source_id !== task.id);
      } else if (current.length < 3) {
        next = [...current, { source_id: task.id, content: task.content, estimated_minutes: 30 }];
      } else {
        next = current;
      }

      saveDraftTasks(date, next);
      return next;
    });
  }

  function handleContinue() {
    if (selectedTasks.length !== 3) {
      setError("Select exactly three tasks to continue.");
      return;
    }

    navigate("/estimate");
  }

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Big 3 selection</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Choose the three outcomes that matter most today.</h2>
          </div>
          <p className="rounded-full bg-accentSoft px-4 py-2 text-sm font-medium text-ink">{selectedTasks.length}/3 selected</p>
        </div>
      </section>

      <Big3Selector
        tasks={entries}
        selectedTaskIds={selectedTasks.map((task) => task.source_id)}
        onToggle={handleToggle}
      />

      <div className="flex flex-wrap gap-3">
        <Link to="/brain-dump" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/80">
          Back
        </Link>
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-full bg-pine px-5 py-3 text-sm font-medium text-white transition hover:bg-pine/90"
        >
          Estimate time
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
