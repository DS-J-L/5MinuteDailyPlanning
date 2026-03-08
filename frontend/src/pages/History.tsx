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
        setError(loadError instanceof Error ? loadError.message : "기록을 불러오지 못했습니다.");
      }
    }

    void loadHistory();
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">기록</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">이전 날짜의 Big 3와 회고를 한눈에 돌아보세요.</h2>
      </section>

      {history.length ? (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryCard key={item.date} item={item} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[28px] border border-dashed border-ink/15 p-6 text-center text-sm text-ink/60">
          아직 저장된 기록이 없습니다. 계획과 회고를 남기면 이 페이지에 쌓입니다.
        </div>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
