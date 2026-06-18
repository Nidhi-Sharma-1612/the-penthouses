import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Edit Testimonial</h1>
      <TestimonialForm action={updateTestimonial.bind(null, id)} defaultValues={testimonial} />
    </div>
  );
}
