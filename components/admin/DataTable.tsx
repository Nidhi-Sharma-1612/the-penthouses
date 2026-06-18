interface Column<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground py-10 text-center">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto border border-border rounded-lg bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-base">
            {columns.map((col) => (
              <th key={col.header} className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-b border-border last:border-0">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-3 text-foreground align-top">
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
