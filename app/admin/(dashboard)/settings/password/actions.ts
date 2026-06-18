"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId, verifyPassword, hashPassword } from "@/lib/auth";

export async function changePassword(formData: FormData) {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const userId = await getSessionUserId();
  if (!userId) redirect("/admin/login");

  const user = await prisma.adminUser.findUnique({ where: { id: userId } });
  const currentValid = user ? await verifyPassword(currentPassword, user.passwordHash) : false;

  if (!currentValid) {
    redirect("/admin/settings/password?error=current");
  }
  if (newPassword.length < 8) {
    redirect("/admin/settings/password?error=length");
  }
  if (newPassword !== confirmPassword) {
    redirect("/admin/settings/password?error=mismatch");
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.adminUser.update({ where: { id: userId }, data: { passwordHash } });

  redirect("/admin/settings/password?success=1");
}
