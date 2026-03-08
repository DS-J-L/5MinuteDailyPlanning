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
        setError(loadError instanceof Error ? loadError.message : "브레인 덤프 항목을 불러오지 못했습니다.");
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
      setError(addError instanceof Error ? addError.message : "항목을 추가하지 못했습니다.");
    }
  }

  async function handleDelete(id: number) {
    try {
      setError("");
      await deleteBrainDump(id);
      setEntries((current) => current.filter((entry) => entry.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "항목을 삭제하지 못했습니다.");
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
            <p className="text-sm uppercase tracking-[0.2em] text-pine/70">브레인 덤프 목록</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">우선순위를 정하기 전에 먼저 전부 적어보세요.</h2>
          </div>
          <Link
            to="/pick-big3"
            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
              entries.length >= 3 ? "bg-pine text-white hover:bg-pine/90" : "pointer-events-none bg-white/70 text-ink/40"
            }`}
          >
            Big 3 고르기
          </Link>
        </div>

        <TaskList tasks={entries} onDelete={handleDelete} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </section>
    </div>
  );
}
