/** Small pill that opens each section: "● 01 · Studio". */
export default function SectionLabel({ index, label, tone = "light", className = "" }) {
  const dark = tone === "dark";
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 ${
        dark ? "border-white/12 bg-white/5 text-lavender/70" : "border-ink/10 bg-paper/70 text-mist"
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-peach" aria-hidden="true" />
      {index && <span className={dark ? "text-peach" : "text-ember"}>{index}</span>}
      {index && <span aria-hidden="true">·</span>}
      {label}
    </span>
  );
}
