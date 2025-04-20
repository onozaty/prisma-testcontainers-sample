import { PrismaClient } from "@prisma/client";

/*
console.log(
  `setup.ts 起動: PID:${process.pid} process.env.VITEST_POOL_ID:${process.env.VITEST_POOL_ID}`
);
*/

// 各Worker用のDB接続情報へ切り替え
process.env.DATABASE_URL =
  process.env[`DATABASE_URL_TEST_${process.env.VITEST_POOL_ID}`];

// テスト毎にDBリセット
const prisma = new PrismaClient();
await prisma.$connect();

const resetDb = async () => {
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

beforeEach(async () => {
  await resetDb();
});
