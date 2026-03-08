import type { BrainDumpEntry } from "../types/planner";

type TaskListProps = {
  tasks: BrainDumpEntry[];
  onDelete?: (id: number) => Promise<void>;
};

export default function TaskList({ tasks, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="glass-panel rounded-[28px] border border-dashed border-ink/15 p-6 text-center text-sm text-ink/60">
        Your list is empty. Add at least three items to move to Big 3 selection.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="glass-panel flex items-center justify-between gap-4 rounded-[24px] border border-white/70 p-4 shadow-panel"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-pine/60">Item {index + 1}</p>
            <p className="mt-1 text-base text-ink">{task.content}</p>
          </div>
          {onDelete ? (
            <button
              type="button"
              onClick={() => void onDelete(task.id)}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/80"
            >
              Delete
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
