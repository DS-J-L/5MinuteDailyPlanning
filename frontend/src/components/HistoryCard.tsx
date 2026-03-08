import { formatLongDate, formatMinutes } from "../lib/date";
import type { HistoryItem } from "../types/planner";

type HistoryCardProps = {
  item: HistoryItem;
};

export default function HistoryCard({ item }: HistoryCardProps) {
  const completedCount = item.tasks.filter((task) => task.is_completed).length;
  const totalMinutes = item.tasks.reduce((sum, task) => sum + task.estimated_minutes, 0);

  return (
    <article className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pine/70">Day log</p>
          <h3 className="mt-2 text-2xl font-semibold text-ink">{formatLongDate(item.date)}</h3>
          <p className="mt-2 text-sm text-ink/70">
            {completedCount}/3 completed · {formatMinutes(totalMinutes)}
          </p>
        </div>
        <span className="rounded-full bg-accentSoft px-4 py-2 text-sm font-medium text-ink">Latest first</span>
      </div>

      <div className="mt-5 space-y-3">
        {item.tasks.map((task) => (
          <div key={task.id} className="rounded-2xl bg-white/70 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-ink">{task.content}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${task.is_completed ? "bg-mist text-pine" : "bg-surface text-ink/70"}`}>
                {task.is_completed ? "Done" : "Open"}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/60">{formatMinutes(task.estimated_minutes)}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] bg-pine px-4 py-4 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Review</p>
        <p className="mt-2 text-sm leading-6">{item.review || "No review written for this day."}</p>
      </div>
    </article>
  );
}
