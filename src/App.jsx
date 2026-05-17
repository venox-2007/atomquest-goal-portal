import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import GoalCreationPage from "./pages/GoalCreationPage";
import QuarterlyCheckInsPage from "./pages/QuarterlyCheckInsPage";
import ReportsPage from "./pages/ReportsPage";
import AuditLogsPage from "./pages/AuditLogsPage";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import DataTable from "./components/DataTable";
import StatusBadge from "./components/StatusBadge";
import PageHeader from "./components/PageHeader";
import { goals, roles } from "./data/mockData";

const initialGoalWorkflow = {
  goals: [],
  submissionStatus: "draft",
};

function GoalsOverviewPage({ role, goalWorkflow, setGoalWorkflow }) {
  const visibleGoals = useMemo(() => {
    if (role === "Employee") {
      return goals.slice(0, 2);
    }
    return goals;
  }, [role]);

  return (
    <section className="space-y-6">
      <PageHeader
        title="Goal Creation"
        subtitle="View and shape goal portfolio before creating or submitting new objectives."
        actions={<button className="button-primary">New Goal</button>}
      />

      <DataTable
        columns={["Goal ID", "Title", "Owner", "Department", "Progress", "Quarter", "Status"]}
        rows={visibleGoals}
        renderCell={(row) => (
          <>
            <td className="text-slate-100">{row.id}</td>
            <td className="text-slate-200">{row.title}</td>
            <td className="text-slate-300">{row.owner}</td>
            <td className="text-slate-300">{row.department}</td>
            <td className="text-slate-300">{row.progress}%</td>
            <td className="text-slate-300">{row.quarter}</td>
            <td><StatusBadge status={row.status} /></td>
          </>
        )}
      />

      <GoalCreationPage
        role={role}
        goals={goalWorkflow.goals}
        submissionStatus={goalWorkflow.submissionStatus}
        setGoalWorkflow={setGoalWorkflow}
      />
    </section>
  );
}

export default function App() {
  const [role, setRole] = useState(roles[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goalWorkflow, setGoalWorkflow] = useState(initialGoalWorkflow);

  return (
    <div className="min-h-screen text-slate-100">
      <Sidebar isOpen={sidebarOpen} />

      <div className="min-h-screen md:ml-72">
        <main className="mx-auto max-w-[1700px] px-4 py-5 md:px-8 md:py-7">
          <Topbar
            role={role}
            onRoleChange={setRole}
            onToggleSidebar={() => setSidebarOpen((state) => !state)}
          />

          <Routes>
            <Route path="/" element={<DashboardPage role={role} />} />
            <Route
              path="/goals"
              element={<GoalsOverviewPage role={role} goalWorkflow={goalWorkflow} setGoalWorkflow={setGoalWorkflow} />}
            />
            <Route path="/check-ins" element={<QuarterlyCheckInsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/audit-logs" element={<AuditLogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
