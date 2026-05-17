import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { auditLogs } from "../data/mockData";

const columns = ["Log ID", "Actor", "Action", "Target", "Timestamp"];

export default function AuditLogsPage() {
  return (
    <section>
      <PageHeader
        title="Audit Logs"
        subtitle="Immutable timeline of critical changes for governance and compliance tracking."
      />
      <DataTable
        columns={columns}
        rows={auditLogs}
        renderCell={(row) => (
          <>
            <td className="px-4 py-3 text-slate-100">{row.id}</td>
            <td className="px-4 py-3 text-slate-200">{row.actor}</td>
            <td className="px-4 py-3 text-slate-300">{row.action}</td>
            <td className="px-4 py-3 text-slate-300">{row.target}</td>
            <td className="px-4 py-3 text-slate-300">{row.timestamp}</td>
          </>
        )}
      />
    </section>
  );
}
