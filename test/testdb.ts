import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | undefined;
const getPrismaClient = async () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
  }
  return prismaClient;
};

export const resetDb = async () => {
  const prisma = await getPrismaClient();
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`
    );
  } catch (error) {
    console.log({ error });
  }
};
