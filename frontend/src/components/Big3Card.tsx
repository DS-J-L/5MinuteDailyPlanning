import { formatMinutes } from "../lib/date";
import type { Big3Task } from "../types/planner";

type Big3CardProps = {
  task: Big3Task;
  onComplete: (task: Big3Task) => Promise<void>;
};

export default function Big3Card({ task, onComplete }: Big3CardProps) {
  return (
    <div
      className={`rounded-[28px] border p-5 shadow-panel transition ${
        task.is_completed ? "border-pine bg-mist" : "glass-panel border-white/70"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pine/70">Priority {task.sort_order + 1}</p>
          <h3 className="mt-2 text-xl font-medium text-ink">{task.content}</h3>
          <p className="mt-2 text-sm text-ink/70">{formatMinutes(task.estimated_minutes)}</p>
        </div>
        <label className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() => void onComplete(task)}
            className="h-4 w-4 rounded border-ink/20 text-pine focus:ring-pine"
          />
          Done
        </label>
      </div>
    </div>
  );
}
