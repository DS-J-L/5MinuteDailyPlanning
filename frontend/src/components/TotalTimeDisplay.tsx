import { formatMinutes } from "../lib/date";

type TotalTimeDisplayProps = {
  totalMinutes: number;
};

export default function TotalTimeDisplay({ totalMinutes }: TotalTimeDisplayProps) {
  return (
    <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
      <p className="text-sm uppercase tracking-[0.2em] text-pine/70">총 예상 시간</p>
      <p className="mt-2 text-3xl font-semibold text-pine">{formatMinutes(totalMinutes)}</p>
    </div>
  );
}
