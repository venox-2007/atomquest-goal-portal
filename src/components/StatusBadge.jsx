const statusStyle = {
  "On Track": "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
  "At Risk": "border-amber-500/40 bg-amber-500/15 text-amber-200",
  Delayed: "border-rose-500/40 bg-rose-500/15 text-rose-200",
  Completed: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${statusStyle[status] ?? "border-slate-600 bg-slate-800 text-slate-200"}`}
    >
      {status}
    </span>
  );
}
