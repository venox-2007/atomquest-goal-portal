import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { kpis, auditLogs, rolePermissions } from "../data/mockData";
import KpiCard from "../components/KpiCard";
import PageHeader from "../components/PageHeader";

const adminKpis = [
  { label: "Total Active Goals", value: "48", delta: "+5", trend: "up" },
  { label: "Completion Rate", value: "79%", delta: "+3.2%", trend: "up" },
  { label: "Pending Approvals", value: "12", delta: "-2", trend: "up" },
  { label: "Audit Exceptions", value: "4", delta: "+1", trend: "down" },
];

const completionAnalytics = [
  { team: "Engineering", completed: 82, target: 90 },
  { team: "Product", completed: 67, target: 85 },
  { team: "Support", completed: 73, target: 80 },
  { team: "Sales", completed: 88, target: 92 },
];

const goalCompletionDistribution = [
  { name: "Completed", value: 31, color: "#34d399" },
  { name: "On Track", value: 11, color: "#22d3ee" },
  { name: "At Risk", value: 4, color: "#f59e0b" },
  { name: "Delayed", value: 2, color: "#fb7185" },
];

const pendingApprovals = [
  { id: "APR-341", employee: "Aarav Mehta", goals: 6, submittedOn: "2026-05-14", manager: "Priya Nair" },
  { id: "APR-342", employee: "Ritika Roy", goals: 5, submittedOn: "2026-05-15", manager: "Saurabh Jain" },
  { id: "APR-343", employee: "Neha Sharma", goals: 4, submittedOn: "2026-05-15", manager: "Anita Verma" },
];

const sharedGoalManagement = [
  { id: "SG-121", title: "Improve Uptime SLA", ownerTeam: "Platform", visibility: "Org-wide", status: "Active" },
  { id: "SG-122", title: "Reduce Response Time", ownerTeam: "Support", visibility: "Cross-team", status: "Active" },
  { id: "SG-123", title: "Optimize Pipeline Health", ownerTeam: "Sales Ops", visibility: "Leadership", status: "Draft" },
];

function exportAdminCsv() {
  const headers = ["Section", "Id", "Name", "Value", "Status", "Date"];
  const rows = [
    ...pendingApprovals.map((item) => ["PendingApproval", item.id, item.employee, `${item.goals} goals`, "Pending", item.submittedOn]),
    ...sharedGoalManagement.map((item) => ["SharedGoal", item.id, item.title, item.ownerTeam, item.status, "-"]),
    ...auditLogs.map((item) => ["AuditLog", item.id, item.actor, item.action, item.target, item.timestamp]),
  ];

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `admin-dashboard-export-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function AdminDashboard() {
  return (
    <section>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Enterprise governance cockpit for goal execution, approvals, completion analytics, and compliance oversight."
        actions={<button className="button-primary" onClick={exportAdminCsv}>Export CSV</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Completion Analytics</h2>
          <p className="mt-1 text-sm text-slate-400">Planned completion targets versus current achieved percentages by team.</p>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="team" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#e2e8f0" }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
                <Bar dataKey="target" fill="#64748b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="completed" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Goal Completion Mix</h2>
          <p className="mt-1 text-sm text-slate-400">Distribution of enterprise goals by completion status.</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={goalCompletionDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {goalCompletionDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#e2e8f0" }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Pending Approvals</h2>
          <p className="mt-1 text-sm text-slate-400">Goal plans waiting for manager approval action.</p>
          <div className="mt-4 space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-100">{item.employee}</p>
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">Pending</span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{item.id} | {item.goals} goals | Manager: {item.manager}</p>
                <p className="mt-1 text-xs text-slate-500">Submitted: {item.submittedOn}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Shared Goal Management</h2>
          <p className="mt-1 text-sm text-slate-400">Centralized control of shared goals across teams and leadership groups.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/70 text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-slate-400">Goal</th>
                  <th className="px-3 py-2 text-left text-slate-400">Owner Team</th>
                  <th className="px-3 py-2 text-left text-slate-400">Visibility</th>
                  <th className="px-3 py-2 text-left text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sharedGoalManagement.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40">
                    <td className="px-3 py-2 text-slate-200">{item.title}</td>
                    <td className="px-3 py-2 text-slate-300">{item.ownerTeam}</td>
                    <td className="px-3 py-2 text-slate-300">{item.visibility}</td>
                    <td className="px-3 py-2 text-slate-300">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <article className="panel mt-6 p-5">
        <h2 className="text-lg font-semibold text-white">Audit Logs</h2>
        <p className="mt-1 text-sm text-slate-400">Recent governance and security-relevant actions across the portal.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700/70 text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-slate-400">Log ID</th>
                <th className="px-3 py-2 text-left text-slate-400">Actor</th>
                <th className="px-3 py-2 text-left text-slate-400">Action</th>
                <th className="px-3 py-2 text-left text-slate-400">Target</th>
                <th className="px-3 py-2 text-left text-slate-400">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="px-3 py-2 text-slate-200">{log.id}</td>
                  <td className="px-3 py-2 text-slate-300">{log.actor}</td>
                  <td className="px-3 py-2 text-slate-300">{log.action}</td>
                  <td className="px-3 py-2 text-slate-300">{log.target}</td>
                  <td className="px-3 py-2 text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}

function StandardDashboard({ role }) {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Cross-functional overview of enterprise goal performance and compliance health."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Quarter Progress Snapshot</h2>
          <p className="mt-1 text-sm text-slate-400">Current quarter execution trend across departments.</p>
          <div className="mt-5 space-y-4">
            {completionAnalytics.map((team) => (
              <div key={team.team}>
                <div className="mb-2 flex justify-between text-sm text-slate-300">
                  <span>{team.team}</span>
                  <span>{team.completed}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${team.completed}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel p-5">
          <h2 className="text-lg font-semibold text-white">Role Permissions</h2>
          <p className="mt-1 text-sm text-slate-400">Active role: {role}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {rolePermissions[role].map((permission) => (
              <li key={permission} className="rounded-lg bg-slate-800/70 px-3 py-2">
                {permission}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default function DashboardPage({ role }) {
  if (role === "Admin") {
    return <AdminDashboard />;
  }

  return <StandardDashboard role={role} />;
}
