import { prisma } from "@/lib/prisma";

export async function getContentBlock<T>(page: string, key: string, fallback: T): Promise<T> {
  const row = await prisma.contentBlock.findUnique({ where: { page_key: { page, key } } });
  return row ? ({ ...fallback, ...(row.value as object) } as T) : fallback;
}

export async function setContentBlock(page: string, key: string, value: object): Promise<void> {
  await prisma.contentBlock.upsert({
    where: { page_key: { page, key } },
    update: { value },
    create: { page, key, value },
  });
}
