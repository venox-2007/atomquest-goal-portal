import { NavLink } from "react-router-dom";
import { Activity, ClipboardList, FileClock, FileText, LayoutDashboard, Target } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/goals", label: "Goal Creation", icon: Target },
  { to: "/check-ins", label: "Quarterly Check-ins", icon: ClipboardList },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/audit-logs", label: "Audit Logs", icon: FileClock },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-72 border-r border-slate-800/80 bg-slate-950/92 p-5 shadow-2xl transition-transform duration-300 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-800/90 bg-slate-900/65 p-3">
        <div className="rounded-xl bg-cyan-500/20 p-2 text-cyan-300">
          <Activity size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">GoalTrack Pro</p>
          <p className="text-xs tracking-wide text-slate-400">Enterprise Portal</p>
        </div>
      </div>

      <nav className="space-y-1.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-500/30"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`
            }
          >
            <Icon size={17} className="transition-transform duration-200 group-hover:scale-105" /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
