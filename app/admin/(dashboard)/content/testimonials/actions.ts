"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function readTestimonialForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    quote: String(formData.get("quote") ?? "").trim(),
    propertyLabel: String(formData.get("propertyLabel") ?? "").trim() || null,
    published: formData.get("published") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({ data: readTestimonialForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/content/testimonials");
  redirect("/admin/content/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await prisma.testimonial.update({ where: { id }, data: readTestimonialForm(formData) });
  revalidatePath("/");
  revalidatePath("/admin/content/testimonials");
  redirect("/admin/content/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/content/testimonials");
  redirect("/admin/content/testimonials");
}
