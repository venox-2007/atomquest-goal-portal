import { Bell, Menu } from "lucide-react";
import { roles } from "../data/mockData";

export default function Topbar({ role, onRoleChange, onToggleSidebar }) {
  return (
    <header className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/55 px-3 py-2.5 md:px-4">
      <button
        onClick={onToggleSidebar}
        className="rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu size={18} />
      </button>

      <div className="hidden text-sm font-medium text-slate-300 md:block">Goal Setting & Tracking Portal</div>

      <div className="ml-auto flex items-center gap-3">
        <span className="badge hidden md:inline-flex">Role Access</span>
        <select
          className="select"
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
          aria-label="Role switcher"
        >
          {roles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          className="rounded-xl border border-slate-700 p-2 text-slate-300 transition hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}
