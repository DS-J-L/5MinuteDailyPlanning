import type { DraftTask } from "../types/planner";

const STORAGE_KEY = "five-minute-daily-planning-draft";

function buildKey(date: string) {
  return `${STORAGE_KEY}:${date}`;
}

export function getDraftTasks(date: string): DraftTask[] {
  const stored = sessionStorage.getItem(buildKey(date));
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as DraftTask[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((task) => typeof task.content === "string" && typeof task.estimated_minutes === "number")
      .map((task, index) => ({
        source_id: typeof task.source_id === "number" ? task.source_id : index,
        content: task.content,
        estimated_minutes: task.estimated_minutes
      }));
  } catch {
    return [];
  }
}

export function saveDraftTasks(date: string, tasks: DraftTask[]) {
  sessionStorage.setItem(buildKey(date), JSON.stringify(tasks));
}

export function clearDraftTasks(date: string) {
  sessionStorage.removeItem(buildKey(date));
}
