export default function DataTable({ columns, rows, renderCell, loading = false, skeletonRows = 4 }) {
  return (
    <div className="table-shell">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, index) => (
                  <tr key={`skeleton-${index}`}>
                    {columns.map((column) => (
                      <td key={`${column}-${index}`}>
                        <div className="skeleton h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((row) => <tr key={row.id}>{renderCell(row)}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
