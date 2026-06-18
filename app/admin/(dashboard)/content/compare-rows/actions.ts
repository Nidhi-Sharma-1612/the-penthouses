"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function readCompareRowForm(formData: FormData) {
  return {
    feature: String(formData.get("feature") ?? "").trim(),
    direct: String(formData.get("direct") ?? "").trim(),
    airbnb: String(formData.get("airbnb") ?? "").trim(),
    vrbo: String(formData.get("vrbo") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createCompareRow(formData: FormData) {
  await prisma.compareRow.create({ data: readCompareRowForm(formData) });
  revalidatePath("/compare");
  revalidatePath("/admin/content/compare-rows");
  redirect("/admin/content/compare-rows");
}

export async function updateCompareRow(id: string, formData: FormData) {
  await prisma.compareRow.update({ where: { id }, data: readCompareRowForm(formData) });
  revalidatePath("/compare");
  revalidatePath("/admin/content/compare-rows");
  redirect("/admin/content/compare-rows");
}

export async function deleteCompareRow(id: string) {
  await prisma.compareRow.delete({ where: { id } });
  revalidatePath("/compare");
  revalidatePath("/admin/content/compare-rows");
  redirect("/admin/content/compare-rows");
}
