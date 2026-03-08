import { type FormEvent, useState } from "react";

type BrainDumpInputProps = {
  onAdd: (content: string) => Promise<void>;
};

export default function BrainDumpInput({ onAdd }: BrainDumpInputProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd(trimmed);
      setContent("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-[28px] border border-white/70 p-5 shadow-panel">
      <label className="mb-3 block text-sm font-medium text-ink/80" htmlFor="brain-dump-input">
        What is taking up space in your head today?
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="brain-dump-input"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write one task or thought"
          className="flex-1 rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-accent px-5 py-3 font-medium text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Adding..." : "Add item"}
        </button>
      </div>
    </form>
  );
}
