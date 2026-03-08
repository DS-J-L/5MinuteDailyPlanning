import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ReviewEditor from "../components/ReviewEditor";
import { getTodayKey } from "../lib/date";
import { createReview, getReview } from "../services/api";

export default function ReviewPage() {
  const date = getTodayKey();
  const navigate = useNavigate();
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadReview() {
      try {
        setError("");
        const review = await getReview(date);
        setMemo(review?.memo ?? "");
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "회고를 불러오지 못했습니다.");
      }
    }

    void loadReview();
  }, [date]);

  async function handleSave() {
    try {
      setIsSaving(true);
      setError("");
      await createReview(date, memo);
      navigate("/history");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "회고를 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">하루 마무리</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">넘어가기 전에 짧게 회고를 남겨보세요.</h2>
        <p className="mt-3 text-sm text-ink/70">회고는 날짜별로 저장되며 나중에 다시 수정할 수 있습니다.</p>
      </section>

      <ReviewEditor memo={memo} onChange={setMemo} />

      <div className="flex flex-wrap gap-3">
        <Link to="/today" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/80">
          이전
        </Link>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="rounded-full bg-pine px-5 py-3 text-sm font-medium text-white transition hover:bg-pine/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "저장 중..." : "회고 저장"}
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
