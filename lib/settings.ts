import { prisma } from "@/lib/prisma";

export async function getSiteSettings(keys: string[]): Promise<Record<string, string | undefined>> {
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
