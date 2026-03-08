import type { BrainDumpEntry } from "../types/planner";

type Big3SelectorProps = {
  tasks: BrainDumpEntry[];
  selectedTaskIds: number[];
  onToggle: (task: BrainDumpEntry) => void;
};

export default function Big3Selector({ tasks, selectedTaskIds, onToggle }: Big3SelectorProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {tasks.map((task) => {
        const isSelected = selectedTaskIds.includes(task.id);
        return (
          <button
            key={task.id}
            type="button"
            onClick={() => onToggle(task)}
            className={`rounded-[24px] border p-5 text-left transition ${
              isSelected
                ? "border-pine bg-pine text-white shadow-panel"
                : "glass-panel border-white/70 text-ink hover:border-accent hover:bg-white/90"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">{isSelected ? "선택됨" : "탭해서 선택"}</p>
            <p className="mt-2 text-lg font-medium">{task.content}</p>
          </button>
        );
      })}
    </div>
  );
}
