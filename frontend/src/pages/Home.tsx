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
        setError(loadError instanceof Error ? loadError.message : "오늘 계획을 불러오지 못했습니다.");
      }
    }

    void loadData();
  }, [date]);

  const totalMinutes = todayData?.daily_plan?.tasks.reduce((sum, task) => sum + task.estimated_minutes, 0) ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
      <section className="glass-panel rounded-[36px] border border-white/70 p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.3em] text-pine/70">오늘의 시작</p>
        <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink">머릿속을 정리하고, 중요한 3가지를 고르고, 짧게 회고하세요.</h2>
        <p className="mt-4 max-w-lg text-base text-ink/70">
          이 앱은 하루 계획을 작게 유지합니다. 브레인 덤프, Big 3 선택, 예상 시간 입력, 실행, 회고까지 한 흐름으로 이어집니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/brain-dump"
            className="rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent/90"
          >
            계획 시작하기
          </Link>
          <Link
            to="/today"
            className="rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:bg-white/80"
          >
            오늘 계획 보기
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">오늘 상태</p>
          <p className="mt-3 text-3xl font-semibold text-pine">{todayData?.daily_plan ? "계획 준비 완료" : "아직 계획이 없어요"}</p>
          <p className="mt-2 text-sm text-ink/70">
            {todayData?.daily_plan ? `${todayData.daily_plan.tasks.length}개의 핵심 작업이 정해졌습니다.` : "2분 브레인 덤프부터 시작해보세요."}
          </p>
        </div>

        <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">총 예상 시간</p>
          <p className="mt-3 text-3xl font-semibold text-ink">{formatMinutes(totalMinutes)}</p>
          <p className="mt-2 text-sm text-ink/70">저장된 오늘의 Big 3 계획 기준입니다.</p>
        </div>

        <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">오늘의 Big 3</p>
          <div className="mt-4 space-y-3">
            {todayData?.daily_plan?.tasks.length ? (
              todayData.daily_plan.tasks.map((task) => (
                <div key={task.id} className="rounded-2xl bg-white/80 px-4 py-3">
                  <p className="font-medium text-ink">{task.content}</p>
                  <p className="mt-1 text-sm text-ink/60">{formatMinutes(task.estimated_minutes)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/60">오늘 저장된 작업이 아직 없습니다.</p>
            )}
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        </div>
      </section>
    </div>
  );
}
