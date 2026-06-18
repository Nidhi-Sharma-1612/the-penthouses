import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const g = global as typeof global & { _prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const prisma = g._prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  g._prisma = prisma;
}
