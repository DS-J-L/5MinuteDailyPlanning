import { useEffect, useState } from "react";

import HistoryCard from "../components/HistoryCard";
import { getHistory } from "../services/api";
import type { HistoryItem } from "../types/planner";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        setError("");
        const data = await getHistory();
        setHistory(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load history.");
      }
    }

    void loadHistory();
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">History</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Look back on previous days and how the Big 3 actually played out.</h2>
      </section>

      {history.length ? (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryCard key={item.date} item={item} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[28px] border border-dashed border-ink/15 p-6 text-center text-sm text-ink/60">
          No saved history yet. Complete a plan and review to populate this page.
        </div>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
