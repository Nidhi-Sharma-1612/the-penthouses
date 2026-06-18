"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const KEYS = ["address", "contactEmail"];

export async function updateSettings(formData: FormData) {
  await Promise.all(
    KEYS.map((key) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(formData.get(key) ?? "") },
        create: { key, value: String(formData.get(key) ?? "") },
      })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
