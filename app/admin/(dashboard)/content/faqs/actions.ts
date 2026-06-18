"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function readFaqForm(formData: FormData) {
  return {
    category: String(formData.get("category") ?? "").trim().toUpperCase(),
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createFaq(formData: FormData) {
  await prisma.faq.create({ data: readFaqForm(formData) });
  revalidatePath("/faq");
  revalidatePath("/admin/content/faqs");
  redirect("/admin/content/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  await prisma.faq.update({ where: { id }, data: readFaqForm(formData) });
  revalidatePath("/faq");
  revalidatePath("/admin/content/faqs");
  redirect("/admin/content/faqs");
}

export async function deleteFaq(id: string) {
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/faq");
  revalidatePath("/admin/content/faqs");
  redirect("/admin/content/faqs");
}
