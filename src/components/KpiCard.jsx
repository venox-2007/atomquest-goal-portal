import { TrendingDown, TrendingUp } from "lucide-react";

const toneMap = {
  up: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  down: "text-rose-300 border-rose-500/30 bg-rose-500/10",
};

export default function KpiCard({ label, value, delta, trend }) {
  const Icon = trend === "down" ? TrendingDown : TrendingUp;
  return (
    <article className="premium-card p-5 hover:-translate-y-0.5 hover:border-slate-500/80">
      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-[1.72rem] font-semibold leading-none text-white">{value}</p>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[trend]}`}>
          <Icon size={13} /> {delta}
        </span>
      </div>
    </article>
  );
}
