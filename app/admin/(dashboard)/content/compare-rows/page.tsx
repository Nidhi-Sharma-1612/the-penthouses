import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DataTable from "@/components/admin/DataTable";
import { deleteCompareRow } from "./actions";

export default async function AdminCompareRowsPage() {
  const rows = await prisma.compareRow.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <Link href="/admin/pages/compare" className="text-sm text-muted-foreground hover:text-[#C6A355]">
        ← Compare Page
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-6">
        <h1 className="font-heading text-2xl text-foreground" style={{ fontWeight: 400 }}>Compare Table Rows</h1>
        <Link
          href="/admin/content/compare-rows/new"
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary"
        >
          <Plus size={15} strokeWidth={2} />
          Add Row
        </Link>
      </div>

      <DataTable
        rows={rows}
        getRowKey={(row) => row.id}
        emptyMessage="No comparison rows yet."
        columns={[
          { header: "Feature", cell: (row) => row.feature },
          { header: "Book Direct", cell: (row) => row.direct },
          { header: "Airbnb", cell: (row) => row.airbnb },
          { header: "VRBO", cell: (row) => row.vrbo },
          { header: "Order", cell: (row) => row.order },
          {
            header: "",
            cell: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/content/compare-rows/${row.id}`} className="flex items-center gap-1 text-foreground hover:text-[#C6A355] text-sm">
                  <Pencil size={13} strokeWidth={1.75} />
                  Edit
                </Link>
                <form action={deleteCompareRow.bind(null, row.id)}>
                  <button type="submit" className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm cursor-pointer">
                    <Trash2 size={13} strokeWidth={1.75} />
                    Delete
                  </button>
                </form>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
