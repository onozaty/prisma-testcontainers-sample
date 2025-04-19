import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "child_process";

console.log("setup.ts 起動: PID", process.pid);

if (!(globalThis as any).__testContainer__) {
  const container = await new PostgreSqlContainer("postgres:latest").start();

  // DATABASE_URLを作成
  const databaseUrl = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getMappedPort(
    5432
  )}/${container.getDatabase()}`;

  process.env.DATABASE_URL = databaseUrl;
  console.log(`Testcontainer起動完了 DATABASE_URL: ${databaseUrl}`);

  execSync(`npx prisma migrate deploy`);

  (globalThis as any).__testContainer__ = container;
}
