import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FaqForm from "@/components/admin/FaqForm";
import { updateFaq } from "../actions";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Edit FAQ</h1>
      <FaqForm action={updateFaq.bind(null, id)} defaultValues={faq} />
    </div>
  );
}
