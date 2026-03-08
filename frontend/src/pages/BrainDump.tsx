import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BrainDumpInput from "../components/BrainDumpInput";
import BrainDumpTimer from "../components/BrainDumpTimer";
import TaskList from "../components/TaskList";
import { getTodayKey } from "../lib/date";
import { createBrainDump, deleteBrainDump, getBrainDump } from "../services/api";
import type { BrainDumpEntry } from "../types/planner";

export default function BrainDumpPage() {
  const date = getTodayKey();
  const [entries, setEntries] = useState<BrainDumpEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEntries() {
      try {
        setError("");
        const data = await getBrainDump(date);
        setEntries(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load brain dump items.");
      }
    }

    void loadEntries();
  }, [date]);

  async function handleAdd(content: string) {
    try {
      setError("");
      const newEntry = await createBrainDump(date, content);
      setEntries((current) => [...current, newEntry]);
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : "Failed to add item.");
    }
  }

  async function handleDelete(id: number) {
    try {
      setError("");
      await deleteBrainDump(id);
      setEntries((current) => current.filter((entry) => entry.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete item.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <BrainDumpInput onAdd={handleAdd} />
        <BrainDumpTimer />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Brain dump list</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Capture everything before you prioritize.</h2>
          </div>
          <Link
            to="/pick-big3"
            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
              entries.length >= 3 ? "bg-pine text-white hover:bg-pine/90" : "pointer-events-none bg-white/70 text-ink/40"
            }`}
          >
            Pick Big 3
          </Link>
        </div>

        <TaskList tasks={entries} onDelete={handleDelete} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </section>
    </div>
  );
}
