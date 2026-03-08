type ReviewEditorProps = {
  memo: string;
  onChange: (value: string) => void;
};

export default function ReviewEditor({ memo, onChange }: ReviewEditorProps) {
  return (
    <div className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
      <label htmlFor="review-editor" className="block text-sm uppercase tracking-[0.2em] text-pine/70">
        하루 회고
      </label>
      <textarea
        id="review-editor"
        value={memo}
        onChange={(event) => onChange(event.target.value)}
        rows={10}
        placeholder="오늘 잘한 점과 내일 더 나아질 점을 간단히 적어보세요."
        className="mt-4 w-full rounded-[24px] border border-ink/10 bg-white px-4 py-4 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
