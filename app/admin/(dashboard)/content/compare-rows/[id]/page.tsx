import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CompareRowForm from "@/components/admin/CompareRowForm";
import { updateCompareRow } from "../actions";

export default async function EditCompareRowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.compareRow.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Edit Comparison Row</h1>
      <CompareRowForm action={updateCompareRow.bind(null, id)} defaultValues={row} />
    </div>
  );
}
