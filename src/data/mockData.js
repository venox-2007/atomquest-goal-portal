export const roles = ["Employee", "Manager", "Admin"];

export const kpis = [
  { label: "Goals On Track", value: "84%", delta: "+6%", trend: "up" },
  { label: "Overdue Check-ins", value: "18", delta: "-4", trend: "up" },
  { label: "Avg Goal Score", value: "4.2/5", delta: "+0.3", trend: "up" },
  { label: "Audit Alerts", value: "3", delta: "+1", trend: "down" },
];

export const goals = [
  { id: "G-1192", title: "Reduce Release Cycle Time", owner: "Aarav Mehta", department: "Platform", progress: 72, quarter: "Q2", status: "On Track" },
  { id: "G-1247", title: "Improve CSAT to 4.6", owner: "Neha Sharma", department: "Support", progress: 54, quarter: "Q2", status: "At Risk" },
  { id: "G-1301", title: "Launch Self-Serve Onboarding", owner: "Ritika Roy", department: "Product", progress: 31, quarter: "Q2", status: "Delayed" },
  { id: "G-1272", title: "Increase Pipeline Coverage", owner: "Vikram Jain", department: "Sales", progress: 81, quarter: "Q2", status: "On Track" },
];

export const checkIns = [
  { id: "C-884", employee: "Aarav Mehta", date: "2026-05-11", confidence: "High", blockers: "None" },
  { id: "C-885", employee: "Neha Sharma", date: "2026-05-12", confidence: "Medium", blockers: "Hiring backlog" },
  { id: "C-886", employee: "Ritika Roy", date: "2026-05-12", confidence: "Low", blockers: "Vendor API delays" },
  { id: "C-887", employee: "Vikram Jain", date: "2026-05-13", confidence: "High", blockers: "None" },
];

export const reports = [
  { id: "R-31", name: "Quarterly Goal Alignment", generatedBy: "PMO Bot", generatedAt: "2026-05-14", format: "PDF" },
  { id: "R-32", name: "Manager Effectiveness Heatmap", generatedBy: "Anita Verma", generatedAt: "2026-05-14", format: "XLSX" },
  { id: "R-33", name: "Department Goal Burndown", generatedBy: "PMO Bot", generatedAt: "2026-05-15", format: "CSV" },
];

export const auditLogs = [
  { id: "L-571", actor: "Admin", action: "Role updated", target: "Neha Sharma", timestamp: "2026-05-15 10:42" },
  { id: "L-572", actor: "Manager", action: "Goal status changed", target: "G-1247", timestamp: "2026-05-15 11:03" },
  { id: "L-573", actor: "Employee", action: "Check-in submitted", target: "C-886", timestamp: "2026-05-15 11:29" },
  { id: "L-574", actor: "Admin", action: "Policy updated", target: "Quarterly rubric", timestamp: "2026-05-15 12:11" },
];

export const rolePermissions = {
  Employee: ["Create personal goals", "Submit check-ins", "View own reports"],
  Manager: ["Review team goals", "Approve check-ins", "Generate team reports"],
  Admin: ["Manage roles", "Access audit logs", "Configure portal settings"],
};
