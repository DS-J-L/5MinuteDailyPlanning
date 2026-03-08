import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Big3Card from "../components/Big3Card";
import { formatMinutes, getTodayKey } from "../lib/date";
import { getDailyPlan, updateBig3Task } from "../services/api";
import type { Big3Task, DailyPlan } from "../types/planner";

export default function TodayPage() {
  const date = getTodayKey();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlan() {
      try {
        setError("");
        const data = await getDailyPlan(date);
        setPlan(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "오늘 계획을 불러오지 못했습니다.");
      }
    }

    void loadPlan();
  }, [date]);

  async function handleToggleComplete(task: Big3Task) {
    try {
      setError("");
      const updatedTask = await updateBig3Task(task.id, { is_completed: !task.is_completed });
      setPlan((current) =>
        current
          ? {
              ...current,
              tasks: current.tasks.map((currentTask) => (currentTask.id === updatedTask.id ? updatedTask : currentTask))
            }
          : current,
      );
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "작업 상태를 수정하지 못했습니다.");
    }
  }

  const totalMinutes = plan?.tasks.reduce((sum, task) => sum + task.estimated_minutes, 0) ?? 0;
  const completedCount = plan?.tasks.filter((task) => task.is_completed).length ?? 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <div className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">오늘 계획</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">오늘 하루를 의도적으로 작게 유지하세요.</h2>
          <p className="mt-3 text-sm text-ink/70">
            {plan ? `${completedCount}/3 완료 · ${formatMinutes(totalMinutes)}` : "오늘 저장된 계획이 아직 없습니다."}
          </p>
        </div>

        <div className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">다음 단계</p>
          <h3 className="mt-2 text-2xl font-semibold text-pine">짧은 회고로 하루를 마무리하세요.</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/review" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent/90">
              회고 작성
            </Link>
            <Link to="/brain-dump" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/80">
              다시 계획하기
            </Link>
          </div>
        </div>
      </section>

      {plan?.tasks.length ? (
        <div className="grid gap-4">
          {plan.tasks.map((task) => (
            <Big3Card key={task.id} task={task} onComplete={handleToggleComplete} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-[28px] border border-dashed border-ink/15 p-6 text-center text-sm text-ink/60">
          먼저 하루 계획을 저장해야 오늘의 Big 3를 볼 수 있습니다.
        </div>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
