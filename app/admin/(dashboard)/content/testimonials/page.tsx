import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DataTable from "@/components/admin/DataTable";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <Link href="/admin/pages/home" className="text-sm text-muted-foreground hover:text-[#C6A355]">
        ← Home Page
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-6">
        <h1 className="font-heading text-2xl text-foreground" style={{ fontWeight: 400 }}>Testimonials</h1>
        <Link
          href="/admin/content/testimonials/new"
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary"
        >
          <Plus size={15} strokeWidth={2} />
          Add Testimonial
        </Link>
      </div>

      <DataTable
        rows={testimonials}
        getRowKey={(row) => row.id}
        emptyMessage="No testimonials yet."
        columns={[
          { header: "Name", cell: (row) => row.name },
          { header: "Property", cell: (row) => row.propertyLabel ?? "—" },
          { header: "Published", cell: (row) => (row.published ? "Yes" : "No") },
          { header: "Order", cell: (row) => row.order },
          {
            header: "",
            cell: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/content/testimonials/${row.id}`} className="flex items-center gap-1 text-foreground hover:text-[#C6A355] text-sm">
                  <Pencil size={13} strokeWidth={1.75} />
                  Edit
                </Link>
                <form action={deleteTestimonial.bind(null, row.id)}>
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
