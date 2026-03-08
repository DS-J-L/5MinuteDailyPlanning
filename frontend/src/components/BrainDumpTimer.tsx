import { useEffect, useState } from "react";

type BrainDumpTimerProps = {
  initialSeconds?: number;
};

export default function BrainDumpTimer({ initialSeconds = 120 }: BrainDumpTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || secondsLeft === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const minutes = `${Math.floor(secondsLeft / 60)}`.padStart(2, "0");
  const seconds = `${secondsLeft % 60}`.padStart(2, "0");

  function handleReset() {
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }

  return (
    <section className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
      <p className="text-sm uppercase tracking-[0.25em] text-pine/70">Brain dump sprint</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-4xl font-semibold text-pine">
            {minutes}:{seconds}
          </p>
          <p className="mt-1 text-sm text-ink/70">Capture as many thoughts as you can in two minutes.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsRunning((current) => !current)}
            className="rounded-full bg-pine px-4 py-2 text-sm font-medium text-white transition hover:bg-pine/90"
          >
            {isRunning ? "Pause" : secondsLeft === 0 ? "Done" : "Resume"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/80"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
