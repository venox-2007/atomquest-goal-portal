import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";

const statusOptions = ["Not Started", "On Track", "Completed"];

const initialCheckIns = [
  {
    id: "QCI-201",
    employee: "Aarav Mehta",
    goal: "Reduce Release Cycle Time",
    quarter: "Q2 2026",
    planned: 100,
    actual: 78,
    status: "On Track",
    managerComment: "Steady progress. Keep dependency risk visible in weekly sync.",
  },
  {
    id: "QCI-202",
    employee: "Neha Sharma",
    goal: "Improve CSAT to 4.6",
    quarter: "Q2 2026",
    planned: 100,
    actual: 62,
    status: "On Track",
    managerComment: "Good movement. Focus on queue triage automation to accelerate gains.",
  },
  {
    id: "QCI-203",
    employee: "Ritika Roy",
    goal: "Launch Self-Serve Onboarding",
    quarter: "Q2 2026",
    planned: 100,
    actual: 35,
    status: "Not Started",
    managerComment: "Vendor integration delay noted. Re-baseline milestones this week.",
  },
];

const quarterlyHistory = [
  {
    id: "H-101",
    quarter: "Q1 2026",
    event: "Quarter closed with 86% overall goal attainment",
    owner: "PMO Office",
    date: "2026-04-02",
  },
  {
    id: "H-102",
    quarter: "Q2 2026",
    event: "Mid-quarter review completed and status aligned",
    owner: "Manager Council",
    date: "2026-05-08",
  },
  {
    id: "H-103",
    quarter: "Q2 2026",
    event: "Corrective action plan recorded for delayed onboarding stream",
    owner: "Product Leadership",
    date: "2026-05-14",
  },
];

function progressTone(value) {
  if (value >= 80) return "bg-emerald-400";
  if (value >= 50) return "bg-cyan-400";
  return "bg-amber-400";
}

export default function QuarterlyCheckInsPage() {
  const [rows, setRows] = useState(initialCheckIns);

  const totals = useMemo(() => {
    const totalProgress = rows.reduce((sum, row) => sum + Math.round((Math.min(row.actual, row.planned) / row.planned) * 100), 0);
    const avgProgress = rows.length ? Math.round(totalProgress / rows.length) : 0;
    return { avgProgress };
  }, [rows]);

  const updateRow = (id, key, value) => {
    setRows((previous) =>
      previous.map((row) => {
        if (row.id !== id) return row;

        if (key === "planned" || key === "actual") {
          return { ...row, [key]: Math.max(0, Number(value) || 0) };
        }

        return { ...row, [key]: value };
      }),
    );
  };

  return (
    <section>
      <PageHeader
        title="Quarterly Check-ins"
        subtitle="Track planned versus actual achievement, update status, and capture manager review comments."
        actions={<button className="button-secondary">Export Check-ins</button>}
      />

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Average Progress</p>
          <p className="mt-2 text-2xl font-semibold text-white">{totals.avgProgress}%</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Check-ins Logged</p>
          <p className="mt-2 text-2xl font-semibold text-white">{rows.length}</p>
        </div>
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Current Quarter</p>
          <p className="mt-2 text-2xl font-semibold text-white">Q2 2026</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/70 text-sm">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Employee</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Goal</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Planned</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Actual</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Progress</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-400">Manager Comment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map((row) => {
                  const progress = row.planned > 0 ? Math.min(100, Math.round((row.actual / row.planned) * 100)) : 0;
                  return (
                    <tr key={row.id} className="align-top hover:bg-slate-800/45">
                      <td className="px-4 py-3 text-slate-100">{row.employee}</td>
                      <td className="px-4 py-3 text-slate-200">{row.goal}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="1"
                          className="input"
                          value={row.planned}
                          onChange={(event) => updateRow(row.id, "planned", event.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          className="input"
                          value={row.actual}
                          onChange={(event) => updateRow(row.id, "actual", event.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="select w-full"
                          value={row.status}
                          onChange={(event) => updateRow(row.id, "status", event.target.value)}
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <p className="mb-2 text-xs text-slate-300">{progress}%</p>
                        <div className="h-2.5 w-36 rounded-full bg-slate-800">
                          <div
                            className={`h-2.5 rounded-full ${progressTone(progress)}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <textarea
                          className="input min-h-20"
                          value={row.managerComment}
                          onChange={(event) => updateRow(row.id, "managerComment", event.target.value)}
                          placeholder="Manager review comment"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Quarterly History Timeline</h2>
          <p className="mt-1 text-sm text-slate-400">Chronological view of prior quarter check-in milestones.</p>

          <ol className="mt-5 space-y-4 border-l border-slate-700 pl-4">
            {quarterlyHistory.map((item) => (
              <li key={item.id} className="relative">
                <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <p className="text-xs uppercase tracking-wide text-cyan-300">{item.quarter}</p>
                <p className="mt-1 text-sm text-slate-100">{item.event}</p>
                <p className="mt-1 text-xs text-slate-400">{item.owner} | {item.date}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
