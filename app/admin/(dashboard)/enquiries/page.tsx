import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DataTable from "@/components/admin/DataTable";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";

const PAGE_SIZE = 20;

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } },
          { subject: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [enquiries, total] = await Promise.all([
    prisma.contactEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contactEnquiry.count({ where }),
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Contact Enquiries</h1>

      <form method="get" className="mb-4">
        <SearchInput defaultValue={q} placeholder="Search name, email, subject..." />
      </form>

      <DataTable
        rows={enquiries}
        getRowKey={(row) => row.id}
        emptyMessage="No enquiries yet."
        columns={[
          { header: "Date", cell: (row) => row.createdAt.toLocaleString() },
          { header: "Name", cell: (row) => row.name },
          { header: "Email", cell: (row) => row.email },
          { header: "Subject", cell: (row) => row.subject ?? "—" },
          {
            header: "",
            cell: (row) => (
              <Link href={`/admin/enquiries/${row.id}`} className="text-foreground underline text-sm">
                View
              </Link>
            ),
          },
        ]}
      />

      <Pagination page={page} pageSize={PAGE_SIZE} total={total} basePath="/admin/enquiries" searchParams={{ q }} />
    </div>
  );
}
