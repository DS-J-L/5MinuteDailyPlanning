import type { DraftTask } from "../types/planner";

type TimeEstimateInputProps = {
  task: DraftTask;
  onChange: (minutes: number) => void;
};

export default function TimeEstimateInput({ task, onChange }: TimeEstimateInputProps) {
  return (
    <div className="glass-panel rounded-[24px] border border-white/70 p-5 shadow-panel">
      <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Big 3 task</p>
      <p className="mt-2 text-lg font-medium text-ink">{task.content}</p>
      <label className="mt-4 block text-sm text-ink/70">
        Estimated minutes
        <input
          type="number"
          min={1}
          max={1440}
          value={task.estimated_minutes}
          onChange={(event) => onChange(Number(event.target.value))}
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>
    </div>
  );
}
