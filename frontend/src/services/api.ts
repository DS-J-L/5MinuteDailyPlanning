import type {
  ApiResponse,
  Big3Task,
  BrainDumpEntry,
  DailyPlan,
  DailyReview,
  DraftTask,
  HistoryItem,
  TodayData
} from "../types/planner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.success ? "요청 처리에 실패했습니다." : payload.error);
  }

  return payload.data;
}

export function getToday(date: string) {
  return request<TodayData>(`/api/today?date=${date}`);
}

export function getBrainDump(date: string) {
  return request<BrainDumpEntry[]>(`/api/brain-dump?date=${date}`);
}

export function createBrainDump(date: string, content: string) {
  return request<BrainDumpEntry>("/api/brain-dump", {
    method: "POST",
    body: JSON.stringify({ date, content })
  });
}

export function deleteBrainDump(id: number) {
  return request<{ deleted_id: number }>(`/api/brain-dump/${id}`, {
    method: "DELETE"
  });
}

export function createDailyPlan(date: string, tasks: DraftTask[]) {
  return request<DailyPlan>("/api/daily-plan", {
    method: "POST",
    body: JSON.stringify({
      date,
      tasks: tasks.map((task) => ({
        content: task.content,
        estimated_minutes: task.estimated_minutes
      }))
    })
  });
}

export function getDailyPlan(date: string) {
  return request<DailyPlan | null>(`/api/daily-plan?date=${date}`);
}

export function updateBig3Task(
  id: number,
  updates: Partial<Pick<Big3Task, "estimated_minutes" | "is_completed">>,
) {
  return request<Big3Task>(`/api/big3-task/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates)
  });
}

export function getReview(date: string) {
  return request<DailyReview | null>(`/api/review?date=${date}`);
}

export function createReview(date: string, memo: string) {
  return request<DailyReview>("/api/review", {
    method: "POST",
    body: JSON.stringify({ date, memo })
  });
}

export function getHistory() {
  return request<HistoryItem[]>("/api/history");
}
