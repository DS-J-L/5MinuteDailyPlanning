export type BrainDumpEntry = {
  id: number;
  date: string;
  content: string;
  created_at: string;
};

export type Big3Task = {
  id: number;
  content: string;
  estimated_minutes: number;
  is_completed: boolean;
  sort_order: number;
};

export type DailyPlan = {
  id: number;
  date: string;
  created_at: string;
  tasks: Big3Task[];
};

export type DailyReview = {
  id: number;
  date: string;
  memo: string;
  created_at: string;
  updated_at: string;
};

export type TodayData = {
  date: string;
  brain_dump_entries: BrainDumpEntry[];
  daily_plan: DailyPlan | null;
  review: DailyReview | null;
};

export type HistoryItem = {
  date: string;
  tasks: Big3Task[];
  review: string;
};

export type DraftTask = {
  source_id: number;
  content: string;
  estimated_minutes: number;
};

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
